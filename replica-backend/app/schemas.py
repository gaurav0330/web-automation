from pydantic import BaseModel
from typing import Optional, Any, List
from datetime import datetime

# ---------------- USERS ----------------
class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    pass

class UserOut(UserBase):
    id: int
    created_at: Optional[datetime]
    class Config:
        orm_mode = True


# ---------------- PROJECTS ----------------
class ProjectBase(BaseModel):
    name: str
    color: Optional[str] = None

class ProjectCreate(ProjectBase):
    owner_id: Optional[int] = None

class ProjectOut(ProjectBase):
    id: int
    owner_id: Optional[int]
    created_at: Optional[datetime]
    # optional include fields
    tasks: Optional[List["TaskOut"]] = None
    class Config:
        orm_mode = True


# ---------------- TASKS ----------------
class TaskBase(BaseModel):
    name: str
    description: Optional[str] = None
    project_id: int

class TaskCreate(TaskBase):
    assignee_id: Optional[int] = None
    due_date: Optional[datetime] = None
    extra_metadata: Optional[Any] = None

class TaskOut(TaskBase):
    id: int
    completed: bool
    assignee_id: Optional[int]
    extra_metadata: Optional[Any]
    class Config:
        orm_mode = True


# ---------------- COMMENTS ----------------
class CommentBase(BaseModel):
    task_id: int
    body: str

class CommentCreate(CommentBase):
    author_id: Optional[int] = None

class CommentOut(CommentBase):
    id: int
    author_id: Optional[int]
    created_at: Optional[datetime]
    class Config:
        orm_mode = True


# ---------------- PROJECT MEMBERS ----------------
class ProjectMemberCreate(BaseModel):
    project_id: int
    user_id: int
    role: Optional[str] = "member"

class ProjectMemberOut(ProjectMemberCreate):
    class Config:
        orm_mode = True

# for forward refs
ProjectOut.update_forward_refs()
