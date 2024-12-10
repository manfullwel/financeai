'use client';

import { Suspense } from 'react';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('../components/Chart'), {
  loading: () => <CircularProgress />,
  ssr: false
});

const Sidebar = dynamic(() => import('../components/Sidebar'), {
  loading: () => null
});

export default function Dashboard() {
  // Sample data for demonstration
  const lineChartData = [{
    x: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    y: [10, 15, 13, 17, 20],
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: '#90caf9' },
    line: { color: '#90caf9' }
  }];

  const barChartData = [{
    x: ['A', 'B', 'C', 'D', 'E'],
    y: [20, 14, 23, 25, 22],
    type: 'bar',
    marker: {
      color: '#90caf9',
      opacity: 0.7
    }
  }];

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
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, color: '#e3f2fd', textAlign: 'center' }}>
          Dashboard de Análise Financeira
        </Typography>
        
        <Grid container spacing={3} sx={{ maxWidth: 1200, margin: '0 auto' }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                minHeight: '400px'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: '#90caf9' }}>
                Análise de Tendência
              </Typography>
              <Suspense fallback={<CircularProgress />}>
                <Chart data={lineChartData} />
              </Suspense>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                minHeight: '400px'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: '#90caf9' }}>
                Distribuição por Categoria
              </Typography>
              <Suspense fallback={<CircularProgress />}>
                <Chart data={barChartData} />
              </Suspense>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
