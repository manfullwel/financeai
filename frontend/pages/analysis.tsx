import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Sidebar = dynamic(() => import('../components/Sidebar'), {
  loading: () => null
});

const data = [
  { name: 'Jan', atual: 4000, previsto: 4400 },
  { name: 'Fev', atual: 3000, previsto: 3200 },
  { name: 'Mar', atual: 5000, previsto: 4800 },
  { name: 'Abr', atual: 2780, previsto: 3000 },
  { name: 'Mai', atual: 1890, previsto: 2000 },
  { name: 'Jun', atual: 2390, previsto: 2500 },
];

const PredictionCard = ({ title, value, prediction, accuracy }: { 
  title: string;
  value: string;
  prediction: string;
  accuracy: number;
}) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      bgcolor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" gutterBottom component="div" sx={{ color: '#90caf9' }}>
      {title}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Valor Atual
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Previsão
      </Typography>
      <Typography variant="body1" color="primary">
        {prediction}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="body2" color="text.secondary">
        Precisão
      </Typography>
      <Typography 
        variant="body1" 
        color={accuracy >= 90 ? 'success.main' : accuracy >= 70 ? 'warning.main' : 'error.main'}
      >
        {accuracy}%
      </Typography>
    </Box>
  </Paper>
);

export default function Analysis() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
          width: { xs: '100%', sm: 'calc(100% - 240px)' }
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, color: '#e3f2fd' }}>
          Análise Preditiva
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#90caf9' }}>
                Tendências e Previsões
              </Typography>
              <ResponsiveContainer>
                <LineChart
                  data={data}
                  margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#fff"
                  />
                  <YAxis
                    stroke="#fff"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="atual"
                    name="Valor Atual"
                    stroke="#8884d8"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="previsto"
                    name="Previsão"
                    stroke="#82ca9d"
                    dot={false}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <PredictionCard
                  title="Receita Mensal"
                  value="R$ 45.000"
                  prediction="R$ 48.500"
                  accuracy={92}
                />
              </Grid>
              <Grid item xs={12}>
                <PredictionCard
                  title="Despesas"
                  value="R$ 32.000"
                  prediction="R$ 30.800"
                  accuracy={88}
                />
              </Grid>
              <Grid item xs={12}>
                <PredictionCard
                  title="Lucro Líquido"
                  value="R$ 13.000"
                  prediction="R$ 17.700"
                  accuracy={85}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
