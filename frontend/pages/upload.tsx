import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  LinearProgress, 
  List, 
  ListItem, 
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  CloudUpload as UploadIcon,
  InsertDriveFile as FileIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const Sidebar = dynamic(() => import('../components/Sidebar'), {
  loading: () => null
});

interface FileUpload {
  id: string;
  name: string;
  size: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

export default function Upload() {
  const [isClient, setIsClient] = useState(false);
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const newUploads = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'pending' as const,
      progress: 0
    }));

    setFiles(prev => [...prev, ...newUploads]);

    // Simular upload para cada arquivo
    newUploads.forEach(upload => {
      simulateFileUpload(upload.id);
    });
  };

  const simulateFileUpload = (fileId: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, status: 'uploading' } : file
    ));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(file => 
          file.id === fileId ? { ...file, status: 'success', progress: 100 } : file
        ));
      } else {
        setFiles(prev => prev.map(file => 
          file.id === fileId ? { ...file, progress } : file
        ));
      }
    }, 500);
  };

  const handleDelete = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
          Upload de Dados
        </Typography>

        <Paper
          sx={{
            p: 3,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: isDragging ? '2px dashed #90caf9' : '2px dashed rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease'
          }}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 3
            }}
          >
            <UploadIcon sx={{ fontSize: 48, color: '#90caf9', mb: 2 }} />
            <Typography variant="h6" sx={{ color: '#e3f2fd', mb: 1 }}>
              Arraste arquivos aqui
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              ou
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadIcon />}
            >
              Selecionar Arquivos
              <input
                type="file"
                hidden
                multiple
                onChange={handleFileInput}
              />
            </Button>
          </Box>
        </Paper>

        {files.length > 0 && (
          <Paper
            sx={{
              mt: 3,
              p: 2,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2
            }}
          >
            <List>
              {files.map((file) => (
                <ListItem
                  key={file.id}
                  secondaryAction={
                    <Tooltip title="Remover">
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={() => handleDelete(file.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemIcon>
                    {file.status === 'success' ? (
                      <SuccessIcon sx={{ color: 'success.main' }} />
                    ) : file.status === 'error' ? (
                      <ErrorIcon sx={{ color: 'error.main' }} />
                    ) : (
                      <FileIcon sx={{ color: 'primary.main' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ color: '#e3f2fd' }}>
                        {file.name}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {formatFileSize(file.size)}
                        </Typography>
                        {file.status === 'uploading' && (
                          <LinearProgress 
                            variant="determinate" 
                            value={file.progress} 
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
