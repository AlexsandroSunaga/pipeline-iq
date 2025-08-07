import os
import tempfile
from pathlib import Path

import pytest

# Isolated cwd + DB so tests never touch backend/data
_tmp = tempfile.mkdtemp(prefix="harvester-test-")
os.chdir(_tmp)
os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{Path(_tmp, 'test.db').as_posix()}"


@pytest.fixture(scope="session")
def client():
    from fastapi.testclient import TestClient
    from src.main import backend_app

    with TestClient(backend_app) as c:
        yield c
