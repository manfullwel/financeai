import {
  Box,
  Grid,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  LinearProgress,
  Button,
} from '@mui/material';
import {
  PlayArrow,
  Stop,
  Delete,
  Compare,
  Visibility,
  Download,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample experiments data
const experiments = [
  {
    id: 'EXP-001',
    name: 'LSTM Price Prediction',
    status: 'completed',
    accuracy: 0.89,
    loss: 0.15,
    runtime: '45m',
    timestamp: '2024-12-09 15:30',
  },
  {
    id: 'EXP-002',
    name: 'GRU Market Analysis',
    status: 'running',
    accuracy: 0.82,
    loss: 0.22,
    runtime: '30m',
    timestamp: '2024-12-09 16:15',
  },
  {
    id: 'EXP-003',
    name: 'Transformer Sentiment',
    status: 'failed',
    accuracy: 0,
    loss: 0,
    runtime: '10m',
    timestamp: '2024-12-09 16:45',
  },
  {
    id: 'EXP-004',
    name: 'CNN Technical Analysis',
    status: 'completed',
    accuracy: 0.91,
    loss: 0.12,
    runtime: '1h 15m',
    timestamp: '2024-12-09 17:30',
  },
];

// Sample metrics data
const metricsData = Array.from({ length: 50 }, (_, i) => ({
  epoch: i + 1,
  loss: Math.exp(-i * 0.1) * 0.5 + Math.random() * 0.1,
  accuracy: 1 - Math.exp(-i * 0.1) * 0.5 + Math.random() * 0.05,
}));

const ExperimentsPage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'running':
        return '#3D8EFF';
      case 'failed':
        return '#EF4444';
      default:
        return '#9195A0';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'white' }}>
          Experiments
        </Typography>
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          sx={{
            bgcolor: '#10B981',
            '&:hover': { bgcolor: '#059669' }
          }}
        >
          New Experiment
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>ID</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Name</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Status</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Accuracy</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Loss</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Runtime</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Timestamp</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {experiments.map((experiment) => (
                    <TableRow key={experiment.id}>
                      <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {experiment.id}
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {experiment.name}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {experiment.status === 'running' ? (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LinearProgress
                              sx={{
                                width: 100,
                                mr: 1,
                                bgcolor: 'rgba(61, 142, 255, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: '#3D8EFF'
                                }
                              }}
                            />
                            <Typography variant="caption" sx={{ color: '#3D8EFF' }}>
                              Running
                            </Typography>
                          </Box>
                        ) : (
                          <Chip
                            label={experiment.status}
                            size="small"
                            sx={{
                              bgcolor: `${getStatusColor(experiment.status)}20`,
                              color: getStatusColor(experiment.status),
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {experiment.accuracy ? `${(experiment.accuracy * 100).toFixed(1)}%` : '-'}
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {experiment.loss || '-'}
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {experiment.runtime}
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {experiment.timestamp}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <IconButton size="small" sx={{ color: '#3D8EFF' }}>
                          <Visibility />
                        </IconButton>
                        {experiment.status === 'running' ? (
                          <IconButton size="small" sx={{ color: '#EF4444', ml: 1 }}>
                            <Stop />
                          </IconButton>
                        ) : (
                          <IconButton size="small" sx={{ color: '#3D8EFF', ml: 1 }}>
                            <Download />
                          </IconButton>
                        )}
                        <IconButton size="small" sx={{ color: '#3D8EFF', ml: 1 }}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'white' }}>
              Training Metrics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="epoch"
                  stroke="#9195A0"
                  label={{ value: 'Epoch', position: 'insideBottom', offset: -5, fill: '#9195A0' }}
                />
                <YAxis stroke="#9195A0" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1B1E2B', borderColor: '#3D8EFF' }}
                  labelStyle={{ color: 'white' }}
                />
                <Line
                  type="monotone"
                  dataKey="loss"
                  stroke="#EF4444"
                  name="Loss"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10B981"
                  name="Accuracy"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'white' }}>
              Experiment Summary
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#9195A0', mb: 1 }}>
                Total Experiments
              </Typography>
              <Typography variant="h4" sx={{ color: 'white' }}>
                {experiments.length}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#9195A0', mb: 1 }}>
                Success Rate
              </Typography>
              <Typography variant="h4" sx={{ color: '#10B981' }}>
                75%
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: '#9195A0', mb: 1 }}>
                Average Runtime
              </Typography>
              <Typography variant="h4" sx={{ color: '#3D8EFF' }}>
                45m
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExperimentsPage;
