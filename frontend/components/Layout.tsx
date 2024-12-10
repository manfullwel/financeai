import React from 'react';
import { Box, CssBaseline, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import { styled } from '@mui/material/styles';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutRoot = styled('div')({
  display: 'flex',
  minHeight: '100vh',
});

const LayoutContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  p: 3,
  width: '100%',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: theme.palette.mode === 'dark' ? '#0a0a1a' : '#dceffc',
  [theme.breakpoints.up('sm')]: {
    ml: `${72}px`,
  }
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  backgroundColor: theme.palette.mode === 'dark' ? '#0a0a1a' : '#dceffc',
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  '& > *': {
    width: '100%',
    maxWidth: 1400,
    margin: '0 auto',
  }
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <LayoutRoot>
      <CssBaseline />
      <Sidebar />
      <LayoutContent>
        <MainContent>
          {children}
        </MainContent>
      </LayoutContent>
    </LayoutRoot>
  );
};

export default Layout;
