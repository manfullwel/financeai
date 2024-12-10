import { 
  Box, 
  Grid, 
  Typography, 
  Card,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip
} from '@mui/material';
import {
  PlayArrow,
  Stop,
  Refresh,
  CheckCircle,
  Error,
  Schedule,
  Storage,
  Transform,
  CloudUpload,
  Analytics
} from '@mui/icons-material';

const pipelineStages = [
  {
    name: 'Data Collection',
    status: 'completed',
    icon: Storage,
    lastRun: '10 minutes ago',
    duration: '45s'
  },
  {
    name: 'Data Preprocessing',
    status: 'running',
    icon: Transform,
    lastRun: '5 minutes ago',
    duration: '2m 30s'
  },
  {
    name: 'Feature Engineering',
    status: 'pending',
    icon: Analytics,
    lastRun: 'Waiting',
    duration: '-'
  },
  {
    name: 'Model Training',
    status: 'error',
    icon: CloudUpload,
    lastRun: 'Failed',
    duration: '-'
  }
];

const recentLogs = [
  {
    timestamp: '2024-12-10 01:55:23',
    message: 'Feature engineering process completed successfully',
    type: 'success'
  },
  {
    timestamp: '2024-12-10 01:54:15',
    message: 'Data preprocessing started for batch #1242',
    type: 'info'
  },
  {
    timestamp: '2024-12-10 01:53:02',
    message: 'Error: Unable to connect to data source',
    type: 'error'
  },
  {
    timestamp: '2024-12-10 01:52:30',
    message: 'Pipeline execution initiated',
    type: 'info'
  }
];

const DataPipelinePage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'running':
        return '#3D8EFF';
      case 'error':
        return '#EF4444';
      default:
        return '#9195A0';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle sx={{ color: '#10B981' }} />;
      case 'running':
        return <PlayArrow sx={{ color: '#3D8EFF' }} />;
      case 'error':
        return <Error sx={{ color: '#EF4444' }} />;
      default:
        return <Schedule sx={{ color: '#9195A0' }} />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'white' }}>
          Data Pipeline
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            sx={{ 
              mr: 2,
              bgcolor: '#10B981',
              '&:hover': { bgcolor: '#059669' }
            }}
          >
            Run Pipeline
          </Button>
          <IconButton sx={{ color: '#3D8EFF' }}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'white' }}>
              Pipeline Stages
            </Typography>
            <List>
              {pipelineStages.map((stage, index) => (
                <Box key={stage.name}>
                  <ListItem
                    secondaryAction={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#9195A0', mr: 2 }}>
                          Last Run: {stage.lastRun}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#9195A0', mr: 2 }}>
                          Duration: {stage.duration}
                        </Typography>
                        {stage.status === 'running' ? (
                          <IconButton edge="end" sx={{ color: '#EF4444' }}>
                            <Stop />
                          </IconButton>
                        ) : (
                          <IconButton edge="end" sx={{ color: '#3D8EFF' }}>
                            <PlayArrow />
                          </IconButton>
                        )}
                      </Box>
                    }
                  >
                    <ListItemIcon>
                      <stage.icon sx={{ color: getStatusColor(stage.status) }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body1" sx={{ color: 'white' }}>
                          {stage.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          {getStatusIcon(stage.status)}
                          <Typography variant="caption" sx={{ color: getStatusColor(stage.status), ml: 1 }}>
                            {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < pipelineStages.length - 1 && (
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                  )}
                </Box>
              ))}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'white' }}>
              Recent Logs
            </Typography>
            <List>
              {recentLogs.map((log, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Chip
                          label={log.type}
                          size="small"
                          sx={{
                            bgcolor: log.type === 'success' 
                              ? 'rgba(16, 185, 129, 0.1)'
                              : log.type === 'error'
                                ? 'rgba(239, 68, 68, 0.1)'
                                : 'rgba(61, 142, 255, 0.1)',
                            color: log.type === 'success'
                              ? '#10B981'
                              : log.type === 'error'
                                ? '#EF4444'
                                : '#3D8EFF',
                            mr: 1
                          }}
                        />
                        <Typography variant="caption" sx={{ color: '#9195A0' }}>
                          {log.timestamp}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        {log.message}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataPipelinePage;
