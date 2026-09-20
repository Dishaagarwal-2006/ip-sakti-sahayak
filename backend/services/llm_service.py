import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is missing from the environment variables")

client = Groq(api_key=api_key)


def generate_answer(question, results):
    context = "\n\n".join(
        [result["text"] for result in results]
    )

    prompt = f"""
You are IP-SAKTI Sahayak, an AI assistant for intellectual property
and Ayurveda-related regulatory guidance.

Answer the user's question using only the provided context.

If the answer is not available in the context, clearly say that
the information is not available in the provided sources.

User question:
{question}

Context:
{context}

Provide a clear, accurate, and easy-to-understand answer.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful intellectual property assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content