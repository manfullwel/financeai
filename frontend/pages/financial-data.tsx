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
  Paper,
  IconButton,
  Chip,
  LinearProgress
} from '@mui/material';
import { Download, Refresh } from '@mui/icons-material';

// Sample financial data
const financialData = [
  {
    id: 1,
    dataset: 'NYSE Market Data',
    lastUpdate: '2024-12-09',
    size: '2.3 GB',
    status: 'Complete',
    type: 'Market Data'
  },
  {
    id: 2,
    dataset: 'Company Financials Q4',
    lastUpdate: '2024-12-08',
    size: '856 MB',
    status: 'Processing',
    type: 'Financial Statements'
  },
  {
    id: 3,
    dataset: 'Economic Indicators',
    lastUpdate: '2024-12-07',
    size: '125 MB',
    status: 'Complete',
    type: 'Economic Data'
  },
  {
    id: 4,
    dataset: 'Cryptocurrency Data',
    lastUpdate: '2024-12-10',
    size: '1.1 GB',
    status: 'Complete',
    type: 'Market Data'
  },
  {
    id: 5,
    dataset: 'ESG Metrics 2024',
    lastUpdate: '2024-12-06',
    size: '450 MB',
    status: 'Pending',
    type: 'ESG Data'
  }
];

const datasetStats = [
  { label: 'Total Datasets', value: 156, color: '#3D8EFF' },
  { label: 'Processing', value: 23, color: '#F59E0B' },
  { label: 'Updated Today', value: 45, color: '#10B981' },
  { label: 'Pending Updates', value: 12, color: '#EF4444' },
];

const FinancialDataPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'white' }}>
        Financial Data Management
      </Typography>

      <Grid container spacing={3}>
        {datasetStats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card sx={{ p: 2, bgcolor: '#1B1E2B', borderRadius: 2 }}>
              <Typography variant="h3" sx={{ color: stat.color, mb: 1 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9195A0' }}>
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Card sx={{ bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <TableContainer component={Paper} sx={{ bgcolor: 'transparent' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Dataset</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Type</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Last Update</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Size</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Status</TableCell>
                    <TableCell sx={{ color: '#9195A0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {financialData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {row.dataset}
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <Chip 
                          label={row.type} 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(61, 142, 255, 0.1)',
                            color: '#3D8EFF',
                          }} 
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {row.lastUpdate}
                      </TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {row.size}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {row.status === 'Processing' ? (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LinearProgress 
                              sx={{ 
                                width: 100,
                                mr: 1,
                                bgcolor: 'rgba(245, 158, 11, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: '#F59E0B'
                                }
                              }} 
                            />
                            <Typography variant="caption" sx={{ color: '#F59E0B' }}>
                              {row.status}
                            </Typography>
                          </Box>
                        ) : (
                          <Chip 
                            label={row.status} 
                            size="small"
                            sx={{ 
                              bgcolor: row.status === 'Complete' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                              color: row.status === 'Complete' ? '#10B981' : '#EF4444',
                            }} 
                          />
                        )}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <IconButton size="small" sx={{ color: '#3D8EFF' }}>
                          <Download />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#3D8EFF', ml: 1 }}>
                          <Refresh />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancialDataPage;
