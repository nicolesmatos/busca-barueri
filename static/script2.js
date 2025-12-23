/* ============================
   Dados e funções já existentes (mantive sua lógica)
   ============================ */

/* (MANTENHA AQUI SEU ARRAY `realServices`, `pages`, utilitários,
   computeHints, showSuggestions, renderResultsFor, etc.)
   Para preservar o contexto do seu projeto, estou incluindo a parte
   que controla a interface de limpar/capturar valor; suas funções de
   busca/paginação originais permaneceram inalteradas abaixo. */

/* -------------------------
   Controle de clear buttons (index + results)
   ------------------------- */

(function(){
  // index input + buttons
  const q = document.getElementById('q');
  const searchForm = document.getElementById('searchForm');
  const clearBtn = document.getElementById('clearBtn');
  const searchBtn = document.getElementById('searchBtn');

  function updateClearVisibilityIndex(){
    if(!q || !clearBtn || !searchForm) return;
    const has = q.value && q.value.trim().length > 0;
    clearBtn.style.display = has ? 'flex' : 'none';
    if(has) searchForm.classList.add('has-value'); else searchForm.classList.remove('has-value');
  }

  if(q){
    // show/hide on input
    q.addEventListener('input', updateClearVisibilityIndex);
    // allow Enter
    q.addEventListener('keydown', (ev) => {
      if(ev.key === 'Enter'){
        ev.preventDefault();
        const v = q.value.trim();
        if(!v) return;
        location.href = `results.html?q=${encodeURIComponent(v)}&page=1`;
      } else if(ev.key === 'Escape'){
        q.value = '';
        updateClearVisibilityIndex();
      }
    });
    // init
    updateClearVisibilityIndex();
  }
  if(clearBtn){
    clearBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      if(q) q.value = '';
      updateClearVisibilityIndex();
      q.focus();
      // also hide suggestions if present
      const suggestionsEl = document.getElementById('suggestions');
      if(suggestionsEl) suggestionsEl.classList.remove('open');
    });
  }
  if(searchForm && searchBtn){
    searchForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const qv = q ? q.value.trim() : '';
      if(!qv) return;
      location.href = `results.html?q=${encodeURIComponent(qv)}&page=1`;
    });
    searchBtn.addEventListener('click', ev => {
      ev.preventDefault();
      const qv = q ? q.value.trim() : '';
      if(!qv) return;
      location.href = `results.html?q=${encodeURIComponent(qv)}&page=1`;
    });
  }

  // results page input + buttons
  const qRes = document.getElementById('q_res');
  const clearBtnRes = document.getElementById('clearBtn_res');
  const searchFormRes = document.getElementById('resultsSearchForm');
  const searchBtnRes = document.getElementById('searchBtn_res');

  function updateClearVisibilityResults(){
    if(!qRes || !clearBtnRes) return;
    const has = qRes.value && qRes.value.trim().length > 0;
    clearBtnRes.style.display = has ? 'flex' : 'none';
    if(has) searchFormRes && searchFormRes.classList && searchFormRes.classList.add('has-value'); 
    else searchFormRes && searchFormRes.classList && searchFormRes.classList.remove('has-value');
  }

  if(qRes){
    qRes.addEventListener('input', updateClearVisibilityResults);
    qRes.addEventListener('keydown', ev => {
      if(ev.key === 'Enter'){
        ev.preventDefault();
        const v = qRes.value.trim();
        if(!v) return;
        location.href = `results.html?q=${encodeURIComponent(v)}&page=1`;
      } else if(ev.key === 'Escape'){
        qRes.value = '';
        updateClearVisibilityResults();
      }
    });
    // initialize (e.g., results.html?q=...)
    updateClearVisibilityResults();
  }

  if(clearBtnRes){
    clearBtnRes.addEventListener('click', ev => {
      ev.preventDefault();
      if(qRes) qRes.value = '';
      updateClearVisibilityResults();
      qRes && qRes.focus();
    });
  }

  if(searchFormRes){
    searchFormRes.addEventListener('submit', ev => {
      ev.preventDefault();
      const v = qRes ? qRes.value.trim() : '';
      if(!v) return;
      location.href = `results.html?q=${encodeURIComponent(v)}&page=1`;
    });
  }
})();

/* ============================
   A partir daqui inclua TODO o restante do seu script original
   (dados, computeHints, showSuggestions, renderResultsFor, renderPagination, etc.)
   Mantive a estrutura do seu script antigo; cole aqui o código inteiro
   de busca/paginação que você já tinha — para não duplicar, eu não o
   reescrevi por completo nesta seção de exemplo.
   ============================ */

/* --- COLE AQUI O SEU CÓDIGO ORIGINAL: realServices, pages, utilitários, computeHints, showSuggestions, searchPages, renderResultsFor, renderPagination --- */

/* Para que tudo funcione, certifique-se de manter suas funções originais
   (pages, renderResultsFor, computeHints, showSuggestions, etc.) no mesmo arquivo. */


/* script.js
   Busca baseada nos serviços reais fornecidos, sugestões curtas e paginação.
*/

/* ============================
   1) DADOS (apenas os serviços que você enviou)
   ============================ */

const realServices = [
  { category: "Direitos da Pessoa Com Deficiência", title: "Porta de Entrada", snippet: "Escuta qualificada e acolhimento, com equipe de Serviço Social para encaminhamentos e agendamentos." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Tecnologia Assistiva", snippet: "Acesso e suporte a equipamentos assistivos (órteses, próteses, cadeiras de rodas, aparelhos auditivos)." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Centro-dia", snippet: "Convivência e oficinas culturais para pessoas com deficiência acima de 18 anos." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Programa Incluir (Apoio e Emprego)", snippet: "Apoio à inclusão no mercado de trabalho: preparação, apoio à empresa e acompanhamento." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Prevenção e Serviço Especializado em Deficiência Visual", snippet: "Serviço especializado com Estimulação Visual Precoce, Orientação e Mobilidade e campanhas preventivas." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Esporte e Superação", snippet: "Incentivo ao esporte inclusivo: participação em modalidades paralímpicas e eventos." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Comunicação e Eventos", snippet: "Visibilidade e eventos inclusivos; gestão do banco de dados da secretaria." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Acessibilidade", snippet: "Projetos para ampliar o acesso em vias, espaços públicos, equipamentos e transporte." },
  { category: "Direitos da Pessoa Com Deficiência", title: "LIBRAS (Oficinas e ComLIBRAS)", snippet: "Oficinas de LIBRAS e serviço ComLIBRAS para interpretação remota via QR/videochamada." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Transporte e Isenção tarifária", snippet: "Isenção tarifária no transporte coletivo adaptado conforme legislação municipal." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Carteira de Identificação da Pessoa com Deficiência", snippet: "Emissão de carteira municipal para garantir atendimento prioritário." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Programa de Apoio à Pessoa com Deficiência", snippet: "Apoio domiciliar para casos graves e complexos mediante avaliação técnica." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Equoterapia", snippet: "Reabilitação com uso do cavalo, no Centro Municipal de Equoterapia." },
  { category: "Direitos da Pessoa Com Deficiência", title: "Consultoria técnica", snippet: "Apresentação técnica dos serviços da SDPD a equipamentos, ONGs, empresas e escolas." }
];

/* cria array 'pages' com url simples por slug */
function slugify(text){
  return text.toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9 -]/g,'').trim().replace(/\s+/g,'-');
}

const pages = realServices.map(s => ({
  title: `${s.title} - ${s.category}`,
  url: `info2.html`,
  snippet: s.snippet
}));


/* ============================
   2) UTILIDADES
   ============================ */

function escapeHtml(str){
  if(!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

/* ícone sugerido com base no texto */
function pickIconFor(item){
  const t = ((item && (item.title + ' ' + (item.snippet||''))) || '').toLowerCase();
  if(t.includes('transporte')||t.includes('isenção')) return 'directions_bus';
  if(t.includes('libras')||t.includes('libra')||t.includes('acessibilidade')||t.includes('assistiva')) return 'accessible';
  if(t.includes('equoterapia')||t.includes('esporte')) return 'sports_handball';
  if(t.includes('consultoria')||t.includes('comunicação')) return 'support_agent';
  if(t.includes('porta de entrada')) return 'home';
  if(t.includes('prevenção')||t.includes('visual')) return 'visibility';
  if(t.includes('carteira')) return 'badge';
  return 'description';
}

/* resumo curto para sugestões (até ~70 chars) */
function shortSnippet(sn){
  if(!sn) return '';
  const s = sn.replace(/\s+/g,' ').trim();
  if(s.length <= 70) return s;
  return s.slice(0,70).trim().replace(/[.,;:]?$/,'') + '…';
}

/* ============================
   3) SUGESTÕES (index)
   ============================ */

const q = document.getElementById('q');
const suggestionsEl = document.getElementById('suggestions');
const searchForm = document.getElementById('searchForm');
const searchBtn = document.getElementById('searchBtn');

/* show/hide suggestions with keyboard navigation */
let activeSuggestionIndex = -1;

function hideSuggestions(){
  if(!suggestionsEl) return;
  suggestionsEl.classList.remove('open');
  suggestionsEl.setAttribute('aria-hidden','true');
  suggestionsEl.innerHTML = '';
  activeSuggestionIndex = -1;
}

function showSuggestions(items){
  if(!suggestionsEl) return;
  suggestionsEl.innerHTML = '';
  if(!items || items.length === 0){ hideSuggestions(); return; }
  items.forEach((p, idx) => {
    const icon = pickIconFor(p);
    const div = document.createElement('div');
    div.className = 'suggestion';
    div.setAttribute('role','option');
    div.setAttribute('data-index', idx);
    div.innerHTML =
      `<span class="sugg-icon material-icons-outlined">${escapeHtml(icon)}</span>
       <div class="sugg-text">
         <div class="sugg-title">${escapeHtml(p.title)}</div>
         <div class="sugg-sub">${escapeHtml(shortSnippet(p.snippet || p.url))}</div>
       </div>`;
    div.addEventListener('click', () => {
      const qval = p.title;
      window.location.href = `results.html?q=${encodeURIComponent(qval)}`;
    });
    suggestionsEl.appendChild(div);
  });
  requestAnimationFrame(() => {
    suggestionsEl.classList.add('open');
    suggestionsEl.setAttribute('aria-hidden','false');
  });
  activeSuggestionIndex = -1;
}

function computeHints(v){
  if(!v) return [];
  const ql = v.toLowerCase();
  const hits = [];
  // titles first
  pages.forEach(p => {
    if(p.title.toLowerCase().includes(ql)) hits.push(p);
  });
  // then word matches from titles
  pages.forEach(p => {
    p.title.split(/\s+/).forEach(w => {
      if(w.toLowerCase().includes(ql) && w.length>1){
        // create a small suggestion using the word and original snippet
        hits.push({ title: w, snippet: p.snippet, url: p.url });
      }
    });
  });
  // dedupe by lowercase title
  const seen = new Set();
  const out = [];
  for(const h of hits){
    const key = (h.title || '').toLowerCase();
    if(!seen.has(key)){
      seen.add(key);
      out.push(h);
      if(out.length >= 8) break;
    }
  }
  return out;
}

/* keyboard visuals */
function setActiveSuggestion(index){
  if(!suggestionsEl) return;
  const items = suggestionsEl.querySelectorAll('.suggestion');
  if(!items.length) return;
  if(index < 0) index = -1;
  if(index >= items.length) index = items.length - 1;
  items.forEach(it => it.classList.remove('active'));
  activeSuggestionIndex = index;
  if(index >= 0){
    const el = items[index];
    el.classList.add('active');
    el.scrollIntoView({block:'nearest', behavior:'smooth'});
  }
}

/* ============================
   4) RANKING E BUSCA
   ============================ */

function scoreForQuery(p, q){
  if(!q) return 0;
  const ql = q.toLowerCase();
  let score = 0;
  const title = (p.title||'').toLowerCase();
  const snippet = (p.snippet||'').toLowerCase();
  const url = (p.url||'').toLowerCase();
  if(title.includes(ql)) score += 6;
  if(snippet.includes(ql)) score += 2;
  if(url.includes(ql)) score += 1;
  const words = ql.split(/\s+/).filter(Boolean);
  words.forEach(w => {
    if(title.includes(w)) score += 2;
    if(snippet.includes(w)) score += 1;
  });
  if(title === ql) score += 4;
  return score;
}

function searchPages(query){
  const qtrim = (query||'').trim();
  if(!qtrim) return [];
  const candidates = pages.map(p => ({page:p, score: scoreForQuery(p, qtrim)})).filter(x => x.score > 0);
  candidates.sort((a,b) => {
    if(b.score !== a.score) return b.score - a.score;
    return a.page.title.localeCompare(b.page.title);
  });
  return candidates.map(x => x.page);
}

/* ============================
   5) PAGINAÇÃO
   ============================ */

const PAGE_SIZE = 5;

function renderPagination(totalItems, currentPage, query){
  // remove old
  const existing = document.getElementById('pagination');
  if (existing) existing.remove();

  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const container = document.createElement('nav');
  container.id = 'pagination';
  container.className = 'pagination';
  container.setAttribute('aria-label', 'Navegação de páginas');

  // helper to create page button
  function makePageButton(page, label, isActive = false, extraAttrs = {}) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'page-btn';
    btn.textContent = label || String(page);
    btn.setAttribute('data-page', String(page));
    btn.setAttribute('aria-label', extraAttrs['aria-label'] || `Ir para página ${page}`);
    if (isActive) {
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'page');
    }
    btn.addEventListener('click', () => {
      // navigate to the results page with page param
      const href = `results.html?q=${encodeURIComponent(query)}&page=${page}`;
      location.href = href;
    });
    return btn;
  }

  // Prev button
  if (currentPage > 1) {
    const prevBtn = makePageButton(currentPage - 1, '‹ Anterior', false, {'aria-label': 'Página anterior'});
    prevBtn.classList.add('page-prev');
    container.appendChild(prevBtn);
  }

  // sliding window of pages
  const maxButtons = 7;
  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);

  if (start > 1) {
    container.appendChild(makePageButton(1, '1', currentPage === 1));
    if (start > 2) {
      const dots = document.createElement('span');
      dots.className = 'page-dots';
      dots.textContent = '…';
      dots.setAttribute('aria-hidden', 'true');
      container.appendChild(dots);
    }
  }

  for (let p = start; p <= end; p++) {
    container.appendChild(makePageButton(p, String(p), p === currentPage));
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      const dots = document.createElement('span');
      dots.className = 'page-dots';
      dots.textContent = '…';
      dots.setAttribute('aria-hidden', 'true');
      container.appendChild(dots);
    }
    container.appendChild(makePageButton(totalPages, String(totalPages), currentPage === totalPages));
  }

  // Next button
  if (currentPage < totalPages) {
    const nextBtn = makePageButton(currentPage + 1, 'Próxima ›', false, {'aria-label': 'Próxima página'});
    nextBtn.classList.add('page-next');
    container.appendChild(nextBtn);
  }

  // Append after resultsList if exists, else to results-column
  const list = document.getElementById('resultsList');
  if (list && list.parentNode) {
    // insert after list
    list.parentNode.insertBefore(container, list.nextSibling);
  } else {
    const col = document.querySelector('.results-column') || document.body;
    col.appendChild(container);
  }
}


/* ============================
   6) INDEX PAGE HOOKS (suggestions, keyboard)
   ============================ */

if (q && suggestionsEl && searchForm) {
  let inputDebounce = null;

  q.addEventListener('input', e => {
    const v = e.target.value.trim();
    if(!v){ hideSuggestions(); return; }
    clearTimeout(inputDebounce);
    inputDebounce = setTimeout(() => {
      const hints = computeHints(v);
      showSuggestions(hints);
    }, 120);
  });

  searchForm.addEventListener('submit', ev => {
    ev.preventDefault();
    const qv = q.value.trim();
    if(!qv) return;
    location.href = `results.html?q=${encodeURIComponent(qv)}&page=1`;
  });

  if(searchBtn){
    searchBtn.addEventListener('click', ev => {
      ev.preventDefault();
      const qv = q.value.trim();
      if(!qv) return;
      location.href = `results.html?q=${encodeURIComponent(qv)}&page=1`;
    });
  }

  document.addEventListener('click', ev => {
    if (!searchForm.contains(ev.target)) hideSuggestions();
  });

  // keyboard navigation
  q.addEventListener('keydown', ev => {
    const items = suggestionsEl ? suggestionsEl.querySelectorAll('.suggestion') : [];
    if(ev.key === 'ArrowDown'){
      ev.preventDefault();
      if(!items || items.length === 0) return;
      let next = activeSuggestionIndex + 1;
      if(next >= items.length) next = 0;
      setActiveSuggestion(next);
    } else if(ev.key === 'ArrowUp'){
      ev.preventDefault();
      if(!items || items.length === 0) return;
      let next = activeSuggestionIndex - 1;
      if(next < 0) next = items.length - 1;
      setActiveSuggestion(next);
    } else if(ev.key === 'Enter'){
      if(activeSuggestionIndex >= 0){
        ev.preventDefault();
        const sel = suggestionsEl.querySelectorAll('.suggestion')[activeSuggestionIndex];
        if(sel) sel.click();
        return;
      }
      // else allow submit
    } else if(ev.key === 'Escape'){
      q.value = '';
      hideSuggestions();
    }
  });

  suggestionsEl.addEventListener('mousemove', ev => {
    const item = ev.target.closest('.suggestion');
    if(!item) return;
    const idx = Number(item.getAttribute('data-index'));
    setActiveSuggestion(idx);
  });
}

/* ============================
   7) RENDER RESULTS (results.html) with pagination
   ============================ */

function renderResultsFor(query){
  const list = document.getElementById('resultsList');
  if(!list) return;
  list.innerHTML = '';

  const params = new URLSearchParams(location.search);
  const pageNum = Math.max(1, parseInt(params.get('page') || '1', 10));
  const qtrim = (query||'').trim();

  if(!qtrim){
    list.innerHTML = '<div class="noresults">Digite um termo para pesquisar.</div>';
    // remove pagination if any
    const old = document.getElementById('pagination'); if(old) old.remove();
    return;
  }

  const matched = searchPages(qtrim);
  if(!matched.length){
    list.innerHTML = '<div class="noresults">Nenhum resultado encontrado.</div>';
    const old = document.getElementById('pagination'); if(old) old.remove();
    return;
  }

  const total = matched.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(pageNum, totalPages);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pageItems = matched.slice(startIdx, startIdx + PAGE_SIZE);

  pageItems.forEach(r => {
    const div = document.createElement('div');
    div.className = 'result';
    div.innerHTML = `
      <div class="favicon" aria-hidden="true">
        <span class="material-icons-outlined" style="font-size:20px;color:#2DAAE1">${escapeHtml(pickIconFor(r))}</span>
      </div>
      <div class="result-body">
        <div class="meta-top">${escapeHtml(r.url || '')}</div>
        <a class="title-link" href="${r.url ? encodeURI(r.url) : '#'}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.title)}</a>
        <div class="snippet">${escapeHtml(r.snippet || '')}</div>
      </div>`;
    list.appendChild(div);
  });

  // render pagination
  renderPagination(total, currentPage, qtrim);
}

/* expose for results page */
window.renderResultsFor = renderResultsFor;

/* ============================
   8) OPTIONAL: auto-run on results page load if q param present
   ============================ */

if(typeof window !== 'undefined' && window.location.pathname && window.location.pathname.endsWith('results.html')){
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search);
    const qv = params.get('q') || '';
    if(qv){
      // set topbar input if exists
      const qInput = document.getElementById('q_res') || document.getElementById('q');
      if(qInput) qInput.value = qv;
      renderResultsFor(qv);
    }
  });
}

/* ============================
   END
   ============================ */
