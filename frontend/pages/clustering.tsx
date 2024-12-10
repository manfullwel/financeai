import { Box, Grid, Typography, Card, CircularProgress } from '@mui/material';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Generate random cluster data
const generateClusterData = (centerX: number, centerY: number, points: number) => {
  return Array.from({ length: points }, () => ({
    x: centerX + (Math.random() - 0.5) * 20,
    y: centerY + (Math.random() - 0.5) * 20,
  }));
};

const clusters = [
  { data: generateClusterData(20, 20, 50), color: '#3D8EFF' },
  { data: generateClusterData(50, 50, 40), color: '#10B981' },
  { data: generateClusterData(80, 30, 30), color: '#EF4444' },
  { data: generateClusterData(30, 70, 45), color: '#F59E0B' },
];

const ClusteringPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'white' }}>
        Clustering Analysis
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Customer Segments
            </Typography>
            <ResponsiveContainer width="100%" height={500}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" dataKey="x" stroke="#9195A0" />
                <YAxis type="number" stroke="#9195A0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1B1E2B', borderColor: '#3D8EFF' }}
                  labelStyle={{ color: 'white' }}
                />
                {clusters.map((cluster, index) => (
                  <Scatter 
                    key={index}
                    name={`Cluster ${index + 1}`} 
                    data={cluster.data} 
                    fill={cluster.color}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'white' }}>
              Cluster Metrics
            </Typography>
            <Grid container spacing={2}>
              {clusters.map((cluster, index) => (
                <Grid item xs={6} key={index}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <CircularProgress
                        variant="determinate"
                        value={75 + Math.random() * 20}
                        sx={{
                          color: cluster.color,
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }}
                        size={80}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="caption" sx={{ color: 'white' }}>
                          {cluster.data.length}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#9195A0', mt: 1 }}>
                      Cluster {index + 1}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>

          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2, mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Cluster Details
            </Typography>
            {clusters.map((_, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'white', mb: 0.5 }}>
                  Cluster {index + 1}
                </Typography>
                <Typography variant="caption" sx={{ color: '#9195A0', display: 'block' }}>
                  Silhouette Score: {(0.7 + Math.random() * 0.2).toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClusteringPage;
