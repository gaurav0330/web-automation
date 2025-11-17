import pytest
from httpx import AsyncClient
from app.main import app
import asyncio

@pytest.mark.anyio
async def test_create_and_get_project(monkeypatch):
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # create user first (direct DB insertion is easier in unit tests; here assume no user)
        payload = {"name": "Demo Project", "color":"#ff00ff"}
        r = await ac.post("/projects", json=payload)
        assert r.status_code == 201
        body = r.json()
        assert body["name"] == "Demo Project"
        pid = body["id"]

        r2 = await ac.get(f"/projects/{pid}")
        assert r2.status_code == 200
        assert r2.json()["id"] == pid
