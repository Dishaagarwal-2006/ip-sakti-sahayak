from pathlib import Path
import pickle

import faiss
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import normalize


VECTORSTORE_DIR = Path("vectorstore")

# Load the FAISS index
index = faiss.read_index(
    str(VECTORSTORE_DIR / "ip_sakti.index")
)

# Load metadata
with open(VECTORSTORE_DIR / "metadata.pkl", "rb") as file:
    metadata = pickle.load(file)

# Load the TF-IDF vectorizer
with open(VECTORSTORE_DIR / "vectorizer.pkl", "rb") as file:
    vectorizer = pickle.load(file)


def retrieve_relevant_chunks(query: str, top_k: int = 3):
    # Convert the query into a TF-IDF vector
    query_embedding = vectorizer.transform([query])

    # Normalize and convert to float32
    query_embedding = normalize(query_embedding).toarray().astype("float32")

    # Search the FAISS index
    scores, indices = index.search(query_embedding, top_k)

    results = []

    for score, index_id in zip(scores[0], indices[0]):
        if index_id == -1:
            continue

        results.append(
            {
                "text": metadata[index_id]["text"],
                "source": metadata[index_id]["source"],
                "score": float(score),
            }
        )

    return results