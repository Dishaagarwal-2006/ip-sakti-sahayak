import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ArrowUp,
  Bot,
  CheckCircle2,
  Leaf,
  LoaderCircle,
  Menu,
  Plus,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const suggestions = [
  "What is a patent?",
  "How can I register a trademark in India?",
  "Explain copyright in simple terms.",
  "What is traditional knowledge?",
];

function Chat() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const sendMessage = async (question = input) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://ip-sakti-sahayak-za5c.onrender.com/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: trimmedQuestion,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Backend returned status ${response.status}`
        );
      }

      const data = await response.json();

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          data.answer ||
          "I could not generate an answer from the available documents.",
        sources: data.results || [],
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("API Error:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Sorry, I could not connect to the IP-SAKTI backend. Please make sure the FastAPI server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#071411] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a1b16]/90 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="rounded-full p-2 transition hover:bg-white/10"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-emerald-400/15 p-2 text-emerald-300">
                <Leaf size={22} />
              </div>

              <div>
                <h1 className="text-lg font-semibold tracking-wide">
                  IP-SAKTI Sahayak
                </h1>
                <p className="text-xs text-emerald-300">
                  AI-powered IP assistant
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-white/10 p-2 transition hover:bg-white/10"
              aria-label="Open menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 z-20 w-44 rounded-xl border border-white/10 bg-[#10251e] p-2 shadow-xl">
                <button
                  onClick={clearChat}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-white transition hover:bg-white/10"
                >
                  Clear conversation
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-white transition hover:bg-white/10"
                >
                  Back to home
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="mx-auto flex min-h-[calc(100vh-82px)] max-w-5xl flex-col px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-5 rounded-3xl bg-emerald-400/10 p-5 text-emerald-300">
              <Sparkles size={42} />
            </div>

            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              How can I help you today?
            </h2>

            <p className="mb-8 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
              Ask questions about intellectual property, patents, trademarks,
              copyrights, and traditional knowledge related to Ayurveda.
            </p>

            <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left text-sm text-gray-200 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-6 flex-1 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <Bot size={20} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-emerald-500 text-black"
                      : "border border-white/10 bg-white/[0.04] text-gray-200"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2 text-xs opacity-70">
                    {message.role === "user" ? (
                      <>
                        <User size={14} />
                        You
                      </>
                    ) : (
                      <>
                        <Bot size={14} />
                        IP-SAKTI Assistant
                      </>
                    )}
                  </div>

                  {message.role === "assistant" ? (
                    <div className="markdown-content max-w-none text-sm">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap text-sm leading-6">
                      {message.content}
                    </p>
                  )}

                  {message.sources?.length > 0 && (
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-emerald-300">
                        <CheckCircle2 size={15} />
                        Sources from the knowledge base
                      </div>

                      <div className="space-y-2">
                        {message.sources.map((source, index) => (
                          <div
                            key={`${source.source}-${index}`}
                            className="rounded-lg border border-white/10 bg-black/20 p-3"
                          >
                            <p className="text-sm font-medium text-emerald-300">
                              Source {index + 1}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {source.source || "Knowledge base document"}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-gray-300">
                              {source.text
                                ? `${source.text.slice(0, 250)}${
                                    source.text.length > 250 ? "..." : ""
                                  }`
                                : "Relevant document content"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-black">
                    <User size={20} />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                  <Bot size={20} />
                </div>

                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" size={18} />
                  Searching the knowledge base...
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input Area */}
        <div className="sticky bottom-0 mt-6">
          <div className="rounded-2xl border border-white/10 bg-[#10251e] p-3 shadow-2xl">
            <div className="flex items-end gap-3">
              <button
                onClick={clearChat}
                className="rounded-xl p-3 text-gray-400 transition hover:bg-white/10 hover:text-white"
                aria-label="New chat"
              >
                <Plus size={20} />
              </button>

              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask IP-SAKTI in ${language}...`}
                rows={1}
                className="max-h-32 min-h-12 flex-1 resize-none bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-gray-500"
              />

              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="rounded-xl bg-emerald-400 p-3 text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <ArrowUp size={20} />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
              <p className="text-xs text-gray-500">
                Press Enter to send
              </p>

              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="rounded-lg border border-white/10 bg-[#10251e] px-2 py-1 text-xs text-gray-300 outline-none"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Sanskrit">Sanskrit</option>
              </select>
            </div>
          </div>

          <p className="mt-3 text-center text-xs leading-5 text-gray-600">
            IP-SAKTI Sahayak provides document-based information for
            educational purposes only. It does not constitute legal advice.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Chat;