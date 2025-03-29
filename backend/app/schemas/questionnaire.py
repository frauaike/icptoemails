from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum

class QuestionType(str, Enum):
    SINGLE_CHOICE = "single_choice"
    MULTIPLE_CHOICE = "multiple_choice"
    TEXT = "text"
    NUMBER = "number"
    BOOLEAN = "boolean"
    SCALE = "scale"

class Question(BaseModel):
    id: str
    type: QuestionType
    text: str
    description: Optional[str] = None
    required: bool = True
    options: Optional[List[str]] = None
    min_value: Optional[float] = None
    max_value: Optional[float] = None
    scale_min: Optional[int] = None
    scale_max: Optional[int] = None
    default_value: Optional[Any] = None
    validation_rules: Optional[Dict[str, Any]] = None

class Section(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    questions: List[Question]
    order: int

class Questionnaire(BaseModel):
    id: str
    version: str
    title: str
    description: Optional[str] = None
    sections: List[Section]
    created_at: str
    updated_at: Optional[str] = None
    is_active: bool = True

    class Config:
        from_attributes = True 