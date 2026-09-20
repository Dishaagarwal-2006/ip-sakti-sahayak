from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from services.llm_service import generate_answer
from services.retriever import retrieve_relevant_chunks


app = FastAPI(
    title="IP-SAKTI Sahayak API",
    description="AI-powered intellectual property knowledge assistant",
    version="1.0.0",
)


# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "Welcome to IP-SAKTI Sahayak API",
        "status": "Backend is running",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/ask")
def ask_question(request: QuestionRequest):
    # Retrieve relevant document chunks
    results = retrieve_relevant_chunks(request.question)

    # Generate an answer using the retrieved context
    answer = generate_answer(request.question, results)

    return {
        "question": request.question,
        "answer": answer,
        "results": results,
    }