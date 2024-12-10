import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  LinearProgress
} from '@mui/material';
import {
  Description as ReportIcon,
  PictureAsPdf as PdfIcon,
  TableChart as ExcelIcon,
  Download as DownloadIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

const Sidebar = dynamic(() => import('../components/Sidebar'), {
  loading: () => null
});

interface Report {
  id: string;
  name: string;
  type: 'pdf' | 'excel';
  date: string;
  size: string;
  status: 'ready' | 'generating' | 'scheduled';
  progress?: number;
}

const reports: Report[] = [
  {
    id: '1',
    name: 'Relatório Financeiro Mensal',
    type: 'pdf',
    date: '2023-12-09',
    size: '2.5 MB',
    status: 'ready'
  },
  {
    id: '2',
    name: 'Análise de Desempenho Q4',
    type: 'excel',
    date: '2023-12-08',
    size: '1.8 MB',
    status: 'ready'
  },
  {
    id: '3',
    name: 'Projeções 2024',
    type: 'pdf',
    date: '2023-12-09',
    size: '',
    status: 'generating',
    progress: 65
  },
  {
    id: '4',
    name: 'Relatório de Riscos',
    type: 'excel',
    date: '2023-12-10',
    size: '',
    status: 'scheduled'
  }
];

const ReportTypeIcon = ({ type }: { type: Report['type'] }) => {
  return type === 'pdf' ? (
    <PdfIcon sx={{ color: '#ff5252' }} />
  ) : (
    <ExcelIcon sx={{ color: '#4caf50' }} />
  );
};

export default function Reports() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = (reportId: string) => {
    // Implementar lógica de download
    console.log('Downloading report:', reportId);
  };

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
          Relatórios
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 2,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#90caf9' }}>
                  Relatórios Disponíveis
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<ReportIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Novo Relatório
                </Button>
              </Box>

              <List>
                {reports.map((report) => (
                  <ListItem
                    key={report.id}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                    secondaryAction={
                      report.status === 'ready' ? (
                        <Tooltip title="Download">
                          <IconButton
                            edge="end"
                            onClick={() => handleDownload(report.id)}
                            sx={{ color: 'primary.main' }}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                      ) : null
                    }
                  >
                    <ListItemIcon>
                      <ReportTypeIcon type={report.type} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ color: '#e3f2fd' }}>
                          {report.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ color: 'text.secondary' }}>
                          <Typography variant="body2" component="span">
                            {new Date(report.date).toLocaleDateString()}
                            {report.size && ` • ${report.size}`}
                          </Typography>
                          {report.status === 'generating' && (
                            <Box sx={{ width: '100%', mt: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={report.progress} 
                                sx={{ height: 4, borderRadius: 2 }}
                              />
                            </Box>
                          )}
                          {report.status === 'scheduled' && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <ScheduleIcon sx={{ fontSize: 16, mr: 0.5 }} />
                              <Typography variant="body2">
                                Agendado para geração
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                height: '100%'
              }}
            >
              <Typography variant="h6" sx={{ color: '#90caf9', mb: 2 }}>
                Relatórios Agendados
              </Typography>
              <List>
                <ListItem
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    bgcolor: 'rgba(255, 255, 255, 0.02)',
                  }}
                >
                  <ListItemIcon>
                    <ScheduleIcon sx={{ color: 'warning.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ color: '#e3f2fd' }}>
                        Relatório Semanal
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Toda Segunda-feira às 08:00
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    bgcolor: 'rgba(255, 255, 255, 0.02)',
                  }}
                >
                  <ListItemIcon>
                    <ScheduleIcon sx={{ color: 'warning.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ color: '#e3f2fd' }}>
                        Relatório Mensal
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Todo dia 1 às 00:00
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
