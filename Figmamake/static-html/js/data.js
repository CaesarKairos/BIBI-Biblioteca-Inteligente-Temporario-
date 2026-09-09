// ─── BIBI · Dados mockados (isolados para troca futura por API) ───────────────
// Mesmos dados do protótipo React/Figma Make (Figmamake/src/App.tsx).

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