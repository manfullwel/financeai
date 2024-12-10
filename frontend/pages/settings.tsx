import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Save as SaveIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon
} from '@mui/icons-material';

const Sidebar = dynamic(() => import('../components/Sidebar'), {
  loading: () => null
});

interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
  };
  appearance: {
    darkMode: boolean;
    compactMode: boolean;
  };
  language: string;
  dataRetention: number;
}

export default function Settings() {
  const [isClient, setIsClient] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    security: {
      twoFactor: true,
      sessionTimeout: 30
    },
    appearance: {
      darkMode: true,
      compactMode: false
    },
    language: 'pt-BR',
    dataRetention: 90
  });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSettingChange = (category: keyof Settings, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = () => {
    // Implementar lógica de salvamento
    console.log('Saving settings:', settings);
    setShowSaveSuccess(true);
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
          Configurações
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ mr: 1, color: '#90caf9' }} />
                <Typography variant="h6" sx={{ color: '#90caf9' }}>
                  Notificações
                </Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography sx={{ color: '#e3f2fd' }}>Email</Typography>
                    }
                    secondary="Receber notificações por email"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.notifications.email}
                      onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography sx={{ color: '#e3f2fd' }}>Push</Typography>
                    }
                    secondary="Notificações push no navegador"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.notifications.push}
                      onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography sx={{ color: '#e3f2fd' }}>SMS</Typography>
                    }
                    secondary="Receber alertas por SMS"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.notifications.sms}
                      onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>

              <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.12)' }} />

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon sx={{ mr: 1, color: '#90caf9' }} />
                <Typography variant="h6" sx={{ color: '#90caf9' }}>
                  Segurança
                </Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography sx={{ color: '#e3f2fd' }}>Autenticação em Dois Fatores</Typography>
                    }
                    secondary="Aumenta a segurança da sua conta"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.security.twoFactor}
                      onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography sx={{ color: '#e3f2fd' }}>Timeout de Sessão (minutos)</Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      size="small"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                      sx={{
                        width: 80,
                        '& .MuiInputBase-input': {
                          color: '#e3f2fd',
                        }
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaletteIcon sx={{ mr: 1, color: '#90caf9' }} />
                <Typography variant="h6" sx={{ color: '#90caf9' }}>
                  Aparência
                </Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography sx={{ color: '#e3f2fd' }}>Modo Escuro</Typography>
                    }
                    secondary="Tema escuro para melhor visualização"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.appearance.darkMode}
                      onChange={(e) => handleSettingChange('appearance', 'darkMode', e.target.checked)}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography sx={{ color: '#e3f2fd' }}>Modo Compacto</Typography>
                    }
                    secondary="Reduz o espaçamento entre elementos"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.appearance.compactMode}
                      onChange={(e) => handleSettingChange('appearance', 'compactMode', e.target.checked)}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>

              <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.12)' }} />

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StorageIcon sx={{ mr: 1, color: '#90caf9' }} />
                <Typography variant="h6" sx={{ color: '#90caf9' }}>
                  Dados
                </Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography sx={{ color: '#e3f2fd' }}>Retenção de Dados (dias)</Typography>
                    }
                    secondary="Período de armazenamento dos dados"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      size="small"
                      value={settings.dataRetention}
                      onChange={(e) => handleSettingChange('dataRetention', '', parseInt(e.target.value))}
                      sx={{
                        width: 80,
                        '& .MuiInputBase-input': {
                          color: '#e3f2fd',
                        }
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ textTransform: 'none' }}
          >
            Salvar Alterações
          </Button>
        </Box>

        <Snackbar
          open={showSaveSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSaveSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setShowSaveSuccess(false)} 
            severity="success"
            sx={{ width: '100%' }}
          >
            Configurações salvas com sucesso!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
