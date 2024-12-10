'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  trend?: number;
}

interface FinancialChartProps {
  data: DataPoint[];
  title: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const trend = payload[0].payload.trend;
    
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
        <p className="text-gray-600 text-sm">{`Data: ${label}`}</p>
        <p className="text-gray-800 font-semibold">
          {`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        </p>
        {trend !== undefined && (
          <p className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {`${trend >= 0 ? '↑' : '↓'} ${Math.abs(trend).toFixed(1)}%`}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function FinancialChart({ data, title }: FinancialChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="name"
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Valor"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#2563EB' }}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
