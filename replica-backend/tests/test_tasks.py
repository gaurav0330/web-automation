import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.anyio
async def test_task_create_and_list():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # create project
        proj = await ac.post("/projects", json={"name": "TaskProj"})
        pid = proj.json()["id"]

        # create task with minimal valid payload
        t = {"name":"Sample Task", "project_id": pid}
        r = await ac.post("/tasks", json=t)
        assert r.status_code == 201
        tid = r.json()["id"]

        # list tasks by project
        r2 = await ac.get(f"/tasks?project_id={pid}")
        assert r2.status_code == 200
        arr = r2.json()
        assert any(x["id"] == tid for x in arr)

@pytest.mark.anyio
async def test_task_invalid_empty_name():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        r = await ac.post("/tasks", json={"name": "", "project_id": 999})
        assert r.status_code == 400
