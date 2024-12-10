import {
  Box,
  Grid,
  Typography,
  Card,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  Button,
  Slider,
  Divider,
  FormControlLabel,
} from '@mui/material';
import { Save, Refresh } from '@mui/icons-material';
import { useState } from 'react';

const ModelSettingsPage = () => {
  const [settings, setSettings] = useState({
    modelType: 'lstm',
    batchSize: 32,
    epochs: 100,
    learningRate: 0.001,
    optimizer: 'adam',
    enableEarlyStopping: true,
    validationSplit: 0.2,
    dropoutRate: 0.3,
    useGPU: true,
    enableLogging: true,
  });

  const handleChange = (field: string) => (event: any) => {
    setSettings({
      ...settings,
      [field]: event.target.value,
    });
  };

  const handleSwitchChange = (field: string) => (event: any) => {
    setSettings({
      ...settings,
      [field]: event.target.checked,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'white' }}>
          Model Settings
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<Save />}
            sx={{
              mr: 2,
              bgcolor: '#10B981',
              '&:hover': { bgcolor: '#059669' }
            }}
          >
            Save Settings
          </Button>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            sx={{
              color: '#3D8EFF',
              borderColor: '#3D8EFF',
              '&:hover': {
                borderColor: '#3D8EFF',
                bgcolor: 'rgba(61, 142, 255, 0.1)'
              }
            }}
          >
            Reset Defaults
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'white' }}>
              Model Configuration
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: '#9195A0' }}>Model Type</InputLabel>
              <Select
                value={settings.modelType}
                label="Model Type"
                onChange={handleChange('modelType')}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <MenuItem value="lstm">LSTM</MenuItem>
                <MenuItem value="gru">GRU</MenuItem>
                <MenuItem value="transformer">Transformer</MenuItem>
                <MenuItem value="cnn">CNN</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: '#9195A0' }}>Optimizer</InputLabel>
              <Select
                value={settings.optimizer}
                label="Optimizer"
                onChange={handleChange('optimizer')}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <MenuItem value="adam">Adam</MenuItem>
                <MenuItem value="sgd">SGD</MenuItem>
                <MenuItem value="rmsprop">RMSprop</MenuItem>
                <MenuItem value="adagrad">Adagrad</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Learning Rate"
              type="number"
              value={settings.learningRate}
              onChange={handleChange('learningRate')}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#9195A0',
                },
              }}
              inputProps={{
                step: 0.0001,
                min: 0,
                max: 1,
              }}
            />

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: '#9195A0', mb: 1 }}>Dropout Rate</Typography>
              <Slider
                value={settings.dropoutRate}
                onChange={(_, value) => handleChange('dropoutRate')({ target: { value } })}
                step={0.1}
                marks
                min={0}
                max={1}
                sx={{
                  color: '#3D8EFF',
                  '& .MuiSlider-mark': {
                    backgroundColor: '#9195A0',
                  },
                }}
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, bgcolor: '#1B1E2B', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'white' }}>
              Training Parameters
            </Typography>

            <TextField
              fullWidth
              label="Batch Size"
              type="number"
              value={settings.batchSize}
              onChange={handleChange('batchSize')}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#9195A0',
                },
              }}
            />

            <TextField
              fullWidth
              label="Number of Epochs"
              type="number"
              value={settings.epochs}
              onChange={handleChange('epochs')}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#9195A0',
                },
              }}
            />

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: '#9195A0', mb: 1 }}>Validation Split</Typography>
              <Slider
                value={settings.validationSplit}
                onChange={(_, value) => handleChange('validationSplit')({ target: { value } })}
                step={0.1}
                marks
                min={0}
                max={1}
                sx={{
                  color: '#3D8EFF',
                  '& .MuiSlider-mark': {
                    backgroundColor: '#9195A0',
                  },
                }}
              />
            </Box>

            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Advanced Settings
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.enableEarlyStopping}
                  onChange={handleSwitchChange('enableEarlyStopping')}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#10B981',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#10B981',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: 'white' }}>
                  Enable Early Stopping
                </Typography>
              }
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.useGPU}
                  onChange={handleSwitchChange('useGPU')}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#10B981',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#10B981',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: 'white' }}>
                  Use GPU Acceleration
                </Typography>
              }
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.enableLogging}
                  onChange={handleSwitchChange('enableLogging')}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#10B981',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#10B981',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: 'white' }}>
                  Enable Detailed Logging
                </Typography>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModelSettingsPage;
