import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Chip, IconButton, Collapse, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const StyledInsightCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, ${theme.palette.primary.main}22 25%, transparent 25%)`,
    zIndex: 1,
  },
}));

const InsightHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

const InsightChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

interface AIInsight {
  type: 'opportunity' | 'risk' | 'trend';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
}

const mockInsights: AIInsight[] = [
  {
    type: 'opportunity',
    title: 'Potencial de Investimento',
    description: 'Baseado nos padrões de mercado atuais, há uma oportunidade de diversificação em renda fixa com potencial retorno de 12% a.a.',
    confidence: 85,
    impact: 'high',
  },
  {
    type: 'risk',
    title: 'Alerta de Concentração',
    description: 'Sua carteira está com 45% concentrada em um único setor. Recomendamos diversificar para reduzir riscos.',
    confidence: 92,
    impact: 'high',
  },
  {
    type: 'trend',
    title: 'Tendência de Mercado',
    description: 'Análise técnica indica tendência de alta para o setor de tecnologia nos próximos 3 meses.',
    confidence: 78,
    impact: 'medium',
  },
];

const AIInsights = () => {
  const [expanded, setExpanded] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento de insights da API
    const loadInsights = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setInsights(mockInsights);
      setLoading(false);
    };
    loadInsights();
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'primary';
    }
  };

  return (
    <StyledInsightCard elevation={3}>
      <InsightHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToyIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Insights de IA
          </Typography>
        </Box>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '0.3s' }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </InsightHeader>

      <Collapse in={expanded}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {insights.map((insight, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <InsightChip
                    icon={insight.type === 'opportunity' ? <TipsAndUpdatesIcon /> : <AutoGraphIcon />}
                    label={insight.title}
                    size="small"
                  />
                  <Chip
                    label={`${insight.confidence}% confiança`}
                    size="small"
                    color={getImpactColor(insight.impact)}
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {insight.description}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Collapse>
    </StyledInsightCard>
  );
};

export default AIInsights;
