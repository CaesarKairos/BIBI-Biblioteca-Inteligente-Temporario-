// ─── BIBI · JavaScript (integração real com as /api/... do app.py) ──────────
// Design: Figmamake/static-html · Dados/lógica: app.py (fonte da verdade)

// ─── Ícones SVG inline (Bootstrap Icons) reutilizados do app.py ───────────────
const ICON_DASH = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-data" viewBox="0 0 16 16"><path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>';
const ICON_ACERVO = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal" viewBox="0 0 16 16"><path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/><path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/></svg>';
const ICON_EMP = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/></svg>';
const ICON_AGENDA = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16"><path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/></svg>';
const ICON_LEITORES = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>';
const ICON_CONFIG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-wide-connected" viewBox="0 0 16 16"><path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.9.4a.3.3 0 1 1 .3.3c.198.13.429.1.629.1c.198.13.468.07.638.07.296.117.593.117.914.117c.296.117.563.097.83.147.296.117.522.117.815.117c.169.234.269.234.469.234c.169.234.344.234.544.234zM11.3 3.1a.3.3 0 1 1 .3.3c.198.13.429.1.629.1c.198.13.468.07.638.07.296.117.593.117.914.117c.296.117.563.097.83.147.296.117.522.117.815.117c.169.234.269.234.469.234c.169.234.344.234.544.234z"/></svg>';
const ICON_CHECK = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16" fill="currentColor" class="bi bi-check-circle"><path d="M8 15a1 1 0 0 1 1 0V2a1 1 0 0 1-1 0zm0-1a1 1 0 0 1 1 0V2a1 1 0 0 1-1 0z"/></svg>';
const ICON_RESERVA = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16" fill="currentColor" class="bi bi-bookmark-heart"><path d="M8.307 1.278l.531-.369.158-.069.474.466.463-.27.618-.026.855.179 1.527.183 1.817.517 2.256.127 2.616.248 3.191-.073 3.44l.293-.1.37-.052.372-.208.4-.027.42-.232.388-.039.337.08.373.064.634.004.848.105 1.201.119 1.559.021 1.744.132.255-.004.376.122.486.057.000 1.413 0-2.025q.527-.476 1.816-.194 2.591-.084 3.489-.069z"/></svg>';

const AVATAR_BASE = "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=";

// ─── Estado global ───────────────────────────────────────────────────────────
let state = {
  role: null,                 // "bibliotecaria" | "aluno"
  usuario: null,
  avatar_seed: null,
  loginRole: "bibliotecaria",
  loginExiste: false,
  currentScreen: "landing",
  landingTab: "home",
  livros: [],
  leitores: [],
  loanFilter: "Todos",
  readerFilter: "Todos",
  selectedBook: null,
  avatarOptions: [],
  aluno: null,
  agendamentos: [],
  qtdAulas: 6,
  graficoGenerosInstance: null,
  graficoHistoricoInstance: null
};

// ─── Utilitários ─────────────────────────────────────────────────────────────────
function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function fmtData(iso) {
  if (!iso) return "—";
  const p = String(iso).split("-");
  if (p.length === 3) return p[2] + "/" + p[1] + "/" + p[0];
  return iso;
}
async function apiJson(url, opts) {
  const res = await fetch(url, opts);
  let data = {};
  try { data = await res.json(); } catch (e) {}
  if (!res.ok) {
    throw new Error(data.erro || data.mensagem || "Erro do servidor (" + res.status + ")");
  }
  return data;
}
function badgeHtml(status) {
  const map = {
    "Pendente": "badge-yellow", "Aprovado": "badge-green", "Ativo": "badge-green",
    "Atrasado": "badge-red", "Devolvido": "badge-gray", "Devolução Hoje": "badge-yellow",
    "Disponível": "badge-green", "Indisponível": "badge-red"
  };
  const cls = map[status] || "badge-default";
  return '<span class="badge ' + cls + '">' + esc(status) + '</span>';
}
function avatarUrl(seed) { return AVATAR_BASE + encodeURIComponent(seed || "bibi"); }
function archAvatarHtml(seed, size) {
  size = size || 40;
  const h = Math.round(size * 1.3);
  const rad = Math.round(size / 6);
  const s = seed || "bibi";
  return '<div class="arch-avatar" style="width:' + size + 'px;height:' + h + 'px;border-radius:' +
    size + 'px ' + size + 'px ' + rad + 'px ' + rad + 'px">' +
    '<img src="' + avatarUrl(s) + '" alt="avatar" loading="lazy"></div>';
}
function showScreen(id) {
  state.currentScreen = id;
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}
function openModal(modalId) { const m = document.getElementById(modalId); if (m) m.classList.add("open"); }
function closeModal(modalId) { const m = document.getElementById(modalId); if (m) m.classList.remove("open"); }
function showToast(msg, tipo) {
  tipo = tipo || "success";
  const colors = { success: "#2e7d32", error: "#c62828", warning: "#f57c00" };
  const c = colors[tipo] || colors.success;
  const t = document.createElement("div");
  t.style.cssText = "position:fixed;top:20px;right:20px;z-index:999;background:" + c + ";color:#fff;padding:14px 18px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.2);font-size:14px;max-width:360px;";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; setTimeout(() => t.remove(), 300); }, 3200);
}

// ─── Alternar tema ─────────────────────────────────────────────────────────
function applyTheme(theme) {
  if (theme === "dark") document.documentElement.classList.add("dark"); else document.documentElement.classList.remove("dark");
  localStorage.setItem("bibi-theme", theme);
}
function getTheme() { return localStorage.getItem("bibi-theme") || "light"; }
function toggleTheme() { applyTheme(document.documentElement.classList.contains("dark") ? "light" : "dark"); }
// ─── Landing: carrossel com imagens reais do hero ─────────────────────────
let heroImages = [];
async function initCarousel() {
  try {
    const data = await apiJson("/api/hero-images");
    heroImages = data.imagens || ["/static/images/hero/hero.jpg"];
  } catch (e) { heroImages = ["/static/images/hero/hero.jpg"]; }
  const host = document.getElementById("hero-carousel");
  if (!host) return;
  host.querySelectorAll("img").forEach(i => i.remove());
  heroImages.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "BIBI";
    img.style.opacity = i === 0 ? "1" : "0";
    host.appendChild(img);
  });
  if (heroImages.length > 1) {
    let idx = 0;
    const step = () => {
      idx = (idx + 1) % heroImages.length;
      const imgs = host.querySelectorAll("img");
      imgs.forEach((im, i) => { im.style.transition = "opacity .7s"; im.style.opacity = i === idx ? "1" : "0"; });
      setTimeout(step, 4500);
    };
    setTimeout(step, 4500);
  }
}

// ─── Login / criação de conta da bibliotecaria ──────────────────────────────
function setLoginMode(existe) {
  state.loginExiste = !!existe;
  const note = document.getElementById("login-mode-note");
  const btn = document.getElementById("login-submit");
  const userInput = document.getElementById("lib-login-user");
  const tabs = document.getElementById("login-tabs");
  const fields = document.getElementById("login-fields");
  const stuFields = document.querySelector(".login-fields-stu");
  if (existe) {
    if (note) note.textContent = "";
    if (btn) btn.textContent = "Entrar";
    if (userInput) userInput.placeholder = "usuária";
    if (tabs) tabs.style.display = "";
    if (stuFields) stuFields.style.display = "";
  } else {
    if (note) note.textContent = "Primeiro início: crie a conta da bibliotecária para começar.";
    if (btn) btn.textContent = "Criar conta e entrar";
    if (userInput) userInput.placeholder = "escolha uma usuária";
    // Sem nenhuma bibliotecária cadastrada, o primeiro acesso é obrigatoriamente
    // a criação da conta dela: esconde a aba "Aluno" e o formulário de aluno.
    if (tabs) tabs.style.display = "none";
    if (stuFields) stuFields.style.display = "none";
    if (fields) { fields.classList.remove("mode-stu"); fields.classList.add("mode-lib"); }
  }
}
function setLoginError(msg) {
  const el = document.getElementById("login-error");
  if (el) el.textContent = msg || "";
}
function switchLoginRole(role) {
  if (!state.loginExiste) role = "bibliotecaria"; // sem bibliotecária, não há escolha de aba
  state.loginRole = role;
  const fields = document.getElementById("login-fields");
  fields.classList.remove("mode-stu");
  fields.classList.add(role === "aluno" ? "mode-stu" : "mode-lib");
  document.querySelectorAll("#login-tabs .segmented-item").forEach(el => {
    el.classList.toggle("active", el.getAttribute("data-login-role") === role);
  });
  setLoginError("");
  if (role === "bibliotecaria") setLoginMode(state.loginExiste);
}
async function submitLogin() {
  setLoginError("");
  try {
    if (state.loginRole === "aluno") {
      const email = document.getElementById("stu-login-email").value.trim();
      if (!email) throw new Error("Digite seu e-mail.");
      const data = await apiJson("/api/aluno/login", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email })
      });
      state.role = "aluno";
      state.aluno = data.aluno;
      state.usuario = data.aluno.nome;
      state.avatar_seed = data.aluno.avatar_seed;
      enterApp();
      return;
    }
    const usuario = document.getElementById("lib-login-user").value.trim();
    const senha = document.getElementById("lib-login-pass").value;
    if (!usuario || !senha) throw new Error("Informe usuária e senha.");
    const url = state.loginExiste ? "/api/bibliotecaria/login" : "/api/bibliotecaria/crear";
    const data = await apiJson(url, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ usuario, senha })
    });
    state.role = "bibliotecaria";
    state.usuario = data.usuario;
    state.avatar_seed = data.avatar_seed || "bibliotecaria";
    enterApp();
  } catch (e) {
    setLoginError(e.message);
  }
}
function enterApp() {
  showScreen("app");
  buildSidebar();
  rebindSidebarUser();
  deleteTempFe();
  if (state.role === "bibliotecaria") {
    loadLibros().then(() => { loadDashboard(); renderAcervo("lib"); renderLibLoans(); renderLibAgenda(); loadLeitores(); carregarConfig(); });
    showScreen("lib-dashboard");
  } else {
    loadLibros().then(() => { renderAcervo("stu"); loadStuLoans(); loadStuAgenda(); loadStuPerfil(); });
    showScreen("stu-acervo");
  }
  loadAvatarOptions();
}
function deleteTempFe() {}
async function logout() {
  try {
    if (state.role === "bibliotecaria") await apiJson("/api/bibliotecaria/logout", { method: "POST" });
    else if (state.role === "aluno") await apiJson("/api/aluno/logout", { method: "POST" });
  } catch (e) {}
  state.role = null; state.aluno = null; state.usuario = null;
  showScreen("landing");
}

// ─── Sidebar (íconos SVG reutilizados de app.py) ────────────────────────────
function buildSidebar() {
  const nav = document.getElementById("sidebar-nav");
  if (!nav) return;
  let items = [];
  if (state.role === "bibliotecaria") {
    items = [
      { label: "Dashboard", icon: ICON_DASH, screen: "lib-dashboard" },
      { label: "Acervo", icon: ICON_ACERVO, screen: "lib-acervo" },
      { label: "Empréstimos", icon: ICON_EMP, screen: "lib-emprestimos" },
      { label: "Agenda", icon: ICON_AGENDA, screen: "lib-agenda" },
      { label: "Leitores", icon: ICON_LEITORES, screen: "lib-leitores" },
      { label: "Moderação", icon: ICON_CONFIG, screen: "lib-moderacao" },
      { label: "Configurações", icon: ICON_CONFIG, screen: "lib-config" }
    ];
  } else {
    items = [
      { label: "Acervo", icon: ICON_ACERVO, screen: "stu-acervo" },
      { label: "Meus Empréstimos", icon: ICON_EMP, screen: "stu-emprestimos" },
      { label: "Minhas Reservas", icon: ICON_RESERVA, screen: "stu-reservas" },
      { label: "Meu Histórico", icon: ICON_ACERVO, screen: "stu-historico" },
      { label: "Agenda", icon: ICON_AGENDA, screen: "stu-agenda" },
      { label: "Meu Perfil", icon: ICON_LEITORES, screen: "stu-perfil" }
    ];
  }
  nav.innerHTML = items.map(item =>
    '<div class="sidebar-nav-item" data-goto="' + item.screen + '">' + item.icon + '<span>' + esc(item.label) + '</span></div>'
  ).join("");
}
function rebindSidebarUser() {
  const name = document.getElementById("sidebar-user-name");
  const sub = document.getElementById("sidebar-user-sub");
  const avatar = document.getElementById("sidebar-user-avatar");
  if (name) name.textContent = state.usuario || (state.role === "aluno" ? "Estudante" : "Bibliotecaria");
  if (sub) sub.textContent = state.role === "aluno" ? "Aluno · Biblioteca" : "Bibliotecaria";
  if (avatar) avatar.innerHTML = archAvatarHtml(state.avatar_seed, 40);
}

// ─── Avatar: opções adventurer-neutral (escolha manual, sem sorteio) ──────
let avatarSeeds = [];
async function loadAvatarOptions() {
  try {
    const data = await apiJson("/api/avatares-opcoes");
    avatarSeeds = data.sementes || [];
  } catch (e) {
    avatarSeeds = ["bibi-1","bibi-2","bibi-3","bibi-4","bibi-5","bibi-6","bibi-7","bibi-8","bibi-9","bibi-10"];
  }
  buildAvatarGrid("style-grid", state.avatar_seed);
}
function buildAvatarGrid(gridId, selectedSeed) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = avatarSeeds.map(s =>
    '<div class="style-btn' + (s === selectedSeed ? " selected" : "") + '" data-avatar-seed="' + s + '">' +
    '<img src="' + avatarUrl(s) + '" alt="avatar" loading="lazy"></div>'
  ).join("");
}
// ─── Dados: livros ──────────────────────────────────────────────────────────
async function loadLibros() {
  state.livros = await apiJson("/api/livros");
  return state.livros;
}

// ─── Dashboard ──────────────────────────────────────────────────────────────
const CORES = ["#bc8a5f", "#8c8279", "#d4b59e", "#7d9b5e", "#CD853F", "#a3968c", "#A0522D", "#E5D8CC", "#9a6a3b", "#6f5e4d"];
function kpiHtml(icono, valor, etiqueta, alerta) {
  const valClass = alerta ? ' class="kpi-value kpi-value-alert"' : ' class="kpi-value"';
  return '<p class="kpi-icon">' + icono + '</p><p' + valClass + '>' + esc(valor) + '</p><p class="kpi-label">' + esc(etiqueta) + '</p>';
}
function setKpi(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }
async function loadDashboard() {
  if (state.role !== "bibliotecaria") return;
  setKpi("kpi-titulos", kpiHtml(ICON_ACERVO, state.livros.length, "Total de Títulos"));
  const exemplares = state.livros.reduce((a, b) => a + (Number(b.estoque) || 0), 0);
  setKpi("kpi-exemplares", kpiHtml(ICON_ACERVO, exemplares, "Total de Exemplares"));
  try {
    const c = await apiJson("/api/emprestimos/ativos/count");
    setKpi("kpi-ativos", kpiHtml(ICON_EMP, c.count, "Empréstimos Ativos"));
  } catch (e) { setKpi("kpi-ativos", kpiHtml(ICON_EMP, "—", "Empréstimos Ativos")); }
  try {
    const at = await apiJson("/api/emprestimos/atrasos");
    setKpi("kpi-atrasados", kpiHtml(ICON_EMP, at.length, "Itens Atrasados", true));
  } catch (e) { setKpi("kpi-atrasados", kpiHtml(ICON_EMP, "—", "Itens Atrasados", true)); }
  try {
    const ho = await apiJson("/api/emprestimos/devolucoes-hoje");
    setKpi("kpi-hoje", kpiHtml(ICON_AGENDA, ho.length, "Devoluções Hoje"));
  } catch (e) { setKpi("kpi-hoje", kpiHtml(ICON_AGENDA, "—", "Devoluções Hoje")); }
  try {
    const prox = await apiJson("/api/agendamentos/datas-com-agendamentos");
    setKpi("kpi-agenda", kpiHtml(ICON_AGENDA, prox.length, "Próximos Agendamentos"));
  } catch (e) { setKpi("kpi-agenda", kpiHtml(ICON_AGENDA, "—", "Próximos Agendamentos")); }
  try {
    const leit = await apiJson("/api/leitores");
    state.leitores = leit;
    setKpi("kpi-leitores", kpiHtml(ICON_LEITORES, leit.length, "Leitores"));
  } catch (e) { setKpi("kpi-leitores", kpiHtml(ICON_LEITORES, "—", "Leitores")); }
  cargarGraficosGeneros();
  carregarTopLivros();
  carregarRanking();
  carregarAdormecidos();
  carregarEmprestimosRecentes();
  const sub = document.getElementById("dash-subtitle");
  if (sub && state.usuario) sub.textContent = "Olá, " + state.usuario + "! Aqui está um resumo do acervo.";
}
async function cargarGraficosGeneros() {
  const palette = CORES;
  const isDark = document.documentElement.classList.contains("dark");
  try {
    const g1 = await apiJson("/api/emprestimos/ativos-por-genero");
    const labels1 = g1.map(d => d.categoria); const vals1 = g1.map(d => d.total);
    const ctx1 = document.getElementById("grafico-generos");
    if (ctx1) {
      if (state.graficoGenerosInstance) state.graficoGenerosInstance.destroy();
      state.graficoGenerosInstance = new Chart(ctx1, {
        type: "pie",
        data: { labels: labels1, datasets: [{ data: vals1, backgroundColor: palette.slice(0, vals1.length || 1), borderColor: isDark ? "#3c332c" : "#ffffff", borderWidth: 2 }] },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } }
      });
    }
  } catch (e) {}
  try {
    const g2 = await apiJson("/api/emprestimos/historico-por-genero");
    const labels2 = g2.map(d => d.categoria); const vals2 = g2.map(d => d.total);
    const ctx2 = document.getElementById("grafico-historico");
    if (ctx2) {
      if (state.graficoHistoricoInstance) state.graficoHistoricoInstance.destroy();
      state.graficoHistoricoInstance = new Chart(ctx2, {
        type: "pie",
        data: { labels: labels2, datasets: [{ data: vals2, backgroundColor: palette.slice(0, vals2.length || 1), borderColor: isDark ? "#3c332c" : "#ffffff", borderWidth: 2 }] },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } }
      });
    }
  } catch (e) {}
}

async function carregarTopLivros() {
  const el = document.getElementById("dash-top-books");
  if (!el) return;
  try {
    const top = await apiJson("/api/emprestimos/mais-emprestados");
    if (!top.length) { el.innerHTML = '<li style="color:var(--muted-foreground)">Sem dados</li>'; return; }
    el.innerHTML = top.map((t, i) =>
      '<li><span class="rank-index">' + (i + 1) + '</span>' +
      '<span style="width:34px;height:48px;border-radius:6px;background:url(' + esc(t.capa) + ') center/cover;background-color:var(--muted);flex-shrink:0;"></span>' +
      '<span style="flex:1;min-width:0"><strong style="display:block;color:var(--foreground)">' + esc(t.titulo) + '</strong>' +
      '<span style="font-size:12px;color:var(--muted-foreground)">' + esc(t.autor) + '</span></span>' +
      '<span class="rank-medal" style="background:var(--primary);color:#fff">' + esc(t.total_emprestimos) + '</span></li>'
    ).join("");
  } catch (e) { el.innerHTML = '<li style="color:var(--muted-foreground)">Sem dados</li>'; }
}

async function carregarRanking() {
  const el = document.getElementById("dash-ranking");
  if (!el) return;
  try {
    const rank = await apiJson("/api/emprestimos/ranking-leitores");
    if (!rank.length) { el.innerHTML = '<li style="color:var(--muted-foreground)">Sem dados</li>'; return; }
    el.innerHTML = rank.slice(0, 8).map((r, i) =>
      '<li><span class="rank-index">' + (i + 1) + '</span>' +
      '<span style="flex:1;min-width:0"><strong style="color:var(--foreground)">' + esc(r.nome) + '</strong>' +
      '<span style="font-size:12px;color:var(--muted-foreground)">' + esc(r.sala) + ' · ' + esc(r.tipo) + '</span></span>' +
      '<span class="rank-medal" style="background:var(--primary);color:#fff">' + esc(r.total) + '</span></li>'
    ).join("");
  } catch (e) { el.innerHTML = '<li style="color:var(--muted-foreground)">Sem dados</li>'; }
}

async function carregarAdormecidos() {
  const el = document.getElementById("dash-adormecidos");
  const empty = document.getElementById("dash-adormecidos-empty");
  if (!el) return;
  try {
    const ad = await apiJson("/api/livros/adormecidos");
    if (!ad.length) { if (empty) empty.textContent = "Não há livros adormecidos."; el.innerHTML = ""; return; }
    if (empty) empty.textContent = "";
    el.innerHTML = ad.map(a => '<span class="adormecidos-tag" title="' + esc(a.titulo) + '">' + esc(a.titulo) + '</span>').join("");
  } catch (e) { if (empty) empty.textContent = "—"; }
}

async function carregarEmprestimosRecentes() {
  const el = document.getElementById("dash-loans");
  if (!el) return;
  try {
    const loans = await apiJson("/api/emprestimos/todos");
    state.loansCache = loans;
    el.innerHTML = loans.slice(0, 8).map(l =>
      '<tr><td><span class="cell-leader-cell">' + esc(l.leitor) + '</span></td>' +
      '<td>' + esc(l.livro) + '</td><td>' + esc(fmtData(l.data_vencimento)) + '</td><td>' + badgeHtml(l.status) + '</td></tr>'
    ).join("");
  } catch (e) { el.innerHTML = ""; }
}
// ─── Acervo (lib e stu) ─────────────────────────────────────────────────────
function bookStatus(book) { return Number(book.disponible) > 0 ? "Disponível" : "Indisponível"; }
function bookCardHtml(book, prefix) {
  return '<div class="book-card" data-book-id="' + book.id + '" data-prefix="' + prefix + '">' +
    '<div class="book-card-cover"><img src="' + esc(book.capa) + '" alt="' + esc(book.titulo) + '" loading="lazy">' +
    '<div class="book-card-badge">' + badgeHtml(bookStatus(book)) + '</div></div>' +
    '<p class="book-card-title">' + esc(book.titulo) + '</p>' +
    '<p class="book-card-author">' + esc(book.autor) + '</p></div>';
}
function aplicaBusqueda(lista, termino) {
  if (!termino) return lista;
  const t = termino.toLowerCase();
  return lista.filter(b => (b.titulo || "").toLowerCase().includes(t) || (b.autor || "").toLowerCase().includes(t) || (b.isbn || "").toLowerCase().includes(t));
}
function renderAcervo(prefix) {
  const isLib = prefix === "lib";
  const container = document.getElementById(isLib ? "lib-acervo-shelves" : "stu-acervo-shelves");
  const countEl = document.getElementById(isLib ? "lib-acervo-count" : "stu-acervo-count");
  if (!container) return;
  const searchEl = document.getElementById(isLib ? "lib-acervo-search" : "stu-acervo-search");
  const termino = searchEl ? searchEl.value : "";
  const lista = aplicaBusqueda(state.livros, termino);
  if (countEl) countEl.textContent = String(lista.length);
  const cats = [];
  lista.forEach(b => { if (!cats.includes(b.categoria)) cats.push(b.categoria); });
  if (!lista.length) { container.innerHTML = '<p style="color:var(--muted-foreground);text-align:center;padding:24px;">Nenhum livro encontrado.</p>'; return; }
  container.innerHTML = cats.map(cat => {
    const livros = lista.filter(b => b.categoria === cat);
    return '<div class="shelf"><h3>' + esc(cat) + '</h3>' +
      '<div class="book-row">' + livros.map(b => bookCardHtml(b, prefix)).join("") + '</div></div>';
  }).join("");
}
function detailBodyHtml(book, isStu) {
  const disp = Number(book.disponible);
  const tipo = disp > 0 ? "Disponível" : "Indisponível";
  const sinopsis = book.descripcion || "Sem descrição disponível.";
  const temas = (book.temas || "").split(",").map(s => s.trim()).filter(Boolean).map(s => '<span class="detail-tag">' + esc(s) + '</span>').join("");
  let acciones = isStu
    ? '<button type="button" class="btn btn-primary" data-chat-open>Perguntar à BIBI</button>'
    : '<button type="button" class="btn btn-primary" data-open-loan>Fazer Empréstimo</button>' +
      '<button type="button" class="btn btn-secondary" data-open-edit>Editar</button>' +
      '<button type="button" class="btn btn-danger" data-open-delete>Excluir</button>';
  return '<h2 class="detail-title">' + esc(book.titulo) + '</h2>' +
    '<p class="detail-byline">' + esc(book.autor) + ' · ' + esc(book.ano || "") + '</p>' +
    '<p class="detail-category">' + badgeHtml(tipo) + ' <span class="detail-cattext">' + esc(book.categoria || "") + '</span></p>' +
    '<div class="detail-synopsis">' + esc(sinopsis) + '</div>' +
    (temas ? '<div class="detail-tags">' + temas + '</div>' : '') +
    '<dl class="detail-facts"><dt>ISBN</dt><dd>' + esc(book.isbn) + '</dd>' +
    '<dt>Exemplar</dt><dd>' + esc(book.estoque) + ' (' + disp + ' disponibles)</dd>' +
    (book.localizacion ? '<dt>Localização</dt><dd>' + esc(book.localizacion) + '</dd>' : '') + '</dl>' +
    '<div class="detail-actions">' + acciones + '</div>';
}
function openBookDetail(book, prefix) {
  state.selectedBook = book;
  const isLib = prefix === "lib";
  const cover = isLib ? document.getElementById("lib-detail-cover") : document.getElementById("stu-detail-cover");
  const body = isLib ? document.getElementById("lib-detail-body") : document.getElementById("stu-detail-body");
  if (cover) cover.innerHTML = '<img src="' + esc(book.capa) + '" alt="' + esc(book.titulo) + '">';
  if (body) body.innerHTML = detailBodyHtml(book, !isLib);
  if (isLib) {
    const del = document.getElementById("lib-delete-title");
    if (del) del.textContent = 'Excluir o livro "' + book.titulo + '"?';
    showScreen("lib-book-detail");
  } else {
    const sub = document.getElementById("chat-sub");
    if (sub) sub.textContent = "Assistente · " + book.titulo;
    showScreen("stu-book-detail");
  }
}

async function salvarLivroManual() {
  const g = (id) => document.getElementById(id).value.trim();
  const payload = {
    manual: true, isbn: g("lib-manual-isbn"), titulo: g("lib-manual-titulo"), autor: g("lib-manual-autor"),
    ano: g("lib-manual-ano") ? Number(g("lib-manual-ano")) : null, categoria: g("lib-manual-categoria") || "Ficção",
    quantidade: Number(g("lib-manual-quantidade")) || 1, localizacion: g("lib-manual-local"), capa: g("lib-manual-capa")
  };
  if (!payload.titulo || !payload.autor) return showToast("Título e autor são obrigatórios.", "warning");
  try {
    await apiJson("/api/livros", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    closeModal("lib-manual-modal");
    showToast("Livro adicionado.", "success");
    loadLibros().then(() => renderAcervo("lib"));
  } catch (e) { showToast(e.message, "error"); }
}
async function editarLibro() {
  const b = state.selectedBook; if (!b) return;
  const g = (id) => document.getElementById(id).value.trim();
  const payload = {
    titulo: g("lib-edit-titulo"), autor: g("lib-edit-autor"),
    ano: g("lib-edit-ano") ? Number(g("lib-edit-ano")) : b.ano, categoria: g("lib-edit-categoria"),
    isbn: g("lib-edit-isbn"), localizacion: g("lib-edit-local")
  };
  try {
    await apiJson("/api/livros/" + b.id, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    closeModal("lib-edit-modal");
    showToast("Alterações salvas.", "success");
    loadLibros().then(() => { renderAcervo("lib"); openBookDetail(state.livros.find(x => x.id === b.id) || b, "lib"); });
  } catch (e) { showToast(e.message, "error"); }
}
async function excluirLibro() {
  const b = state.selectedBook; if (!b) return;
  try {
    await apiJson("/api/livros/" + b.id, { method: "DELETE" });
    closeModal("lib-delete-modal");
    showToast("Livro excluído.", "success");
    state.selectedBook = null;
    loadLibros().then(() => renderAcervo("lib"));
    showScreen("lib-acervo");
  } catch (e) { showToast(e.message, "error"); }
}

// ─── Empréstimo rápido a partir do detalhe ─────────────────────────────────────
function abrirModalEmprestimo() {
  const body = document.getElementById("lib-loan-body");
  if (!body || !state.selectedBook) return;
  body.innerHTML =
    '<div class="field-stack">' +
    '<label class="field"><span class="field-label">Tipo</span><select class="input" id="loan-tipo"><option value="estudante">Estudante</option><option value="professor">Professor</option></select></label>' +
    '<label class="field"><span class="field-label">Nome completo</span><input class="input" id="loan-nome" type="text" placeholder="Nome do leitor"></label>' +
    '<label class="field"><span class="field-label">E-mail</span><input class="input" id="loan-email" type="email"></label>' +
    '<label class="field" id="loan-sala-field"><span class="field-label">Sala</span><input class="input" id="loan-sala" type="text"></label>' +
    '<label class="field"><span class="field-label">Dias de empréstimo</span><input class="input" id="loan-prazo" type="number" value="7"></label>' +
    '<label class="field"><span class="field-label">PIN (se o sistema exigir)</span><input class="input" id="loan-senha" type="password"></label></div>';
  openModal("lib-loan-modal");
}
async function confirmarEmprestimo() {
  const g = (id) => document.getElementById(id).value.trim();
  const payload = {
    tipo: g("loan-tipo") || "estudante", nome: g("loan-nome"), email: g("loan-email"), sala: g("loan-sala"),
    prazo: g("loan-prazo") || "7", livros: [state.selectedBook.id], senha: g("loan-senha")
  };
  if (!payload.nome) return showToast("O nome é obrigatório.", "warning");
  try {
    await apiJson("/api/emprestimos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    closeModal("lib-loan-modal");
    showToast("Empréstimo realizado.", "success");
    loadLibros().then(() => renderAcervo("lib"));
  } catch (e) { showToast(e.message, "error"); }
}
// ─── Empréstimos (lib) ──────────────────────────────────────────────────────
function hojeIso() { const d = new Date(); const t = new Date(d.getTime() - 3 * 3600000); return t.toISOString().split("T")[0]; }
function emprestimoDevolucaoHoje(l) {
  return (l.status === "Aprovado" || l.status === "Atrasado") && String(l.data_vencimento).slice(0, 10) === hojeIso();
}
function loanStatusVisao(l) {
  if (l.status === "Devolvido") return "Devolvido";
  if (l.status === "Pendente") return "Pendente";
  if (l.status === "Atrasado") return "Atrasado";
  if (emprestimoDevolucaoHoje(l)) return "Devolução Hoje";
  return "Aprovado";
}
async function renderLibLoans() {
  if (state.role !== "bibliotecaria") return;
  const totalEl = document.getElementById("lib-loans-total");
  const body = document.getElementById("lib-loans-body");
  if (!body) return;
  try { state.loansCache = await apiJson("/api/emprestimos/todos"); } catch (e) { state.loansCache = []; }
  if (totalEl) totalEl.textContent = String(state.loansCache.length);
  const filtro = state.loanFilter;
  let lista = state.loansCache.slice();
  if (filtro === "Ativos") lista = lista.filter(l => l.status === "Aprovado");
  else if (filtro === "Atrasados") lista = lista.filter(l => l.status === "Atrasado");
  else if (filtro === "Devolução Hoje") lista = lista.filter(emprestimoDevolucaoHoje);
  else if (filtro === "Devolvidos") lista = lista.filter(l => l.status === "Devolvido");
  if (!lista.length) { body.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--muted-foreground)">Sem resultados</td></tr>'; return; }
  body.innerHTML = lista.map(l => {
    const sv = loanStatusVisao(l);
    const puedeRenovar = l.status === "Aprovado" || l.status === "Atrasado";
    const puedeDevolver = l.status !== "Devolvido";
    const acciones = (puedeRenovar ? '<button class="btn-ico" data-renew="' + l.id + '" title="Renovar">Renovar</button>' : "") +
      (puedeDevolver ? '<button class="btn-ico" data-return="' + l.id + '" title="Devolver">Devolver</button>' : "—");
    return '<tr><td class="cell-leader">' + esc(l.leitor) + '</td>' +
      '<td>' + esc(l.livro) + '</td>' +
      '<td>' + esc(fmtData(l.data_emprestimo)) + '</td>' +
      '<td>' + esc(fmtData(l.data_vencimento)) + '</td>' +
      '<td>' + badgeHtml(sv) + '</td>' +
      '<td class="cell-actions">' + acciones + '</td></tr>';
  }).join("");
}
async function devolverEmprestimo(id) {
  try { await apiJson("/api/emprestimos/" + id + "/devolver", { method: "POST" }); showToast("Devolução registrada.", "success"); }
  catch (e) { showToast(e.message, "error"); }
  renderLibLoans();
}
async function renovarEmprestimo(id) {
  try { const r = await apiJson("/api/emprestimos/" + id + "/renovar", { method: "POST" }); showToast("Renovado. Nova data: " + fmtData(r.nova_data), "success"); }
  catch (e) { showToast(e.message, "error"); }
  renderLibLoans();
}
// ─── Agenda ─────────────────────────────────────────────────────────────────
const DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex"];
const PERIODOS = ["Manhã", "Tarde", "Noite"];
let agendamentoSelecionado = null;
async function carregarAgendamentos() {
  try { state.agendamentos = await apiJson("/api/agendamentos"); }
  catch (e) { state.agendamentos = []; }
}
function agendaFilledHtml(a) {
  return '<button type="button" class="stu-agenda-filled" data-ag-id="' + a.id + '">' +
    '<strong>' + esc(a.materia) + '</strong><br><span style="font-size:12px">' + esc(a.professor) + '</span></button>';
}
async function renderLibAgenda() {
  if (state.role !== "bibliotecaria") return;
  await carregarAgendamentos();
  const body = document.getElementById("lib-agenda-body");
  const up = document.getElementById("lib-agenda-upcoming");
  if (!body) return;
  const qtd = state.qtdAulas || 6;
  let html = "";
  PERIODOS.forEach(per => {
    for (let aula = 1; aula <= qtd; aula++) {
      html += '<tr><td class="agenda-period">' + per + ' · Aula ' + aula + '</td>';
      DIAS.forEach((dia, di) => {
        const a = state.agendamentos.find(x => x.periodo === per && String(x.aula) === String(aula) && Number(x.dia) === (di + 1));
        if (a) html += '<td>' + agendaFilledHtml(a) + '</td>';
        else html += '<td><button type="button" class="agenda-empty-btn" data-agenda-new="' + per + '|' + aula + '|' + (di + 1) + '">+</button></td>';
      });
      html += '</tr>';
    }
  });
  body.innerHTML = html;
  if (up) {
    try {
      const proximos = await apiJson("/api/agendamentos/datas-com-agendamentos");
      up.innerHTML = proximos.map(p => '<div class="upcoming-item" data-ag-up="' + p.id + '">' +
        '<strong>' + esc(p.materia) + '</strong><span>' + esc(p.data) + ' · ' + esc(p.periodo) + '</span></div>').join("") ||
        '<p style="color:var(--muted-foreground);font-size:13px">Sem agendamentos próximos.</p>';
    } catch (e) { up.innerHTML = ""; }
  }
}
async function loadStuAgenda() {
  const body = document.getElementById("stu-agenda-body");
  if (!body) return;
  await carregarAgendamentos();
  let html = "";
  PERIODOS.forEach(per => {
    for (let aula = 1; aula <= (state.qtdAulas || 6); aula++) {
      html += '<tr><td class="agenda-period">' + per + ' · Aula ' + aula + '</td>';
      DIAS.forEach((dia, di) => {
        const a = state.agendamentos.find(x => x.periodo === per && String(x.aula) === String(aula) && Number(x.dia) === (di + 1));
        html += '<td>' + (a ? agendaFilledHtml(a) : '<span class="stu-agenda-empty">&nbsp;</span>') + '</td>';
      });
      html += '</tr>';
    }
  });
  body.innerHTML = html;
}
function abrirNuevoAgendamiento(pre) {
  const parts = pre.split("|");
  agendamentoSelecionado = { periodo: parts[0], aula: parts[1], dia: parts[2] };
  openModal("lib-agenda-new-modal");
}
function abrirDetalleAgendamiento(id) {
  const a = state.agendamentos.find(x => x.id === id);
  if (!a) return;
  agendamentoSelecionado = a;
  const body = document.getElementById("lib-agenda-filled-body");
  body.innerHTML =
    '<div class="modal-detail-cell"><p class="modal-detail-label">Professor</p><p class="modal-detail-value">' + esc(a.professor) + '</p></div>' +
    '<div class="modal-detail-cell"><p class="modal-detail-label">Matéria</p><p class="modal-detail-value">' + esc(a.materia) + '</p></div>' +
    '<div class="modal-detail-cell"><p class="modal-detail-label">Uso</p><p class="modal-detail-value">' + esc(a.uso) + '</p></div>' +
    '<div class="modal-detail-cell"><p class="modal-detail-label">Turma</p><p class="modal-detail-value">' + esc(a.turma || "—") + '</p></div>' +
    '<div class="modal-detail-cell"><p class="modal-detail-label">Período · Aula</p><p class="modal-detail-value">' + esc(a.periodo) + ' · Aula ' + esc(a.aula) + '</p></div>';
  openModal("lib-agenda-filled-modal");
}
async function guardarNuevoAgendamiento() {
  const g = (id) => document.getElementById(id).value.trim();
  const payload = {
    professor: g("lib-ag-new-prof"), materia: g("lib-ag-new-mat"), turma: g("lib-ag-new-turma"),
    uso: g("lib-ag-new-uso"), data: g("lib-ag-new-data"), periodo: g("lib-ag-new-periodo"),
    aula: Number(g("lib-ag-new-aula")) || 1, dia: Number(agendamentoSelecionado && agendamentoSelecionado.dia) || 1, senha: ""
  };
  if (!payload.professor || !payload.materia || !payload.data) return showToast("Preencha professor, matéria e data.", "warning");
  try {
    await apiJson("/api/agendamentos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    closeModal("lib-agenda-new-modal");
    showToast("Agendamento criado.", "success");
    renderLibAgenda();
  } catch (e) { showToast(e.message, "error"); }
}
async function excluirAgendamiento() {
  if (!agendamentoSelecionado) return;
  try {
    await apiJson("/api/agendamentos/" + agendamentoSelecionado.id, { method: "DELETE" });
    closeModal("lib-agenda-filled-modal");
    showToast("Agendamento excluído.", "success");
    renderLibAgenda();
  } catch (e) { showToast(e.message, "error"); }
}
// ─── Leitores ───────────────────────────────────────────────────────────────
let leitorAvatarTargetId = null;
async function loadLeitores() {
  if (state.role !== "bibliotecaria") return;
  try { state.leitores = await apiJson("/api/leitores"); }
  catch (e) { state.leitores = []; }
  renderLeitores();
}
function renderLeitores() {
  const body = document.getElementById("lib-leitores-body");
  const countEl = document.getElementById("lib-leitores-count");
  if (!body) return;
  if (countEl) countEl.textContent = String(state.leitores.length);
  let lista = state.leitores;
  if (state.readerFilter === "Estudante") lista = lista.filter(l => l.tipo === "estudante");
  else if (state.readerFilter === "Professor") lista = lista.filter(l => l.tipo === "professor");
  if (!lista.length) { body.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--muted-foreground)">Sem resultados</td></tr>'; return; }
  body.innerHTML = lista.map(l => {
    const detalhe = l.tipo === "estudante" ? (l.sala || "") + (l.periodo ? " · " + l.periodo : "") : (l.materia || "");
    return '<tr><td class="cell-leader"><div class="leitor-cell">' + archAvatarHtml(l.avatar_seed, 34) +
      '<span>' + esc(l.nome) + '</span></div></td>' +
      '<td>' + badgeHtml(l.tipo === "estudante" ? "Disponível" : "Indisponível") + '<span style="margin-left:4px">' + esc(l.tipo) + '</span></td>' +
      '<td>' + esc(detalhe) + '</td>' +
      '<td>' + esc(l.telefone || "—") + '</td>' +
      '<td class="cell-actions"><button class="btn-ico" data-leitor-avatar="' + l.id + '" title="Avatar">Avatar</button>' +
      '<button class="btn-ico btn-danger" data-leitor-delete="' + l.id + '" title="Excluir">Excluir</button></td></tr>';
  }).join("");
}
function leerTipoLeitor() {
  const btn = document.querySelector("#reader-type-tabs .segmented-item.active");
  return btn ? btn.getAttribute("data-reader-type") : "estudante";
}
async function guardarLeitor() {
  const g = (id) => document.getElementById(id).value.trim();
  const tipo = leerTipoLeitor();
  const payload = {
    nome: g("reader-nome"), tipo: tipo, email: g("reader-email"), telefone: g("reader-tel"),
    sala: g("reader-sala"), periodo: g("reader-periodo"), materia: g("reader-materia")
  };
  if (!payload.nome) return showToast("O nome é obrigatório.", "warning");
  try {
    await apiJson("/api/leitores", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    closeModal("lib-reader-modal");
    showToast("Leitor criado.", "success");
    loadLeitores();
  } catch (e) { showToast(e.message, "error"); }
}
async function excluirLeitor(id) {
  if (!confirm("Excluir este leitor?")) return;
  try { await apiJson("/api/leitores/" + id, { method: "DELETE" }); showToast("Leitor excluído.", "success"); }
  catch (e) { showToast(e.message, "error"); }
  loadLeitores();
}
function abrirAvatarLeitor(id) {
  leitorAvatarTargetId = id;
  const l = state.leitores.find(x => x.id === id);
  const prev = document.getElementById("reader-avatar-preview");
  if (prev) prev.src = avatarUrl(l ? l.avatar_seed : "leitor");
  buildAvatarGrid("reader-avatar-grid", l ? l.avatar_seed : "leitor");
  openModal("lib-reader-avatar-modal");
}
async function guardarAvatarLeitor() {
  const sel = document.querySelector('#reader-avatar-grid .style-btn.selected');
  if (!sel || !leitorAvatarTargetId) return showToast("Escolha um avatar.", "warning");
  try {
    await apiJson("/api/leitores/" + leitorAvatarTargetId + "/avatar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ seed: sel.getAttribute("data-avatar-seed") }) });
    closeModal("lib-reader-avatar-modal");
    showToast("Avatar salvo.", "success");
    loadLeitores();
  } catch (e) { showToast(e.message, "error"); }
}

// ─── Moderação ──────────────────────────────────────────────────────────────
// app.py não possui módulo de comentários, então não há nada pendente.
function renderModeracao() {
  const list = document.getElementById("moderacao-list");
  const countEl = document.getElementById("moderacao-count");
  const empty = document.getElementById("moderacao-empty");
  if (countEl) countEl.textContent = "0";
  if (list) list.innerHTML = "";
  if (empty) empty.style.display = "flex";
}
// ─── Configurações ──────────────────────────────────────────────────────────
const CONFIG_TOGGLES = {
  "bloquear_email": { status: "/api/config/bloquear_email/status", set: "/api/config/bloquear_email/set", campo: "bloqueado" },
  "exigir_senha_emprestimo": { status: "/api/config/exigir_senha_emprestimo/status", set: "/api/config/exigir_senha_emprestimo/set", campo: "ativo" },
  "exigir_senha_agendamento": { status: "/api/config/exigir_senha_agendamento/status", set: "/api/config/exigir_senha_agendamento/set", campo: "ativo" },
  "obligar_localizacion_livro": { status: "/api/config/obrigar_localizacao_livro/status", set: "/api/config/obrigar_localizacao_livro/set", campo: "ativo" },
  "bloquear_excluir_agendamiento": { status: "/api/config/bloquear_excluir_agendamento/status", set: "/api/config/bloquear_excluir_agendamento/set", campo: "ativo" }
};
async function carregarConfig() {
  if (state.role !== "bibliotecaria") return;
  configAtualCarregando = true;
  for (const key of Object.keys(CONFIG_TOGGLES)) {
    const def = CONFIG_TOGGLES[key];
    const btn = document.querySelector('[data-config-toggle="' + key + '"]');
    try {
      const d = await apiJson(def.status);
      const activo = d[def.campo] === true || d[def.campo] === "true";
      if (btn) { if (activo) btn.classList.add("on"); else btn.classList.remove("on"); }
    } catch (e) { if (btn) btn.classList.remove("on"); }
  }
  try {
    const a = await apiJson("/api/config/quantidade_aulas/status");
    state.qtdAulas = a.quantidade || 6;
    const el = document.getElementById("config-aulas");
    if (el) el.value = String(state.qtdAulas);
  } catch (e) {}
  try {
    const e = await apiJson("/api/config/email/status");
    const el = document.getElementById("config-email-org");
    if (el) el.value = e.email || "";
  } catch (e) {}
  configAtualCarregando = false;
}
let configAtualCarregando = false;
async function toggleConfig(key, btn) {
  if (configAtualCarregando) return;
  const def = CONFIG_TOGGLES[key];
  const activo = btn.classList.contains("on");
  try {
    const body = {}; body[def.campo] = !activo;
    await apiJson(def.set, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (activo) btn.classList.remove("on"); else btn.classList.add("on");
  } catch (e) { showToast(e.message, "error"); }
}
async function guardarAulas() {
  const el = document.getElementById("config-aulas");
  const q = Number(el.value);
  if (!q || q < 1 || q > 20) return showToast("A quantidade deve estar entre 1 e 20.", "warning");
  try { await apiJson("/api/config/quantidade_aulas/set", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quantidade: q }) }); showToast("Quantidade de aulas salva.", "success"); state.qtdAulas = q; }
  catch (e) { showToast(e.message, "error"); }
}
async function guardarEmail() {
  const org = document.getElementById("config-email-org").value.trim();
  const pass = document.getElementById("config-email-pass").value.trim();
  try {
    await apiJson("/api/config/email/set", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email_organizacao: org, email_app_password: pass }) });
    showToast("E-mail salvo.", "success");
  } catch (e) { showToast(e.message, "error"); }
}
async function guardarPin() {
  const oldV = document.getElementById("config-pin-old").value.trim();
  const newV = document.getElementById("config-pin-new").value.trim();
  const confV = document.getElementById("config-pin-confirm").value.trim();
  if (newV !== confV) return showToast("Os novos PINs não coincidem.", "warning");
  if (!/^\d{4}$/.test(newV)) return showToast("O PIN deve ter 4 dígitos.", "warning");
  try {
    const st = await apiJson("/api/config/senha/status");
    if (st.set) {
      const chk = await apiJson("/api/config/senha/verificar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ senha: oldV }) });
      if (!chk.valido) return showToast("O PIN atual está incorreto.", "error");
    }
    await apiJson("/api/config/senha/definir", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ senha: newV }) });
    showToast("PIN atualizado.", "success");
    document.getElementById("config-pin-old").value = ""; document.getElementById("config-pin-new").value = ""; document.getElementById("config-pin-confirm").value = "";
  } catch (e) { showToast(e.message, "error"); }
}
// ─── Telas do aluno ───────────────────────────────────────────────────
async function loadStuLoans() {
  if (state.role !== "aluno") return;
  const body = document.getElementById("stu-loans-list");
  const sub = document.getElementById("stu-loans-subtitle");
  if (!body) return;
  let ativos = []; let historico = [];
  try { ativos = await apiJson("/api/aluno/emprestimos?estado=ativos"); } catch (e) { ativos = []; }
  try { historico = await apiJson("/api/aluno/emprestimos?estado=todo"); } catch (e) { historico = []; }
  if (sub) sub.textContent = "Você tem " + ativos.length + " empréstimo(s) ativo(s).";
  if (!ativos.length) {
    body.innerHTML = '<div class="empty-state empty-center" style="margin:24px 0"><p class="empty-state-text">Sem empréstimos ativos.</p></div>';
    return;
  }
  body.innerHTML = ativos.map(l =>
    '<div class="loan-card"><div class="loan-card-cover"><img src="' + esc(l.capa) + '" alt="" loading="lazy"></div>' +
    '<div class="loan-card-info"><p class="loan-card-title">' + esc(l.livro) + '</p>' +
    '<p style="margin:4px 0 0 0;font-size:13px;color:var(--muted-foreground)">Até ' + esc(fmtData(l.data_vencimento)) + '</p></div>' +
    '<div>' + badgeHtml(loanStatusVisao(l)) + '</div></div>'
  ).join("");
}
async function loadStuHistorico() {
  const grid = document.getElementById("stu-historico-grid");
  if (!grid) return;
  let historico = [];
  try { historico = await apiJson("/api/aluno/emprestimos?estado=todo"); } catch (e) {}
  if (!historico.length) { grid.innerHTML = '<p style="color:var(--muted-foreground)">Você ainda não tem histórico.</p>'; return; }
  grid.innerHTML = historico.map(l =>
    '<div class="history-card" style="display:flex;align-items:center;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;gap:16px">' +
    '<div style="width:40px;height:56px;border-radius:6px;background:url(' + esc(l.capa) + ') center/cover;background-color:var(--muted);flex-shrink:0"></div>' +
    '<div style="flex:1"><p style="background:var(--foreground);">' + esc(l.livro) + '</p>' +
    '<p style="font-size:12px;color:var(--muted-foreground)">' + esc(fmtData(l.data_emprestimo)) + '</p></div>' +
    '<div>' + badgeHtml(loanStatusVisao(l)) + '</div></div>'
  ).join("");
}
function renderStuReservas() { /* app.py não gerencia reservas */ }
async function loadStuPerfil() {
  if (state.role !== "aluno" || !state.aluno) return;
  const a = state.aluno;
  const name = document.getElementById("profile-name");
  const meta = document.getElementById("profile-meta");
  const email = document.getElementById("profile-email");
  const avatar = document.getElementById("profile-avatar");
  if (name) name.textContent = a.nome;
  if (meta) meta.textContent = (a.tipo === "professor" ? "Professor" : "Aluno") + (a.sala ? " · " + a.sala : "") + (a.periodo ? " · " + a.periodo : "");
  if (email) email.textContent = "E-mail: " + (a.email || "—");
  if (avatar) avatar.innerHTML = archAvatarHtml(a.avatar_seed || state.avatar_seed, 96);
  const prev = document.getElementById("avatar-preview");
  if (prev) prev.src = avatarUrl(a.avatar_seed || state.avatar_seed);
  buildAvatarGrid("style-grid", a.avatar_seed || state.avatar_seed);
  let ativos = []; let historico = [];
  try { ativos = await apiJson("/api/aluno/emprestimos?estado=ativos"); } catch (e) {}
  try { historico = await apiJson("/api/aluno/emprestimos?estado=todo"); } catch (e) {}
  document.getElementById("profile-stat-lidos").textContent = String(historico.filter(h => h.status === "Devolvido").length);
  document.getElementById("profile-stat-progress").textContent = String(ativos.length);
}
async function guardarAvatarPerfil() {
  const sel = document.querySelector('#style-grid .style-btn.selected');
  if (!sel) return showToast("Escolha um avatar.", "warning");
  const seed = sel.getAttribute("data-avatar-seed");
  try {
    await apiJson("/api/aluno/avatar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ seed }) });
    state.avatar_seed = seed;
    if (state.aluno) state.aluno.avatar_seed = seed;
    const prev = document.getElementById("avatar-preview");
    if (prev) prev.src = avatarUrl(seed);
    rebindSidebarUser();
    loadStuPerfil();
    showToast("Avatar salvo.", "success");
  } catch (e) { showToast(e.message, "error"); }
}

// ─── Chat BIBI (simples) ─────────────────────────────────────────────────────
function abrirChat() {
  const m = document.getElementById("chat-messages");
  if (!m) return;
  openModal("chat-modal");
  m.innerHTML = '<div class="chat-msg chat-bot">Olá! Eu sou a BIBI. Pergunte sobre este livro (' + esc(state.selectedBook ? state.selectedBook.titulo : "") + ').</div>';
  document.getElementById("chat-input").value = "";
}
function enviarChat() {
  const input = document.getElementById("chat-input");
  const m = document.getElementById("chat-messages");
  if (!m || !input.value.trim()) return;
  m.innerHTML += '<div class="chat-msg chat-user">' + esc(input.value) + '</div>';
  input.value = "";
  m.innerHTML += '<div class="chat-msg chat-bot">Obrigada pela pergunta! Alguém da biblioteca da escola poderá ajudar com mais detalhes. 📚</div>';
  m.scrollTop = m.scrollHeight;
}
// ─── Navegação ─────────────────────────────────────────────────────────────
function goto(dataGo) {
  if (dataGo === "landing") { showScreen("landing"); return; }
  if (dataGo === "login") { switchLoginRole(state.loginRole); setLoginMode(state.loginExiste); showScreen("login"); return; }
  const el = document.getElementById(dataGo);
  if (el) showScreen(dataGo);
  if (dataGo === "lib-moderacao") renderModeracao();
  if (dataGo === "stu-reservas") renderStuReservas();
  if (dataGo === "stu-historico") loadStuHistorico();
  if (dataGo === "stu-emprestimos") loadStuLoans();
  if (dataGo === "stu-agenda") loadStuAgenda();
  if (dataGo === "stu-perfil") loadStuPerfil();
  if (dataGo === "lib-agenda") renderLibAgenda();
  if (dataGo === "lib-emprestimos") renderLibLoans();
}

// ─── Inicialização ─────────────────────────────────────────────────────────
async function init() {
  applyTheme(getTheme());
  initCarousel();
  try {
    const est = await apiJson("/api/bibliotecaria/estado");
    state.loginExiste = !!est.existe;
    if (est.autenticado) {
      try {
        const p = await apiJson("/api/bibliotecaria/perfil");
        state.usuario = p.usuario; state.avatar_seed = p.avatar_seed;
      } catch (e) { state.usuario = "Bibliotecaria"; state.avatar_seed = "bibliotecaria"; }
      state.role = "bibliotecaria";
      enterApp();
      return;
    }
  } catch (e) { state.loginExiste = false; }
  try {
    const p = await apiJson("/api/aluno/perfil");
    if (p.autenticado && p.aluno) {
      state.role = "aluno"; state.aluno = p.aluno; state.usuario = p.aluno.nome; state.avatar_seed = p.aluno.avatar_seed;
      enterApp();
      return;
    }
  } catch (e) {}
  setLoginMode(state.loginExiste);
  switchLoginRole("bibliotecaria");
}

// ─── Novo livro / edição: prefill ─────────────────────────────────────────
function abrirEdicao() {
  const b = state.selectedBook; if (!b) return;
  document.getElementById("lib-edit-titulo").value = b.titulo || "";
  document.getElementById("lib-edit-autor").value = b.autor || "";
  document.getElementById("lib-edit-ano").value = String(b.ano || "");
  document.getElementById("lib-edit-categoria").value = b.categoria || "";
  document.getElementById("lib-edit-isbn").value = b.isbn || "";
  document.getElementById("lib-edit-local").value = b.localizacion || "";
  openModal("lib-edit-modal");
}
// ─── Eventos globais (parte 1) ─────────────────────────────────────────────
function bindEvents() {
  document.addEventListener("click", (e) => {
    let el;

    el = e.target.closest("[data-landing-tab]");
    if (el) {
      state.landingTab = el.getAttribute("data-landing-tab");
      document.querySelectorAll(".landing-nav-btn").forEach(b => b.classList.toggle("active", b === el));
      const home = document.getElementById("landing-home");
      const sobre = document.getElementById("landing-sobre");
      if (home) home.style.display = state.landingTab === "home" ? "" : "none";
      if (sobre) sobre.style.display = state.landingTab === "sobre" ? "" : "none";
      return;
    }
    el = e.target.closest("[data-go]");
    if (el) { goto(el.getAttribute("data-go")); return; }
    el = e.target.closest("#login-tabs .segmented-item");
    if (el) { switchLoginRole(el.getAttribute("data-login-role")); return; }
    el = e.target.closest("#login-submit");
    if (el) { submitLogin(); return; }
    el = e.target.closest(".sidebar-nav-item");
    if (el) {
      document.querySelectorAll(".sidebar-nav-item").forEach(n => n.classList.remove("active"));
      el.classList.add("active");
      goto(el.getAttribute("data-goto"));
      return;
    }
    el = e.target.closest("#sidebar-logout");
    if (el) { logout(); return; }
    el = e.target.closest("#theme-toggle");
    if (el) { toggleTheme(); return; }
    el = e.target.closest("[data-modal-open]");
    if (el) { openModal(el.getAttribute("data-modal-open")); return; }
    el = e.target.closest("[data-modal-close]");
    if (el) { closeModal(el.getAttribute("data-modal-close")); return; }
    el = e.target.closest(".book-card");
    if (el) {
      const id = Number(el.getAttribute("data-book-id"));
      const b = state.livros.find(x => x.id === id);
      if (b) openBookDetail(b, el.getAttribute("data-prefix"));
      return;
    }
    el = e.target.closest("[data-open-loan]");
    if (el) { abrirModalEmprestimo(); return; }
    el = e.target.closest("[data-open-edit]");
    if (el) { abrirEdicao(); return; }
    el = e.target.closest("[data-open-delete]");
    if (el) { openModal("lib-delete-modal"); return; }
    el = e.target.closest("[data-chat-open]");
    if (el) { abrirChat(); return; }
    el = e.target.closest("#lib-isbn-search");
    if (el) {
      document.getElementById("lib-manual-isbn").value = document.getElementById("lib-isbn-input").value.trim();
      closeModal("lib-isbn-modal");
      openModal("lib-manual-modal");
      return;
    }
    el = e.target.closest("#lib-manual-save");
    if (el) { salvarLivroManual(); return; }
    el = e.target.closest("#lib-edit-save");
    if (el) { editarLibro(); return; }
    el = e.target.closest("#lib-delete-confirm");
    if (el) { excluirLibro(); return; }
    el = e.target.closest("#lib-loan-confirm");
    if (el) { confirmarEmprestimo(); return; }
    el = e.target.closest("[data-loan-filter]");
    if (el) {
      state.loanFilter = el.getAttribute("data-loan-filter");
      document.querySelectorAll("#lib-loans-tabs .tab-button").forEach(b => b.classList.toggle("active", b === el));
      renderLibLoans();
      return;
    }
    el = e.target.closest("[data-reader-filter]");
    if (el) {
      state.readerFilter = el.getAttribute("data-reader-filter");
      document.querySelectorAll("#lib-readers-tabs .tab-button").forEach(b => b.classList.toggle("active", b === el));
      renderLeitores();
      return;
    }
    el = e.target.closest("[data-reader-type]");
    if (el) {
      document.querySelectorAll("#reader-type-tabs .segmented-item").forEach(b => b.classList.toggle("active", b === el));
      const esProf = el.getAttribute("data-reader-type") === "professor";
      document.getElementById("reader-fields-professor").style.display = esProf ? "" : "none";
      document.getElementById("reader-fields-student").style.display = esProf ? "none" : "";
      return;
    }
    el = e.target.closest("[data-renew]");
    if (el) { renovarEmprestimo(Number(el.getAttribute("data-renew"))); return; }
    el = e.target.closest("[data-return]");
    if (el) { devolverEmprestimo(Number(el.getAttribute("data-return"))); return; }
    el = e.target.closest("[data-agenda-new]");
    if (el) { abrirNuevoAgendamiento(el.getAttribute("data-agenda-new")); return; }
    el = e.target.closest("[data-ag-id],[data-ag-up]");
    if (el) { abrirDetalleAgendamiento(Number(el.getAttribute("data-ag-id") || el.getAttribute("data-ag-up"))); return; }
    el = e.target.closest("#lib-agenda-new-save");
    if (el) { guardarNuevoAgendamiento(); return; }
    el = e.target.closest("#lib-agenda-filled-delete");
    if (el) { excluirAgendamiento(); return; }
    el = e.target.closest("[data-leitor-avatar]");
    if (el) { abrirAvatarLeitor(Number(el.getAttribute("data-leitor-avatar"))); return; }
    el = e.target.closest("[data-leitor-delete]");
    if (el) { excluirLeitor(Number(el.getAttribute("data-leitor-delete"))); return; }
    el = e.target.closest("#lib-reader-save");
    if (el) { guardarLeitor(); return; }
    el = e.target.closest("#reader-avatar-save");
    if (el) { guardarAvatarLeitor(); return; }
    el = e.target.closest("[data-config-toggle]");
    if (el) { toggleConfig(el.getAttribute("data-config-toggle"), el); return; }
    el = e.target.closest("#config-aulas-save");
    if (el) { guardarAulas(); return; }
    el = e.target.closest("#config-email-save");
    if (el) { guardarEmail(); return; }
    el = e.target.closest("#config-pin-save");
    if (el) { guardarPin(); return; }
    el = e.target.closest(".style-btn");
    if (el) {
      const grid = el.closest(".style-grid");
      if (grid) {
        grid.querySelectorAll(".style-btn").forEach(b => b.classList.remove("selected"));
        el.classList.add("selected");
        const img = el.querySelector("img");
        if (grid.id === "reader-avatar-grid" && img) {
          const p = document.getElementById("reader-avatar-preview");
          if (p) p.src = img.src;
        } else if (grid.id === "style-grid" && img) {
          const p = document.getElementById("avatar-preview");
          if (p) p.src = img.src;
        }
      }
      return;
    }
    el = e.target.closest("#avatar-save");
    if (el) { guardarAvatarPerfil(); return; }
    el = e.target.closest("#chat-send");
    if (el) { enviarChat(); return; }
    el = e.target.closest("#chat-close");
    if (el) { closeModal("chat-modal"); return; }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.getElementById("login").classList.contains("active")) {
      submitLogin();
    }
  });

  const libSearch = document.getElementById("lib-acervo-search");
  if (libSearch) libSearch.addEventListener("input", () => renderAcervo("lib"));
  const stuSearch = document.getElementById("stu-acervo-search");
  if (stuSearch) stuSearch.addEventListener("input", () => renderAcervo("stu"));
}

bindEvents();
init();