
# Asana Replica - Backend (FastAPI)

## Overview
This backend replicates core functionality of Asana’s Tasks, Projects, Users, Comments, and Memberships using **FastAPI**, **SQLAlchemy**, and **PostgreSQL**. It includes a fully typed API, CRUD operations, validations, and automated test coverage.

---

## 🚀 Features Implemented

### ✔ Users
- Create & fetch users  
- Automatic default user seed on startup

### ✔ Projects
- Create projects  
- List projects  
- Fetch single project  
- Includes owner + tasks relationship

### ✔ Tasks
- Create tasks  
- List tasks  
- Filter tasks by project, assignee, or completion status  
- Fetch single task

### ✔ Comments
- Add comments to tasks  
- List comments for a task

### ✔ Project Members
- Assign users to projects  
- List members

### ✔ Database Schema
- Full schema provided in `schema.sql`  
- Models implemented in SQLAlchemy ORM  
- PostgreSQL ready

### ✔ Testing (Pytest)
- 7 API tests included  
- All pass successfully  
- Covers creation, validation, and relations

---

## 📦 Technology Stack
- **FastAPI**
- **SQLAlchemy**
- **PostgreSQL**
- **Pydantic**
- **Uvicorn**
- **Pytest**
- **HTTPX**

---

## 🛠 Installation

### 1. Clone the repo
```bash
git clone <your-repo>
cd replica-backend
```

### 2. Create and activate virtualenv
```bash
python -m venv venv
venv\Scripts\activate   # Windows
# or
source venv/bin/activate  # macOS/Linux
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

---

## 🗄 Database Setup

Create PostgreSQL DB:
```bash
createdb asana_replica
```

Apply schema:
```bash
psql asana_replica < schema.sql
```

Or rely on FastAPI auto-create tables:
```python
Base.metadata.create_all(bind=engine)
```

---

## ▶ Running the Server

Start FastAPI server with auto-reload:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

👉 **http://127.0.0.1:8000**

---

## 📘 API Documentation

FastAPI auto-generates docs:

- Swagger UI → http://127.0.0.1:8000/docs  
- Redoc → http://127.0.0.1:8000/redoc  

---

## 🧪 Running Tests

Run Pytest:

```bash
pytest -q
```

Expected:

```
7 passed
```

---

## 🔧 Project Structure

```
replica-backend/
│
├── app/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── db.py
│   ├── deps.py
│
├── tests/
│   ├── test_projects.py
│   ├── test_tasks.py
│   ├── test_projects_tasks.py
│   ├── conftest.py
│
├── schema.sql
├── requirements.txt
├── pytest.ini
└── README_backend.md  (this file)
```

---

## 🧩 Environment Variables

Create `.env`:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/asana_replica
```

---

## 🐳 Docker Setup (Optional)

```
docker-compose up --build
```

---

## ✅ Status
Backend is **complete, stable, and fully integrated** with frontend + Playwright agent.

