import numpy as np
from sklearn.ensemble import RandomForestClassifier, IsolationForest
from sklearn.preprocessing import StandardScaler
import pandas as pd
from typing import Dict, List, Any
import joblib
import os

class FinancialMLModels:
    def __init__(self):
        self.fraud_detector = IsolationForest(contamination='auto', random_state=42)
        self.risk_analyzer = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        
    def train_fraud_detector(self, transactions: pd.DataFrame):
        features = self._extract_transaction_features(transactions)
        self.scaler.fit(features)
        scaled_features = self.scaler.transform(features)
        self.fraud_detector.fit(scaled_features)
        
    def detect_fraud(self, transaction: Dict[str, Any]) -> float:
        features = self._extract_single_transaction_features(transaction)
        scaled_features = self.scaler.transform([features])
        score = self.fraud_detector.score_samples([scaled_features[0]])[0]
        return 1 / (1 + np.exp(-score))  # Convert to probability
        
    def train_risk_analyzer(self, historical_data: pd.DataFrame, labels: np.ndarray):
        features = self._extract_risk_features(historical_data)
        self.risk_analyzer.fit(features, labels)
        
    def analyze_risk(self, client_data: Dict[str, Any]) -> Dict[str, float]:
        features = self._extract_risk_features_single(client_data)
        probabilities = self.risk_analyzer.predict_proba([features])[0]
        return {
            'default_risk': float(probabilities[1]),
            'credit_score': float(self._calculate_credit_score(probabilities[1]))
        }
        
    def _extract_transaction_features(self, transactions: pd.DataFrame) -> np.ndarray:
        features = []
        for _, row in transactions.iterrows():
            features.append(self._extract_single_transaction_features(row.to_dict()))
        return np.array(features)
        
    def _extract_single_transaction_features(self, transaction: Dict[str, Any]) -> List[float]:
        return [
            float(transaction.get('amount', 0)),
            float(transaction.get('hour_of_day', 0)),
            float(transaction.get('day_of_week', 0)),
            float(transaction.get('merchant_category', 0))
        ]
        
    def _extract_risk_features(self, data: pd.DataFrame) -> np.ndarray:
        features = []
        for _, row in data.iterrows():
            features.append(self._extract_risk_features_single(row.to_dict()))
        return np.array(features)
        
    def _extract_risk_features_single(self, data: Dict[str, Any]) -> List[float]:
        return [
            float(data.get('income', 0)),
            float(data.get('debt_ratio', 0)),
            float(data.get('credit_history_length', 0)),
            float(data.get('num_credit_lines', 0)),
            float(data.get('payment_history_score', 0))
        ]
        
    def _calculate_credit_score(self, default_probability: float) -> float:
        base_score = 850
        risk_impact = default_probability * 400
        return max(300, base_score - risk_impact)

    def save_models(self, path: str):
        os.makedirs(path, exist_ok=True)
        joblib.dump(self.fraud_detector, os.path.join(path, 'fraud_detector.joblib'))
        joblib.dump(self.risk_analyzer, os.path.join(path, 'risk_analyzer.joblib'))
        joblib.dump(self.scaler, os.path.join(path, 'scaler.joblib'))

    def load_models(self, path: str):
        self.fraud_detector = joblib.load(os.path.join(path, 'fraud_detector.joblib'))
        self.risk_analyzer = joblib.load(os.path.join(path, 'risk_analyzer.joblib'))
        self.scaler = joblib.load(os.path.join(path, 'scaler.joblib'))
