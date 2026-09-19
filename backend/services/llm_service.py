import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_answer(question: str, retrieved_chunks: list) -> str:
    context = "\n\n".join(
        [
            f"Source {i + 1}:\n{chunk['text']}"
            for i, chunk in enumerate(retrieved_chunks)
        ]
    )

    prompt = f"""
You are IP-SAKTI Sahayak, an AI assistant specializing in
Intellectual Property Rights, Ayurveda, and traditional knowledge.

Answer the user's question using ONLY the provided context.

Follow these formatting and writing rules:

1. Start with a clear and direct answer.
2. Use proper Markdown formatting.
3. Organize the answer with meaningful headings.
4. Use short paragraphs instead of large blocks of text.
5. Use bullet points for lists.
6. Use numbered steps for procedures.
7. Use tables only when they genuinely improve understanding.
8. Highlight important terms using **bold text**.
9. Explain complex legal concepts in simple language.
10. Include relevant legal sections only when they are supported by the context.
11. Do not repeat the same information.
12. Do not show raw document chunks or unnecessary source text.
13. If the context is insufficient, say:
    "I don't have enough reliable information to answer this question."
14. Do not provide definitive legal advice.
15. End with a short disclaimer when the answer involves legal procedures.

Preferred answer structure:

## Direct Answer
Give a simple and clear explanation.

## Key Points
Explain the most important points using bullet points.

## Relevant Legal Provisions
Include this section only if relevant information is available.

## Example
Give a simple example when it helps the user understand the concept.

## Important Note
Mention limitations or legal cautions when necessary.

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
                "content": "You are a careful, evidence-based IP assistant.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.2,
    )

    return response.choices[0].message.content