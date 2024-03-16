from typing import Optional
from sqlmodel import Field, Session, SQLModel, create_engine, select

class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    completed: bool = False