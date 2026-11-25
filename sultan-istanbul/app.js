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
  if (wide && !reduce) $$('.hero video[data-src]:not(.film-c)').forEach(v => { v.src = v.dataset.src; v.play().catch(() => {}); });
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

  /* ---------- menu data: Sultan Istanbul's own menu card (posted July 2026) ---------- */
  // p: one price · v: [label, price] pairs (Full/Half, Chicken/Beef, S/F) · no price: Ask on WhatsApp
  const TABS = [
    { id: 'sig', name: 'Platters & Turkish', groups: [
      { name: 'Signature Platters', img: 'img/chaska.webp', note: 'Made for the whole table', items: [
        { n: 'Sultan Special Platter', p: 4999, tag: 'Bestseller', d: 'Fish tikka, qalmi tikka, malai boti, chicken boti, chicken kabab, battair (4 pcs each), Kabuli pulao 900g, naan, 2 roti, BBQ sauce' },
        { n: 'Shawaya Platter', p: 2499, tag: 'Arabic', d: 'Whole chicken, boneless chicken, Turkish pilao, shawaya bread, fries, fresh vegetables' },
        { n: 'Grill Fish with Pulao', p: 1499, tag: 'Pick of the month', d: 'Charcoal-grilled fish in special spices on aromatic pulao' },
        { n: 'Chaska Platter', tag: 'New', d: 'Hanging skewers, kebab, rice and bread for a desi craving' }
      ]},
      { name: 'Turkish', img: 'img/buddhu.webp', note: 'First time in Haripur', items: [
        { n: 'Special Mutton Anadana', p: 4999, tag: 'Salt dome', d: 'Mutton sealed in a salt dome, flamed and opened at your table' },
        { n: 'Buddhu Mutton', p: 4999, tag: 'Smoked', d: 'Mutton chops with rice and five dips, served under smoke' },
        { n: 'Ouzi Tawook', p: 2999, d: 'Salt-crust skinned chicken' },
        { n: 'Baklava Kebab', p: 2499 },
        { n: 'Dajajal Faham', p: 2499, d: 'Skinned grilled chicken' },
        { n: 'Perde Pilavi', p: 1599, d: 'Turkish rice baked in a pastry crust' }
      ]},
      { name: 'Turkish Barbecue', img: 'img/skewers.webp', note: 'Turkish cuts off the grill', items: [
        { n: 'Andana Kebab', q: '4 pcs', p: 2799 },
        { n: 'Chullu Kebab', q: '4 pcs', p: 1999 },
        { n: 'Paneeri Boti', q: '10 pcs', p: 1499 },
        { n: 'Anari Boti', q: '10 pcs', p: 1299 },
        { n: 'Sis Tavuk Boti', q: '10 pcs', p: 1299 },
        { n: 'Kanat Wings', q: '10 pcs', p: 1199 }
      ]}
    ]},
    { id: 'bbq', name: 'BBQ & Kebab', groups: [
      { name: 'Bar Be Que', img: 'img/grill.webp', note: 'Fresh off the charcoal', items: [
        { n: 'Fish Tikka', q: '10 pcs', p: 2499 },
        { n: 'Haryali Boti', q: '10 pcs', p: 1399 },
        { n: 'Malai Boti', q: '10 pcs', p: 1399 },
        { n: 'Chatkhara Boti', q: '10 pcs', p: 1199 },
        { n: 'Achari Boti', q: '10 pcs', p: 1199 },
        { n: 'Sikandari Tikka', q: '4 pcs', p: 999 },
        { n: 'Chicken Tikka (Leg)', p: 499 },
        { n: 'Chicken Tikka (Chest)', p: 499 }
      ]},
      { name: 'Kebab House', note: 'Four to a plate', items: [
        { n: 'Beef Kebab', q: '4 pcs', p: 1499 },
        { n: 'Reshmi Kebab', q: '4 pcs', p: 1299 },
        { n: 'Chicken Kebab', q: '4 pcs', p: 1199 }
      ]}
    ]},
    { id: 'karahi', name: 'Karahi & Shinwari', groups: [
      { name: 'Mutton Karahi', note: 'Full or half', items: [
        { n: "Sultan's Special Karahi", v: [['Full', 4499], ['Half', 2299]], tag: 'Signature' },
        { n: 'Achari Karahi', v: [['Full', 4199], ['Half', 2299]] },
        { n: 'Lahori Karahi', v: [['Full', 3999], ['Half', 2199]] },
        { n: 'Afghani Karahi', v: [['Full', 3999], ['Half', 2199]] }
      ]},
      { name: 'Chicken Karahi', note: 'Full or half', items: [
        { n: "Sultan's Special Karahi", v: [['Full', 2499], ['Half', 1399]], tag: 'Signature' },
        { n: 'Lahori Karahi', v: [['Full', 2099], ['Half', 1249]] },
        { n: 'Afghani Karahi', v: [['Full', 2099], ['Half', 1249]] },
        { n: 'Achari Karahi', v: [['Full', 2099], ['Half', 1249]] }
      ]},
      { name: 'Shinwari', img: 'img/ranjha.webp', note: 'Peshawar style', items: [
        { n: 'Ranjha Gosht', p: 3999, tag: 'Royal' },
        { n: 'Mutton Nalli Karahi', p: 4499 },
        { n: 'Sulemani Karahi', v: [['Full', 4499], ['Half', 2299]] },
        { n: 'Landi Kotal Karahi Mutton', v: [['Full', 3899], ['Half', 2199]] },
        { n: 'Landi Kotal Karahi Chicken', v: [['Full', 2499], ['Half', 1249]] },
        { n: 'Mutton Rosh', p: 4099 },
        { n: 'Mutton DumPukht', p: 4099 },
        { n: 'Beef Kabuli Pulao', p: 1244 },
        { n: 'Patta Tikka', p: 1199 }
      ]}
    ]},
    { id: 'desi', name: 'Desi Mains', groups: [
      { name: 'Pakistani / Mughlai', note: 'House curries and handis', items: [
        { n: 'Sultan Special Rajhastani Cheese Handi', p: 1799, tag: 'Signature' },
        { n: 'Chicken Bharta', p: 1499 }, { n: 'Surprise Chicken', p: 1499 }, { n: 'Bombay Chicken', p: 1499 },
        { n: 'Chinioti Jalfrezi', p: 1499 }, { n: 'Lakhnao Curry', p: 1399 }, { n: 'White Handi', p: 1399 },
        { n: 'Lahori Handi', p: 1299 }, { n: 'Kabab Masala', p: 1249 }, { n: 'Lakshami Tawa Chicken', p: 999 }
      ]},
      { name: 'Signature Dishes', note: 'Vegetarian', items: [
        { n: 'Palak Paneer', p: 799 }, { n: 'Mix Vegetable', p: 699 }, { n: 'Daal Mash', p: 699 }
      ]}
    ]},
    { id: 'rice', name: 'Rice, Chinese & Steaks', groups: [
      { name: 'Rice', note: 'Pulao, biryani, fried rice', items: [
        { n: 'Mutton Bhunna Pulao', p: 2499 }, { n: 'Chicken Bhunna Pulao', p: 1899 }, { n: 'Chicken Biryani', p: 1499 },
        { n: 'Chicken Fried Rice', p: 799 }, { n: 'Egg Fried Rice', p: 499 }
      ]},
      { name: 'Chinese', note: 'Served with rice', items: [
        { n: "Sultan's Special Gravy with Rice", p: 1399 }, { n: 'Beef Chilli Dry with Rice', p: 1699 },
        { n: 'Chicken Chilli Dry with Rice', p: 1299 }, { n: 'Manchurian with Rice', p: 999 }, { n: 'Chicken Chow Mein', p: 999 }
      ]},
      { name: 'Steaks', note: 'Chicken or beef', items: [
        { n: "Sultan's Special Steak", v: [['Chicken', 1699], ['Beef', 1999]] },
        { n: 'Mexican Steak', v: [['Chicken', 1549], ['Beef', 1999]] },
        { n: 'Mushroom Steak', v: [['Chicken', 1499], ['Beef', 1999]] },
        { n: 'Black Pepper Steak', v: [['Chicken', 1499], ['Beef', 1999]] }
      ]},
      { name: 'Pasta', note: 'Creamy and rich', items: [
        { n: "Sultan's Special Pasta", p: 1699 }, { n: 'Fettuccine Alfredo Pasta', p: 1449 }
      ]}
    ]},
    { id: 'start', name: 'Starters & Soups', groups: [
      { name: 'Appetizers', note: 'To start the table', items: [
        { n: 'Finger Fish', p: 1699 }, { n: 'Teriyaki Chicken', p: 1199 }, { n: 'Dynamite Chicken', p: 1199 }, { n: 'Dhaka Chicken', p: 1199 },
        { n: 'Sultan Special Lahmacun', p: 999, tag: 'Turkish' }, { n: 'Honey Wings', q: '8 pcs', p: 999 }, { n: 'Chicken Pakora', p: 999 },
        { n: 'Loaded Fries', p: 999 }, { n: 'Cheese Naan', p: 549 }, { n: 'Plain Fries', p: 349 }, { n: 'Fish Cracker', p: 299 }
      ]},
      { name: 'Soup', note: 'Turkish çorba and more', items: [
        { n: 'Yalya Çorbası', p: 399 }, { n: 'Lentil Çorbası', p: 399 },
        { n: 'Corn Soup', v: [['Single', 299], ['Family', 999]] }, { n: 'Hot & Sour Soup', v: [['Single', 299], ['Family', 999]] }
      ]},
      { name: 'Salads & Dips', note: 'Mezze for the table', items: [
        { n: "Sultan's Special Mezze Platter", p: 2999, tag: 'Mezze' }, { n: 'Greek Salad', p: 849 }, { n: 'Humus', p: 799 },
        { n: 'Baba Ganoush', p: 599 }, { n: 'Russian Salad', p: 499 }, { n: 'Green Salad', p: 199 }, { n: 'Salata Sauce', p: 199 },
        { n: 'Barbecue Sauce', p: 149 }, { n: 'Plum Sauce', p: 149 }, { n: 'Mint Raita', p: 149 }, { n: 'Zeera Raita', p: 149 }, { n: 'Plain Yogurt', p: 119 }
      ]}
    ]},
    { id: 'sweet', name: 'Desserts & Drinks', groups: [
      { name: 'Desserts', img: 'img/tiramisu.webp', note: 'A sweet finish', items: [
        { n: 'Sultan Special Knafeh', p: 1399, tag: 'Turkish' }, { n: 'Chocolate Knafeh', p: 1249 }, { n: 'Baklawa', p: 999 },
        { n: 'Basbousa', p: 799 }, { n: 'American Cake Cheese Slice', p: 749 }, { n: 'Three Milk Cake', p: 699 },
        { n: 'Tiramisu', p: 599 }, { n: 'Chocolate Tree', p: 499 }, { n: 'Pastry', p: 399 }, { n: 'Kheer', p: 249 }, { n: 'Milky Bowl', tag: 'New' }
      ]},
      { name: 'Mocktails', note: 'Served with smoke', items: [
        { n: 'Saudi Champagne' }, { n: 'Blue Colada' }, { n: 'Classic Mojito' }, { n: 'Strawberry Margarita' }, { n: 'Mint Margarita' }, { n: 'Mango Smoothie' }
      ]},
      { name: 'Tea', note: 'Chai after dinner', items: [
        { n: "Sultan's Special Pink Tea", p: 149 }, { n: 'Doodh Patti', p: 119 }, { n: 'Gur Wali Chaye', p: 119 }, { n: 'Karak Chai', p: 99 }, { n: 'Green Tea', p: 59 }
      ]},
      { name: 'Tandoor', note: 'Fresh from the tandoor', items: [
        { n: 'Qandhari Naan', p: 179 }, { n: 'Tandoori Paratha', p: 119 }, { n: 'Roghni Naan', p: 99 }, { n: 'Garlic Naan', p: 99 }, { n: 'Plain Naan', p: 29 }, { n: 'Roti', p: 29 }
      ]}
    ]}
  ];
  const PHOTO = { 'Sultan Special Platter': 'platter', 'Shawaya Platter': 'shawaya-studio', 'Grill Fish with Pulao': 'fish', 'Chaska Platter': 'chaska',
    'Special Mutton Anadana': 'anadana', 'Buddhu Mutton': 'buddhu', 'Ranjha Gosht': 'd-ranjha-g', 'Fish Tikka': 'grill',
    'Chicken Chilli Dry with Rice': 'd-chilli-dry', 'Manchurian with Rice': 'd-manchurian', 'Chicken Chow Mein': 'd-chowmein',
    'Tiramisu': 'tiramisu', 'American Cake Cheese Slice': 'cheesecake', 'Milky Bowl': 'milky',
    'Saudi Champagne': 'd-saudi', 'Blue Colada': 'd-colada', 'Classic Mojito': 'd-mojito', 'Strawberry Margarita': 'd-strawberry', 'Mango Smoothie': 'd-mango' };
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const ALL = new Map();
  TABS.forEach(t => t.groups.forEach(g => g.items.forEach(i => {
    i.id = slug(g.name + ' ' + i.n);
    if (i.v) i.v.forEach(([l, p]) => ALL.set(i.id + '--' + slug(l), { id: i.id + '--' + slug(l), name: `${i.n} (${l})`, price: p }));
    else if (i.p) ALL.set(i.id, { id: i.id, name: i.n, price: i.p });
  })));
  // short ids used by buttons outside the menu
  const ALIAS = { special: 'signature-platters-sultan-special-platter', shawaya: 'signature-platters-shawaya-platter', fish: 'signature-platters-grill-fish-with-pulao',
    anadana: 'turkish-special-mutton-anadana', buddhu: 'turkish-buddhu-mutton', ranjha: 'shinwari-ranjha-gosht',
    tiramisu: 'desserts-tiramisu', accs: 'desserts-american-cake-cheese-slice', knafeh: 'desserts-sultan-special-knafeh' };
  const find = k => ALL.get(ALIAS[k] || k);

  const tabsEl = $('[data-tabs]'), menuEl = $('[data-menu]'), searchEl = $('[data-search]');
  let current = 'sig';
  tabsEl.innerHTML = TABS.map(t => `<button type="button" role="tab" aria-selected="${t.id === current}" data-tab="${t.id}">${t.name}</button>`).join('');
  const askLink = n => `<a class="ask-sm" href="https://wa.me/${WA}?text=${encodeURIComponent('Assalam o Alaikum, what is the price of ' + n + '?')}" target="_blank" rel="noopener">${icon('wa')}Ask</a>`;
  const addBtn = id => `<span class="stp" data-k="${id}"></span>`;
  function itemHTML(i) {
    let right;
    if (i.v) right = `<div class="mi-vars">${i.v.map(([l, p]) => `<div class="mi-var"><span class="vl">${l}</span><span class="mi-price">${fmt(p)}</span>${addBtn(i.id + '--' + slug(l))}</div>`).join('')}</div>`;
    else if (i.p) right = `<div class="mi-act"><span class="mi-price">${fmt(i.p)}</span>${addBtn(i.id)}</div>`;
    else right = askLink(i.n);
    const ph = PHOTO[i.n] ? `<img class="mi-thumb" src="img/${PHOTO[i.n]}.webp" alt="" loading="lazy">` : '';
    const tap = i.p ? ` data-tap="${i.id}"` : (i.v ? ` data-tap="${i.id}--${slug(i.v[0][0])}"` : '');
    return `<div class="mi${tap ? ' tappable' : ''}"${tap}>${ph}<div class="mi-txt"><p class="mi-name">${i.n}${i.q ? `<span class="qty-l">${i.q}</span>` : ''}${i.tag ? `<em>${i.tag}</em>` : ''}</p>${i.d ? `<p class="mi-desc">${i.d}</p>` : ''}</div>${right}</div>`;
  }
  function renderMenu() {
    const q = (searchEl.value || '').trim().toLowerCase();
    const tabs = q ? TABS : TABS.filter(t => t.id === current);
    const groups = tabs.flatMap(t => t.groups).map(g => ({ ...g, items: g.items.filter(i => !q || (g.name + ' ' + i.n + ' ' + (i.d || '')).toLowerCase().includes(q)) })).filter(g => g.items.length);
    setTimeout(() => window.__paint && window.__paint(), 0);
    menuEl.innerHTML = groups.length ? groups.map(g => `
      <div class="menu-group">
        <div class="mg-cover${g.img ? '' : ' plain'}">${g.img ? `<img src="${g.img}" alt="" loading="lazy">` : `<svg class="mg-orn" aria-hidden="true"><use href="#i-orn"/></svg>`}<div><small>${g.items.length} dishes</small><h3>${g.name}</h3><p>${g.note}</p></div></div>
        <div class="mg-items">${g.items.map(itemHTML).join('')}</div>
      </div>`).join('') : `<p class="empty">Nothing found. Ask us on <a href="https://wa.me/${WA}" target="_blank" rel="noopener">WhatsApp</a>.</p>`;
  }
  tabsEl.addEventListener('click', e => {
    const b = e.target.closest('[data-tab]'); if (!b) return;
    current = b.dataset.tab; searchEl.value = '';
    $$('[data-tab]', tabsEl).forEach(x => x.setAttribute('aria-selected', x === b)); renderMenu();
  });
  searchEl.addEventListener('input', () => { $$('[data-tab]', tabsEl).forEach(x => x.setAttribute('aria-selected', !searchEl.value && x.dataset.tab === current)); renderMenu(); });
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
  const keyOf = k => (find(k) || {}).id || k;
  function paint() {
    $$('.stp').forEach(el => {
      const id = keyOf(el.dataset.k), q = (cart.get(id) || {}).qty || 0;
      const want = q ? 'q' + q : 'add';
      if (el.dataset.st === want) return; el.dataset.st = want;
      el.innerHTML = q
        ? `<span class="step"><button type="button" data-dec="${id}" aria-label="One less">${icon('minus')}</button><b>${q}</b><button type="button" data-inc="${id}" aria-label="One more">${icon('plus')}</button></span>`
        : `<button class="add" type="button" data-add="${el.dataset.k}">${el.dataset.label || 'Add'} ${icon('plus')}</button>`;
    });
  }
  window.__paint = paint;
  function render() {
    paint();
    $$('[data-count]').forEach(c => c.textContent = count());
    totalEl.textContent = fmt(total());
    linesEl.innerHTML = cart.size ? [...cart].map(([id, l]) => `
      <div class="line"><b>${l.name}<small>${fmt(l.price)} × ${l.qty} = <strong>${fmt(l.price * l.qty)}</strong></small></b>
      <div class="qty"><button type="button" data-dec="${id}" aria-label="One less ${l.name}">${icon('minus')}</button><span>${l.qty}</span><button type="button" data-inc="${id}" aria-label="One more ${l.name}">${icon('plus')}</button></div></div>`).join('')
      : `<div class="sheet-empty"><img src="img/logo-badge.png" alt="" width="84" height="84" style="border-radius:50%"><p>Your order is empty.<br>Add a platter to get started.</p><a class="btn gold sm" href="#signature" data-close-cart>See the platters</a></div>`;
  }
  const lineOf = id => cart.get(id) ? { id, ...cart.get(id) } : find(id);
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-add]');
    if (a) { const i = find(a.dataset.add); if (i) change(i, 1); return; }
    const inc = e.target.closest('[data-inc]'); if (inc) { const l = lineOf(inc.dataset.inc); if (l) change(l, 1); return; }
    const dec = e.target.closest('[data-dec]'); if (dec) { const l = lineOf(dec.dataset.dec); if (l) change(l, -1); return; }
    const tap = e.target.closest('[data-tap]');
    if (tap && !e.target.closest('a, button, input, select, textarea, .stp')) { const i = find(tap.dataset.tap); if (i) change(i, 1); return; }
    if (e.target.closest('[data-open-cart]')) { openSheet(); return; }
    if (e.target.closest('[data-close-cart]') || e.target.matches('[data-sheet-back]')) closeSheet();
  });

  const sheet = $('[data-sheet]'), back = $('[data-sheet-back]');
  function openSheet() { back.hidden = false; sheet.classList.add('open'); sheet.setAttribute('aria-hidden', 'false'); setTimeout(() => $('.x', sheet).focus(), 50); document.body.style.overflow = 'hidden'; }
  function closeSheet() { sheet.classList.remove('open'); sheet.setAttribute('aria-hidden', 'true'); back.hidden = true; document.body.style.overflow = ''; }
  addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('open')) closeSheet(); });

  const F = n => $(`[data-o="${n}"]`);
  const modeEl = F('mode'), addrWrap = $('[data-addr-wrap]'), oErr = $('[data-oerr]');
  modeEl.addEventListener('change', () => { addrWrap.hidden = modeEl.value !== 'Home delivery'; });
  try { const saved = JSON.parse(localStorage.getItem('sultan-me') || '{}'); ['name', 'phone', 'addr'].forEach(k => { if (saved[k]) F(k).value = saved[k]; }); } catch (e) {}
  $('[data-send]').addEventListener('click', () => {
    if (!cart.size) { say('Add a dish first'); return; }
    const name = F('name').value.trim(), phone = F('phone').value.replace(/[^0-9+]/g, ''), addr = F('addr').value.trim(), mode = modeEl.value;
    let bad = null;
    if (!name) bad = ['name', 'Please write your name.'];
    else if (phone.replace(/\D/g, '').length < 10) bad = ['phone', 'Please write a valid mobile number, e.g. 0300 1234567.'];
    else if (mode === 'Home delivery' && addr.length < 5) bad = ['addr', 'Please write your delivery address.'];
    if (bad) { oErr.textContent = bad[1]; oErr.hidden = false; F(bad[0]).focus(); return; }
    oErr.hidden = true;
    try { localStorage.setItem('sultan-me', JSON.stringify({ name, phone, addr })); } catch (e) {}
    const lines = [...cart.values()].map(l => `• ${l.qty} × ${l.name} = ${fmt(l.qty * l.price)}`);
    let msg = `Assalam o Alaikum Sultan Istanbul! New order:\n\n${lines.join('\n')}\n\n*Total: ${fmt(total())}*\n\nName: ${name}\nMobile: ${phone}\nOrder type: ${mode}`;
    if (mode === 'Home delivery') msg += `\nAddress: ${addr}`;
    msg += `\nPayment: ${F('pay').value}`;
    if (F('note').value.trim()) msg += `\nNote: ${F('note').value.trim()}`;
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
