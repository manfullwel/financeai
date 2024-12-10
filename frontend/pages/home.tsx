'use client';

import { useState, useEffect, Suspense } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle,
  Activity,
  BarChart2,
  PieChart,
  LineChart
} from 'lucide-react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Sidebar = dynamic(() => import('../components/Sidebar'), {
  loading: () => null
});

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const DashboardCard = ({ title, value, trend, icon: Icon, type = 'default' }: { title: string; value: string | number; trend?: number; icon: React.ElementType; type?: 'default' | 'market' }) => {
  const isPositive = trend !== undefined && trend > 0;
  const trendClass = isPositive ? 'market-value-up' : 'market-value-down';
  const cardClass = isPositive ? 'market-card-up' : 'market-card-down';

  return (
    <div className={`dashboard-card ${type === 'market' ? cardClass : ''}`}>
      <div className="card-header">
        <Icon className="card-icon" />
        <h3>{title}</h3>
      </div>
      <div className="card-content">
        <p className="card-value">{value}</p>
        {trend !== undefined && (
          <p className={trendClass}>
            {trend}%
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          </p>
        )}
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: any; label: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : R$ ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      bgcolor: '#0a1929',
      position: 'relative'
    }}>
      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { xs: 0, sm: '240px' },
          width: { xs: '100%', sm: `calc(100% - 240px)` },
          position: 'relative',
          zIndex: 1
        }}
      >
        <div className="dashboard-container">
          <h1>Dashboard Financeiro</h1>
          
          <div className="dashboard-grid">
            <DashboardCard
              title="Saldo Total"
              value="R$ 25.000,00"
              icon={DollarSign}
            />
            <DashboardCard
              title="Rendimento Mensal"
              value="R$ 2.500,00"
              trend={8.5}
              icon={TrendingUp}
              type="market"
            />
            <DashboardCard
              title="Despesas"
              value="R$ 1.800,00"
              trend={-2.3}
              icon={TrendingDown}
              type="market"
            />
            <DashboardCard
              title="Alertas"
              value="3"
              icon={AlertTriangle}
            />
          </div>

          <div className="charts-grid">
            <div className="chart-container market-overview">
              <div className="chart-header">
                <Activity size={24} />
                <h3>Visão Geral do Mercado</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="indicators-grid">
              <div className="indicator">
                <BarChart2 size={24} />
                <div>
                  <h4>Volume de Negociação</h4>
                  <p>R$ 1.5M</p>
                </div>
              </div>
              <div className="indicator">
                <PieChart size={24} />
                <div>
                  <h4>Distribuição de Ativos</h4>
                  <p>32% Ações</p>
                </div>
              </div>
              <div className="indicator">
                <LineChart size={24} />
                <div>
                  <h4>Volatilidade</h4>
                  <p>Baixa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}
