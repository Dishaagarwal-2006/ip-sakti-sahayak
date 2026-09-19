from pathlib import Path
import pickle

import faiss
import numpy as np
from pypdf import PdfReader
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import normalize


DATA_DIR = Path("data")
VECTORSTORE_DIR = Path("vectorstore")

VECTORSTORE_DIR.mkdir(exist_ok=True)


def load_pdf_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))
    text = ""

    for page in reader.pages:
        extracted_text = page.extract_text()

        if extracted_text:
            text += extracted_text + "\n"

    return text


def split_text(text: str, chunk_size: int = 800, overlap: int = 100):
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += chunk_size - overlap

    return chunks


def main():
    pdf_files = list(DATA_DIR.glob("*.pdf"))

    if not pdf_files:
        print("No PDF files found in the data folder.")
        return

    all_chunks = []

    for pdf_file in pdf_files:
        print(f"Reading: {pdf_file.name}")

        text = load_pdf_text(pdf_file)
        chunks = split_text(text)

        all_chunks.extend(
            {
                "text": chunk,
                "source": pdf_file.name,
            }
            for chunk in chunks
        )

    print(f"Total chunks created: {len(all_chunks)}")

    texts = [chunk["text"] for chunk in all_chunks]

    print("Creating TF-IDF embeddings...")

    vectorizer = TfidfVectorizer(
        max_features=10000,
        stop_words="english"
    )

    embeddings = vectorizer.fit_transform(texts)
    embeddings = normalize(embeddings).toarray().astype("float32")

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatIP(dimension)
    index.add(embeddings)

    faiss.write_index(
        index,
        str(VECTORSTORE_DIR / "ip_sakti.index")
    )

    with open(VECTORSTORE_DIR / "metadata.pkl", "wb") as file:
        pickle.dump(all_chunks, file)

    with open(VECTORSTORE_DIR / "vectorizer.pkl", "wb") as file:
        pickle.dump(vectorizer, file)

    print("TF-IDF vector database created successfully!")


if __name__ == "__main__":
    main()