import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      main: string;
      dark: string;
      light: string;
    };
  }
  interface PaletteOptions {
    neutral: {
      main: string;
      dark: string;
      light: string;
    };
  }
}

export const colors = {
  primary: {
    main: '#2563eb',
    light: '#3b82f6',
    dark: '#1d4ed8',
    contrastText: '#ffffff'
  },
  secondary: {
    main: '#4f46e5',
    light: '#6366f1',
    dark: '#4338ca',
    contrastText: '#ffffff'
  },
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
    contrastText: '#ffffff'
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
    contrastText: '#ffffff'
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
    contrastText: '#ffffff'
  },
  neutral: {
    main: '#6b7280',
    light: '#9ca3af',
    dark: '#4b5563'
  },
  background: {
    default: '#f9fafb',
    paper: '#ffffff',
    dark: '#111827'
  },
  text: {
    primary: '#111827',
    secondary: '#4b5563',
    disabled: '#9ca3af'
  }
};

export const theme = createTheme({
  palette: {
    ...colors,
    mode: 'light'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
          }
        }
      }
    }
  }
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    ...colors,
    mode: 'dark',
    background: {
      default: '#111827',
      paper: '#1f2937',
      dark: '#0f172a'
    },
    text: {
      primary: '#f9fafb',
      secondary: '#e5e7eb',
      disabled: '#6b7280'
    }
  }
});
