from retriever import retrieve_relevant_chunks

results = retrieve_relevant_chunks(
    "What are Ayush related inventions?"
)

for i, result in enumerate(results, 1):
    print(f"\n--- Result {i} ---")
    print("Source:", result["source"])
    print("Score:", result["score"])
    print(result["text"][:500])
