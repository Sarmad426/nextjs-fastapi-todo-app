from typing import Optional


from fastapi import FastAPI, Request, Form, Depends,HTTPException
from sqlmodel import Field, Session, SQLModel, create_engine, select
from fastapi.responses import HTMLResponse
from typing import Annotated

class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    completed: bool = False


sqlite_file_name = "todos.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()

def get_session():
    with Session(engine) as session:
        yield session


@app.post("/api/todos/new", response_model=Todo)
def create_todo(todo: Todo, session: Annotated[Session, Depends(get_session)]):
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return todo


@app.get("/api/todos")
def read_todos():
    with Session(engine) as session:
        todos = session.exec(select(Todo)).all()
        return {"todos": todos}

@app.post("/api/delete/{todo_id}",response_model=Todo)
async def delete_todo(todo: Todo,session: Annotated[Session, Depends(get_session)]):
    """
    Deletes the todo with the specified ID from the database.
    Assumes you have a database session (e.g., SQLAlchemy session) set up.
    """
    db_todo = session.query(Todo).filter(Todo.id == todo.id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    session.delete(db_todo)
    session.commit()
    return db_todo


@app.put("/api/todos/{todo_id}", response_model=Todo)
async def update_todo(todo:Todo, session: Annotated[Session, Depends(get_session)]):
    db_todo = session.query(Todo).filter(Todo.id == todo.id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db_todo.completed = todo.completed
    session.commit()
    return todo