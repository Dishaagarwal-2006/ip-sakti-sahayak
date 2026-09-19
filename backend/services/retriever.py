from pathlib import Path
import pickle

import faiss
from sentence_transformers import SentenceTransformer


VECTORSTORE_DIR = Path("vectorstore")

model = SentenceTransformer("all-MiniLM-L6-v2")

index = faiss.read_index(
    str(VECTORSTORE_DIR / "ip_sakti.index")
)

with open(VECTORSTORE_DIR / "metadata.pkl", "rb") as file:
    metadata = pickle.load(file)


def retrieve_relevant_chunks(query: str, top_k: int = 3):
    query_embedding = model.encode(
        [query],
        normalize_embeddings=True,
    )

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