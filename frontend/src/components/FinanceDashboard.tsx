import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { TrendingUp, AlertTriangle, AlertCircle } from 'lucide-react';

interface PredictiveData {
  month: string;
  atual: number;
  previsto: number;
  risco: number;
}

interface FraudAlert {
  id: number;
  severity: 'high' | 'medium' | 'low';
  message: string;
}

const FinanceDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('1M');
  const [predictiveData, setPredictiveData] = useState<PredictiveData[]>([]);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Python backend
        const response = await fetch('http://localhost:8000/api/dashboard/data');
        const data = await response.json();
        setPredictiveData(data.predictive_data);
        setFraudAlerts(data.fraud_alerts);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Use mock data if API fails
        setPredictiveData([
          { month: 'Jan', atual: 85, previsto: 82, risco: 15 },
          { month: 'Fev', atual: 82, previsto: 80, risco: 18 },
          { month: 'Mar', atual: 78, previsto: 75, risco: 22 },
          { month: 'Abr', atual: 75, previsto: 73, risco: 25 },
          { month: 'Mai', atual: 73, previsto: 70, risco: 27 },
        ]);
        setFraudAlerts([
          { id: 1, severity: 'high', message: 'Padrão suspeito detectado em série de boletos' },
          { id: 2, severity: 'medium', message: 'Divergência em valores históricos' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Taxa de Adimplência
            </h3>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">75.3%</div>
            <div className="text-sm text-gray-500">-2.1% vs mês anterior</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Risco de Inadimplência
            </h3>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-amber-500">27%</div>
            <div className="text-sm text-gray-500">+5% vs mês anterior</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              Alertas de Fraude
            </h3>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-red-500">{fraudAlerts.length}</div>
            <div className="text-sm text-gray-500">Últimas 24 horas</div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Previsão de Adimplência vs Realizado</h3>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <LineChart width={800} height={300} data={predictiveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="atual" 
                stroke="#8884d8" 
                name="Realizado"
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                dataKey="previsto" 
                stroke="#82ca9d" 
                name="Previsto"
                strokeWidth={2} 
              />
            </LineChart>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        {fraudAlerts.map(alert => (
          <Alert
            key={alert.id}
            className={`p-4 ${
              alert.severity === 'high'
                ? 'bg-red-100 text-red-900 border-red-200'
                : alert.severity === 'medium'
                ? 'bg-amber-100 text-amber-900 border-amber-200'
                : 'bg-blue-100 text-blue-900 border-blue-200'
            }`}
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">{alert.message}</span>
            </div>
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default FinanceDashboard;
