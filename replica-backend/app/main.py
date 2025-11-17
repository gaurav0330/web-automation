from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from .db import Base, engine, SessionLocal
from .deps import get_db
from . import schemas, crud, models

app = FastAPI(
    title="AsanaReplica API",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Auto-seed user so frontend works
@app.on_event("startup")
def seed_user():
    db = SessionLocal()
    user = crud.get_user(db, 1)
    if not user:
        crud.create_user(db, schemas.UserCreate(
            name="Default User",
            email="test@example.com"
        ))
    db.close()

# ---------------- ROOT ----------------
@app.get("/")
def root():
    return {"message": "Backend running!"}


# ---------------- USERS ----------------
@app.get("/users/{user_id}", response_model=schemas.UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(404, "User not found")
    return user


# ---------------- PROJECTS ----------------
@app.get("/projects", response_model=List[schemas.ProjectOut])
def list_projects(include: Optional[str] = None, db: Session = Depends(get_db)):
    """
    include: comma separated values. Allowed: 'tasks', 'owner', 'members'
    """
    return crud.list_projects(db, include)

@app.post("/projects", response_model=schemas.ProjectOut, status_code=201)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    if not project.owner_id:
        project.owner_id = 1
    owner = crud.get_user(db, project.owner_id)
    if not owner:
        raise HTTPException(400, "Owner user does not exist")
    return crud.create_project(db, project)

@app.get("/projects/{project_id}", response_model=schemas.ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db)):
    proj = crud.get_project(db, project_id)
    if not proj:
        raise HTTPException(404, "Project not found")
    return proj


# ---------------- TASKS ----------------
@app.get("/tasks", response_model=List[schemas.TaskOut])
def list_tasks(project_id: int | None = None,
               assignee_id: int | None = None,
               completed: bool | None = None,
               db: Session = Depends(get_db)):
    return crud.list_tasks(db, project_id, assignee_id, completed)

@app.post("/tasks", response_model=schemas.TaskOut, status_code=201)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    # basic validation
    if not task.name or not task.name.strip():
        raise HTTPException(400, "Task name cannot be empty")

    project = crud.get_project(db, task.project_id)
    if not project:
        raise HTTPException(400, "Project does not exist")

    if task.assignee_id:
        user = crud.get_user(db, task.assignee_id)
        if not user:
            raise HTTPException(400, "Assignee does not exist")

    return crud.create_task(db, task)

@app.get("/tasks/{task_id}", response_model=schemas.TaskOut)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)
    if not task:
        raise HTTPException(404, "Task not found")
    return task


# ---------------- COMMENTS ----------------
@app.post("/comments", response_model=schemas.CommentOut, status_code=201)
def create_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db)):
    # basic checks
    t = crud.get_task(db, comment.task_id)
    if not t:
        raise HTTPException(400, "Task does not exist")

    if comment.author_id:
        u = crud.get_user(db, comment.author_id)
        if not u:
            raise HTTPException(400, "Author user does not exist")

    return crud.create_comment(db, comment)

@app.get("/tasks/{task_id}/comments", response_model=List[schemas.CommentOut])
def list_comments_for_task(task_id: int, db: Session = Depends(get_db)):
    return crud.list_comments(db, task_id)


# ---------------- PROJECT MEMBERS ----------------
@app.post("/project-members", response_model=schemas.ProjectMemberOut, status_code=201)
def add_project_member(pm: schemas.ProjectMemberCreate, db: Session = Depends(get_db)):
    p = crud.get_project(db, pm.project_id)
    if not p:
        raise HTTPException(400, "Project does not exist")
    u = crud.get_user(db, pm.user_id)
    if not u:
        raise HTTPException(400, "User does not exist")
    return crud.add_project_member(db, pm)

@app.get("/projects/{project_id}/members", response_model=List[schemas.ProjectMemberOut])
def list_project_members(project_id: int, db: Session = Depends(get_db)):
    return crud.list_project_members(db, project_id)
