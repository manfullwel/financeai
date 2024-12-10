import uvicorn
import sys
import os
from src.config import get_settings

# Adiciona o diretório atual ao PYTHONPATH
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def start():
    """Função para iniciar o servidor"""
    settings = get_settings()
    
    # Configuração do uvicorn
    config = uvicorn.Config(
        "src.api.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD,
        workers=settings.WORKERS,
        reload_dirs=["src"],
        log_level="info",
        access_log=True,
    )
    
    # Criar e iniciar o servidor
    server = uvicorn.Server(config)
    server.run()

if __name__ == "__main__":
    start()
