import { Box, Grid, Typography, Card, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

// Generate time series data
const generateTimeSeriesData = (points: number) => {
  const baseValue = 1000;
  const trend = 0.05;
  const seasonality = 100;
  const noise = 50;

  return Array.from({ length: points }, (_, i) => {
    const trendComponent = baseValue * (1 + trend * i);
    const seasonalComponent = seasonality * Math.sin((2 * Math.PI * i) / 12);
    const noiseComponent = (Math.random() - 0.5) * noise;
    
    return {
      timestamp: new Date(2024, 0, i + 1).toISOString().split('T')[0],
      value: trendComponent + seasonalComponent + noiseComponent,
      forecast: trendComponent + seasonalComponent,
      upperBound: trendComponent + seasonalComponent + noise * 2,
      lowerBound: trendComponent + seasonalComponent - noise * 2,
    };
  });
};

const data = generateTimeSeriesData(90);

const TimeSeriesPage = () => {
  const [timeframe, setTimeframe] = useState('3m');

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'white' }}>
          Time Series Analysis
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: '#9195A0' }}>Timeframe</InputLabel>
          <Select
            value={timeframe}
            label="Timeframe"
            onChange={(e) => setTimeframe(e.target.value)}
            sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <MenuItem value="1m">1 Month</MenuItem>
            <MenuItem value="3m">3 Months</MenuItem>
            <MenuItem value="6m">6 Months</MenuItem>
            <MenuItem value="1y">1 Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Financial Time Series Forecast
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="#9195A0"
                  tickFormatter={(value) => value.split('-')[2]}
                />
                <YAxis stroke="#9195A0" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1B1E2B', borderColor: '#3D8EFF' }}
                  labelStyle={{ color: 'white' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3D8EFF" 
                  strokeWidth={2}
                  dot={false}
                  name="Actual"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Confidence Intervals
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="#9195A0"
                  tickFormatter={(value) => value.split('-')[2]}
                />
                <YAxis stroke="#9195A0" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1B1E2B', borderColor: '#3D8EFF' }}
                  labelStyle={{ color: 'white' }}
                />
                <Area
                  type="monotone"
                  dataKey="upperBound"
                  stackId="1"
                  stroke="none"
                  fill="#3D8EFF"
                  fillOpacity={0.1}
                />
                <Area
                  type="monotone"
                  dataKey="lowerBound"
                  stackId="2"
                  stroke="none"
                  fill="#3D8EFF"
                  fillOpacity={0.1}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#3D8EFF"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Seasonality Pattern
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.slice(0, 30)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="#9195A0"
                  tickFormatter={(value) => value.split('-')[2]}
                />
                <YAxis stroke="#9195A0" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1B1E2B', borderColor: '#3D8EFF' }}
                  labelStyle={{ color: 'white' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimeSeriesPage;
