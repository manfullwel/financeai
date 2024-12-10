import { Box, Grid, Typography, Card } from '@mui/material';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 4000, profit: 2400, loss: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398, loss: 2210 },
  { month: 'Mar', revenue: 2000, profit: 9800, loss: 2290 },
  { month: 'Apr', revenue: 2780, profit: 3908, loss: 2000 },
  { month: 'May', revenue: 1890, profit: 4800, loss: 2181 },
  { month: 'Jun', revenue: 2390, profit: 3800, loss: 2500 },
  { month: 'Jul', revenue: 3490, profit: 4300, loss: 2100 },
];

const AnalyticsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'white' }}>
        Financial Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Revenue Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#9195A0" />
                <YAxis stroke="#9195A0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1B1E2B', borderColor: '#3D8EFF' }}
                  labelStyle={{ color: 'white' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3D8EFF" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Profit Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#9195A0" />
                <YAxis stroke="#9195A0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1B1E2B', borderColor: '#3D8EFF' }}
                  labelStyle={{ color: 'white' }}
                />
                <Area type="monotone" dataKey="profit" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Monthly Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#9195A0" />
                <YAxis stroke="#9195A0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1B1E2B', borderColor: '#3D8EFF' }}
                  labelStyle={{ color: 'white' }}
                />
                <Bar dataKey="revenue" fill="#3D8EFF" />
                <Bar dataKey="profit" fill="#10B981" />
                <Bar dataKey="loss" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
