import { styled } from '@mui/material/styles';
import { Card, CardProps } from '@mui/material';

export const StyledCard = styled(Card)<CardProps>`
  background: ${({ theme }) => 
    theme.palette.mode === 'dark' 
      ? 'rgba(31, 41, 55, 0.8)'
      : 'rgba(255, 255, 255, 0.8)'
  };
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)'
  };
  padding: ${({ theme }) => theme.spacing(3)};
  
  .card-title {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: ${({ theme }) => theme.typography.h6.fontSize};
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
  }

  .card-value {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: ${({ theme }) => theme.typography.h4.fontSize};
    font-weight: 700;
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }

  .trend {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(0.5)};
    font-weight: 500;
    
    &.positive {
      color: ${({ theme }) => theme.palette.success.main};
    }
    
    &.negative {
      color: ${({ theme }) => theme.palette.error.main};
    }
  }
`;
