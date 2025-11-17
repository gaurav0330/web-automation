from sqlalchemy.orm import Session, selectinload
from . import models, schemas
from sqlalchemy import select

# ---------------- USERS ----------------
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


# ---------------- PROJECTS ----------------
def list_projects(db: Session, include: str = None):
    q = db.query(models.Project)
    if include:
        includes = {i.strip().lower() for i in include.split(",")}
        opts = []
        if "tasks" in includes:
            opts.append(selectinload(models.Project.tasks))
        if "owner" in includes:
            opts.append(selectinload(models.Project.owner))
        if "members" in includes:
            opts.append(selectinload(models.Project.members))
        if opts:
            q = q.options(*opts)
    return q.all()

def create_project(db: Session, project: schemas.ProjectCreate):
    db_project = models.Project(
        name=project.name,
        owner_id=project.owner_id,
        color=project.color,
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first()


# ---------------- TASKS ----------------
def list_tasks(db: Session, project_id=None, assignee_id=None, completed=None):
    q = db.query(models.Task)
    if project_id:
        q = q.filter(models.Task.project_id == project_id)
    if assignee_id:
        q = q.filter(models.Task.assignee_id == assignee_id)
    if completed is not None:
        q = q.filter(models.Task.completed == completed)
    return q.all()

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(
        name=task.name,
        description=task.description,
        project_id=task.project_id,
        assignee_id=task.assignee_id,
        due_date=task.due_date,
        extra_metadata=task.extra_metadata,
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


# ---------------- COMMENTS ----------------
def create_comment(db: Session, comment: schemas.CommentCreate):
    db_comment = models.Comment(
        task_id=comment.task_id,
        author_id=comment.author_id,
        body=comment.body
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

def list_comments(db: Session, task_id: int):
    return db.query(models.Comment).filter(models.Comment.task_id == task_id).all()


# ---------------- PROJECT MEMBERS ----------------
def add_project_member(db: Session, pm: schemas.ProjectMemberCreate):
    db_pm = models.ProjectMember(
        project_id=pm.project_id,
        user_id=pm.user_id,
        role=pm.role or "member"
    )
    db.add(db_pm)
    db.commit()
    # no refresh because primary key is composite; return model instance
    return db_pm

def list_project_members(db: Session, project_id: int):
    return db.query(models.ProjectMember).filter(models.ProjectMember.project_id == project_id).all()
