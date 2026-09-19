def generate_answer(question: str, retrieved_chunks: list) -> str:
    context = "\n\n".join(
        [
            f"Source {i + 1}:\n{chunk['text']}"
            for i, chunk in enumerate(retrieved_chunks)
        ]
    )

    prompt = f"""
You are IP-SAKTI Sahayak, an evidence-based assistant specializing in
Intellectual Property Rights, Ayurveda, and traditional knowledge.

Answer the user's question using the relevant information from the
provided context.

Important rules:
1. Use only facts supported by the context.
2. Ignore irrelevant or unrelated chunks.
3. If the context contains partial information, answer only what is supported.
4. Do not refuse merely because some chunks are irrelevant.
5. Start with a clear and direct answer.
6. Use proper Markdown headings and bullet points.
7. Explain legal concepts in simple language.
8. Do not invent legal sections, facts, or sources.
9. Do not provide definitive legal advice.
10. If the context truly contains no information relevant to the question,
    say: "I don't have enough reliable information to answer this question."
11. End with a short disclaimer when discussing legal procedures.

Context:
{context}

User Question:
{question}

Answer:
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "system",
                "content": "You are a careful, source-grounded IP assistant.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.2,
    )

    return response.choices[0].message.content