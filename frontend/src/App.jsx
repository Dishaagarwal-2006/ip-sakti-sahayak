import {Routes, Route} from 'react-router-dom';
import Chat from './pages/Chat.jsx';

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Leaf,
  Menu,
  Scale,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: Scale,
      title: 'Intellectual Property',
      description:
        'Explore patent, trademark, and intellectual property concepts through guided assistance.'
    },
    {
      icon: Leaf,
      title: 'Traditional Knowledge',
      description:
        'Discover information related to Ayurveda and traditional knowledge protection.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Guidance',
      description:
        'Get source-grounded responses with references to relevant authoritative resources.'
    }
  ];

  const workflow = [
    {
      number: '01',
      title: 'Ask',
      description: 'Submit your question in natural language.'
    },
    {
      number: '02',
      title: 'Understand',
      description: 'Identify the topic and relevant context.'
    },
    {
      number: '03',
      title: 'Retrieve',
      description: 'Find relevant information from trusted sources.'
    },
    {
      number: '04',
      title: 'Answer',
      description: 'Receive a clear response with references.'
    }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });

    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#080b0a] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-[-200px] h-[400px] w-[400px] rounded-full bg-yellow-500/5 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/10 bg-[#080b0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <Leaf size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                IP<span className="text-emerald-400">-SAKTI</span>
              </h1>
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Intelligent Knowledge
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <button
              onClick={() => scrollToSection('features')}
              className="transition hover:text-emerald-400"
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection('workflow')}
              className="transition hover:text-emerald-400"
            >
              How It Works
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="transition hover:text-emerald-400"
            >
              About
            </button>
          </div>

          <button
            onClick={() => navigate('/chat')}
            className="hidden items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300 md:flex"
          >
            Ask IP-SAKTI
            <ArrowUpRight size={16} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-5 border-t border-white/10 px-6 py-6 text-white/70 md:hidden">
            <button onClick={() => scrollToSection('features')}>
              Features
            </button>

            <button onClick={() => scrollToSection('workflow')}>
              How It Works
            </button>

            <button onClick={() => scrollToSection('about')}>
              About
            </button>

            <button
              onClick={() => scrollToSection('chat')}
              className="rounded-full bg-emerald-400 px-5 py-3 font-semibold text-black"
            >
              Ask IP-SAKTI
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-10"
      >
        <div className="mb-8 flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs text-emerald-300">
          <Sparkles size={14} />
          AI-POWERED KNOWLEDGE ASSISTANT
          <ChevronDown size={13} />
        </div>

        <h2 className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
          Protect knowledge.
          <br />
          <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 bg-clip-text text-transparent">
            Empower innovation.
          </span>
        </h2>

        <p className="mt-8 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
          Your AI-powered assistant for Ayurveda intellectual property,
          traditional knowledge, and regulatory guidance.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={() => scrollToSection('chat')}
            className="group flex items-center gap-3 rounded-full bg-emerald-400 px-7 py-4 font-semibold text-black transition hover:bg-emerald-300"
          >
            Explore IP-SAKTI
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </button>

          <button
            onClick={() => scrollToSection('workflow')}
            className="rounded-full border border-white/15 px-7 py-4 text-sm text-white/70 transition hover:border-emerald-400/50 hover:text-white"
          >
            Discover how it works
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {[
            'Source-grounded',
            'Multilingual-ready',
            'Knowledge-focused'
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/40"
            >
              <CheckCircle2 size={14} className="text-emerald-400" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10"
      >
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            One platform
          </p>

          <h3 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Knowledge made
            <br />
            easier to navigate.
          </h3>

          <p className="mt-5 leading-7 text-white/50">
            Explore the key areas IP-SAKTI is designed to support.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-emerald-400/[0.04]"
              >
                <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                  <Icon size={24} />
                </div>

                <h4 className="text-xl font-semibold">{feature.title}</h4>

                <p className="mt-4 text-sm leading-7 text-white/45">
                  {feature.description}
                </p>

                <div className="mt-8 text-emerald-400 opacity-0 transition group-hover:opacity-100">
                  <ArrowUpRight size={22} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow */}
      <section
        id="workflow"
        className="relative z-10 border-y border-white/10 bg-white/[0.02] px-6 py-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
              The process
            </p>

            <h3 className="text-4xl font-bold sm:text-5xl">
              From question
              <br />
              to clarity.
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {workflow.map((step, index) => (
              <div key={step.number} className="relative">
                <p className="text-5xl font-bold text-emerald-400/20">
                  {step.number}
                </p>

                <h4 className="mt-5 text-xl font-semibold">{step.title}</h4>

                <p className="mt-3 text-sm leading-7 text-white/45">
                  {step.description}
                </p>

                {index !== workflow.length - 1 && (
                  <div className="absolute right-0 top-7 hidden text-white/20 md:block">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section
        id="about"
        className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10"
      >
        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-transparent p-8 sm:p-14">
          <Globe2 className="mb-8 text-emerald-400" size={40} />

          <h3 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            Making traditional knowledge more accessible.
          </h3>

          <p className="mt-6 max-w-2xl leading-8 text-white/50">
            IP-SAKTI aims to connect innovators, researchers, and practitioners
            with relevant information through an accessible AI-assisted
            workflow.
          </p>

          <button
            onClick={() => scrollToSection('chat')}
            className="mt-10 flex items-center gap-3 rounded-full bg-emerald-400 px-7 py-4 font-semibold text-black transition hover:bg-emerald-300"
          >
            Start exploring
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Chat Placeholder */}
      <section
        id="chat"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-10"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-14">
          <BookOpen className="mx-auto mb-6 text-emerald-400" size={40} />

          <h3 className="text-3xl font-bold">IP-SAKTI Assistant</h3>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-white/50">
            Our interactive AI assistant is coming next. Soon, you'll be able
            to ask questions about Ayurveda IP and regulatory guidance.
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-black/20 p-4 text-left">
            <p className="mb-3 text-xs text-white/40">PREVIEW</p>

            <div className="rounded-xl bg-white/5 p-4 text-sm text-white/50">
              Ask IP-SAKTI a question...
            </div>

            <button
              disabled
              className="mt-3 w-full rounded-xl bg-emerald-400/20 py-3 text-sm text-emerald-300"
            >
              Assistant coming soon
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-white/40 sm:flex-row">
          <p>© 2026 IP-SAKTI · Team Cynbit</p>

          <p>Built for Smart India Hackathon 2026</p>
        </div>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}