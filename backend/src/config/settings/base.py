from pydantic_settings import BaseSettings, SettingsConfigDict

from src.config.settings.environments import Environment


class BackendBaseSettings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    environment: Environment = Environment.DEVELOPMENT
    app_name: str = "OpenData Harvester"
    api_prefix: str = "/api/v1"
    cors_origins: str = "http://localhost:3013,http://127.0.0.1:3013"
    database_url: str = "sqlite+aiosqlite:///./data/harvester.db"
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 720
