from typing import List
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, validator

class Settings(BaseSettings):
    # Application
    APP_NAME: str
    APP_ENV: str
    DEBUG: bool
    API_V1_PREFIX: str

    # Security
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int

    # Database
    DATABASE_URL: str

    # Redis
    REDIS_URL: str

    # OpenAI
    OPENAI_API_KEY: str
    OPENAI_MODEL: str

    # Stripe
    STRIPE_SECRET_KEY: str
    STRIPE_WEBHOOK_SECRET: str

    # Email
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASSWORD: str

    # Frontend
    FRONTEND_URL: AnyHttpUrl
    CORS_ORIGINS: List[AnyHttpUrl]

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int
    RATE_LIMIT_PER_HOUR: int

    # Logging
    LOG_LEVEL: str

    @validator("CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: str | List[str]) -> List[str] | str:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings() 