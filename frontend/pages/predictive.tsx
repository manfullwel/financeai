import { Box, Grid, Typography, Card, LinearProgress } from '@mui/material';
import { ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const actualData = Array.from({ length: 50 }, (_, i) => ({
  x: i,
  y: Math.sin(i * 0.5) * 10 + Math.random() * 5,
}));

const predictedData = Array.from({ length: 50 }, (_, i) => ({
  x: i,
  y: Math.sin(i * 0.5) * 10 + 2,
}));

const confidenceData = Array.from({ length: 20 }, (_, i) => ({
  name: `Model ${i + 1}`,
  accuracy: 85 + Math.random() * 10,
}));

const PredictivePage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'white' }}>
        Predictive Analysis
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Time Series Prediction
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" dataKey="x" stroke="#9195A0" />
                <YAxis type="number" stroke="#9195A0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1B1E2B', borderColor: '#3D8EFF' }}
                  labelStyle={{ color: 'white' }}
                />
                <Scatter name="Actual" data={actualData} fill="#3D8EFF" />
                <Scatter name="Predicted" data={predictedData} fill="#10B981" />
              </ScatterChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Model Confidence
            </Typography>
            <Box sx={{ mt: 2 }}>
              {confidenceData.slice(0, 5).map((model, index) => (
                <Box key={model.name} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#9195A0' }}>
                      {model.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#10B981' }}>
                      {model.accuracy.toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={model.accuracy} 
                    sx={{
                      bgcolor: 'rgba(16, 185, 129, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#10B981'
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Prediction Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={actualData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="x" stroke="#9195A0" />
                <YAxis stroke="#9195A0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1B1E2B', borderColor: '#3D8EFF' }}
                  labelStyle={{ color: 'white' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#3D8EFF" 
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PredictivePage;
