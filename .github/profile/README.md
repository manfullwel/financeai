# 💫 Welcome to FinanceAI

<div align="center">
  <img src="./images/banner.svg" alt="FinanceAI Banner" width="100%">
  
  [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://financeai.vercel.app)
  [![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
</div>

## 🎯 Project Overview

FinanceAI is a cutting-edge financial analytics platform that combines modern design principles with powerful AI capabilities. Our mission is to democratize financial intelligence through an intuitive and beautiful interface.

<div align="center">
  <img src="./images/dashboard.svg" alt="Dashboard Preview" width="80%">
</div>

## 🚀 Quick Start Guide

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.10 or higher)
- pnpm (v8 or higher)
- Git

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/financeai.git
cd financeai

# Install frontend dependencies
cd frontend
pnpm install

# Create .env.local file
cp .env.example .env.local

# Start development server
pnpm dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Start backend server
uvicorn main:app --reload
```

## 🎨 UI/UX Design Philosophy

Our design system follows these core principles:

### 1. Visual Hierarchy 📊
```typescript
// Example of our chart component with proper visual hierarchy
const ChartComponent = () => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={marketData}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    </AreaChart>
  </ResponsiveContainer>
);
```

### 2. Responsive Design 📱
Our components adapt seamlessly across devices:

```typescript
const DashboardCard = styled.div`
  @media (max-width: 768px) {
    grid-column: span 12;
  }
  @media (min-width: 769px) {
    grid-column: span 6;
  }
  @media (min-width: 1024px) {
    grid-column: span 3;
  }
`;
```

### 3. Micro-interactions ✨
Subtle animations enhance user experience:

```typescript
const ButtonAnimation = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.05); }
`;

const StyledButton = styled.button`
  transition: all 0.2s ease;
  &:hover {
    animation: ${ButtonAnimation} 0.2s ease;
  }
`;
```

## 📊 Data Visualization

Our platform features sophisticated data visualization:

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNIDUwLDIwMCBDIDEwMCwxMDAgMjAwLDE1MCAzNTAsNTAiIHN0cm9rZT0iIzI1NjNlYiIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0iTSA1MCwyMDAgQyAxMDAsMTAwIDIwMCwxNTAgMzUwLDUwIFYgMjUwIEggNTAgWiIgZmlsbD0idXJsKCNncmFkMSkiIGZpbGwtb3BhY2l0eT0iMC4yIi8+Cjwvc3ZnPg==" width="200px">
        <br />
        Market Trends
      </td>
      <td align="center">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNIDUwLDE1MCBDIDEwMCwyMDAgMjAwLDEwMCAzNTAsMTUwIiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0gNTAsMTAwIEMgMTAwLDE1MCAyMDAsNTAgMzUwLDEwMCIgc3Ryb2tlPSIjZjU5ZTBiIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNSIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4=" width="200px">
        <br />
        Portfolio Analysis
      </td>
      <td align="center">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB4PSI1MCIgeT0iMTUwIiB3aWR0aD0iNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZWY0NDQ0Ii8+CiAgPHJlY3QgeD0iMTUwIiB5PSIxMDAiIHdpZHRoPSI1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNlZjQ0NDQiLz4KICA8cmVjdCB4PSIyNTAiIHk9IjUwIiB3aWR0aD0iNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZWY0NDQ0Ii8+CiAgPHBhdGggZD0iTSA1MCwyMDAgTCA0MDAsMjAwIiBzdHJva2U9IiNmNTllMGIiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWRhc2hhcnJheT0iNSA1Ii8+Cjwvc3ZnPg==" width="200px">
        <br />
        Risk Assessment
      </td>
    </tr>
  </table>
</div>

## 🎯 Key Features

- **Real-time Analytics**: Live market data visualization
- **AI-Powered Insights**: Predictive analytics and trend detection
- **Responsive Design**: Seamless experience across all devices
- **Dark/Light Mode**: Customizable UI themes
- **Accessibility**: WCAG 2.1 AA compliant

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: Server-side rendering and modern React features
- **TypeScript**: Type-safe development
- **Material-UI**: Component library with custom theme
- **TailwindCSS**: Utility-first styling
- **Recharts**: Data visualization
- **Framer Motion**: Smooth animations

### Backend
- **FastAPI**: High-performance Python web framework
- **SQLAlchemy**: ORM for database operations
- **Pandas**: Data manipulation and analysis
- **TensorFlow**: AI/ML capabilities

## 📚 Design Resources

- [Figma Prototype](https://figma.com/community/file/xxxxx)
- [Component Library](https://storybook.financeai.com)
- [Style Guide](https://financeai.com/style-guide)

## 🎨 Color Palette

```scss
// Primary Colors
$primary-blue: #2563eb;
$primary-indigo: #4f46e5;
$primary-purple: #7c3aed;

// Accent Colors
$accent-green: #10b981;
$accent-red: #ef4444;
$accent-yellow: #f59e0b;

// Neutral Colors
$neutral-50: #f9fafb;
$neutral-900: #111827;
```

## 📦 Project Structure

```
financeai/
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── providers/     # Context providers
│   │   ├── styles/        # Global styles
│   │   └── utils/         # Helper functions
│   └── pages/            # Next.js pages
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # Business logic
│   └── tests/           # Backend tests
└── docs/                # Documentation
```

## 🌟 Contributing

We welcome contributions! Check out our [contribution guidelines](CONTRIBUTING.md) to get started.

## 📫 Connect With Me

<div align="center">
  
[![Portfolio](https://img.shields.io/badge/Portfolio-255E63?style=for-the-badge&logo=About.me&logoColor=white)](https://igorsoares.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/igorjsoares)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/igorjsoares)

</div>

---

<div align="center">
  <sub>Built with ❤️ by Igor J. Soares</sub>
</div>
