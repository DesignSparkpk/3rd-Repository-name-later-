(() => {
  const WA = '923005610774';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = n => 'Rs ' + n.toLocaleString('en-PK');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wide = matchMedia('(min-width: 961px)').matches;
  const icon = n => `<svg class="ic"><use href="#i-${n}"/></svg>`;

  /* ---------- header ---------- */
  const header = $('header.site');
  const onScroll = () => header.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- hero films: side panels on wide screens only ---------- */
  if (wide && !reduce) $$('.hero video[data-src]').forEach(v => { v.src = v.dataset.src; v.play().catch(() => {}); });
  if (reduce) $$('.hero video').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });

  /* ---------- dish films: play only while on screen ---------- */
  const films = $$('.film-card video');
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); } else v.pause();
    }), { threshold: .35 });
    films.forEach(v => io.observe(v));
  }

  /* ---------- reveal on scroll ---------- */
  const rv = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    rv.forEach(el => ro.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  /* ---------- menu data (prices only where Sultan Istanbul has published them) ---------- */
  const MENU = [
    { id: 'platters', name: 'Platters', img: 'img/platter.webp', note: 'Made for the whole table', items: [
      { id: 'special', name: 'Sultan Special Platter', price: 4999, tag: 'Bestseller', desc: 'Fish tikka, qalmi tikka, malai boti, chicken boti, chicken kabab, battair (4 pcs each), Kabuli pulao 900g, naan, 2 roti, BBQ sauce' },
      { id: 'shawaya', name: 'Shawaya Platter', price: 2499, tag: 'Arabic', desc: 'Whole chicken, boneless chicken, Turkish pilao, shawaya bread, fries, fresh vegetables' },
      { id: 'fish', name: 'Grill Fish with Pulao', price: 1499, tag: 'Pick of the month', desc: 'Charcoal-grilled fish in special spices with lemon and herbs on aromatic pulao' },
      { id: 'chaska', name: 'Chaska Platter', desc: 'Hanging chicken skewers, beef kabab, grilled vegetables, Turkish rice and bread' }
    ]},
    { id: 'turkish', name: 'Turkish & Mutton', img: 'img/anadana.webp', note: 'First time in Haripur', items: [
      { id: 'anadana', name: 'Mutton Anadana', tag: 'Salt dome', desc: 'Turkish mutton sealed in a salt dome, flamed and opened at your table' },
      { id: 'bhudu', name: 'Mutton Bhudu', tag: 'Smoked', desc: 'Mutton chops on a board with rice and five dips, served under smoke' },
      { id: 'ranjha', name: 'Ranjha Gosht', desc: 'Mutton on the bone, slow-cooked and sealed in foil' },
      { id: 'karahi', name: 'Chicken Karahi', desc: 'Cooked fresh in the karahi with tomatoes, ginger and green chilli' }
    ]},
    { id: 'bbq', name: 'BBQ', img: 'img/grill.webp', note: 'Fresh off the charcoal', items: [
      { id: 'fishtikka', name: 'Fish Tikka', desc: 'Spiced fish pieces grilled on charcoal' },
      { id: 'qalmi', name: 'Qalmi Tikka', desc: 'Chicken leg pieces, marinated and grilled' },
      { id: 'malai', name: 'Malai Boti', desc: 'Creamy, mild chicken boti' },
      { id: 'boti', name: 'Chicken Boti', desc: 'Classic spicy chicken boti' },
      { id: 'kabab', name: 'Chicken Kabab', desc: 'Seekh kabab off the grill' },
      { id: 'beefkabab', name: 'Beef Kabab', desc: 'Beef seekh kabab' },
      { id: 'battair', name: 'Battair', desc: 'Grilled quail' }
    ]},
    { id: 'rice', name: 'Rice & Bread', img: 'img/skewers.webp', note: 'With every meal', items: [
      { id: 'kabuli', name: 'Kabuli Pulao', desc: 'Afghan-style pulao with raisins and carrots' },
      { id: 'pilao', name: 'Turkish Pilao', desc: 'Long-grain Turkish rice' },
      { id: 'biryani', name: 'Chicken Biryani', desc: 'Spiced rice layered with chicken' },
      { id: 'sbread', name: 'Shawaya Bread', desc: 'Soft Arabic bread' },
      { id: 'naan', name: 'Naan', desc: 'From the tandoor' },
      { id: 'roti', name: 'Roti', desc: 'From the tandoor' }
    ]},
    { id: 'sweet', name: 'Sweets & Drinks', img: 'img/hall2.webp', note: 'To finish', items: [
      { id: 'kunafa', name: 'Cheese Kunafa', tag: 'New', desc: 'Warm kunafa with melted cheese and syrup' },
      { id: 'mint', name: 'Mint Margarita', desc: 'Fresh mint, lemon and ice' },
      { id: 'drinks', name: 'Cold Drinks', desc: 'Regular and 1.5 litre' }
    ]}
  ];
  const ALL = new Map(); MENU.forEach(g => g.items.forEach(i => ALL.set(i.id, i)));

  const tabsEl = $('[data-tabs]'), menuEl = $('[data-menu]'), searchEl = $('[data-search]');
  let current = 'all';
  const tabsList = [{ id: 'all', name: 'All' }, ...MENU];
  tabsEl.innerHTML = tabsList.map(t => `<button type="button" role="tab" aria-selected="${t.id === 'all'}" data-tab="${t.id}">${t.name}</button>`).join('');
  function itemHTML(i) {
    const right = i.price
      ? `<div class="mi-act"><span class="mi-price">${fmt(i.price)}</span><button class="add" type="button" data-add="${i.id}">Add ${icon('plus')}</button></div>`
      : `<a class="ask-sm" href="https://wa.me/${WA}?text=${encodeURIComponent('Assalam o Alaikum, what is the price of ' + i.name + '?')}" target="_blank" rel="noopener">${icon('wa')}Ask</a>`;
    return `<div class="mi"><div class="mi-txt"><p class="mi-name">${i.name}${i.tag ? `<em>${i.tag}</em>` : ''}</p><p class="mi-desc">${i.desc}</p></div>${right}</div>`;
  }
  function renderMenu() {
    const q = (searchEl.value || '').trim().toLowerCase();
    const groups = MENU.filter(g => current === 'all' || g.id === current).map(g => ({ ...g, items: g.items.filter(i => !q || (i.name + ' ' + i.desc).toLowerCase().includes(q)) })).filter(g => g.items.length);
    menuEl.innerHTML = groups.length ? groups.map(g => `
      <div class="menu-group">
        <div class="mg-cover"><img src="${g.img}" alt="" loading="lazy"><div><small>${g.items.length} dishes</small><h3>${g.name}</h3><p>${g.note}</p></div></div>
        <div class="mg-items">${g.items.map(itemHTML).join('')}</div>
      </div>`).join('') : `<p class="empty">Nothing found. Ask us on <a href="https://wa.me/${WA}" target="_blank" rel="noopener">WhatsApp</a>.</p>`;
  }
  tabsEl.addEventListener('click', e => {
    const b = e.target.closest('[data-tab]'); if (!b) return;
    current = b.dataset.tab; $$('[data-tab]', tabsEl).forEach(x => x.setAttribute('aria-selected', x === b)); renderMenu();
  });
  searchEl.addEventListener('input', renderMenu);
  renderMenu();

  /* ---------- cart ---------- */
  const cart = new Map();
  try { JSON.parse(sessionStorage.getItem('sultan-cart') || '[]').forEach(([k, v]) => v.qty > 0 && cart.set(k, v)); } catch (e) {}
  const save = () => { try { sessionStorage.setItem('sultan-cart', JSON.stringify([...cart])); } catch (e) {} };
  const count = () => [...cart.values()].reduce((s, l) => s + l.qty, 0);
  const total = () => [...cart.values()].reduce((s, l) => s + l.qty * l.price, 0);

  const toast = $('[data-toast]'); let tt;
  function say(msg) { toast.innerHTML = icon('check') + `<span>${msg}</span>`; toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), 1700); }

  function change(info, d) {
    const l = cart.get(info.id) || { name: info.name, price: info.price, qty: 0 };
    l.qty = Math.max(0, l.qty + d);
    l.qty ? cart.set(info.id, l) : cart.delete(info.id);
    save(); render();
    if (d > 0) { say(`${info.name} added`); $$('[data-count]').forEach(c => { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }); }
  }
  const linesEl = $('[data-lines]'), totalEl = $('[data-total]');
  function render() {
    $$('[data-count]').forEach(c => c.textContent = count());
    totalEl.textContent = fmt(total());
    linesEl.innerHTML = cart.size ? [...cart].map(([id, l]) => `
      <div class="line"><b>${l.name}<small>${fmt(l.price)} each</small></b>
      <div class="qty"><button type="button" data-dec="${id}" aria-label="One less ${l.name}">${icon('minus')}</button><span>${l.qty}</span><button type="button" data-inc="${id}" aria-label="One more ${l.name}">${icon('plus')}</button></div></div>`).join('')
      : `<div class="sheet-empty"><img src="img/logo-badge.png" alt="" width="84" height="84" style="border-radius:50%"><p>Your order is empty.<br>Add a platter to get started.</p><a class="btn gold sm" href="#signature" data-close-cart>See the platters</a></div>`;
  }
  document.addEventListener('click', e => {
    const card = e.target.closest('[data-item] .add');
    if (card) { change(JSON.parse(card.closest('[data-item]').dataset.item), 1); return; }
    const a = e.target.closest('[data-add]');
    if (a) { const i = ALL.get(a.dataset.add); if (i && i.price) change(i, 1); return; }
    const inc = e.target.closest('[data-inc]'); if (inc) { const l = cart.get(inc.dataset.inc); change({ id: inc.dataset.inc, ...l }, 1); return; }
    const dec = e.target.closest('[data-dec]'); if (dec) { const l = cart.get(dec.dataset.dec); change({ id: dec.dataset.dec, ...l }, -1); return; }
    if (e.target.closest('[data-open-cart]')) { openSheet(); return; }
    if (e.target.closest('[data-close-cart]') || e.target.matches('[data-sheet-back]')) closeSheet();
  });

  const sheet = $('[data-sheet]'), back = $('[data-sheet-back]');
  function openSheet() { back.hidden = false; sheet.classList.add('open'); sheet.setAttribute('aria-hidden', 'false'); setTimeout(() => $('.x', sheet).focus(), 50); document.body.style.overflow = 'hidden'; }
  function closeSheet() { sheet.classList.remove('open'); sheet.setAttribute('aria-hidden', 'true'); back.hidden = true; document.body.style.overflow = ''; }
  addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('open')) closeSheet(); });

  const modeEl = $('[data-mode]'), addrWrap = $('[data-addr-wrap]'), addrEl = $('[data-addr]');
  modeEl.addEventListener('change', () => { addrWrap.hidden = modeEl.value !== 'Home delivery'; });
  $('[data-send]').addEventListener('click', () => {
    if (!cart.size) { say('Add a dish first'); return; }
    const lines = [...cart.values()].map(l => `• ${l.qty} × ${l.name} = ${fmt(l.qty * l.price)}`);
    let msg = `Assalam o Alaikum Sultan Istanbul! I'd like to order:\n\n${lines.join('\n')}\n\nTotal: ${fmt(total())}\n${modeEl.value}`;
    if (modeEl.value === 'Home delivery' && addrEl.value.trim()) msg += `\nAddress: ${addrEl.value.trim()}`;
    open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
  render();

  /* ---------- booking form → WhatsApp ---------- */
  const book = $('[data-book]'), err = $('[data-err]');
  const d = book.elements.date; const t = new Date(); d.min = t.toISOString().slice(0, 10); d.value = d.min;
  book.addEventListener('submit', e => {
    e.preventDefault();
    const f = book.elements;
    if (!f.name.value.trim() || !f.date.value) { err.hidden = false; (f.name.value.trim() ? f.date : f.name).focus(); return; }
    err.hidden = true;
    const day = new Date(f.date.value + 'T12:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
    let msg = `Assalam o Alaikum! Table booking at Sultan Istanbul:\n\nName: ${f.name.value.trim()}\nDate: ${day}\nTime: ${f.time.value}\nGuests: ${f.guests.value}\nSeating: ${f.seat.value}`;
    if (f.note.value.trim()) msg += `\nNote: ${f.note.value.trim()}`;
    open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
})();
