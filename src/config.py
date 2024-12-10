from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Finance AI API"
    VERSION: str = "1.0.0"
    
    # Server Settings
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    RELOAD: bool = True
    WORKERS: int = 1
    DEBUG: bool = True
    
    # Database Settings
    DATABASE_URL: Optional[str] = None
    
    # Security Settings
    SECRET_KEY: str = "your-secret-key-here"  # Change this in production
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS Settings
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]  # Frontend URL
    
    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = "utf-8"

@lru_cache()
def get_settings() -> Settings:
    """
    Returns cached settings instance to avoid multiple reads from environment.
    """
    return Settings()
