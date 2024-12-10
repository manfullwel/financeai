'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

interface ChartProps {
  data: any[];
  layout?: any;
  config?: any;
  style?: React.CSSProperties;
}

const Chart: React.FC<ChartProps> = ({ data, layout = {}, config = {}, style = {} }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [Plotly, setPlotly] = useState<any>(null);

  useEffect(() => {
    // Dynamically import Plotly
    import('plotly.js-dist').then((PlotlyModule) => {
      setPlotly(PlotlyModule.default);
    });
  }, []);

  useEffect(() => {
    if (chartRef.current && Plotly) {
      const defaultLayout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
          color: '#e3f2fd'
        },
        margin: { t: 20, r: 20, b: 20, l: 40 },
        showlegend: true,
        legend: {
          bgcolor: 'rgba(255,255,255,0.1)',
          bordercolor: 'rgba(255,255,255,0.2)',
          borderwidth: 1
        },
        ...layout
      };

      const defaultConfig = {
        responsive: true,
        displayModeBar: false,
        ...config
      };

      Plotly.newPlot(chartRef.current, data, defaultLayout, defaultConfig);
    }

    return () => {
      if (chartRef.current && Plotly) {
        Plotly.purge(chartRef.current);
      }
    };
  }, [data, layout, config, Plotly]);

  return (
    <div 
      ref={chartRef} 
      style={{ width: '100%', height: '300px', ...style }}
    />
  );
};

// Prevent server-side rendering of the chart
export default dynamic(() => Promise.resolve(Chart), { ssr: false });
