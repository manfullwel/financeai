import { useState } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  BarChart as AnalyticsIcon,
  ShowChart as PredictiveIcon,
  BubbleChart as ClusteringIcon,
  Timeline as TimeSeriesIcon,
  AccountBalanceWallet as FinanceIcon,
  Storage as DataManagementIcon,
  Settings as ModelSettingsIcon,
  AccountCircle as AccountIcon,
  Science as ExperimentsIcon,
  Assessment as ReportsIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DRAWER_WIDTH = 260;
const COLLAPSED_DRAWER_WIDTH = 72;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
})<{
  open?: boolean;
  isMobile?: boolean;
}>(({ theme, open, isMobile }) => ({
  width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#1B1E2B',
    borderRight: 'none',
    [theme.breakpoints.down('sm')]: {
      width: isMobile ? (open ? DRAWER_WIDTH : 0) : COLLAPSED_DRAWER_WIDTH,
    },
  },
}));

const CategoryLabel = styled(Typography)(({ theme }) => ({
  color: '#9195A0',
  fontSize: '0.75rem',
  fontWeight: 600,
  padding: '24px 16px 8px 16px',
  letterSpacing: '0.5px',
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: '2px 12px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'rgba(61, 142, 255, 0.08)',
  },
  '&.Mui-selected': {
    backgroundColor: '#3D8EFF',
    '&:hover': {
      backgroundColor: '#3D8EFF',
    },
  },
}));

const Sidebar = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(!isMobile);

  const menuItems = [
    {
      category: 'OVERVIEW',
      items: [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Financial Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
      ]
    },
    {
      category: 'ML MODELS',
      items: [
        { text: 'Predictive Analysis', icon: <PredictiveIcon />, path: '/predictive' },
        { text: 'Clustering', icon: <ClusteringIcon />, path: '/clustering' },
        { text: 'Time Series', icon: <TimeSeriesIcon />, path: '/timeseries' },
      ]
    },
    {
      category: 'DATA MANAGEMENT',
      items: [
        { text: 'Financial Data', icon: <FinanceIcon />, path: '/financial-data' },
        { text: 'Data Pipeline', icon: <DataManagementIcon />, path: '/data-pipeline' },
        { text: 'Model Settings', icon: <ModelSettingsIcon />, path: '/model-settings' },
      ]
    },
    {
      category: 'ANALYSIS',
      items: [
        { text: 'Experiments', icon: <ExperimentsIcon />, path: '/experiments' },
        { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
      ]
    }
  ];

  return (
    <StyledDrawer
      variant="permanent"
      open={open}
      isMobile={isMobile}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              color: 'white',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <span style={{ color: '#3D8EFF' }}>F</span>
            FinanceAI
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <AccountIcon 
            sx={{ 
              width: 48, 
              height: 48, 
              color: '#3D8EFF',
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(61, 142, 255, 0.1)'
            }} 
          />
          <Box>
            <Typography variant="body2" sx={{ color: '#9195A0' }}>
              Data Scientist
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 500 }}>
              Igor J. Soares
            </Typography>
          </Box>
        </Box>
      </Box>

      <List sx={{ px: 0 }}>
        {menuItems.map((section, index) => (
          <Box key={index}>
            <CategoryLabel>
              {section.category}
            </CategoryLabel>
            {section.items.map((item) => (
              <ListItem key={item.text} disablePadding>
                <StyledListItemButton
                  selected={router.pathname === item.path}
                  component={Link}
                  href={item.path}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 40,
                    color: router.pathname === item.path ? 'white' : '#9195A0'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: router.pathname === item.path ? 'white' : '#9195A0',
                        fontSize: '0.875rem',
                        fontWeight: router.pathname === item.path ? 500 : 400,
                      }
                    }}
                  />
                </StyledListItemButton>
              </ListItem>
            ))}
          </Box>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 3 }}>
        <Typography variant="caption" sx={{ color: '#9195A0' }}>
          FinanceAI Platform
        </Typography>
        <Typography variant="caption" sx={{ color: '#9195A0', display: 'block' }}>
          2024 Advanced Analytics
        </Typography>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;
