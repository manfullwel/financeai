import dynamic from 'next/dynamic';

// Função para carregar componentes de forma dinâmica com loading otimizado
export function lazyLoadComponent(importFunc: () => Promise<any>, options = {}) {
  return dynamic(importFunc, {
    loading: () => null, // Pode ser substituído por um componente de loading personalizado
    ssr: false, // Desativa SSR para componentes pesados
    ...options,
  });
}

// Pré-configuração para componentes específicos
export const LazyChart = lazyLoadComponent(() => import('@nivo/line').then((mod) => mod.ResponsiveLine));
export const LazyDataGrid = lazyLoadComponent(() => import('@mui/x-data-grid').then((mod) => mod.DataGrid));
export const LazyPieChart = lazyLoadComponent(() => import('@nivo/pie').then((mod) => mod.ResponsivePie));
export const LazyBarChart = lazyLoadComponent(() => import('@nivo/bar').then((mod) => mod.ResponsiveBar));
