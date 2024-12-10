import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FinanceDashboard = () => {
  const [timeRange, setTimeRange] = useState('1M');

  // Dados simulados
  const predictiveData = [
    { month: 'Jan', atual: 85, previsto: 82, risco: 15 },
    { month: 'Fev', atual: 82, previsto: 80, risco: 18 },
    { month: 'Mar', atual: 78, previsto: 75, risco: 22 },
    { month: 'Abr', atual: 75, previsto: 73, risco: 25 },
    { month: 'Mai', atual: 73, previsto: 70, risco: 27 },
  ];

  const fraudAlerts = [
    { id: 1, severity: 'high', message: 'Padrão suspeito detectado em série de boletos' },
    { id: 2, severity: 'medium', message: 'Divergência em valores históricos' },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" />
              Taxa de Adimplência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75.3%</div>
            <div className="text-sm text-gray-500">-2.1% vs mês anterior</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2" />
              Risco de Inadimplência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">27%</div>
            <div className="text-sm text-gray-500">+5% vs mês anterior</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2" />
              Alertas de Fraude
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">2</div>
            <div className="text-sm text-gray-500">Últimas 24 horas</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Previsão de Adimplência vs Realizado</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={800} height={300} data={predictiveData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="atual" stroke="#8884d8" name="Realizado" />
            <Line type="monotone" dataKey="previsto" stroke="#82ca9d" name="Previsto" />
          </LineChart>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {fraudAlerts.map(alert => (
          <Alert key={alert.id} variant={alert.severity === 'high' ? 'destructive' : 'default'}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default FinanceDashboard;
