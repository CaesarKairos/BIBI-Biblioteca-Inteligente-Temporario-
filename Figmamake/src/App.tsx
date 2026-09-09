import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen =
  | "landing"
  | "login"
  | "lib-dashboard"
  | "lib-acervo"
  | "lib-book-detail"
  | "lib-emprestimos"
  | "lib-agenda"
  | "lib-leitores"
  | "lib-moderacao"
  | "lib-config"
  | "stu-acervo"
  | "stu-book-detail"
  | "stu-emprestimos"
  | "stu-reservas"
  | "stu-historico"
  | "stu-agenda"
  | "stu-perfil";

type Role = "bibliotecaria" | "aluno" | null;

// ─── Data ─────────────────────────────────────────────────────────────────────
const CAROUSEL_IMAGES = [
  { src: "https://images.unsplash.com/photo-1568667256549-094345857637?w=480&h=720&fit=crop&auto=format", alt: "Estante de livros de madeira" },
  { src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=480&h=720&fit=crop&auto=format", alt: "Biblioteca iluminada" },
  { src: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=480&h=720&fit=crop&auto=format", alt: "Livro aberto flutuando" },
  { src: "https://images.unsplash.com/photo-1699443817739-cf2f7cbcd18d?w=480&h=720&fit=crop&auto=format", alt: "Estante junto à janela" },
  { src: "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=480&h=720&fit=crop&auto=format", alt: "Livros em prateleira de madeira" },
];

const BOOKS = [
  { id: 1, title: "O Alquimista", author: "Paulo Coelho", category: "Ficção", isbn: "978-0-06-231609-7", year: 1988, available: 3, total: 4, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=180&fit=crop&auto=format", synopsis: "A história de Santiago, um pastor andaluz que viaja em busca de um tesouro.", themes: ["Autoconhecimento", "Destino", "Viagem"] },
  { id: 2, title: "Dom Casmurro", author: "Machado de Assis", category: "Literatura Brasileira", isbn: "978-85-359-0277-0", year: 1899, available: 2, total: 3, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&h=180&fit=crop&auto=format", synopsis: "Narrado pelo protagonista Bentinho, que conta sua história de amor e ciúme.", themes: ["Ciúme", "Memória", "Amor"] },
  { id: 3, title: "1984", author: "George Orwell", category: "Distopia", isbn: "978-0-452-28423-4", year: 1949, available: 0, total: 2, cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=120&h=180&fit=crop&auto=format", synopsis: "Uma sociedade totalitária onde o Grande Irmão controla tudo.", themes: ["Política", "Liberdade", "Vigilância"] },
  { id: 4, title: "A Moreninha", author: "Joaquim Manuel de Macedo", category: "Literatura Brasileira", isbn: "978-85-260-1008-5", year: 1844, available: 1, total: 1, cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=120&h=180&fit=crop&auto=format", synopsis: "Primeiro romance brasileiro, narra o amor de Carolina e Augusto.", themes: ["Amor", "Romantismo"] },
  { id: 5, title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", category: "Fantasia", isbn: "978-0-439-70818-8", year: 1997, available: 4, total: 5, cover: "https://images.unsplash.com/photo-1601850494422-3cf05e4b0bf3?w=120&h=180&fit=crop&auto=format", synopsis: "Um jovem bruxo descobre seu destino ao entrar para a escola Hogwarts.", themes: ["Magia", "Amizade", "Aventura"] },
  { id: 6, title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", category: "Infantojuvenil", isbn: "978-85-325-2735-3", year: 1943, available: 5, total: 6, cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=180&fit=crop&auto=format", synopsis: "Um príncipe viajante que descobre o essencial da vida.", themes: ["Infância", "Amizade", "Amor"] },
];

const LOANS = [
  { id: 1, reader: "Ana Souza", book: "O Alquimista", borrowed: "2026-08-20", due: "2026-09-03", status: "Atrasado", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=ana&backgroundColor=ffd5dc" },
  { id: 2, reader: "Carlos Lima", book: "Harry Potter e a Pedra Filosofal", borrowed: "2026-09-01", due: "2026-09-15", status: "Ativo", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=carlos&backgroundColor=d1fae5" },
  { id: 3, reader: "Mariana Rocha", book: "1984", borrowed: "2026-08-15", due: "2026-08-29", status: "Devolvido", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=mariana&backgroundColor=dbeafe" },
  { id: 4, reader: "João Pedro", book: "Dom Casmurro", borrowed: "2026-09-05", due: "2026-09-19", status: "Ativo", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=joao&backgroundColor=fef3c7" },
  { id: 5, reader: "Beatriz Santos", book: "O Pequeno Príncipe", borrowed: "2026-08-28", due: "2026-09-11", status: "Devolução Hoje", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=beatriz&backgroundColor=ede9fe" },
];

const COMMENTS = [
  { id: 1, student: "Felipe Andrade", book: "1984", text: "Esse livro é incrível! Mudou minha visão de mundo completamente.", flagged: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=felipe&backgroundColor=fecaca" },
  { id: 2, student: "Larissa Costa", book: "Harry Potter", text: "Amei demais! Quero ler todos da série.", flagged: true, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=larissa&backgroundColor=d1fae5" },
];

const READERS = [
  { id: 1, name: "Ana Souza", type: "Estudante", sala: "9A", periodo: "Manhã", tel: "(11) 99999-0001", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=ana" },
  { id: 2, name: "Carlos Lima", type: "Estudante", sala: "8B", periodo: "Tarde", tel: "(11) 99999-0002", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=carlos" },
  { id: 3, name: "Prof. Mariana", type: "Professor", materia: "Português", tel: "(11) 99999-0003", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=prof-mariana" },
  { id: 4, name: "João Pedro", type: "Estudante", sala: "7C", periodo: "Manhã", tel: "(11) 99999-0004", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=joao" },
];

const AGENDA_SLOTS = [
  { day: "Seg", periodo: "Manhã", professor: "Prof. Mariana", materia: "Português", turma: "9A", uso: "Leitura livre" },
  { day: "Ter", periodo: "Tarde", professor: "Prof. Ricardo", materia: "História", turma: "8B", uso: "Pesquisa" },
  { day: "Qui", periodo: "Manhã", professor: "Prof. Camila", materia: "Ciências", turma: "7C", uso: "Projeto" },
];

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex"];
const PERIODOS = ["Manhã", "Tarde", "Noite"];

const CATEGORIES = ["Literatura Brasileira", "Ficção", "Distopia", "Fantasia", "Infantojuvenil"];

// ─── Shared Components ────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Ativo: "bg-[#d4edda] text-[#2e7d32]",
    Atrasado: "bg-[#fce4e4] text-[#a52a2a]",
    Devolvido: "bg-[#e8e8e8] text-[#555]",
    "Devolução Hoje": "bg-[#fff3cd] text-[#7a5c00]",
    Pendente: "bg-[#fff3cd] text-[#7a5c00]",
    Aprovado: "bg-[#d4edda] text-[#2e7d32]",
    Disponível: "bg-[#d4edda] text-[#2e7d32]",
    Indisponível: "bg-[#fce4e4] text-[#a52a2a]",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[status] ?? "bg-[var(--muted)] text-[var(--muted-foreground)]"}`}>
      {status}
    </span>
  );
}

function BookCard({ book, onClick }: { book: (typeof BOOKS)[0]; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-36 cursor-pointer group"
    >
      <div className="relative rounded-2xl overflow-hidden bg-[var(--muted)] mb-2 shadow-sm transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-md" style={{ height: 200 }}>
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 right-2">
          <StatusBadge status={book.available > 0 ? "Disponível" : "Indisponível"} />
        </div>
      </div>
      <p className="text-sm font-bold text-[var(--foreground)] leading-tight truncate">{book.title}</p>
      <p className="text-xs text-[var(--muted-foreground)] truncate">{book.author}</p>
    </div>
  );
}

function Modal({ title, onClose, children, footer }: { title: string; onClose: () => void; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[var(--card)] rounded-3xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[var(--border)]">
          <h2 className="font-bold text-lg text-[var(--foreground)]">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors">✕</button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="px-6 pb-6 pt-2 flex gap-3 justify-end border-t border-[var(--border)]">{footer}</div>}
      </div>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-1 block">{label}</span>
      <input {...props} className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] placeholder:text-[var(--muted-foreground)] transition" />
    </label>
  );
}

function Btn({ variant = "primary", children, className = "", ...props }: { variant?: "primary" | "secondary" | "danger"; children: React.ReactNode; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const v = {
    primary: "bg-[var(--primary)] text-white hover:brightness-95",
    secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--sand)]",
    danger: "bg-[#a52a2a] text-white hover:brightness-95",
  };
  return (
    <button {...props} className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${v[variant]} ${className}`}>
      {children}
    </button>
  );
}

// ─── Arch Window ──────────────────────────────────────────────────────────────
function ArchCarousel() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % CAROUSEL_IMAGES.length);
        setFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="arch-frame relative bg-[var(--muted)] shadow-2xl"
      style={{ width: 300, height: 480, flexShrink: 0 }}
    >
      {CAROUSEL_IMAGES.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === idx && fade ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
    </div>
  );
}

function ArchAvatar({ seed, size = 80 }: { seed: string; size?: number }) {
  return (
    <div
      className="overflow-hidden bg-[var(--cream)] flex-shrink-0"
      style={{ width: size, height: size * 1.3, borderRadius: `${size}px ${size}px ${size / 6}px ${size / 6}px` }}
    >
      <img
        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=fef3c7`}
        alt="avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  role,
  screen,
  setScreen,
  onLogout,
}: {
  role: Role;
  screen: Screen;
  setScreen: (s: Screen) => void;
  onLogout: () => void;
}) {
  const libItems: { label: string; icon: string; screen: Screen }[] = [
    { label: "Dashboard", icon: "⬛", screen: "lib-dashboard" },
    { label: "Acervo", icon: "📚", screen: "lib-acervo" },
    { label: "Empréstimos", icon: "🔄", screen: "lib-emprestimos" },
    { label: "Agenda", icon: "📅", screen: "lib-agenda" },
    { label: "Leitores", icon: "👥", screen: "lib-leitores" },
    { label: "Moderação", icon: "🛡️", screen: "lib-moderacao" },
    { label: "Configurações", icon: "⚙️", screen: "lib-config" },
  ];
  const stuItems: { label: string; icon: string; screen: Screen }[] = [
    { label: "Acervo", icon: "📚", screen: "stu-acervo" },
    { label: "Meus Empréstimos", icon: "🔄", screen: "stu-emprestimos" },
    { label: "Minhas Reservas", icon: "🔖", screen: "stu-reservas" },
    { label: "Meu Histórico", icon: "📖", screen: "stu-historico" },
    { label: "Agenda", icon: "📅", screen: "stu-agenda" },
    { label: "Meu Perfil", icon: "🧑", screen: "stu-perfil" },
  ];
  const items = role === "bibliotecaria" ? libItems : stuItems;

  return (
    <aside
      className="flex flex-col bg-[var(--card)] border-r border-[var(--border)] h-full"
      style={{ width: 260, minWidth: 260 }}
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm select-none">B</div>
          <div>
            <p className="font-extrabold text-[var(--foreground)] text-base leading-none">BIBI</p>
            <p className="font-serif italic text-xs text-[var(--muted-foreground)] leading-none mt-0.5">Biblioteca Inteligente</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 sidebar-scroll px-3 space-y-0.5">
        {items.map(item => (
          <button
            key={item.screen}
            onClick={() => setScreen(item.screen)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
              screen === item.screen
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--foreground)] hover:bg-[var(--muted)]"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-5 border-t border-[var(--border)]">
        <div className="flex items-center gap-3">
          <ArchAvatar seed={role === "bibliotecaria" ? "librarian" : "student"} size={36} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[var(--foreground)] truncate">
              {role === "bibliotecaria" ? "Dra. Helena" : "Ana Souza"}
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              {role === "bibliotecaria" ? "Bibliotecária" : "Aluna · 9A"}
            </p>
          </div>
          <button onClick={onLogout} title="Sair" className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors text-sm">
            ↩
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── Landing ──────────────────────────────────────────────────────────────────
function LandingScreen({ setScreen, tab, setTab }: { setScreen: (s: Screen) => void; tab: "home" | "sobre"; setTab: (t: "home" | "sobre") => void }) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Top nav */}
      <header className="px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm">B</div>
          <span className="font-extrabold text-xl text-[var(--foreground)]">BIBI</span>
        </div>
        <nav className="flex items-center gap-1">
          {(["home", "sobre"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${tab === t ? "bg-[var(--primary)] text-white" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"}`}
            >
              {t === "home" ? "Início" : "Sobre nós"}
            </button>
          ))}
        </nav>
      </header>

      {tab === "home" ? (
        <main className="flex-1 flex items-center justify-center px-16 py-12 gap-20">
          {/* Left */}
          <div className="max-w-lg space-y-7">
            <div>
              <p className="font-serif italic text-lg text-[var(--primary)] mb-2">Biblioteca Inteligente</p>
              <h1 className="font-serif font-bold text-6xl text-[var(--foreground)] leading-tight">
                BIBI
              </h1>
              <p className="mt-4 text-[var(--muted-foreground)] text-lg leading-relaxed">
                "Um bom livro é sempre um amigo — e a BIBI cuida dessa amizade com carinho e tecnologia."
              </p>
            </div>
            <Btn variant="primary" className="text-base px-8 py-3 rounded-2xl" onClick={() => setScreen("login")}>
              Entrar no Sistema →
            </Btn>
          </div>
          {/* Right — arch carousel */}
          <ArchCarousel />
        </main>
      ) : (
        <main className="flex-1 max-w-2xl mx-auto px-8 py-12">
          <h2 className="font-serif font-bold text-5xl text-[var(--foreground)] mb-8 text-center">Sobre nós</h2>
          <div className="prose text-[var(--foreground)] space-y-4 text-justify text-base leading-relaxed">
            <p>A BIBI — Biblioteca Inteligente — nasceu da necessidade de modernizar a gestão das bibliotecas escolares, tornando o acesso ao conhecimento mais eficiente, agradável e inclusivo. Desenvolvida com carinho por educadores e desenvolvedores apaixonados pela leitura.</p>
            <p>Nossa missão é conectar alunos e professores ao mundo da leitura de forma simples, intuitiva e bela. Acreditamos que uma boa ferramenta de gestão pode transformar o ambiente da biblioteca em um espaço verdadeiramente vivo.</p>
            <p>A plataforma oferece controle completo do acervo, gestão de empréstimos e reservas, agenda de uso do espaço e, em breve, funcionalidades de inteligência artificial para recomendações personalizadas.</p>
          </div>
          <div className="flex justify-center gap-6 mt-12 text-[var(--muted-foreground)]">
            <a href="#" className="hover:text-[var(--primary)] transition-colors text-sm font-semibold">Instagram</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors text-sm font-semibold">LinkedIn</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors text-sm font-semibold">GitHub</a>
          </div>
        </main>
      )}
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ setRole, setScreen }: { setRole: (r: Role) => void; setScreen: (s: Screen) => void }) {
  const [tab, setTab] = useState<"bibliotecaria" | "aluno">("bibliotecaria");

  function handleLogin() {
    setRole(tab);
    setScreen(tab === "bibliotecaria" ? "lib-dashboard" : "stu-acervo");
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="flex items-center gap-16">
        {/* Small arch decoration */}
        <div
          className="arch-frame bg-[var(--muted)] shadow-xl hidden lg:block"
          style={{ width: 120, height: 200 }}
        >
          <img
            src="https://images.unsplash.com/photo-1568667256549-094345857637?w=240&h=400&fit=crop&auto=format"
            alt="Biblioteca"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card */}
        <div className="bg-[var(--card)] rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-[var(--border)]">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">B</div>
            <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">BIBI</h1>
            <p className="font-serif italic text-sm text-[var(--muted-foreground)] mt-1">Biblioteca Inteligente</p>
          </div>

          {/* Role tabs */}
          <div className="flex rounded-xl bg-[var(--muted)] p-1 mb-6">
            {(["bibliotecaria", "aluno"] as const).map(r => (
              <button
                key={r}
                onClick={() => setTab(r)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === r ? "bg-white shadow text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`}
              >
                {r === "bibliotecaria" ? "Bibliotecária" : "Aluno"}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {tab === "bibliotecaria" ? (
              <>
                <Input label="E-mail" type="email" placeholder="bibliotecaria@escola.edu.br" />
                <Input label="Senha" type="password" placeholder="••••••••" />
              </>
            ) : (
              <>
                <Input label="Matrícula" type="text" placeholder="2024001" />
                <Input label="Senha" type="password" placeholder="••••••••" />
              </>
            )}
            <Btn variant="primary" className="w-full py-3 text-base rounded-xl mt-2" onClick={handleLogin}>
              Entrar
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Lib: Dashboard ───────────────────────────────────────────────────────────
function LibDashboard({ setScreen }: { setScreen: (s: Screen) => void }) {
  const kpis = [
    { label: "Total de Títulos", value: "312", icon: "📚" },
    { label: "Total de Exemplares", value: "748", icon: "📦" },
    { label: "Empréstimos Ativos", value: "43", icon: "🔄" },
    { label: "Itens Atrasados", value: "7", icon: "⚠️", alert: true },
    { label: "Devoluções Hoje", value: "5", icon: "📬" },
    { label: "Na Agenda", value: "3", icon: "📅" },
    { label: "Leitores", value: "189", icon: "👥" },
  ];

  const generos = [
    { name: "Literatura Brasileira", value: 82 },
    { name: "Ficção", value: 67 },
    { name: "Fantasia", value: 54 },
    { name: "Distopia", value: 38 },
    { name: "Infantojuvenil", value: 71 },
  ];
  const max = Math.max(...generos.map(g => g.value));

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Dashboard</h1>
        <p className="text-[var(--muted-foreground)] mt-1">Bom dia, Dra. Helena! Aqui está um resumo do acervo.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map(k => (
          <div
            key={k.label}
            className={`rounded-2xl p-5 border border-[var(--border)] ${k.alert ? "bg-[#fce4e4]" : "bg-[var(--card)]"}`}
          >
            <p className="text-2xl mb-2">{k.icon}</p>
            <p className={`text-3xl font-extrabold ${k.alert ? "text-[#a52a2a]" : "text-[var(--foreground)]"}`}>{k.value}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1 font-semibold">{k.label}</p>
          </div>
        ))}

        {/* AI Insights spanning */}
        <div className="col-span-1 rounded-2xl border-2 border-[var(--primary)] bg-gradient-to-br from-[#fdf5ed] to-[#f5ede0] p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">✨</span>
            <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">BIBI AI Insights</p>
          </div>
          <p className="text-sm text-[var(--foreground)] leading-relaxed">
            <strong>Tendência:</strong> Livros de Fantasia cresceram 18% neste mês. Considere organizar um <em>Clube de Leitura Fantástica</em> para o próximo semestre.
          </p>
          <p className="text-xs text-[var(--muted-foreground)] mt-3">
            7 livros estão sem empréstimo há mais de 6 meses — considere uma exposição temática.
          </p>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Genre chart */}
        <div className="col-span-1 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6">
          <h3 className="font-bold text-sm text-[var(--foreground)] mb-4">Livros por Gênero</h3>
          <div className="space-y-3">
            {generos.map(g => (
              <div key={g.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--muted-foreground)]">{g.name}</span>
                  <span className="font-semibold text-[var(--foreground)]">{g.value}</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--muted)]">
                  <div
                    className="h-2 rounded-full bg-[var(--primary)] transition-all"
                    style={{ width: `${(g.value / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top borrowed */}
        <div className="col-span-1 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6">
          <h3 className="font-bold text-sm text-[var(--foreground)] mb-4">Mais Emprestados</h3>
          <ol className="space-y-3">
            {BOOKS.slice(0, 5).map((b, i) => (
              <li key={b.id} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[var(--muted)] text-xs font-bold flex items-center justify-center text-[var(--muted-foreground)] flex-shrink-0">{i + 1}</span>
                <img src={b.cover} alt={b.title} className="w-8 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate text-[var(--foreground)]">{b.title}</p>
                  <p className="text-xs text-[var(--muted-foreground)] truncate">{b.author}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Reader ranking */}
        <div className="col-span-1 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6">
          <h3 className="font-bold text-sm text-[var(--foreground)] mb-4">Ranking de Leitores · Trimestre</h3>
          <ol className="space-y-3">
            {READERS.slice(0, 4).map((r, i) => (
              <li key={r.id} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ background: ["#f5c842","#c0c0c0","#cd7f32","#eee"][i], color: i < 3 ? "#333" : "#888" }}>{i + 1}</span>
                <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full bg-[var(--muted)] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate text-[var(--foreground)]">{r.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{[12, 9, 8, 7][i]} livros</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Loans table */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)]">
          <h3 className="font-bold text-sm text-[var(--foreground)]">Empréstimos Recentes</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--muted)] text-[var(--muted-foreground)] text-xs uppercase tracking-wide">
              <th className="text-left px-6 py-3 font-semibold">Leitor</th>
              <th className="text-left px-4 py-3 font-semibold">Livro</th>
              <th className="text-left px-4 py-3 font-semibold">Vencimento</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {LOANS.slice(0, 4).map(l => (
              <tr key={l.id} className="hover:bg-[var(--muted)] transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <img src={l.avatar} className="w-7 h-7 rounded-full bg-[var(--muted)]" alt={l.reader} />
                    <span className="font-semibold text-[var(--foreground)]">{l.reader}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--muted-foreground)]">{l.book}</td>
                <td className="px-4 py-3 text-[var(--muted-foreground)]">{l.due}</td>
                <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Lib: Acervo ──────────────────────────────────────────────────────────────
function LibAcervo({ setScreen, setSelectedBook }: { setScreen: (s: Screen) => void; setSelectedBook: (b: (typeof BOOKS)[0]) => void }) {
  const [search, setSearch] = useState("");
  const [showIsbnModal, setShowIsbnModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [isbn, setIsbn] = useState("");

  const filtered = search ? BOOKS.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())) : BOOKS;

  function handleIsbnSearch() {
    setShowIsbnModal(false);
    setShowManualModal(true);
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Acervo</h1>
          <p className="text-[var(--muted-foreground)] mt-1">{BOOKS.length} títulos cadastrados</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar título, autor..."
            className="px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] placeholder:text-[var(--muted-foreground)]"
          />
          <Btn variant="primary" onClick={() => setShowIsbnModal(true)}>+ Adicionar Livro</Btn>
        </div>
      </div>

      {/* AI recommendation */}
      <div className="rounded-2xl border-2 border-[var(--primary)] bg-gradient-to-r from-[#fdf5ed] to-[#f8eedf] p-6">
        <div className="flex items-center gap-2 mb-3">
          <span>✨</span>
          <h2 className="font-bold text-sm text-[var(--primary)] uppercase tracking-wider">Recomendação da Assistente Virtual BIBI</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {BOOKS.slice(0, 3).map(b => (
            <BookCard key={b.id} book={b} onClick={() => { setSelectedBook(b); setScreen("lib-book-detail"); }} />
          ))}
        </div>
      </div>

      {/* Category shelves */}
      {CATEGORIES.map(cat => {
        const catBooks = filtered.filter(b => b.category === cat);
        if (catBooks.length === 0) return null;
        return (
          <div key={cat}>
            <h2 className="font-bold text-base text-[var(--foreground)] mb-4">{cat}</h2>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {catBooks.map(b => (
                <BookCard key={b.id} book={b} onClick={() => { setSelectedBook(b); setScreen("lib-book-detail"); }} />
              ))}
            </div>
          </div>
        );
      })}

      {/* ISBN Modal */}
      {showIsbnModal && (
        <Modal title="Adicionar por ISBN" onClose={() => setShowIsbnModal(false)}
          footer={<>
            <Btn variant="secondary" onClick={() => setShowIsbnModal(false)}>Cancelar</Btn>
            <Btn variant="primary" onClick={handleIsbnSearch}>Buscar</Btn>
          </>}
        >
          <Input label="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="978-0-000-00000-0" />
          <p className="text-xs text-[var(--muted-foreground)] mt-2">Se não encontrado, abrirá cadastro manual.</p>
        </Modal>
      )}

      {/* Manual Modal */}
      {showManualModal && (
        <Modal title="Cadastro Manual" onClose={() => setShowManualModal(false)}
          footer={<>
            <Btn variant="secondary" onClick={() => setShowManualModal(false)}>Cancelar</Btn>
            <Btn variant="primary" onClick={() => setShowManualModal(false)}>Salvar</Btn>
          </>}
        >
          <div className="space-y-3">
            <Input label="ISBN" defaultValue={isbn} placeholder="978-0-000-00000-0" />
            <Input label="Título" placeholder="Nome do livro" />
            <Input label="Autor" placeholder="Nome do autor" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Ano" type="number" placeholder="2024" />
              <Input label="Categoria" placeholder="Ficção" />
            </div>
            <Input label="Localização na Estante" placeholder="Seção A, Prateleira 3" />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Lib: Book Detail ─────────────────────────────────────────────────────────
function LibBookDetail({ book, setScreen }: { book: (typeof BOOKS)[0]; setScreen: (s: Screen) => void }) {
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="p-8">
      <button onClick={() => setScreen("lib-acervo")} className="text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-6 flex items-center gap-1 transition-colors">
        ← Voltar ao Acervo
      </button>

      <div className="flex gap-10">
        {/* Cover in arch frame */}
        <div className="flex-shrink-0">
          <div
            className="arch-frame bg-[var(--muted)] shadow-2xl"
            style={{ width: 200, height: 310 }}
          >
            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-5">
          <div>
            <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider bg-[var(--muted)] px-3 py-1 rounded-full">{book.category}</span>
            <h1 className="font-serif font-bold text-4xl text-[var(--foreground)] mt-3 leading-tight">{book.title}</h1>
            <p className="text-lg text-[var(--muted-foreground)] mt-1">{book.author} · {book.year}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Btn variant="secondary" onClick={() => setShowEditModal(true)}>✏️ Editar</Btn>
            <Btn variant="danger" onClick={() => setShowDeleteModal(true)}>🗑️ Excluir</Btn>
            <Btn variant="primary" onClick={() => setShowLoanModal(true)}>🔄 Emprestar</Btn>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-[var(--muted)] rounded-xl p-4">
              <p className="text-xs text-[var(--muted-foreground)] mb-1">ISBN</p>
              <p className="font-semibold">{book.isbn}</p>
            </div>
            <div className="bg-[var(--muted)] rounded-xl p-4">
              <p className="text-xs text-[var(--muted-foreground)] mb-1">Exemplares</p>
              <p className="font-semibold">{book.available} disponíveis / {book.total} total</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Sinopse</p>
            <p className="text-sm text-[var(--foreground)] leading-relaxed">{book.synopsis}</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {book.themes.map(t => (
              <span key={t} className="text-xs bg-[var(--secondary)] text-[var(--secondary-foreground)] px-3 py-1 rounded-full font-semibold">{t}</span>
            ))}
          </div>

          {/* Student comments */}
          <div>
            <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Avaliações dos Alunos</p>
            <div className="space-y-2">
              {COMMENTS.map(c => (
                <div key={c.id} className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)]">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={c.avatar} className="w-6 h-6 rounded-full bg-[var(--muted)]" alt={c.student} />
                    <span className="text-xs font-semibold">{c.student}</span>
                    <span className="text-yellow-500 text-xs">★★★★★</span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLoanModal && (
        <Modal title="Emprestar Livro" onClose={() => setShowLoanModal(false)}
          footer={<>
            <Btn variant="secondary" onClick={() => setShowLoanModal(false)}>Cancelar</Btn>
            <Btn variant="primary" onClick={() => setShowLoanModal(false)}>Confirmar Empréstimo</Btn>
          </>}
        >
          <div className="space-y-3">
            <Input label="Buscar Leitor" placeholder="Nome ou matrícula..." />
            <div className="space-y-2 mt-2">
              {READERS.slice(0, 3).map(r => (
                <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] cursor-pointer transition-colors">
                  <img src={r.avatar} className="w-8 h-8 rounded-full bg-[var(--muted)]" alt={r.name} />
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{r.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal title="Excluir Livro" onClose={() => setShowDeleteModal(false)}
          footer={<>
            <Btn variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Btn>
            <Btn variant="danger" onClick={() => setShowDeleteModal(false)}>Excluir Definitivamente</Btn>
          </>}
        >
          <p className="text-sm text-[var(--foreground)]">Tem certeza que deseja excluir <strong>{book.title}</strong>? Esta ação não pode ser desfeita.</p>
        </Modal>
      )}

      {showEditModal && (
        <Modal title="Editar Livro" onClose={() => setShowEditModal(false)}
          footer={<>
            <Btn variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Btn>
            <Btn variant="primary" onClick={() => setShowEditModal(false)}>Salvar Alterações</Btn>
          </>}
        >
          <div className="space-y-3">
            <Input label="Título" defaultValue={book.title} />
            <Input label="Autor" defaultValue={book.author} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Ano" type="number" defaultValue={String(book.year)} />
              <Input label="Categoria" defaultValue={book.category} />
            </div>
            <Input label="ISBN" defaultValue={book.isbn} />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Lib: Empréstimos ─────────────────────────────────────────────────────────
function LibEmprestimos() {
  const [filter, setFilter] = useState("Todos");
  const filters = ["Todos", "Ativos", "Atrasados", "Devolução Hoje", "Devolvidos"];

  const filtered = filter === "Todos" ? LOANS : LOANS.filter(l => l.status === filter || (filter === "Ativos" && l.status === "Ativo"));

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Empréstimos</h1>
        <p className="text-[var(--muted-foreground)] mt-1">{LOANS.length} empréstimos no total</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${filter === f ? "bg-[var(--primary)] text-white" : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--muted)] text-[var(--muted-foreground)] text-xs uppercase tracking-wide">
              <th className="text-left px-6 py-3 font-semibold">Leitor</th>
              <th className="text-left px-4 py-3 font-semibold">Livro</th>
              <th className="text-left px-4 py-3 font-semibold">Empréstimo</th>
              <th className="text-left px-4 py-3 font-semibold">Vencimento</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-left px-4 py-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map(l => (
              <tr key={l.id} className="hover:bg-[var(--muted)] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={l.avatar} className="w-8 h-8 rounded-full bg-[var(--muted)]" alt={l.reader} />
                    <span className="font-semibold text-[var(--foreground)]">{l.reader}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-[var(--muted-foreground)]">{l.book}</td>
                <td className="px-4 py-4 text-[var(--muted-foreground)]">{l.borrowed}</td>
                <td className="px-4 py-4 text-[var(--muted-foreground)]">{l.due}</td>
                <td className="px-4 py-4"><StatusBadge status={l.status} /></td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    {(l.status === "Ativo" || l.status === "Atrasado" || l.status === "Devolução Hoje") && (
                      <>
                        <button className="text-xs text-[var(--primary)] font-semibold hover:underline">Renovar</button>
                        <button className="text-xs text-[#7D9B5E] font-semibold hover:underline">Devolver</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Lib: Agenda ──────────────────────────────────────────────────────────────
function LibAgenda() {
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; periodo: string } | null>(null);
  const [filledSlot, setFilledSlot] = useState<(typeof AGENDA_SLOTS)[0] | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [showFilled, setShowFilled] = useState(false);

  function getSlot(day: string, periodo: string) {
    return AGENDA_SLOTS.find(s => s.day === day && s.periodo === periodo);
  }

  return (
    <div className="p-8 flex gap-6">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Agenda</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Semana de 07–11 set 2026</p>
        </div>

        {/* Grid */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)]">
                <th className="text-left px-4 py-3 text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide w-24">Período</th>
                {DAYS.map(d => (
                  <th key={d} className="px-4 py-3 text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {PERIODOS.map(p => (
                <tr key={p} className="divide-x divide-[var(--border)]">
                  <td className="px-4 py-4 text-xs font-bold text-[var(--muted-foreground)] uppercase bg-[var(--muted)]">{p}</td>
                  {DAYS.map(d => {
                    const slot = getSlot(d, p);
                    return (
                      <td key={d} className="px-3 py-3 text-center" style={{ minWidth: 130 }}>
                        {slot ? (
                          <button
                            onClick={() => { setFilledSlot(slot); setShowFilled(true); }}
                            className="w-full text-left rounded-xl bg-[var(--secondary)] border border-[var(--primary)] px-3 py-2 hover:brightness-95 transition"
                          >
                            <p className="text-xs font-bold text-[var(--foreground)] truncate">{slot.materia}</p>
                            <p className="text-xs text-[var(--muted-foreground)] truncate">{slot.turma}</p>
                          </button>
                        ) : (
                          <button
                            onClick={() => { setSelectedSlot({ day: d, periodo: p }); setShowNew(true); }}
                            className="w-full h-12 rounded-xl border-2 border-dashed border-[var(--border)] text-[var(--muted-foreground)] text-xs hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                          >
                            + Agendar
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming */}
      <aside style={{ width: 260, minWidth: 260 }} className="space-y-4">
        <h3 className="font-bold text-sm text-[var(--foreground)] mt-14">Próximos Agendamentos</h3>
        {AGENDA_SLOTS.map((s, i) => (
          <div key={i} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4">
            <p className="text-xs font-bold text-[var(--primary)]">{s.day} · {s.periodo}</p>
            <p className="text-sm font-semibold text-[var(--foreground)] mt-1">{s.materia}</p>
            <p className="text-xs text-[var(--muted-foreground)]">{s.professor} · {s.turma}</p>
          </div>
        ))}
      </aside>

      {showNew && selectedSlot && (
        <Modal title={`Novo Agendamento · ${selectedSlot.day} / ${selectedSlot.periodo}`} onClose={() => setShowNew(false)}
          footer={<>
            <Btn variant="secondary" onClick={() => setShowNew(false)}>Cancelar</Btn>
            <Btn variant="primary" onClick={() => setShowNew(false)}>Salvar</Btn>
          </>}
        >
          <div className="space-y-3">
            <Input label="Professor" placeholder="Nome do professor" />
            <Input label="Matéria" placeholder="Português, Matemática..." />
            <Input label="Turma" placeholder="9A, 8B..." />
            <Input label="Uso" placeholder="Leitura livre, Pesquisa..." />
          </div>
        </Modal>
      )}

      {showFilled && filledSlot && (
        <Modal title="Detalhes do Agendamento" onClose={() => setShowFilled(false)}
          footer={<>
            <Btn variant="danger" onClick={() => setShowFilled(false)}>Excluir</Btn>
            <Btn variant="secondary" onClick={() => setShowFilled(false)}>Fechar</Btn>
          </>}
        >
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[var(--muted)] rounded-xl p-3">
                <p className="text-xs text-[var(--muted-foreground)]">Professor</p>
                <p className="font-semibold mt-1">{filledSlot.professor}</p>
              </div>
              <div className="bg-[var(--muted)] rounded-xl p-3">
                <p className="text-xs text-[var(--muted-foreground)]">Matéria</p>
                <p className="font-semibold mt-1">{filledSlot.materia}</p>
              </div>
              <div className="bg-[var(--muted)] rounded-xl p-3">
                <p className="text-xs text-[var(--muted-foreground)]">Turma</p>
                <p className="font-semibold mt-1">{filledSlot.turma}</p>
              </div>
              <div className="bg-[var(--muted)] rounded-xl p-3">
                <p className="text-xs text-[var(--muted-foreground)]">Uso</p>
                <p className="font-semibold mt-1">{filledSlot.uso}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Lib: Leitores ────────────────────────────────────────────────────────────
function LibLeitores() {
  const [showModal, setShowModal] = useState(false);
  const [readerType, setReaderType] = useState<"Estudante" | "Professor">("Estudante");
  const [filter, setFilter] = useState("Todos");

  const filtered = filter === "Todos" ? READERS : READERS.filter(r => r.type === filter);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Leitores</h1>
          <p className="text-[var(--muted-foreground)] mt-1">{READERS.length} leitores cadastrados</p>
        </div>
        <Btn variant="primary" onClick={() => setShowModal(true)}>+ Novo Leitor</Btn>
      </div>

      <div className="flex gap-2">
        {["Todos", "Estudante", "Professor"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${filter === f ? "bg-[var(--primary)] text-white" : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"}`}>{f}</button>
        ))}
      </div>

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--muted)] text-[var(--muted-foreground)] text-xs uppercase tracking-wide">
              <th className="text-left px-6 py-3 font-semibold">Nome</th>
              <th className="text-left px-4 py-3 font-semibold">Tipo</th>
              <th className="text-left px-4 py-3 font-semibold">Detalhes</th>
              <th className="text-left px-4 py-3 font-semibold">Telefone</th>
              <th className="text-left px-4 py-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-[var(--muted)] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} className="w-9 h-9 rounded-full bg-[var(--muted)]" alt={r.name} />
                    <span className="font-semibold text-[var(--foreground)]">{r.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.type === "Professor" ? "bg-[#dbeafe] text-[#1e40af]" : "bg-[var(--muted)] text-[var(--muted-foreground)]"}`}>{r.type}</span>
                </td>
                <td className="px-4 py-4 text-[var(--muted-foreground)]">
                  {r.type === "Estudante" ? `${(r as any).sala} · ${(r as any).periodo}` : (r as any).materia}
                </td>
                <td className="px-4 py-4 text-[var(--muted-foreground)]">{r.tel}</td>
                <td className="px-4 py-4">
                  <button className="text-xs text-[var(--primary)] font-semibold hover:underline">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="Novo Leitor" onClose={() => setShowModal(false)}
          footer={<>
            <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Btn>
            <Btn variant="primary" onClick={() => setShowModal(false)}>Salvar</Btn>
          </>}
        >
          <div className="space-y-4">
            <div className="flex rounded-xl bg-[var(--muted)] p-1">
              {(["Estudante", "Professor"] as const).map(t => (
                <button key={t} onClick={() => setReaderType(t)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${readerType === t ? "bg-white shadow text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`}>{t}</button>
              ))}
            </div>
            <Input label="Nome completo" placeholder="Nome do leitor" />
            <Input label="Telefone" placeholder="(11) 99999-0000" />
            {readerType === "Estudante" ? (
              <div className="grid grid-cols-2 gap-3">
                <Input label="Sala" placeholder="9A" />
                <div>
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-1 block">Período</span>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]">
                      <option>Manhã</option><option>Tarde</option><option>Noite</option>
                    </select>
                  </label>
                </div>
              </div>
            ) : (
              <Input label="Matéria" placeholder="Português, Matemática..." />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Lib: Moderação ───────────────────────────────────────────────────────────
function LibModeracao() {
  const [items, setItems] = useState(COMMENTS);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Moderação de Comentários</h1>
        <p className="text-[var(--muted-foreground)] mt-1">{items.length} comentário(s) aguardando revisão</p>
      </div>
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="arch-frame bg-[var(--muted)] mb-6" style={{ width: 80, height: 120 }}>
            <div className="w-full h-full flex items-center justify-center text-4xl">✅</div>
          </div>
          <p className="text-[var(--muted-foreground)] font-semibold">Nenhum comentário pendente</p>
        </div>
      )}
      <div className="space-y-4">
        {items.map(c => (
          <div key={c.id} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={c.avatar} className="w-10 h-10 rounded-full bg-[var(--muted)]" alt={c.student} />
                <div>
                  <p className="text-sm font-bold text-[var(--foreground)]">{c.student}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Sobre: <span className="font-semibold">{c.book}</span></p>
                </div>
              </div>
              <div className="flex gap-2">
                <Btn variant="secondary" onClick={() => setItems(prev => prev.filter(i => i.id !== c.id))}>✓ Aprovar</Btn>
                <Btn variant="danger" onClick={() => setItems(prev => prev.filter(i => i.id !== c.id))}>✕ Remover</Btn>
              </div>
            </div>
            <p className="mt-4 text-sm text-[var(--foreground)] bg-[var(--muted)] rounded-xl px-4 py-3 leading-relaxed">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Lib: Configurações ───────────────────────────────────────────────────────
function Toggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-[var(--foreground)]">{label}</span>
      <button
        onClick={() => setOn(v => !v)}
        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? "bg-[var(--primary)]" : "bg-[var(--border)]"}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function LibConfig() {
  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div>
        <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Configurações</h1>
        <p className="text-[var(--muted-foreground)] mt-1">Gerencie as preferências do sistema</p>
      </div>

      {[
        {
          title: "Segurança e Permissões",
          items: [
            "Bloquear envio de e-mails",
            "Exigir senha para empréstimos",
            "Exigir senha para agendamentos",
            "Obrigar localização do livro no cadastro",
            "Bloquear exclusão de agendamentos",
          ]
        },
        {
          title: "Notificações",
          items: ["Notificar devoluções por e-mail", "Notificar atrasos automaticamente"]
        }
      ].map(group => (
        <div key={group.title} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] px-6 py-2 divide-y divide-[var(--border)]">
          <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider py-3">{group.title}</p>
          {group.items.map(item => <Toggle key={item} label={item} />)}
        </div>
      ))}

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 space-y-4">
        <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">Agenda</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--foreground)]">Quantidade de aulas por dia</span>
          <input type="number" defaultValue={3} className="w-20 px-3 py-1.5 rounded-xl border border-[var(--border)] text-sm text-center focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" />
        </div>
      </div>

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 space-y-4">
        <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">E-mail SMTP</p>
        <Input label="E-mail da organização" type="email" placeholder="biblioteca@escola.edu.br" />
        <Input label="Senha de aplicativo" type="password" placeholder="••••••••••••" />
      </div>

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 space-y-3">
        <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">PIN de Segurança</p>
        <div className="flex gap-3">
          <Input label="PIN atual" type="password" placeholder="••••" />
          <Input label="Novo PIN" type="password" placeholder="••••" />
        </div>
        <Btn variant="secondary">Alterar PIN</Btn>
      </div>

      <Btn variant="primary" className="w-full py-3">Salvar Configurações</Btn>
    </div>
  );
}

// ─── Student: Acervo ──────────────────────────────────────────────────────────
function StuAcervo({ setScreen, setSelectedBook }: { setScreen: (s: Screen) => void; setSelectedBook: (b: (typeof BOOKS)[0]) => void }) {
  const [search, setSearch] = useState("");
  const filtered = search ? BOOKS.filter(b => b.title.toLowerCase().includes(search.toLowerCase())) : BOOKS;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Acervo</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Explore nossa coleção de {BOOKS.length} títulos</p>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar livro..."
          className="px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] placeholder:text-[var(--muted-foreground)]"
        />
      </div>

      {/* AI Recommendations */}
      <div className="rounded-2xl border-2 border-[var(--primary)] bg-gradient-to-r from-[#fdf5ed] to-[#f8eedf] p-6">
        <div className="flex items-center gap-2 mb-3">
          <span>✨</span>
          <h2 className="font-bold text-sm text-[var(--primary)] uppercase tracking-wider">BIBI recomenda para você, Ana</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {BOOKS.slice(4, 6).concat(BOOKS.slice(0, 1)).map(b => (
            <BookCard key={b.id} book={b} onClick={() => { setSelectedBook(b); setScreen("stu-book-detail"); }} />
          ))}
        </div>
      </div>

      {CATEGORIES.map(cat => {
        const catBooks = filtered.filter(b => b.category === cat);
        if (catBooks.length === 0) return null;
        return (
          <div key={cat}>
            <h2 className="font-bold text-base text-[var(--foreground)] mb-4">{cat}</h2>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {catBooks.map(b => (
                <BookCard key={b.id} book={b} onClick={() => { setSelectedBook(b); setScreen("stu-book-detail"); }} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Student: Book Detail ─────────────────────────────────────────────────────
function StuBookDetail({ book, setScreen }: { book: (typeof BOOKS)[0]; setScreen: (s: Screen) => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bibi", text: `Olá! Estou aqui para conversar sobre "${book.title}". O que você quer saber?` }
  ]);

  function sendChat() {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { from: "user", text: chatInput }, { from: "bibi", text: "Ótima pergunta! Sobre esse livro posso dizer que é uma leitura muito enriquecedora. Há algo mais que queira saber?" }]);
    setChatInput("");
  }

  return (
    <div className="p-8">
      <button onClick={() => setScreen("stu-acervo")} className="text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-6 flex items-center gap-1 transition-colors">
        ← Voltar ao Acervo
      </button>

      <div className="flex gap-10">
        <div className="flex-shrink-0">
          <div className="arch-frame bg-[var(--muted)] shadow-2xl" style={{ width: 200, height: 310 }}>
            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex-1 space-y-5">
          <div>
            <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider bg-[var(--muted)] px-3 py-1 rounded-full">{book.category}</span>
            <h1 className="font-serif font-bold text-4xl text-[var(--foreground)] mt-3 leading-tight">{book.title}</h1>
            <p className="text-lg text-[var(--muted-foreground)] mt-1">{book.author} · {book.year}</p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Btn variant="primary">🔖 Reservar</Btn>
            <button
              onClick={() => setShowChat(true)}
              className="px-4 py-2 rounded-xl text-sm font-semibold border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--secondary)] transition-colors"
            >
              💬 Conversar sobre este livro
            </button>
          </div>

          <div>
            <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Sinopse</p>
            <p className="text-sm text-[var(--foreground)] leading-relaxed">{book.synopsis}</p>
          </div>

          {/* Rating */}
          <div>
            <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Sua Avaliação</p>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => setRating(s)} className={`text-2xl transition-transform hover:scale-110 ${s <= rating ? "text-yellow-400" : "text-[var(--border)]"}`}>★</button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Seu Comentário</p>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="O que você achou deste livro?"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--ring)] placeholder:text-[var(--muted-foreground)]"
            />
            <Btn variant="primary" className="mt-2">Publicar</Btn>
          </div>

          {/* Others comments */}
          <div>
            <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Avaliações de outros leitores</p>
            <div className="space-y-2">
              {COMMENTS.map(c => (
                <div key={c.id} className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)]">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={c.avatar} className="w-6 h-6 rounded-full bg-[var(--muted)]" alt={c.student} />
                    <span className="text-xs font-semibold">{c.student}</span>
                    <span className="text-yellow-500 text-xs">★★★★★</span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6 bg-black/30 backdrop-blur-sm" onClick={() => setShowChat(false)}>
          <div className="bg-[var(--card)] rounded-3xl shadow-2xl w-full max-w-sm flex flex-col border border-[var(--border)]" style={{ height: 480 }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
              <div className="w-8 h-8 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white text-sm font-bold">B</div>
              <div className="flex-1">
                <p className="text-sm font-bold">BIBI</p>
                <p className="text-xs text-[var(--muted-foreground)]">Sobre "{book.title}"</p>
              </div>
              <button onClick={() => setShowChat(false)} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.from === "user" ? "bg-[var(--primary)] text-white rounded-br-sm" : "bg-[var(--muted)] text-[var(--foreground)] rounded-bl-sm"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 pb-4 pt-3 border-t border-[var(--border)] flex gap-2">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendChat()}
                placeholder="Pergunte algo sobre o livro..."
                className="flex-1 px-4 py-2 rounded-xl border border-[var(--border)] text-sm bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              />
              <Btn variant="primary" onClick={sendChat}>→</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Student: Empréstimos ─────────────────────────────────────────────────────
function StuEmprestimos() {
  const myLoans = LOANS.slice(0, 3);
  return (
    <div className="p-8 space-y-6">
      <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Meus Empréstimos</h1>
      <div className="space-y-4">
        {myLoans.map(l => (
          <div key={l.id} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 flex items-center gap-5">
            <div className="w-14 h-20 rounded-xl overflow-hidden bg-[var(--muted)] flex-shrink-0">
              <img src={BOOKS.find(b => b.title === l.book)?.cover} alt={l.book} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[var(--foreground)]">{l.book}</p>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">Vence em: {l.due}</p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={l.status} />
              {l.status !== "Devolvido" && <Btn variant="secondary" className="text-xs">Renovar</Btn>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Student: Reservas ────────────────────────────────────────────────────────
function StuReservas() {
  const [reservas, setReservas] = useState(BOOKS.slice(2, 4));
  return (
    <div className="p-8 space-y-6">
      <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Minhas Reservas</h1>
      {reservas.length === 0 && (
        <div className="flex flex-col items-center py-16">
          <div className="arch-frame bg-[var(--muted)] mb-4" style={{ width: 80, height: 120 }}>
            <div className="w-full h-full flex items-center justify-center text-3xl">🔖</div>
          </div>
          <p className="text-[var(--muted-foreground)] font-semibold">Nenhuma reserva ativa</p>
        </div>
      )}
      <div className="space-y-4">
        {reservas.map(b => (
          <div key={b.id} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 flex items-center gap-5">
            <div className="w-14 h-20 rounded-xl overflow-hidden bg-[var(--muted)] flex-shrink-0">
              <img src={b.cover} alt={b.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[var(--foreground)]">{b.title}</p>
              <p className="text-sm text-[var(--muted-foreground)]">{b.author}</p>
              <StatusBadge status="Pendente" />
            </div>
            <Btn variant="danger" onClick={() => setReservas(prev => prev.filter(r => r.id !== b.id))}>Cancelar</Btn>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Student: Histórico ───────────────────────────────────────────────────────
function StuHistorico() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Meu Histórico de Leitura</h1>
      <div className="grid grid-cols-4 gap-5">
        {BOOKS.map(b => (
          <div key={b.id} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
            <div className="h-40 bg-[var(--muted)]">
              <img src={b.cover} alt={b.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <p className="text-sm font-bold text-[var(--foreground)] truncate">{b.title}</p>
              <p className="text-xs text-[var(--muted-foreground)] truncate">{b.author}</p>
              <div className="flex mt-2">
                {[1,2,3,4,5].map(s => <span key={s} className={`text-sm ${s <= 4 ? "text-yellow-400" : "text-[var(--border)]"}`}>★</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Student: Agenda ─────────────────────────────────────────────────────────
function StuAgenda() {
  function getSlot(day: string, periodo: string) {
    return AGENDA_SLOTS.find(s => s.day === day && s.periodo === periodo);
  }
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Agenda da Biblioteca</h1>
        <p className="text-[var(--muted-foreground)] mt-1">Visualização dos horários reservados</p>
      </div>
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--muted)]">
              <th className="text-left px-4 py-3 text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide w-24">Período</th>
              {DAYS.map(d => <th key={d} className="px-4 py-3 text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide">{d}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {PERIODOS.map(p => (
              <tr key={p} className="divide-x divide-[var(--border)]">
                <td className="px-4 py-4 text-xs font-bold text-[var(--muted-foreground)] uppercase bg-[var(--muted)]">{p}</td>
                {DAYS.map(d => {
                  const slot = getSlot(d, p);
                  return (
                    <td key={d} className="px-3 py-3 text-center" style={{ minWidth: 130 }}>
                      {slot ? (
                        <div className="rounded-xl bg-[var(--secondary)] px-3 py-2 border border-[var(--primary)]">
                          <p className="text-xs font-bold text-[var(--foreground)] truncate">{slot.materia}</p>
                          <p className="text-xs text-[var(--muted-foreground)] truncate">{slot.turma}</p>
                        </div>
                      ) : (
                        <div className="h-12 rounded-xl border border-dashed border-[var(--border)] flex items-center justify-center">
                          <span className="text-xs text-[var(--muted-foreground)]">Livre</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Student: Perfil ──────────────────────────────────────────────────────────
function StuPerfil() {
  const [seed, setSeed] = useState("ana");
  const [style, setStyle] = useState("adventurer");
  const styles = ["adventurer", "avataaars", "big-ears", "croodles", "fun-emoji", "lorelei", "micah"];
  const [hovered, setHovered] = useState<string | null>(null);

  function randomize() {
    setSeed(Math.random().toString(36).slice(2, 8));
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="font-serif font-bold text-3xl text-[var(--foreground)]">Meu Perfil</h1>

      <div className="flex gap-8">
        {/* Info */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 flex-1 space-y-4">
          <div className="flex items-center gap-5">
            <ArchAvatar seed={seed} size={64} />
            <div>
              <h2 className="font-bold text-xl text-[var(--foreground)]">Ana Souza</h2>
              <p className="text-sm text-[var(--muted-foreground)]">Aluna · 9A · Manhã</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Matrícula: 2024001</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center pt-2">
            <div className="bg-[var(--muted)] rounded-xl p-4">
              <p className="text-2xl font-extrabold text-[var(--foreground)]">12</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Livros lidos</p>
            </div>
            <div className="bg-[var(--muted)] rounded-xl p-4">
              <p className="text-2xl font-extrabold text-[var(--foreground)]">2</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Em andamento</p>
            </div>
            <div className="bg-[var(--muted)] rounded-xl p-4">
              <p className="text-2xl font-extrabold text-[var(--foreground)]">8</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Avaliações</p>
            </div>
          </div>
        </div>

        {/* Avatar picker */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 space-y-5" style={{ width: 360 }}>
          <h3 className="font-bold text-sm text-[var(--foreground)]">Personalizar Avatar</h3>
          <div className="flex justify-center">
            <div className="arch-frame bg-[var(--muted)] overflow-hidden shadow-lg" style={{ width: 120, height: 180 }}>
              <img
                src={`https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=fef3c7`}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Estilo</p>
            <div className="grid grid-cols-4 gap-2">
              {styles.map(s => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(null)}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${style === s ? "border-[var(--primary)]" : "border-transparent hover:border-[var(--secondary)]"}`}
                >
                  <img
                    src={`https://api.dicebear.com/7.x/${s}/svg?seed=${seed}&backgroundColor=fef3c7`}
                    alt={s}
                    className="w-full aspect-square object-cover bg-[var(--muted)]"
                  />
                </button>
              ))}
            </div>
          </div>
          <Btn variant="secondary" className="w-full" onClick={randomize}>🎲 Randomizar</Btn>
          <Btn variant="primary" className="w-full">Salvar Avatar</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [role, setRole] = useState<Role>(null);
  const [landingTab, setLandingTab] = useState<"home" | "sobre">("home");
  const [selectedBook, setSelectedBook] = useState<(typeof BOOKS)[0]>(BOOKS[0]);

  function handleLogout() {
    setRole(null);
    setScreen("landing");
    setLandingTab("home");
  }

  // Public screens
  if (screen === "landing") {
    return <LandingScreen setScreen={setScreen} tab={landingTab} setTab={setLandingTab} />;
  }
  if (screen === "login") {
    return <LoginScreen setRole={setRole} setScreen={setScreen} />;
  }

  // Authenticated shell
  const isLib = role === "bibliotecaria";

  function renderMain() {
    switch (screen) {
      case "lib-dashboard": return <LibDashboard setScreen={setScreen} />;
      case "lib-acervo": return <LibAcervo setScreen={setScreen} setSelectedBook={setSelectedBook} />;
      case "lib-book-detail": return <LibBookDetail book={selectedBook} setScreen={setScreen} />;
      case "lib-emprestimos": return <LibEmprestimos />;
      case "lib-agenda": return <LibAgenda />;
      case "lib-leitores": return <LibLeitores />;
      case "lib-moderacao": return <LibModeracao />;
      case "lib-config": return <LibConfig />;
      case "stu-acervo": return <StuAcervo setScreen={setScreen} setSelectedBook={setSelectedBook} />;
      case "stu-book-detail": return <StuBookDetail book={selectedBook} setScreen={setScreen} />;
      case "stu-emprestimos": return <StuEmprestimos />;
      case "stu-reservas": return <StuReservas />;
      case "stu-historico": return <StuHistorico />;
      case "stu-agenda": return <StuAgenda />;
      case "stu-perfil": return <StuPerfil />;
      default: return null;
    }
  }

  return (
    <div className="flex h-screen bg-[var(--background)] overflow-hidden">
      <Sidebar role={role} screen={screen} setScreen={setScreen} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">
        {renderMain()}
      </main>
    </div>
  );
}
