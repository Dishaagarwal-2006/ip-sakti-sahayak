# 🌿 IP-SAKTI Sahayak

### AI-Powered Intellectual Property Assistant for Ayurveda & Traditional Knowledge

IP-SAKTI Sahayak is an AI-powered, RAG-based assistant designed to provide accessible, document-grounded information about Intellectual Property Rights (IPR), particularly in the fields of Ayurveda and traditional knowledge.

It uses official knowledge-base documents to generate clear, structured, and source-based answers.

🌐 Frontend Link

👉 https://ip-sakti-sahayak-smoky.vercel.app/

⚙️ Backend API Link

👉 https://ip-sakti-sahayak-za5c.onrender.com

📚 Backend API Documentation

👉 https://ip-sakti-sahayak-za5c.onrender.com/docs

---

## 🚀 Features

- 🤖 AI-powered question answering
- 📚 Retrieval-Augmented Generation (RAG)
- 🔎 Semantic document search using FAISS
- 🧠 Sentence Transformers for embeddings
- 💬 Interactive React-based chat interface
- ⚡ FastAPI backend
- 📝 Structured Markdown responses
- 📌 Knowledge-base source references
- 🌐 Clean and responsive user interface

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- React Markdown

### Backend
- Python
- FastAPI
- Uvicorn
- Groq API

### AI & Retrieval
- Sentence Transformers
- FAISS
- Retrieval-Augmented Generation (RAG)

---

## 📂 Project Structure

```text
ip-sakti/
│
├── backend/
│   ├── data/
│   │   └── ayush_inventions_guidelines.pdf
│   ├── services/
│   │   ├── ingest.py
│   │   ├── llm_service.py
│   │   ├── retriever.py
│   │   └── test_retriever.py
│   ├── vectorstore/
│   │   ├── ip_sakti.index
│   │   └── metadata.pkl
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Dishaagarwal-2006/ip-sakti-sahayak.git
cd ip-sakti-sahayak
```

### 2. Set up the backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment on Windows:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the backend directory:

```env
GROQ_API_KEY=your_groq_api_key
```

Start the FastAPI server:

```bash
python -m uvicorn main:app
```

The backend will run at:

```text
http://127.0.0.1:8000
```

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

## 🔄 How It Works

```text
User Question
      ↓
React Frontend
      ↓
FastAPI Backend
      ↓
Semantic Search using FAISS
      ↓
Relevant Knowledge-Base Chunks
      ↓
LLM Response Generation
      ↓
Structured Answer with Sources
```

---

## 📚 Current Knowledge Base

The current prototype uses:

- Guidelines for Examination of Ayush Related Inventions – 2025

More official documents can be added to expand the knowledge base.

---

## ⚠️ Disclaimer

IP-SAKTI Sahayak provides document-based information for educational purposes only.

It does not constitute legal advice. Users should consult a qualified intellectual property professional for specific legal matters.

---

## 🔮 Future Improvements

- Multilingual support for English, Hindi, and Sanskrit
- Integration of additional official IPR resources
- Improved source citations
- Voice-based interaction
- Conversation history
- Expanded Ayurveda and traditional knowledge datasets
- Production deployment

---

## 👩‍💻 Developed By

**Disha Agarwal**

Built as a prototype for Smart India Hackathon 2026.

---

## 📄 License

This project is intended for educational and prototype purposes.
