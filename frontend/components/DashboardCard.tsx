'use client';

import { ReactNode } from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import { StyledCard } from '@/components/ui/StyledCard';
import { Box, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface DashboardCardProps {
  title: string;
  value: string | number;
  trend?: 'positive' | 'negative' | 'neutral';
  icon?: ReactNode | SvgIconComponent;
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
      return typeof val === 'number'
        ? `${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}%`
        : val;
    }
    return val;
  };

  const TrendIcon = trend === 'positive' ? TrendingUp : TrendingDown;
  const trendValue = typeof value === 'number' ? Math.abs(value) : value;

  return (
    <StyledCard>
      <Box className="card-title">
        {icon}
        <Typography variant="h6" component="span">
          {title}
        </Typography>
      </Box>
      
      <Typography className="card-value" variant="h4">
        {formatValue(value)}
      </Typography>
      
      {trend !== 'neutral' && (
        <Box className={`trend ${trend}`}>
          <TrendIcon fontSize="small" />
          <Typography variant="body2">
            {formatValue(trendValue)}
          </Typography>
        </Box>
      )}
      
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      )}
    </StyledCard>
  );
}
