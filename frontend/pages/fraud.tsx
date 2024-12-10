import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { 
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';

const Sidebar = dynamic(() => import('../components/Sidebar'), {
  loading: () => null
});

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: string;
  risk: 'high' | 'medium' | 'low';
  status: 'suspicious' | 'verified' | 'blocked';
  description: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2023-12-09 14:30',
    amount: 15000,
    type: 'Transferência',
    risk: 'high',
    status: 'suspicious',
    description: 'Transferência internacional não usual'
  },
  {
    id: '2',
    date: '2023-12-09 12:15',
    amount: 500,
    type: 'Pagamento',
    risk: 'low',
    status: 'verified',
    description: 'Pagamento de conta'
  },
  {
    id: '3',
    date: '2023-12-09 10:45',
    amount: 8000,
    type: 'Saque',
    risk: 'medium',
    status: 'suspicious',
    description: 'Saque em região não usual'
  },
  {
    id: '4',
    date: '2023-12-09 09:20',
    amount: 2500,
    type: 'Transferência',
    risk: 'low',
    status: 'verified',
    description: 'Transferência agendada'
  },
  {
    id: '5',
    date: '2023-12-09 08:00',
    amount: 12000,
    type: 'Depósito',
    risk: 'high',
    status: 'blocked',
    description: 'Depósito em espécie acima do limite'
  }
];

const RiskIndicator = ({ risk }: { risk: Transaction['risk'] }) => {
  const colors = {
    high: 'error',
    medium: 'warning',
    low: 'success'
  };

  return (
    <Chip
      label={risk.toUpperCase()}
      color={colors[risk] as 'error' | 'warning' | 'success'}
      size="small"
      sx={{ minWidth: 80 }}
    />
  );
};

const StatusIndicator = ({ status }: { status: Transaction['status'] }) => {
  const statusConfig = {
    suspicious: { color: 'warning', label: 'Suspeito' },
    verified: { color: 'success', label: 'Verificado' },
    blocked: { color: 'error', label: 'Bloqueado' }
  };

  return (
    <Chip
      label={statusConfig[status].label}
      color={statusConfig[status].color as 'warning' | 'success' | 'error'}
      size="small"
      sx={{ minWidth: 90 }}
    />
  );
};

export default function Fraud() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      bgcolor: '#0a1929',
      position: 'relative'
    }}>
      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { xs: 0, sm: '240px' },
          width: { xs: '100%', sm: 'calc(100% - 240px)' }
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, color: '#e3f2fd' }}>
          Detecção de Fraude
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: '#90caf9', mb: 2 }}>
                Risco Atual
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={75}
                  size={120}
                  thickness={4}
                  sx={{ color: 'error.main' }}
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
                  <Typography variant="h4" sx={{ color: '#e3f2fd' }}>
                    75%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                Nível de Alerta Elevado
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: '#90caf9', mb: 2 }}>
                Transações Recentes
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary' }}>Data</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>Tipo</TableCell>
                      <TableCell align="right" sx={{ color: 'text.secondary' }}>Valor</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>Risco</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>Status</TableCell>
                      <TableCell align="right" sx={{ color: 'text.secondary' }}>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell sx={{ color: '#e3f2fd' }}>
                          {new Date(transaction.date).toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ color: '#e3f2fd' }}>{transaction.type}</TableCell>
                        <TableCell align="right" sx={{ color: '#e3f2fd' }}>
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(transaction.amount)}
                        </TableCell>
                        <TableCell>
                          <RiskIndicator risk={transaction.risk} />
                        </TableCell>
                        <TableCell>
                          <StatusIndicator status={transaction.status} />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Ver detalhes">
                            <IconButton size="small" sx={{ color: 'primary.main' }}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
