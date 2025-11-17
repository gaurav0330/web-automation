import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.anyio
async def test_create_and_get_project():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        payload = {"name": "Demo Project", "color":"#ff00ff"}
        r = await ac.post("/projects", json=payload)
        assert r.status_code == 201
        body = r.json()
        assert body["name"] == "Demo Project"
        pid = body["id"]

        r2 = await ac.get(f"/projects/{pid}")
        assert r2.status_code == 200
        assert r2.json()["id"] == pid

@pytest.mark.anyio
async def test_task_create_and_list():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # create project
        proj = await ac.post("/projects", json={"name": "TaskProj"})
        assert proj.status_code == 201
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
        # create project to use valid id
        proj = await ac.post("/projects", json={"name": "EmptyNameProj"})
        pid = proj.json()["id"]

        r = await ac.post("/tasks", json={"name": "   ", "project_id": pid})
        assert r.status_code == 400

@pytest.mark.anyio
async def test_project_members_and_comments_simple():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # create project and user
        proj = await ac.post("/projects", json={"name": "MembersProj"})
        pid = proj.json()["id"]

        u = await ac.post("/projects", json={"name": "Temp"})  # ensure DB seeded user still exists
        # add member (user 1 exists from startup seed)
        rv = await ac.post("/project-members", json={"project_id": pid, "user_id": 1})
        assert rv.status_code == 201

        # create task
        t = await ac.post("/tasks", json={"name":"TaskWithComment", "project_id": pid})
        tid = t.json()["id"]

        # create comment
        c = await ac.post("/comments", json={"task_id": tid, "body":"hello", "author_id": 1})
        assert c.status_code == 201
        cid = c.json()["id"]

        # list comments for task
        lst = await ac.get(f"/tasks/{tid}/comments")
        assert lst.status_code == 200
        assert any(x["id"] == cid for x in lst.json())
