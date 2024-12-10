from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.openapi.utils import get_openapi
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from functools import lru_cache
import asyncio
from fastapi.encoders import jsonable_encoder
import json
from .ml_models import FinancialMLModels
import os

# Importando configurações
try:
    from src.config import Settings, get_settings
except ImportError:
    print("Erro ao importar configurações. Verifique se o arquivo config.py está no lugar correto.")
    import sys
    sys.exit(1)

settings = get_settings()

# Modelos de dados
class TransactionData(BaseModel):
    amount: float
    merchant: str
    timestamp: datetime
    category: str

class RiskAnalysisRequest(BaseModel):
    income: float
    debt_ratio: float
    credit_history_length: int
    num_credit_lines: int
    payment_history_score: float

class TransactionHistory(BaseModel):
    name: str
    value: float
    trend: Optional[float] = Field(None, description="Tendência percentual de mudança")

class DashboardData(BaseModel):
    total_transactions: int
    average_transaction: float
    fraud_rate: float
    delinquency_rate: float
    transaction_history: List[TransactionHistory]

class DashboardResponse(BaseModel):
    total_transactions: int
    average_transaction: float
    fraud_rate: float
    delinquency_rate: float
    transaction_history: List[Dict[str, float | str]]

# Cache para dados do dashboard
@lru_cache(maxsize=1)
def generate_mock_data():
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)
    dates = pd.date_range(start=start_date, end=end_date, freq='D')
    
    # Gera dados mais realistas com tendência
    base_value = 3000
    trend = np.linspace(-0.2, 0.2, len(dates))
    noise = np.random.normal(0, 0.1, len(dates))
    values = [max(1000, int(base_value * (1 + t + n))) for t, n in zip(trend, noise)]
    
    transaction_history = [
        TransactionHistory(
            name=date.strftime("%d/%m"),
            value=value,
            trend=((value - values[i-1])/values[i-1]*100 if i > 0 else 0)
        )
        for i, (date, value) in enumerate(zip(dates, values))
    ]
    
    return DashboardData(
        total_transactions=sum(values),
        average_transaction=sum(values)/len(values),
        fraud_rate=0.015,
        delinquency_rate=0.078,
        transaction_history=transaction_history
    )

def generate_sample_data():
    # Generate realistic transaction data
    dates = pd.date_range(end=datetime.now(), periods=30, freq='D')
    transactions = []
    base_value = 100000
    
    for date in dates:
        # Add some randomness and trend
        daily_factor = 1 + (0.1 * np.sin(date.day * np.pi / 15))
        trend_factor = 1 + (date.day * 0.02)
        value = base_value * daily_factor * trend_factor
        
        transactions.append({
            'name': date.strftime('%d/%m'),
            'value': round(value, 2),
            'trend': round(((value / base_value) - 1) * 100, 2)
        })
    
    # Generate fraud metrics
    fraud_dates = pd.date_range(end=datetime.now(), periods=12, freq='M')
    fraud_metrics = []
    fraud_base = 50
    
    for date in fraud_dates:
        value = fraud_base + np.random.normal(0, 10)
        fraud_metrics.append({
            'name': date.strftime('%b/%y'),
            'value': max(0, round(value, 2))
        })
    
    # Generate default risk data
    risk_dates = pd.date_range(end=datetime.now(), periods=8, freq='Q')
    default_risk = []
    risk_base = 15
    
    for date in risk_dates:
        value = risk_base + np.random.normal(0, 3)
        default_risk.append({
            'name': date.strftime('%b/%y'),
            'value': max(0, min(100, round(value, 2)))
        })
    
    return {
        'transactionHistory': transactions,
        'fraudMetrics': fraud_metrics,
        'defaultRisk': default_risk,
        'metrics': {
            'totalTransactions': sum(t['value'] for t in transactions),
            'averageTransaction': sum(t['value'] for t in transactions) / len(transactions),
            'fraudRate': fraud_metrics[-1]['value'] / 1000,
            'defaultRate': default_risk[-1]['value'] / 100
        }
    }

# Aplicação FastAPI
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API para análise financeira, detecção de fraudes e previsão de inadimplência",
    version=settings.VERSION
)

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ML models
ml_models = FinancialMLModels()

# Load pre-trained models if they exist
models_path = "models"
if os.path.exists(models_path):
    try:
        ml_models.load_models(models_path)
    except:
        print("No pre-trained models found. Will train new ones.")

# Middleware para tratamento global de erros
@app.middleware("http")
async def error_handler(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"detail": f"Internal Server Error: {str(e)}"}
        )

# Rota raiz
@app.get("/")
async def root():
    """
    Rota raiz que retorna informações básicas sobre a API
    """
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "docs_url": "/docs"
    }

@app.get("/api/health")
async def health_check():
    """
    Verificação de saúde da API
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/dashboard/data", response_model=DashboardResponse)
async def get_dashboard_data():
    """
    Retorna dados otimizados para o dashboard financeiro
    """
    try:
        # Usa cache para evitar regeneração frequente
        data = generate_mock_data()
        return jsonable_encoder(data)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"message": "Erro ao gerar dados do dashboard", "error": str(e)}
        )

@app.get("/dashboard")
async def get_dashboard():
    return generate_sample_data()

@app.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    results = []
    
    for file in files:
        content_type = file.content_type
        
        try:
            content = await file.read()
            
            if content_type == 'application/pdf':
                # Simulate PDF analysis
                result = {
                    'filename': file.filename,
                    'type': 'PDF',
                    'analysis': {
                        'contract_type': 'Loan Agreement',
                        'risk_score': round(np.random.uniform(60, 95), 2),
                        'key_terms_detected': ['interest_rate', 'payment_schedule', 'collateral']
                    }
                }
            
            elif content_type in ['image/png', 'image/jpeg']:
                # Simulate image analysis
                result = {
                    'filename': file.filename,
                    'type': 'Image',
                    'analysis': {
                        'document_type': 'Bank Statement',
                        'confidence_score': round(np.random.uniform(85, 99), 2),
                        'extracted_data': {
                            'account_number': 'XXXX-XX' + str(np.random.randint(1000, 9999)),
                            'total_amount': round(np.random.uniform(1000, 50000), 2)
                        }
                    }
                }
            
            elif content_type == 'text/csv':
                # Simulate CSV analysis
                df = pd.read_csv(content)
                result = {
                    'filename': file.filename,
                    'type': 'CSV',
                    'analysis': {
                        'rows_processed': len(df),
                        'columns_detected': len(df.columns),
                        'data_quality_score': round(np.random.uniform(75, 98), 2)
                    }
                }
            
            else:
                result = {
                    'filename': file.filename,
                    'type': 'Unknown',
                    'analysis': None
                }
            
            results.append(result)
            
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error processing file {file.filename}: {str(e)}")
    
    return {"results": results}

@app.post("/analyze/risk")
async def analyze_risk(request: RiskAnalysisRequest):
    client_data = request.dict()
    risk_analysis = ml_models.analyze_risk(client_data)
    
    return {
        "risk_score": round(risk_analysis['credit_score'], 2),
        "default_probability": round(risk_analysis['default_risk'] * 100, 2),
        "risk_factors": {
            "debt_ratio": "High" if request.debt_ratio > 0.4 else "Low",
            "credit_history": "Good" if request.credit_history_length > 5 else "Limited",
            "payment_history": "Excellent" if request.payment_history_score > 90 else "Fair"
        }
    }

@app.post("/detect/fraud")
async def detect_fraud(transaction: TransactionData):
    transaction_dict = transaction.dict()
    fraud_score = ml_models.detect_fraud(transaction_dict)
    
    return {
        "fraud_probability": round(fraud_score * 100, 2),
        "risk_level": "High" if fraud_score > 0.7 else "Medium" if fraud_score > 0.3 else "Low",
        "factors": {
            "amount": "Suspicious" if transaction.amount > 10000 else "Normal",
            "timing": "Normal" if 8 <= transaction.timestamp.hour <= 18 else "Suspicious",
            "category": "Normal" if transaction.category in ["retail", "services"] else "Review"
        }
    }

@app.post("/api/transactions")
async def create_transaction(transaction: TransactionData):
    """
    Cria uma nova transação
    """
    try:
        # Aqui você implementaria a lógica para salvar a transação
        return {
            "status": "success",
            "message": "Transaction created successfully",
            "data": transaction.dict()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Customização do schema OpenAPI
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    openapi_schema = get_openapi(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description="API para análise financeira com recursos de ML para detecção de fraudes e previsão de inadimplência",
        routes=app.routes,
    )
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD,
        workers=settings.WORKERS
    )
