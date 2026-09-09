// ─── BIBI · JavaScript puro (tradução do protótipo React) ───────────────────
// Padrão de navegação idêntico ao app.py: seções .screen, mostrarTela() troca a
// classe .active. Sem módulos, sem dependências.

// ─── Estado global ───────────────────────────────────────────────────────────
let currentScreen = "landing";
let role = null;                       // "bibliotecaria" | "aluno" | null
let landingTab = "home";               // "home" | "sobre"
let loginRole = "bibliotecaria";
let libSelectedBook = BOOKS[0];
let stuSelectedBook = BOOKS[0];
let loanFilter = "Todos";
let readerFilter = "Todos";
let moderacaoItems = COMMENTS.slice();
let reservas = BOOKS.slice(2, 4);
let agendaNewSlot = null;
let chatBook = BOOKS[0];
let chatMessages = [];
let currentRating = 0;
let avatarSeed = "ana";
let avatarStyle = "adventurer";

const LIB_ITEMS = [
  { label: "Dashboard", icon: "⬛", screen: "lib-dashboard" },
  { label: "Acervo", icon: "📚", screen: "lib-acervo" },
  { label: "Empréstimos", icon: "🔄", screen: "lib-emprestimos" },
  { label: "Agenda", icon: "📅", screen: "lib-agenda" },
  { label: "Leitores", icon: "👥", screen: "lib-leitores" },
  { label: "Moderação", icon: "🛡️", screen: "lib-moderacao" },
  { label: "Configurações", icon: "⚙️", screen: "lib-config" },
];

const STU_ITEMS = [
  { label: "Acervo", icon: "📚", screen: "stu-acervo" },
  { label: "Meus Empréstimos", icon: "🔄", screen: "stu-emprestimos" },
  { label: "Minhas Reservas", icon: "🔖", screen: "stu-reservas" },
  { label: "Meu Histórico", icon: "📖", screen: "stu-historico" },
  { label: "Agenda", icon: "📅", screen: "stu-agenda" },
  { label: "Meu Perfil", icon: "🧑", screen: "stu-perfil" },
];

const AVATAR_STYLES = ["adventurer", "avataaars", "big-ears", "croodles", "fun-emoji", "lorelei", "micah"];

// ─── Helpers de render ───────────────────────────────────────────────────────
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function badgeHtml(status) {
  const map = {
    "Ativo": "badge-green",
    "Atrasado": "badge-red",
    "Devolvido": "badge-gray",
    "Devolução Hoje": "badge-yellow",
    "Pendente": "badge-yellow",
    "Aprovado": "badge-green",
    "Disponível": "badge-green",
    "Indisponível": "badge-red",
  };
  const cls = map[status] || "badge-default";
  return '<span class="badge ' + cls + '">' + esc(status) + '</span>';
}

function archAvatarHtml(seed, size) {
  const h = Math.round(size * 1.3);
  const rad = Math.round(size / 6);
  return '<div class="arch-avatar" style="width:' + size + 'px;height:' + h + 'px;border-radius:' +
    size + 'px ' + size + 'px ' + rad + 'px ' + rad + 'px">' +
    '<img src="https://api.dicebear.com/7.x/adventurer/svg?seed=' + seed + '&backgroundColor=fef3c7" alt="avatar"></div>';
}

function avatarUrl(style, seed) {
  return 'https://api.dicebear.com/7.x/' + style + '/svg?seed=' + seed + '&backgroundColor=fef3c7';
}

function bookCardHtml(book, detailScreen) {
  const status = book.available > 0 ? "Disponível" : "Indisponível";
  return '<div class="book-card" data-book-id="' + book.id + '" data-detail-screen="' + detailScreen + '">' +
    '<div class="book-card-cover"><img src="' + book.cover + '" alt="' + esc(book.title) + '" loading="lazy">' +
    '<div class="book-card-badge">' + badgeHtml(status) + '</div></div>' +
    '<p class="book-card-title">' + esc(book.title) + '</p>' +
    '<p class="book-card-author">' + esc(book.author) + '</p></div>';
}

function commentCardsHtml() {
  return COMMENTS.map(function (c) {
    return '<div class="comment-card">' +
      '<div class="comment-head"><img class="avatar avatar-24" src="' + c.avatar + '" alt="' + esc(c.student) + '">' +
      '<span class="comment-name">' + esc(c.student) + '</span><span class="comment-stars">★★★★★</span></div>' +
      '<p class="comment-text">' + esc(c.text) + '</p></div>';
  }).join("");
}
// ─── Navegación ───────────────────────────────────────────────────────────────
function mostrarTela(name) {
  currentScreen = name;
  // O LoginScreen do React desmonta ao sair da tela; ao voltar, reseta para o
  // estado padrão (aba "Bibliotecária" e campos correspondentes).
  if (name === "login") {
    loginRole = "bibliotecaria";
    document.querySelectorAll("[data-login-role]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-login-role") === "bibliotecaria");
    });
    var lf = document.querySelector(".login-fields");
    if (lf) lf.classList.remove("mode-stu");
  }
  var isAuthed = name.indexOf("lib-") === 0 || name.indexOf("stu-") === 0;
  document.querySelectorAll(".screen").forEach(function (s) {
    var on = (s.id === name) || (isAuthed && s.id === "app");
    s.classList.toggle("active", on);
  });
  if (isAuthed) renderSidebar();
  var main = document.getElementById("main");
  if (main) main.scrollTop = 0;
}

function renderSidebar() {
  var items = role === "bibliotecaria" ? LIB_ITEMS : STU_ITEMS;
  document.getElementById("sidebar-nav").innerHTML = items.map(function (it) {
    var active = currentScreen === it.screen ? " active" : "";
    return '<button type="button" class="sidebar-nav-item' + active + '" data-screen="' + it.screen + '">' +
      '<span class="sidebar-nav-item-icon">' + it.icon + '</span>' + esc(it.label) + '</button>';
  }).join("");

  var isLib = role === "bibliotecaria";
  document.getElementById("sidebar-user-name").textContent = isLib ? "Dra. Helena" : "Ana Souza";
  document.getElementById("sidebar-user-sub").textContent = isLib ? "Bibliotecária" : "Aluna · 9A";
  document.getElementById("sidebar-user-avatar").innerHTML = archAvatarHtml(isLib ? "librarian" : "student", 36);
}

function handleLogout() {
  role = null;
  landingTab = "home";
  setLandingTabUI("home");
  mostrarTela("landing");
}

function setLandingTabUI(tab) {
  landingTab = tab;
  document.getElementById("landing-home").style.display = tab === "home" ? "" : "none";
  document.getElementById("landing-sobre").style.display = tab === "sobre" ? "" : "none";
  document.querySelectorAll("[data-landing-tab]").forEach(function (b) {
    b.classList.toggle("active", b.getAttribute("data-landing-tab") === tab);
  });
}

// ─── Modais ──────────────────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add("open"); }
function closeModal(id) { document.getElementById(id).classList.remove("open"); }

// ─── Carrossel do hero (troca automática) ────────────────────────────────────
function initCarousel() {
  var el = document.getElementById("hero-carousel");
  var overlay = el.querySelector(".hero-carousel-overlay");
  CAROUSEL_IMAGES.forEach(function (img, i) {
    var im = document.createElement("img");
    im.src = img.src;
    im.alt = img.alt;
    im.style.opacity = i === 0 ? "1" : "0";
    el.insertBefore(im, overlay);
  });
  var idx = 0;
  setInterval(function () {
    var imgs = el.querySelectorAll("img");
    var prev = idx;
    idx = (idx + 1) % CAROUSEL_IMAGES.length;
    imgs[prev].style.opacity = "0";
    imgs[idx].style.opacity = "1";
  }, 4000);
}

// ─── Login ───────────────────────────────────────────────────────────────────
function bindLogin() {
  var loginFields = document.querySelector(".login-fields");
  document.querySelectorAll("[data-login-role]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      loginRole = btn.getAttribute("data-login-role");
      document.querySelectorAll("[data-login-role]").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      loginFields.classList.toggle("mode-stu", loginRole === "aluno");
    });
  });
  document.getElementById("login-submit").addEventListener("click", function () {
    role = loginRole;
    mostrarTela(loginRole === "bibliotecaria" ? "lib-dashboard" : "stu-acervo");
  });
}

// ─── Tema claro/escuro ───────────────────────────────────────────────────────
function bindTheme() {
  var btn = document.getElementById("theme-toggle");
  btn.addEventListener("click", function () {
    var dark = document.documentElement.classList.toggle("dark");
    btn.textContent = dark ? "☀️ Tema claro" : "🌙 Tema escuro";
  });
}

// ─── Delegação de eventos (cliques) ─────────────────────────────────────────
document.addEventListener("click", function (e) {
  var el;

  el = e.target.closest("[data-go]");
  if (el) { mostrarTela(el.getAttribute("data-go")); return; }

  el = e.target.closest("[data-screen]");
  if (el) { mostrarTela(el.getAttribute("data-screen")); return; }

  el = e.target.closest("[data-modal-open]");
  if (el) { openModal(el.getAttribute("data-modal-open")); return; }

  el = e.target.closest("[data-modal-close]");
  if (el) { closeModal(el.getAttribute("data-modal-close")); return; }

  el = e.target.closest(".modal-backdrop");
  if (el && e.target === el) { el.classList.remove("open"); return; }

  el = e.target.closest(".chat-backdrop");
  if (el && e.target === el) { closeChat(); return; }

  el = e.target.closest(".book-card");
  if (el) {
    var bid = Number(el.getAttribute("data-book-id"));
    var dst = el.getAttribute("data-detail-screen");
    var book = BOOKS.find(function (b) { return b.id === bid; });
    if (book && dst) { openBookDetail(book, dst); }
    return;
  }

  el = e.target.closest("[data-landing-tab]");
  if (el) { setLandingTabUI(el.getAttribute("data-landing-tab")); return; }
});
// ─── Dashboard ───────────────────────────────────────────────────────────────
function renderDashboard() {
  var generos = [
    { name: "Literatura Brasileira", value: 82 },
    { name: "Ficção", value: 67 },
    { name: "Fantasia", value: 54 },
    { name: "Distopia", value: 38 },
    { name: "Infantojuvenil", value: 71 },
  ];
  var max = Math.max.apply(null, generos.map(function (g) { return g.value; }));

  document.getElementById("dash-bars").innerHTML = generos.map(function (g) {
    var pct = Math.round((g.value / max) * 100);
    return '<div><div class="bar-head"><span class="bar-label">' + esc(g.name) + '</span><span class="bar-value">' + g.value + '</span></div>' +
      '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%"></div></div></div>';
  }).join("");

  document.getElementById("dash-top-books").innerHTML = BOOKS.slice(0, 5).map(function (b, i) {
    return '<li><span class="rank-index">' + (i + 1) + '</span><img class="rank-cover" src="' + b.cover + '" alt="' + esc(b.title) + '">' +
      '<div class="rank-min"><p class="rank-name">' + esc(b.title) + '</p><p class="rank-sub">' + esc(b.author) + '</p></div></li>';
  }).join("");

  var medalColors = ["#f5c842", "#c0c0c0", "#cd7f32", "#eee"];
  var medalText = ["#333", "#333", "#333", "#888"];
  var counts = [12, 9, 8, 7];
  document.getElementById("dash-ranking").innerHTML = READERS.slice(0, 4).map(function (r, i) {
    return '<li><span class="rank-medal" style="background:' + medalColors[i] + ';color:' + medalText[i] + '">' + (i + 1) + '</span>' +
      '<img class="avatar avatar-32" src="' + r.avatar + '" alt="' + esc(r.name) + '">' +
      '<div class="rank-min"><p class="rank-name">' + esc(r.name) + '</p><p class="rank-sub">' + counts[i] + ' livros</p></div></li>';
  }).join("");

  document.getElementById("dash-loans").innerHTML = LOANS.slice(0, 4).map(function (l) {
    return '<tr><td class="cell-leader"><div class="cell-user"><img class="avatar avatar-28" src="' + l.avatar + '" alt="' + esc(l.reader) + '">' +
      '<span class="name-bold">' + esc(l.reader) + '</span></div></td>' +
      '<td>' + esc(l.book) + '</td><td>' + esc(l.due) + '</td><td>' + badgeHtml(l.status) + '</td></tr>';
  }).join("");
}

// ─── Acervo (bibliotecária e estudante) ─────────────────────────────────────
function renderAcervo(kind) {
  var isLib = kind === "lib";
  var searchEl = document.getElementById(isLib ? "lib-acervo-search" : "stu-acervo-search");
  var q = (searchEl.value || "").toLowerCase().trim();

  var filtered = isLib
    ? BOOKS.filter(function (b) { return !q || b.title.toLowerCase().indexOf(q) >= 0 || b.author.toLowerCase().indexOf(q) >= 0; })
    : BOOKS.filter(function (b) { return !q || b.title.toLowerCase().indexOf(q) >= 0; });

  var detailScreen = isLib ? "lib-book-detail" : "stu-book-detail";
  document.getElementById(isLib ? "lib-acervo-count" : "stu-acervo-count").textContent = BOOKS.length;

  var recoBooks = isLib ? BOOKS.slice(0, 3) : BOOKS.slice(4, 6).concat(BOOKS.slice(0, 1));
  document.getElementById(isLib ? "lib-acervo-reco" : "stu-acervo-reco").innerHTML =
    recoBooks.map(function (b) { return bookCardHtml(b, detailScreen); }).join("");

  var html = "";
  CATEGORIES.forEach(function (cat) {
    var catBooks = filtered.filter(function (b) { return b.category === cat; });
    if (catBooks.length === 0) return;
    html += '<div><h2 class="shelf-title">' + esc(cat) + '</h2><div class="book-row book-row-shelf">' +
      catBooks.map(function (b) { return bookCardHtml(b, detailScreen); }).join("") + '</div></div>';
  });
  document.getElementById(isLib ? "lib-acervo-shelves" : "stu-acervo-shelves").innerHTML = html;
}

["lib-acervo-search", "stu-acervo-search"].forEach(function (id) {
  document.getElementById(id).addEventListener("input", function () {
    renderAcervo(id.indexOf("lib") === 0 ? "lib" : "stu");
  });
});
// ─── Book Detail (lib + stu) ─────────────────────────────────────────────────
function detailBodyHtml(book, student) {
  var html = '';
  html += '<div><span class="detail-category">' + esc(book.category) + '</span>' +
    '<h1 class="detail-title">' + esc(book.title) + '</h1>' +
    '<p class="detail-byline">' + esc(book.author) + ' · ' + book.year + '</p></div>';

  if (student) {
    html += '<div class="detail-actions">' +
      '<button type="button" class="btn btn-primary">🔖 Reservar</button>' +
      '<button type="button" class="btn-chat-outline" data-chat-open>💬 Conversar sobre este livro</button></div>';
  } else {
    html += '<div class="detail-actions">' +
      '<button type="button" class="btn btn-secondary" data-detail-edit>✏️ Editar</button>' +
      '<button type="button" class="btn btn-danger" data-detail-delete>🗑️ Excluir</button>' +
      '<button type="button" class="btn btn-primary" data-detail-loan>🔄 Emprestar</button></div>';
  }

  if (!student) {
    html += '<div class="detail-meta">' +
      '<div class="detail-meta-cell"><p class="meta-label">ISBN</p><p class="meta-value">' + esc(book.isbn) + '</p></div>' +
      '<div class="detail-meta-cell"><p class="meta-label">Exemplares</p><p class="meta-value">' + book.available + ' disponíveis / ' + book.total + ' total</p></div>' +
      '</div>';
  }

  html += '<div><p class="detail-section-label">Sinopse</p><p class="detail-synopsis">' + esc(book.synopsis) + '</p></div>';
  html += '<div class="detail-themes">' + book.themes.map(function (t) { return '<span class="theme-chip">' + esc(t) + '</span>'; }).join("") + '</div>';

  if (!student) {
    html += '<div><p class="detail-section-label">Avaliações dos Alunos</p><div class="comment-list">' + commentCardsHtml() + '</div></div>';
  } else {
    html += '<div><p class="detail-section-label">Sua Avaliação</p><div class="star-row">' +
      [1, 2, 3, 4, 5].map(function (s) { return '<button type="button" class="star-btn" data-rating="' + s + '">★</button>'; }).join("") + '</div></div>';
    html += '<div><p class="detail-section-label">Seu Comentário</p>' +
      '<textarea class="input" id="stu-comment" rows="3" placeholder="O que você achou deste livro?"></textarea>' +
      '<button type="button" class="btn btn-primary comment-submit">Publicar</button></div>';
    html += '<div><p class="detail-section-label">Avaliações de outros leitores</p><div class="comment-list">' + commentCardsHtml() + '</div></div>';
  }
  return html;
}

function openBookDetail(book, screenId) {
  var student = screenId === "stu-book-detail";
  if (student) { stuSelectedBook = book; } else { libSelectedBook = book; }

  document.getElementById(student ? "stu-detail-cover" : "lib-detail-cover").innerHTML =
    '<img src="' + book.cover + '" alt="' + esc(book.title) + '">';
  document.getElementById(student ? "stu-detail-body" : "lib-detail-body").innerHTML = detailBodyHtml(book, student);

  if (!student) {
    document.getElementById("lib-delete-title").textContent = book.title;
    document.getElementById("lib-edit-title").value = book.title;
    document.getElementById("lib-edit-author").value = book.author;
    document.getElementById("lib-edit-year").value = String(book.year);
    document.getElementById("lib-edit-category").value = book.category;
    document.getElementById("lib-edit-isbn").value = book.isbn;
    document.getElementById("lib-loan-readers").innerHTML = READERS.slice(0, 3).map(function (r) {
      return '<div class="reader-pick"><img class="avatar avatar-32" src="' + r.avatar + '" alt="' + esc(r.name) + '">' +
        '<div><p class="reader-pick-name">' + esc(r.name) + '</p><p class="reader-pick-type">' + esc(r.type) + '</p></div></div>';
    }).join("");
  }

  currentRating = 0;
  chatBook = book;
  chatMessages = [{ from: "bibi", text: 'Olá! Estou aqui para conversar sobre "' + book.title + '". O que você quer saber?' }];
  renderChat();
  mostrarTela(screenId);
}
// ─── Lib: Empréstimos ────────────────────────────────────────────────────────
function renderLibLoans() {
  document.getElementById("lib-loans-total").textContent = LOANS.length;
  var filtered = loanFilter === "Todos"
    ? LOANS
    : LOANS.filter(function (l) { return l.status === loanFilter || (loanFilter === "Ativos" && l.status === "Ativo"); });

  document.getElementById("lib-loans-body").innerHTML = filtered.map(function (l) {
    var canAct = l.status === "Ativo" || l.status === "Atrasado" || l.status === "Devolução Hoje";
    return '<tr>' +
      '<td class="cell-leader"><div class="cell-user"><img class="avatar avatar-32" src="' + l.avatar + '" alt="' + esc(l.reader) + '">' +
      '<span class="name-bold">' + esc(l.reader) + '</span></div></td>' +
      '<td>' + esc(l.book) + '</td><td>' + esc(l.borrowed) + '</td><td>' + esc(l.due) + '</td><td>' + badgeHtml(l.status) + '</td>' +
      '<td>' + (canAct
        ? '<div class="cell-user"><button type="button" class="table-link primary">Renovar</button>' +
          '<button type="button" class="table-link green">Devolver</button></div>'
        : '') + '</td>' +
      '</tr>';
  }).join("");
}

// ─── Agenda ──────────────────────────────────────────────────────────────────
function slotFor(day, periodo) {
  return AGENDA_SLOTS.find(function (s) { return s.day === day && s.periodo === periodo; }) || null;
}

function renderLibAgenda() {
  var rows = "";
  PERIODOS.forEach(function (p) {
    rows += '<tr><td class="agenda-period-cell">' + esc(p) + '</td>';
    DAYS.forEach(function (d) {
      var slot = slotFor(d, p);
      if (slot) {
        rows += '<td class="agenda-cell"><button type="button" class="agenda-filled-btn" data-agenda-filled="' + slot.day + '|' + slot.periodo + '">' +
          '<p class="agenda-filled-materia">' + esc(slot.materia) + '</p><p class="agenda-filled-turma">' + esc(slot.turma) + '</p></button></td>';
      } else {
        rows += '<td class="agenda-cell"><button type="button" class="agenda-empty-btn" data-agenda-new="' + d + '|' + p + '">+ Agendar</button></td>';
      }
    });
    rows += '</tr>';
  });
  document.getElementById("lib-agenda-body").innerHTML = rows;

  document.getElementById("lib-agenda-upcoming").innerHTML = AGENDA_SLOTS.map(function (s) {
    return '<div class="upcoming-card"><p class="upcoming-day">' + esc(s.day) + ' · ' + esc(s.periodo) + '</p>' +
      '<p class="upcoming-materia">' + esc(s.materia) + '</p>' +
      '<p class="upcoming-detail">' + esc(s.professor) + ' · ' + esc(s.turma) + '</p></div>';
  }).join("");
}
function renderStuAgenda() {
  var rows = "";
  PERIODOS.forEach(function (p) {
    rows += '<tr><td class="agenda-period-cell">' + esc(p) + '</td>';
    DAYS.forEach(function (d) {
      var slot = slotFor(d, p);
      if (slot) {
        rows += '<td class="agenda-cell"><div class="stu-agenda-filled">' +
          '<p class="agenda-filled-materia">' + esc(slot.materia) + '</p><p class="agenda-filled-turma">' + esc(slot.turma) + '</p></div></td>';
      } else {
        rows += '<td class="agenda-cell"><div class="stu-agenda-empty"><span>Livre</span></div></td>';
      }
    });
    rows += '</tr>';
  });
  document.getElementById("stu-agenda-body").innerHTML = rows;
}

function fillAgendaDetailModal(slot) {
  var fields = [
    ["Professor", slot.professor],
    ["Matéria", slot.materia],
    ["Turma", slot.turma],
    ["Uso", slot.uso],
  ];
  document.getElementById("lib-agenda-filled-body").innerHTML = fields.map(function (f) {
    return '<div class="modal-detail-cell"><p class="modal-detail-label">' + f[0] + '</p><p class="modal-detail-value">' + esc(f[1]) + '</p></div>';
  }).join("");
}

// ─── Leitores ────────────────────────────────────────────────────────────────
function renderLeitores() {
  document.getElementById("lib-leitores-count").textContent = READERS.length;
  var filtered = readerFilter === "Todos" ? READERS : READERS.filter(function (r) { return r.type === readerFilter; });

  document.getElementById("lib-leitores-body").innerHTML = filtered.map(function (r) {
    var details = r.type === "Estudante" ? r.sala + " · " + r.periodo : r.materia;
    var chip = r.type === "Professor" ? "type-chip type-chip-prof" : "type-chip type-chip-estudante";
    return '<tr>' +
      '<td class="cell-leader"><div class="cell-name"><img class="avatar avatar-36" src="' + r.avatar + '" alt="' + esc(r.name) + '">' +
      '<span class="name-bold">' + esc(r.name) + '</span></div></td>' +
      '<td><span class="' + chip + '">' + esc(r.type) + '</span></td>' +
      '<td>' + esc(details) + '</td>' +
      '<td>' + esc(r.tel) + '</td>' +
      '<td><button type="button" class="table-link primary">Editar</button></td>' +
      '</tr>';
  }).join("");
}

// ─── Moderação ───────────────────────────────────────────────────────────────
function renderModeracao() {
  document.getElementById("moderacao-count").textContent = moderacaoItems.length;
  var list = document.getElementById("moderacao-list");
  var empty = document.getElementById("moderacao-empty");
  if (moderacaoItems.length === 0) {
    list.innerHTML = "";
    empty.classList.add("show");
    return;
  }
  empty.classList.remove("show");
  list.innerHTML = moderacaoItems.map(function (c) {
    return '<div class="moderation-card">' +
      '<div class="moderation-card-top">' +
      '<div class="moderation-who"><img class="avatar avatar-40" src="' + c.avatar + '" alt="' + esc(c.student) + '">' +
      '<div><p class="moderation-name">' + esc(c.student) + '</p>' +
      '<p class="moderation-book">Sobre: <b>' + esc(c.book) + '</b></p></div></div>' +
      '<div class="moderation-actions">' +
      '<button type="button" class="btn btn-secondary" data-mod-action="' + c.id + '" data-mod-approve>✓ Aprovar</button>' +
      '<button type="button" class="btn btn-danger" data-mod-action="' + c.id + '" data-mod-remove>✕ Remover</button>' +
      '</div></div>' +
      '<p class="moderation-text">' + esc(c.text) + '</p></div>';
  }).join("");
}
// ─── Meus Empréstimos / Reservas / Histórico ─────────────────────────────────
function renderStuLoans() {
  var myLoans = LOANS.slice(0, 3);
  document.getElementById("stu-loans-list").innerHTML = myLoans.map(function (l) {
    var book = BOOKS.find(function (b) { return b.title === l.book; });
    var cover = book ? book.cover : "";
    return '<div class="loan-card">' +
      '<div class="loan-card-cover"><img src="' + cover + '" alt="' + esc(l.book) + '"></div>' +
      '<div class="loan-card-info"><p class="loan-card-title">' + esc(l.book) + '</p>' +
      '<p class="loan-card-due">Vence em: ' + esc(l.due) + '</p></div>' +
      '<div class="loan-card-actions">' + badgeHtml(l.status) +
      (l.status !== "Devolvido" ? '<button type="button" class="btn btn-secondary btn-xs">Renovar</button>' : '') +
      '</div></div>';
  }).join("");
}

function renderReservas() {
  var list = document.getElementById("stu-reservas-list");
  var empty = document.getElementById("stu-reservas-empty");
  if (reservas.length === 0) {
    list.innerHTML = "";
    empty.classList.add("show");
    return;
  }
  empty.classList.remove("show");
  list.innerHTML = reservas.map(function (b) {
    return '<div class="reserva-card">' +
      '<div class="loan-card-cover"><img src="' + b.cover + '" alt="' + esc(b.title) + '"></div>' +
      '<div class="loan-card-info"><p class="reserva-card-title">' + esc(b.title) + '</p>' +
      '<p class="reserva-card-author">' + esc(b.author) + '</p>' +
      '<div class="reserva-card-badge">' + badgeHtml("Pendente") + '</div></div>' +
      '<button type="button" class="btn btn-danger" data-reserva-cancel="' + b.id + '">Cancelar</button>' +
      '</div>';
  }).join("");
}

function renderHistorico() {
  document.getElementById("stu-historico-grid").innerHTML = BOOKS.map(function (b) {
    return '<div class="history-card">' +
      '<div class="history-cover"><img src="' + b.cover + '" alt="' + esc(b.title) + '"></div>' +
      '<div class="history-body"><p class="history-title">' + esc(b.title) + '</p>' +
      '<p class="history-author">' + esc(b.author) + '</p>' +
      '<div class="history-stars">' +
      [1, 2, 3, 4, 5].map(function (s) { return '<span class="history-star' + (s <= 4 ? " on" : "") + '">★</span>'; }).join("") +
      '</div></div></div>';
  }).join("");
}

// ─── Perfil / Avatar picker ──────────────────────────────────────────────────
function renderProfile() {
  var s = 64, h = Math.round(s * 1.3), rad = Math.round(s / 6);
  var av = document.getElementById("profile-avatar");
  av.style.width = s + "px";
  av.style.height = h + "px";
  av.style.borderRadius = s + "px " + s + "px " + rad + "px " + rad + "px";
  av.innerHTML = '<img src="' + avatarUrl("adventurer", avatarSeed) + '" alt="avatar">';

  document.getElementById("avatar-preview").src = avatarUrl(avatarStyle, avatarSeed);
  document.getElementById("style-grid").innerHTML = AVATAR_STYLES.map(function (st) {
    return '<button type="button" class="style-btn' + (st === avatarStyle ? " active" : '') + '" data-avatar-style="' + st + '">' +
      '<img src="' + avatarUrl(st, avatarSeed) + '" alt="' + st + '"></button>';
  }).join("");
}

// ─── Chat BIBI ───────────────────────────────────────────────────────────────
function renderChat() {
  var box = document.getElementById("chat-messages");
  box.innerHTML = chatMessages.map(function (m) {
    return '<div class="chat-msg-row ' + m.from + '"><div class="chat-msg ' + m.from + '">' + esc(m.text) + '</div></div>';
  }).join("");
  box.scrollTop = box.scrollHeight;
}

function openChat() {
  document.getElementById("chat-sub").textContent = 'Sobre "' + (chatBook ? chatBook.title : "") + '"';
  document.getElementById("chat-modal").classList.add("open");
  renderChat();
}

function closeChat() {
  document.getElementById("chat-modal").classList.remove("open");
}

function sendChat() {
  var input = document.getElementById("chat-input");
  var text = input.value.trim();
  if (!text) return;
  chatMessages.push({ from: "user", text: text });
  chatMessages.push({ from: "bibi", text: "Ótima pergunta! Sobre esse livro posso dizer que é uma leitura muito enriquecedora. Há algo mais que queira saber?" });
  input.value = "";
  renderChat();
}

function setRating(r) {
  currentRating = r;
  document.querySelectorAll(".star-btn").forEach(function (b) {
    b.classList.toggle("active", Number(b.getAttribute("data-rating")) <= r);
  });
}

function bindStaticEvents() {
  bindLogin();
  bindTheme();
  document.getElementById("sidebar-logout").addEventListener("click", handleLogout);
  document.getElementById("chat-close").addEventListener("click", closeChat);
  document.getElementById("chat-send").addEventListener("click", sendChat);
  document.getElementById("chat-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendChat();
  });
  document.getElementById("avatar-randomize").addEventListener("click", function () {
    avatarSeed = Math.random().toString(36).slice(2, 8);
    renderProfile();
  });
}
// ─── Segunda camada de eventos delegados ─────────────────────────────────────
document.addEventListener("click", function (e) {
  var el;

  el = e.target.closest("[data-loan-filter]");
  if (el) {
    loanFilter = el.getAttribute("data-loan-filter");
    document.querySelectorAll("#lib-loans-tabs [data-loan-filter]").forEach(function (b) {
      b.classList.toggle("active", b === el);
    });
    renderLibLoans();
    return;
  }

  el = e.target.closest("[data-reader-filter]");
  if (el) {
    readerFilter = el.getAttribute("data-reader-filter");
    document.querySelectorAll("#lib-readers-tabs [data-reader-filter]").forEach(function (b) {
      b.classList.toggle("active", b === el);
    });
    renderLeitores();
    return;
  }

  el = e.target.closest("[data-reader-type]");
  if (el) {
    var type = el.getAttribute("data-reader-type");
    document.querySelectorAll("#reader-type-tabs [data-reader-type]").forEach(function (b) {
      b.classList.toggle("active", b === el);
    });
    document.getElementById("lib-reader-modal").classList.toggle("mode-prof", type === "Professor");
    return;
  }

  el = e.target.closest("[data-agenda-new]");
  if (el) {
    var parts = el.getAttribute("data-agenda-new").split("|");
    agendaNewSlot = { day: parts[0], periodo: parts[1] };
    document.getElementById("lib-agenda-new-title").textContent =
      "Novo Agendamento · " + agendaNewSlot.day + " / " + agendaNewSlot.periodo;
    openModal("lib-agenda-new-modal");
    return;
  }

  el = e.target.closest("[data-agenda-filled]");
  if (el) {
    var parts2 = el.getAttribute("data-agenda-filled").split("|");
    var slot = slotFor(parts2[0], parts2[1]);
    if (slot) {
      fillAgendaDetailModal(slot);
      openModal("lib-agenda-filled-modal");
    }
    return;
  }

  el = e.target.closest("[data-detail-edit]");
  if (el) { openModal("lib-edit-modal"); return; }

  el = e.target.closest("[data-detail-delete]");
  if (el) { openModal("lib-delete-modal"); return; }

  el = e.target.closest("[data-detail-loan]");
  if (el) { openModal("lib-loan-modal"); return; }

  el = e.target.closest("[data-chat-open]");
  if (el) { openChat(); return; }

  el = e.target.closest(".star-btn");
  if (el) { setRating(Number(el.getAttribute("data-rating"))); return; }

  el = e.target.closest("[data-mod-approve]");
  if (el) {
    var id1 = Number(el.getAttribute("data-mod-action"));
    moderacaoItems = moderacaoItems.filter(function (c) { return c.id !== id1; });
    renderModeracao();
    return;
  }

  el = e.target.closest("[data-mod-remove]");
  if (el) {
    var id2 = Number(el.getAttribute("data-mod-action"));
    moderacaoItems = moderacaoItems.filter(function (c) { return c.id !== id2; });
    renderModeracao();
    return;
  }

  el = e.target.closest("[data-reserva-cancel]");
  if (el) {
    var rid = Number(el.getAttribute("data-reserva-cancel"));
    reservas = reservas.filter(function (b) { return b.id !== rid; });
    renderReservas();
    return;
  }

  el = e.target.closest("[data-avatar-style]");
  if (el) {
    avatarStyle = el.getAttribute("data-avatar-style");
    renderProfile();
    return;
  }

  el = e.target.closest(".toggle");
  if (el) { el.classList.toggle("on"); return; }

  el = e.target.closest("#lib-isbn-search");
  if (el) {
    var isbn = document.getElementById("lib-isbn-input").value;
    document.getElementById("lib-manual-isbn").value = isbn;
    closeModal("lib-isbn-modal");
    openModal("lib-manual-modal");
    return;
  }
});

// ─── Inicialização ───────────────────────────────────────────────────────────
function init() {
  document.getElementById("landing-sobre").style.display = "none";
  bindStaticEvents();
  initCarousel();
  renderDashboard();
  renderAcervo("lib");
  renderAcervo("stu");
  renderLibLoans();
  renderLibAgenda();
  renderLeitores();
  renderModeracao();
  renderStuLoans();
  renderReservas();
  renderHistorico();
  renderStuAgenda();
  renderProfile();
  // Conteúdo inicial dos detalhes (mesmo estado inicial do protótipo React:
  // selectedBook = BOOKS[0]) sem navegar.
  initDetail("lib-book-detail", BOOKS[0]);
  initDetail("stu-book-detail", BOOKS[0]);
}

function initDetail(screenId, book) {
  currentScreen = screenId;
  if (screenId === "stu-book-detail") { stuSelectedBook = book; } else { libSelectedBook = book; }
  document.getElementById(screenId === "stu-book-detail" ? "stu-detail-cover" : "lib-detail-cover").innerHTML =
    '<img src="' + book.cover + '" alt="' + esc(book.title) + '">';
  document.getElementById(screenId === "stu-book-detail" ? "stu-detail-body" : "lib-detail-body").innerHTML =
    detailBodyHtml(book, screenId === "stu-book-detail");
  if (screenId !== "stu-book-detail") {
    document.getElementById("lib-delete-title").textContent = book.title;
    document.getElementById("lib-edit-title").value = book.title;
    document.getElementById("lib-edit-author").value = book.author;
    document.getElementById("lib-edit-year").value = String(book.year);
    document.getElementById("lib-edit-category").value = book.category;
    document.getElementById("lib-edit-isbn").value = book.isbn;
    document.getElementById("lib-loan-readers").innerHTML = READERS.slice(0, 3).map(function (r) {
      return '<div class="reader-pick"><img class="avatar avatar-32" src="' + r.avatar + '" alt="' + esc(r.name) + '">' +
        '<div><p class="reader-pick-name">' + esc(r.name) + '</p><p class="reader-pick-type">' + esc(r.type) + '</p></div></div>';
    }).join("");
  }
  currentScreen = "landing";
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}