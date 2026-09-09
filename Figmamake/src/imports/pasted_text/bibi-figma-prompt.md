# BIBI — Biblioteca Inteligente — Figma AI Redesign Prompt

Paste everything below into Figma's AI design generator as one prompt (or split by numbered section if the tool has a length limit — keep section order).

---

## 0. Product context

Design the full UI for **BIBI — Biblioteca Inteligente**, a locally-hosted school library management web app (runs on a school's own network, opened in a browser/native window on a desktop-class screen). It has two roles: **Bibliotecária** (librarian, full admin control) and **Aluno** (student, personal/read-mostly area). Target canvas width: **1440px desktop**, not mobile-first — this is used on library/classroom computers.

Redesign the *entire* current interface with a fresh, more polished visual identity, while keeping every existing feature and adding the new AI-driven and student-facing features described below. This is a full "same app, new face" redesign, not a new product.

---

## 1. Visual identity / design system

**Mood:** warm, earthy, clean, softly rounded, simple but beautiful. Calm and paper-like, like a well-designed reading nook — not corporate, not neon, not flat/cold gray.

**Color palette** — unify and refine the app's current earth-tone palette into one consistent system (drop any cool gray-blue tones):
- Base surface / background: warm ivory `#FDFAF5` / `#FDFCFA`
- Card / panel surface: white `#FFFFFF` and soft cream `#F5EEE6`
- Primary text: deep espresso brown `#2D2926` / `#3E332A`
- Secondary/muted text: warm taupe `#7D756D` / `#8C8279`
- Primary accent (buttons, links, active states): clay/terracotta `#BC8A5F`
- Secondary accent / hover backgrounds: soft sand `#E5D8CC`
- Success / positive / "available": sage green `#7D9B5E`
- Warning / late / alert: brick red `#A52A2A`
- Highlight (e.g. "today", featured): warm terracotta `#CD853F`
- Borders/dividers: light sand `#EEE9E0`

Include a **dark mode** variant reusing this same warm family (not blue-black): background `#1E1E1E`, panels `#2D2A26`, accent `#A0522D` (sienna), text `#F0E7DE`, muted text `#A3968C`, borders `#5A4E44`.

**Typography** — reuse the app's existing fonts (Google Fonts), don't introduce new ones:
- **Nunito** (weights 400/600/700) for all UI text, body copy, buttons, tables, forms.
- **Playfair Display** (serif, with an italic weight) for large display headings only — hero title, section titles like "Sobre nós", book titles on the Book Details screen. Use it sparingly for an elegant contrast against the rounded sans-serif UI.

**Shape language:**
- Small controls (buttons, inputs, badges): 8–12px radius.
- Cards, modals, table rows: 16–20px radius.
- Large containers/panels: up to 40px radius.
- Signature motif: an **elongated arch/window shape** — a tall rectangle where only the *top* corners are extremely rounded (almost semicircular) and the bottom corners stay a normal small radius, like a window or portal cut into a wall. Reuse this exact motif (not just in the hero) for things like avatar frames, featured-book covers, and empty-state illustrations, to make it a recognizable brand shape.
- Soft, subtle drop shadows only (no hard shadows), thin 1px borders in the light-sand color.

---

## 2. App shell

Keep the current **desktop three-zone layout**: a fixed left sidebar (~260px) for primary navigation, a flexible main content area, and an optional right-side detail/info panel (~320px) used on screens like Dashboard or Book Details. Top of sidebar shows the BIBI icon/logo; bottom shows the logged-in user (avatar + name + role) and a settings/logout shortcut.

Sidebar items differ by role (see role sections below). Include hover and active states for nav items using the sand/clay accent.

---

## 3. Public / pre-login screens

### 3.1 Landing (Hero)
Two-column hero: left side has the BIBI wordmark + icon, an italic serif subtitle "Biblioteca Inteligente", a short quote, and a primary CTA button "Entrar no Sistema". Right side is the signature visual element:

> **Design this precisely:** a tall window/arch-shaped frame — long, narrow, with a smooth continuous semicircular arch at the top (like a church window or a doorway) and simple rounded corners at the bottom. Inside this arch frame, place a **rotating image carousel**: photos of books, shelves and reading spaces that automatically crossfade/slide from one to the next every few seconds (smooth fade transition, no hard cuts). This arch-window carousel is the single most distinctive visual element of the app — make it feel like looking through a real window into the library.

Top nav bar inside the same rounded container: logo on the left, "Sobre nós" and "Contato" links on the right.

### 3.2 About us
Centered long-form page: serif title "Sobre nós", justified body text about the project and its mission, footer with Instagram/LinkedIn/GitHub links. Reached via the "Sobre nós" nav link, in the same rounded container as the hero (tab-switch, not a new page).

### 3.3 CTA / entry point
The "Entrar no Sistema" button on the hero is the CTA — clicking it goes to **Login**.

---

## 4. Authentication

### 4.1 Login
Simple centered card: role switch (Bibliotecária / Aluno) as two tabs or a segmented control, then the matching credential fields below, primary button to enter. Same arch-window motif can appear as a small decorative graphic beside the form.

### 4.2 PIN verification (modal)
A small modal with a 4-digit PIN input, used whenever a protected admin action requires it (loans, scheduling, settings), matching the existing PIN-gate behavior.

---

## 5. Bibliotecária (Librarian) — role area

**Sidebar:** Dashboard · Acervo · Empréstimos · Agenda · Leitores · Moderação · Configurações

### 5.1 Dashboard
Top row of KPI cards: total de títulos, total de exemplares, empréstimos ativos, itens atrasados, devoluções de hoje, itens na agenda, quantidade de leitores. Below: charts for gêneros (ativos e histórico), livros mais emprestados, ranking de leitores do trimestre, and livros adormecidos (sem empréstimo há 6 meses). Add a new **"BIBI AI Insights"** card/panel — a distinct, slightly accented card with a small sparkle/assistant icon that shows short AI-generated text suggestions about circulation patterns and ideas for reading-incentive activities/events.

### 5.2 Acervo (Catalog)
Books shown as shelf rows, **grouped into horizontal sections by the book's existing category**, each row scrollable, each book as a cover-forward card (cover, title, author, availability badge). Add one more, visually distinct section — accented background, small AI icon — titled **"Recomendação da Assistente Virtual BIBI"**, placed near the top. Header has a search bar and a **"+ Adicionar Livro"** primary button.

> **Flow:** clicking **"+ Adicionar Livro"** opens the **ISBN Search modal** first (single ISBN input + search button). If the ISBN lookup succeeds, show a preview of the fetched data (cover, title, author, year) with a confirm/save button. If the ISBN lookup fails/isn't found, automatically close that modal and open the **Manual Entry modal** instead, pre-filled with the typed ISBN, so the librarian fills in the rest by hand.

Clicking any book card (here, in search results, or in the recommendation row) opens the **Book Details screen** (see 5.3).

### 5.3 Book Details (Librarian view)
Full-page (not a modal): large cover on one side using the arch-window frame motif, and on the other: title (serif), author, year, ISBN, category tag, shelf location, stock counters (total / available), synopsis, themes/tags. Below: a read-only view of students' star ratings and comments (for moderation context). Primary actions at the top: **Editar**, **Excluir**, **Emprestar**.
- **Editar** → opens an Edit Book modal, same fields as the manual entry form, pre-filled.
- **Excluir** → opens a small confirmation modal before deleting.
- **Emprestar** → opens the **Quick Loan modal**: search/select a reader, confirm; on success the modal closes and the availability count on this screen updates.

### 5.4 Empréstimos
A filter/tab bar: **Todos · Ativos · Atrasados · Devolução Hoje · Devolvidos**. Below, a table: reader, book, data de empréstimo, data de vencimento, status (color-coded badge: Pendente/Aprovado/Devolvido/Atrasado), with row actions **Renovar** / **Devolver** depending on status.

### 5.5 Agenda
Weekly grid: rows = período (Manhã / Tarde / Noite), columns = weekday, cells = aula/sala slots. A right-side panel lists the next 5 upcoming bookings for quick navigation.
- Clicking an **empty slot** → opens a **New Booking modal** (professor, matéria, uso, turma).
- Clicking a **filled slot** → opens a **Booking Details modal** (view info, delete option).

### 5.6 Leitores
Table/list of all registered readers, filterable by tipo (estudante / professor). **"+ Novo Leitor"** opens a modal with a type toggle at the top that switches the visible fields below: estudante shows sala, período, telefone; professor shows matéria. Same modal is reused for editing an existing reader.

### 5.7 Moderação de Comentários
A queue-style list of comments flagged by the automatic content filter, each showing the comment text, the student, the book, and actions to **approve**/**remove** manually.

### 5.8 Configurações
Grouped settings sections with toggle switches: bloquear e-mails, exigir senha para empréstimos, exigir senha para agendamentos, obrigar localização do livro, bloquear exclusão de agendamentos, quantidade de aulas por dia (number input), e-mail da organização / app password (SMTP), and PIN management.

---

## 6. Aluno (Student) — role area

**Sidebar:** Acervo · Meus Empréstimos · Minhas Reservas · Meu Histórico · Agenda · Meu Perfil

### 6.1 Meu Perfil
Personal info card with an **avatar** (see 6.2), name, reading preferences summary. On a student's very first login, this doubles as an onboarding step prompting avatar setup.

### 6.2 Personalização de Avatar
A dedicated picker screen/modal: a grid of avatar style options, a randomize/shuffle button, and simple customization controls (color/accessory swatches), with a live large preview inside a small arch-window frame. (Backed by the DiceBear avatar API — the UI just needs style + seed/option pickers and a "randomize" action.)

### 6.3 Acervo (Vitrine)
Visually identical to the librarian's Acervo (same category shelf-rows + the "Recomendação da Assistente Virtual BIBI" section, here personalized to the student's own history/ratings) but with **no admin buttons anywhere** — it's browse-only.

### 6.4 Book Details (Student view)
Same layout as the librarian's Book Details screen, but the action row is replaced with: **Reservar**, a star-rating control to **Avaliar**, and a comment box to add a comment — plus the existing list of other readers' ratings/comments below, and a button **"Conversar sobre este livro"** that opens the reading chat (6.5).

### 6.5 Chat de Mediação de Leitura
A simple chat panel (side panel or full screen) scoped to the specific book, with a small visible note that it only discusses this book/reading-related questions. Standard chat bubble UI in the same warm palette.

### 6.6 Meus Empréstimos
List of the student's own active loans and history, with a **Renovar** action on active ones.

### 6.7 Minhas Reservas
List of active reservations with a **Cancelar** action.

### 6.8 Meu Histórico de Leitura
A simple list/grid of books the student has read, rated, or commented on, reusing the book-card component from the Acervo.

### 6.9 Agenda (view-only)
Same weekly grid as 5.5, but read-only — no create/delete actions, just visibility into when the reading room is booked.

---

## 7. Shared components to design once, reuse everywhere

- Book card (cover, title, author, category tag, availability badge) — used in Acervo, recommendations, history, search.
- Reader/user avatar chip (avatar + name + role tag).
- Status badge (color-coded: Pendente/Aprovado/Devolvido/Atrasado, Disponível/Indisponível).
- Modal shell (header, body, footer actions) — reused for every modal listed above.
- Primary/secondary/danger buttons, text inputs, selects, toggle switches, star-rating control.
- Empty and loading states, using the arch-window motif as a soft illustration placeholder.

---

## 8. Deliverable

Produce one Figma frame per screen listed above (grouped into three flows: **Public/Auth**, **Bibliotecária**, **Aluno**), at 1440px desktop width, using the shared component set from section 7 consistently across all of them, in the color and type system from section 1. Include the dark-mode variant at least for the app shell and Dashboard, so the pattern can be extended to the rest.