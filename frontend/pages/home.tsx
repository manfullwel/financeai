'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Grid, Box } from '@mui/material';
import {
  AccountBalance as BankIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import DashboardCard from '../components/DashboardCard';
import { AreaChartStyled } from '@/components/charts/AreaChartStyled';
import { LineChartStyled } from '@/components/charts/LineChartStyled';

const marketData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const predictionData = [
  { name: 'Jan', atual: 4000, previsto: 4100 },
  { name: 'Fev', atual: 3000, previsto: 3200 },
  { name: 'Mar', atual: 5000, previsto: 4800 },
  { name: 'Abr', atual: 2780, previsto: 3000 },
  { name: 'Mai', atual: 1890, previsto: 2000 },
  { name: 'Jun', atual: 2390, previsto: 2500 },
  { name: 'Jul', atual: 3490, previsto: 3600 },
];

export default function Home() {
  return (
    <DashboardLayout>
      <Box className="animate-fade-in">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Saldo Total"
              value={25000.00}
              type="currency"
              icon={<BankIcon />}
              trend="positive"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Rendimento Mensal"
              value={8.5}
              type="percentage"
              icon={<TrendingUpIcon />}
              trend="positive"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Gastos Mensais"
              value={1800.00}
              type="currency"
              icon={<MoneyIcon />}
              trend="negative"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Score de Crédito"
              value={850}
              icon={<AssessmentIcon />}
              description="Excelente"
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <AreaChartStyled
              data={marketData}
              title="Visão Geral do Mercado"
              gradientColor="#2563eb"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <LineChartStyled
              data={predictionData}
              title="Previsão vs Realizado"
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
