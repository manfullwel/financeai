import numpy as np
import xgboost as xgb
from sklearn.preprocessing import StandardScaler
import joblib

class DelinquencyPredictionModel:
    def __init__(self):
        self.model = xgb.XGBClassifier(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=5,
            random_state=42
        )
        self.scaler = StandardScaler()
        
    def preprocess_data(self, data):
        """
        Pré-processa os dados para previsão de inadimplência
        """
        features = [
            'historico_pagamentos',
            'valor_contrato',
            'prazo_contrato',
            'score_credito',
            'renda',
            'tempo_emprego',
            'quantidade_parcelas_pagas',
            'taxa_utilizacao_credito'
        ]
        
        # Normaliza features
        data_scaled = self.scaler.fit_transform(data[features])
        return data_scaled
    
    def train(self, X, y):
        """
        Treina o modelo de previsão de inadimplência
        """
        processed_data = self.preprocess_data(X)
        self.model.fit(
            processed_data,
            y,
            eval_metric='auc',
            verbose=True
        )
    
    def predict_probability(self, data):
        """
        Prediz a probabilidade de inadimplência
        """
        processed_data = self.preprocess_data(data)
        probabilities = self.model.predict_proba(processed_data)
        return probabilities[:, 1]  # Retorna probabilidade da classe positiva
    
    def get_feature_importance(self):
        """
        Retorna a importância de cada feature no modelo
        """
        feature_importance = self.model.feature_importances_
        features = [
            'historico_pagamentos',
            'valor_contrato',
            'prazo_contrato',
            'score_credito',
            'renda',
            'tempo_emprego',
            'quantidade_parcelas_pagas',
            'taxa_utilizacao_credito'
        ]
        
        return dict(zip(features, feature_importance))
    
    def save_model(self, path):
        """
        Salva o modelo treinado
        """
        model_data = {
            'model': self.model,
            'scaler': self.scaler
        }
        joblib.dump(model_data, path)
    
    def load_model(self, path):
        """
        Carrega um modelo salvo
        """
        model_data = joblib.load(path)
        self.model = model_data['model']
        self.scaler = model_data['scaler']
