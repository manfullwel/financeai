import numpy as np
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib

class FraudDetectionModel:
    def __init__(self):
        self.isolation_forest = IsolationForest(
            contamination=0.1,
            random_state=42
        )
        self.random_forest = RandomForestClassifier(
            n_estimators=100,
            random_state=42
        )
        self.scaler = StandardScaler()
        
    def preprocess_data(self, data):
        """
        Pré-processa os dados para detecção de fraude
        """
        numeric_features = [
            'valor_boleto',
            'tempo_cliente',
            'frequencia_pagamentos',
            'valor_medio_transacoes'
        ]
        
        # Normaliza features numéricas
        data_scaled = self.scaler.fit_transform(data[numeric_features])
        return data_scaled
    
    def train_anomaly_detection(self, data):
        """
        Treina o modelo de detecção de anomalias
        """
        processed_data = self.preprocess_data(data)
        self.isolation_forest.fit(processed_data)
        
    def train_supervised(self, X, y):
        """
        Treina o modelo supervisionado com dados rotulados
        """
        processed_data = self.preprocess_data(X)
        self.random_forest.fit(processed_data, y)
    
    def predict_anomalies(self, data):
        """
        Detecta anomalias nos dados
        """
        processed_data = self.preprocess_data(data)
        anomaly_scores = self.isolation_forest.decision_function(processed_data)
        predictions = self.isolation_forest.predict(processed_data)
        
        return {
            'scores': anomaly_scores,
            'is_anomaly': predictions == -1
        }
    
    def predict_fraud_probability(self, data):
        """
        Prediz a probabilidade de fraude usando o modelo supervisionado
        """
        processed_data = self.preprocess_data(data)
        probabilities = self.random_forest.predict_proba(processed_data)
        return probabilities[:, 1]  # Retorna probabilidade da classe positiva
    
    def save_model(self, path):
        """
        Salva o modelo treinado
        """
        model_data = {
            'isolation_forest': self.isolation_forest,
            'random_forest': self.random_forest,
            'scaler': self.scaler
        }
        joblib.dump(model_data, path)
    
    def load_model(self, path):
        """
        Carrega um modelo salvo
        """
        model_data = joblib.load(path)
        self.isolation_forest = model_data['isolation_forest']
        self.random_forest = model_data['random_forest']
        self.scaler = model_data['scaler']
