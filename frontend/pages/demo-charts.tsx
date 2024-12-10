import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample data
const timeSeriesData = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-${String(i + 1).padStart(2, '0')}`,
  actual: Math.random() * 100 + 50,
  predicted: Math.random() * 100 + 50,
  confidence: Math.random() * 20 + 80,
}));

const stockData = Array.from({ length: 20 }, (_, i) => ({
  date: `Day ${i + 1}`,
  price: Math.random() * 1000 + 500,
  volume: Math.random() * 1000000,
}));

const performanceData = Array.from({ length: 6 }, (_, i) => ({
  metric: ['ROI', 'Sharpe', 'Volatility', 'Alpha', 'Beta', 'Info Ratio'][i] || `Metric ${i + 1}`,
  value: Math.random() * 100,
  benchmark: Math.random() * 100,
}));

export default function DemoCharts() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        FinanceAI Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Time Series Prediction */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Stock Price Prediction with Confidence Intervals
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#8884d8"
                    name="Actual"
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#82ca9d"
                    name="Predicted"
                    strokeDasharray="5 5"
                  />
                  <Area
                    type="monotone"
                    dataKey="confidence"
                    fill="#8884d8"
                    fillOpacity={0.1}
                    name="Confidence"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Stock Performance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Stock Price & Volume Analysis
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="price"
                    fill="#82ca9d"
                    stroke="#82ca9d"
                    name="Price"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Performance Metrics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Metrics vs Benchmark
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Portfolio" />
                  <Bar dataKey="benchmark" fill="#82ca9d" name="Benchmark" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
