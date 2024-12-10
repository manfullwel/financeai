import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';

// Configuração para reduzir o tamanho das classes CSS geradas
ClassNameGenerator.configure((componentName) => 
  `fi-${componentName.toLowerCase().replace(/[^a-z0-9]/g, '')}`
);

// Configuração para otimizar o carregamento dos componentes
export const muiConfig = {
  // Desativa a geração de estilos no servidor para componentes que não são SSR
  disableGeneration: typeof window === 'undefined',
  
  // Reduz o tamanho do CSS gerado
  minifySelectors: true,
  
  // Cache de estilos para melhor performance
  cacheSize: 100,
};

// Configuração para otimizar o carregamento de fontes
export const fontConfig = {
  display: 'swap' as const,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  weights: [300, 400, 500, 700],
};
