'use client';

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  trend?: 'positive' | 'negative' | 'neutral';
  icon?: ReactNode;
  type?: 'currency' | 'percentage' | 'number';
  description?: string;
  chartData?: Array<{ value: number }>;
}

export default function DashboardCard({
  title,
  value,
  trend = 'neutral',
  icon,
  type = 'number',
  description,
  chartData
}: DashboardCardProps) {
  const formatValue = (val: string | number) => {
    if (type === 'currency') {
      return typeof val === 'number'
        ? `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        : val;
    }
    if (type === 'percentage') {
      return `${val}%`;
    }
    return typeof val === 'number' ? val.toLocaleString('pt-BR') : val;
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'positive':
        return 'text-green-600 bg-green-50';
      case 'negative':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'positive':
        return '↑';
      case 'negative':
        return '↓';
      default:
        return '→';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {formatValue(value)}
          </h3>
          {trend && (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mt-2 ${getTrendColor()}`}
            >
              {getTrendIcon()}
              <span className="ml-1">
                {trend === 'positive' ? 'Aumento' : trend === 'negative' ? 'Queda' : 'Estável'}
              </span>
            </span>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-2">{description}</p>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-blue-50 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      
      {chartData && (
        <div className="mt-4 h-16">
          <div className="flex items-end justify-between h-full">
            {chartData.map((point, index) => (
              <div
                key={index}
                className="w-1 bg-blue-100 rounded-t"
                style={{
                  height: `${(point.value / Math.max(...chartData.map(p => p.value))) * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      <div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"
      />
    </div>
  );
}
