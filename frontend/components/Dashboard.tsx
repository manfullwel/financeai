import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 850000, margin: 380000, marginPercent: 42 },
  { month: 'Feb', revenue: 920000, margin: 410000, marginPercent: 39 },
  { month: 'Mar', revenue: 880000, margin: 385000, marginPercent: 41 },
  { month: 'Apr', revenue: 950000, margin: 420000, marginPercent: 35 },
  { month: 'May', revenue: 980000, margin: 450000, marginPercent: 40 },
  { month: 'Jun', revenue: 1020000, margin: 470000, marginPercent: 43 },
  { month: 'Jul', revenue: 1100000, margin: 490000, marginPercent: 41 },
  { month: 'Aug', revenue: 1150000, margin: 510000, marginPercent: 42 },
  { month: 'Sep', revenue: 1200000, margin: 530000, marginPercent: 44 },
  { month: 'Oct', revenue: 1250000, margin: 550000, marginPercent: 42 },
  { month: 'Nov', revenue: 1300000, margin: 570000, marginPercent: 41 },
  { month: 'Dec', revenue: 1280000, margin: 560000, marginPercent: 42 },
];

const supplierData = [
  { name: 'Sweets Wholesale', revenue: 476384, margin: 227055, marginPercent: 48 },
  { name: 'King Coffee', revenue: 857316, margin: 365097, marginPercent: 43 },
  { name: 'Kappa Drinks', revenue: 878548, margin: 495336, marginPercent: 56 },
  { name: 'Saint Rose Food', revenue: 2344964, margin: 1023608, marginPercent: 44 },
  { name: 'Two Brothers Mill', revenue: 5124316, margin: 1907750, marginPercent: 37 },
];

const Dashboard = () => {
  const [monthFilter, setMonthFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('All');
  const [supplierFilter, setSupplierFilter] = useState('All');
  const theme = useTheme();

  const cardStyle = {
    background: 'linear-gradient(135deg, #1a1042 0%, #2a1b5a 100%)',
    borderRadius: '16px',
    padding: '20px',
    color: '#ffffff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  };

  const filterStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    color: '#ffffff',
    '& .MuiOutlinedInput-root': {
      color: '#ffffff',
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: '#0f172a',
      minHeight: '100vh',
    }}>
      <Grid container spacing={3}>
        {/* Filters */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <FormControl sx={{ ...filterStyle, minWidth: 120 }}>
              <InputLabel>Month</InputLabel>
              <Select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                label="Month"
              >
                <MenuItem value="All">All Months</MenuItem>
                {data.map((item) => (
                  <MenuItem key={item.month} value={item.month}>{item.month}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ ...filterStyle, minWidth: 120 }}>
              <InputLabel>Team</InputLabel>
              <Select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                label="Team"
              >
                <MenuItem value="All">All Teams</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Operations">Operations</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ ...filterStyle, minWidth: 120 }}>
              <InputLabel>Supplier</InputLabel>
              <Select
                value={supplierFilter}
                onChange={(e) => setSupplierFilter(e.target.value)}
                label="Supplier"
              >
                <MenuItem value="All">All Suppliers</MenuItem>
                {supplierData.map((supplier) => (
                  <MenuItem key={supplier.name} value={supplier.name}>{supplier.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Revenue & Margin Chart */}
        <Grid item xs={12} md={8}>
          <Box sx={cardStyle}>
            <Typography variant="h6" sx={{ mb: 2 }}>Revenue & Margin Analysis</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1042', border: 'none' }}
                  labelStyle={{ color: '#ffffff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  dot={{ fill: '#06b6d4' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="margin" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* Supplier Performance */}
        <Grid item xs={12} md={4}>
          <Box sx={cardStyle}>
            <Typography variant="h6" sx={{ mb: 2 }}>Supplier Performance</Typography>
            <Box sx={{ 
              maxHeight: 300, 
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(255,255,255,0.05)',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '4px',
              },
            }}>
              {supplierData.map((supplier) => (
                <Box
                  key={supplier.name}
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  <Typography variant="subtitle1">{supplier.name}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                      Revenue: {formatCurrency(supplier.revenue)}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ color: supplier.marginPercent >= 40 ? '#10b981' : '#ef4444' }}
                    >
                      Margin: {supplier.marginPercent}%
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Revenue by Team/Category Chart */}
        <Grid item xs={12}>
          <Box sx={cardStyle}>
            <Typography variant="h6" sx={{ mb: 2 }}>Revenue by Team and Category</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1042', border: 'none' }}
                  labelStyle={{ color: '#ffffff' }}
                />
                <Bar dataKey="revenue" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
