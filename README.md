# FinanceAI

FinanceAI é uma aplicação full-stack que combina FastAPI no backend com Next.js no frontend para fornecer análises financeiras inteligentes.

## Estrutura do Projeto

- `src/` - Backend FastAPI
- `frontend/` - Frontend Next.js
- `tests/` - Testes automatizados

## Desenvolvimento

### Backend

```bash
# Instalar dependências
pip install -r requirements.txt

# Rodar servidor de desenvolvimento
uvicorn src.api.main:app --reload
```

### Frontend

```bash
# Na pasta frontend
npm install
npm run dev
```

## Testes

```bash
# Rodar testes
pytest
```

## Deploy

O projeto usa:
- Railway para o backend
- Vercel para o frontend

## Licença

MIT
