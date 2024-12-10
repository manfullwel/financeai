import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { errorTracker } from '../services/errorTracking';

interface Props {
  children: ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

interface ErrorLog {
  message: string;
  name: string;
  stack?: string;
  componentName: string;
  componentStack: string;
  [key: string]: unknown;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro capturado:', {
      error,
      errorInfo,
    });
    
    // Aqui você pode implementar sua lógica de log de erros
    this.logError({
      message: error.message,
      name: error.name,
      stack: error.stack,
      componentName: 'ErrorBoundary',
      componentStack: errorInfo.componentStack,
    });
  }

  private logError(errorData: ErrorLog) {
    errorTracker.logError({
      type: 'UI',
      message: errorData.message,
      stack: errorData.stack,
      componentName: errorData.componentName,
      additionalInfo: errorData.componentStack
    });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              textAlign: 'center',
              gap: 2
            }}
          >
            <Typography variant="h4" gutterBottom>
              Oops! Algo deu errado
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Não se preocupe, já fomos notificados e estamos trabalhando para resolver o problema.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
            >
              Tentar Novamente
            </Button>
            {process.env.NODE_ENV === 'development' && (
              <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" color="error" align="left">
                  {this.state.error?.message}
                </Typography>
                <Typography variant="caption" color="text.secondary" align="left" component="pre" sx={{ mt: 1 }}>
                  {this.state.error?.stack}
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}
