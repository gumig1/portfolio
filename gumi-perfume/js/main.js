// Gumi Natural Perfume Atelier - Interactive Logic & Data Synchronization (main.js)

// 1. 초기 기본 데이터셋
const DEFAULT_PRODUCTS = [
  {
    id: 'perfume-forest-dawn',
    name: '포레스트 던 (Forest Dawn) 천연 오드퍼퓸 50ml',
    category: 'perfume',
    categoryLabel: '시그니처 퍼퓸',
    price: 68000,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
    moods: ['#숲속산책', '#릴랙스', '#따뜻한우디'],
    summary: '새벽 안개가 내려앉은 금오산 편백나무 숲의 첫 숨결을 담은 보태니컬 우디 퍼퓸',
    pyramid: {
      top: '베르가못 (Bergamot), 유칼립투스 (Eucalyptus), 주니퍼베리',
      middle: '프렌치 라벤더 (Lavender), 로즈마리, 클라리세이지',
      base: '히노끼(편백), 시더우드 (Cedarwood), 베티버 (Vetiver)'
    },
    ingredients: [
      { name: '베르가못 에센셜 오일', latin: 'Citrus aurantium bergamia', origin: '이탈리아 칼라브리아' },
      { name: '트루 라벤더 에센셜 오일', latin: 'Lavandula angustifolia', origin: '프랑스 프로방스' },
      { name: '시더우드 아틀라스 오일', latin: 'Cedrus atlantica', origin: '모로코' },
      { name: '발효 식물성 주정 베이스', latin: 'Organic Grain Alcohol', origin: '국내산 (곡물 발효)' }
    ]
  },
  {
    id: 'perfume-warm-garden',
    name: '선릿 가든 (Sunlit Garden) 천연 오드퍼퓸 50ml',
    category: 'perfume',
    categoryLabel: '시그니처 퍼퓸',
    price: 72000,
    image: 'https://images.unsplash.com/photo-1709662217659-c7966220219f?auto=format&fit=crop&w=900&q=80',
    moods: ['#릴랙스', '#상큼시트러스'],
    summary: '따스한 오후 정원에 피어난 네롤리와 야생 장미, 시트러스 잎사귀의 싱그러운 조화',
    pyramid: {
      top: '스위트 오렌지, 만다린, 페티그레인 (Petitgrain)',
      middle: '네롤리 (Neroli), 로즈 제라늄, 일랑일랑',
      base: '호우드 (Ho Wood), 프랑킨센스, 샌달우드'
    },
    ingredients: [
      { name: '네롤리 에센셜 오일', latin: 'Citrus aurantium amara', origin: '튀니지' },
      { name: '로즈 제라늄 에센셜 오일', latin: 'Pelargonium graveolens', origin: '이집트' },
      { name: '스위트 오렌지 오일', latin: 'Citrus sinensis', origin: '브라질' },
      { name: '호주산 샌달우드 오일', latin: 'Santalum spicatum', origin: '호주' }
    ]
  },
  {
    id: 'spray-deep-sleep',
    name: '문라이트 필로우 & 룸스프레이 100ml',
    category: 'home',
    categoryLabel: '홈 프래그런스',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
    moods: ['#숙면', '#릴랙스'],
    summary: '하루의 긴장을 부드럽게 풀어주는 로만 카모마일과 마조람 블렌딩 숙면 필로우 미스트',
    pyramid: {
      top: '그린 만다린, 라임 블로썸',
      middle: '로만 카모마일, 고지대 트루 라벤더, 스위트 마조람',
      base: '벤조인 (Benzoin), 팔마로사, 시더우드'
    },
    ingredients: [
      { name: '로만 카모마일 오일', latin: 'Anthemis nobilis', origin: '영국' },
      { name: '스위트 마조람 오일', latin: 'Origanum majorana', origin: '이집트' },
      { name: '트루 라벤더 오일', latin: 'Lavandula angustifolia', origin: '프랑스' },
      { name: '벤조인 레지노이드', latin: 'Styrax tonkinensis', origin: '라오스' }
    ]
  },
  {
    id: 'diffuser-wooden-study',
    name: '아틀리에 우드 리드 디퓨저 150ml',
    category: 'home',
    categoryLabel: '홈 프래그런스',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=900&q=80',
    moods: ['#따뜻한우디', '#숲속산책'],
    summary: '오래된 서재와 전원주택 나무 데크의 차분한 온기를 전하는 천연 에센셜 디퓨저',
    pyramid: {
      top: '핑크페퍼, 베르가못, 사이프러스',
      middle: '파인 니들 (Pine Needle), 팔로산토, 로즈우드',
      base: '파출리 (Patchouli), 베티버, 아틀라스 시더우드'
    },
    ingredients: [
      { name: '사이프러스 에센셜 오일', latin: 'Cupressus sempervirens', origin: '스페인' },
      { name: '팔로산토 우드 오일', latin: 'Bursera graveolens', origin: '에콰도르' },
      { name: '파출리 에센셜 오일', latin: 'Pogostemon cablin', origin: '인도네시아' }
    ]
  },
  {
    id: 'kit-bespoke-discovery',
    name: '보태니컬 DIY 조향 키트 & 시향 세트 (6종)',
    category: 'kit',
    categoryLabel: 'DIY 키트 & 선물 세트',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
    moods: ['#릴랙스', '#숲속산책', '#상큼시트러스'],
    summary: '집에서도 공방의 감성을 그대로 경험하는 천연 어코드 6종 + 조향 공병 & 시향지 풀세트',
    pyramid: {
      top: '시트러스 & 허브 어코드 2종 (베르가못, 유칼립투스)',
      middle: '플로럴 & 그린 어코드 2종 (네롤리, 라벤더)',
      base: '우디 & 머스크 어코드 2종 (히노끼, 샌달우드)'
    },
    ingredients: [
      { name: '100% 천연 에센셜 어코드 6종', latin: '10ml Dropper Bottles x 6', origin: '프랑스/이탈리아/호주 등' },
      { name: '조향 가이드북 & 시향지 30매', latin: 'Atelier Formula Note', origin: '구미 천연향수공방 자체제작' }
    ]
  },
  {
    id: 'gift-signature-duo',
    name: '시그니처 퍼퓸 30ml + 룸스프레이 기프트 세트',
    category: 'kit',
    categoryLabel: 'DIY 키트 & 선물 세트',
    price: 89000,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=80',
    moods: ['#숙면', '#따뜻한우디', '#릴랙스'],
    summary: '소중한 분께 자연의 쉼표를 선물하는 베스트셀러 2종 친환경 크라프트 기프트 패키지',
    pyramid: {
      top: '오렌지 블로썸, 베르가못',
      middle: '프렌치 라벤더, 로즈 제라늄, 마조람',
      base: '편백(히노끼), 샌달우드, 프랑킨센스'
    },
    ingredients: [
      { name: '포레스트 던 오드퍼퓸 30ml', latin: 'Natural Eau de Parfum', origin: '구미 아틀리에 핸드메이드' },
      { name: '문라이트 필로우 미스트 80ml', latin: 'Natural Pillow & Room Mist', origin: '구미 아틀리에 핸드메이드' }
    ]
  }
];

const DEFAULT_HERO_CONFIG = {
  topBanner: {
    text: '🌿 [가을 정원 클래스 오픈] 2인 이상 동반 예약 시 천연 아로마 롤온(10ml) 증정 · 100% 식물성 에센셜 오일 블렌딩',
    link: 'class.html#booking-section'
  },
  slides: [
    {
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1800&q=85',
      badge: '🌿 Slide 01 / 03 · Garden Atelier | 금오산 자락 사계절 정원 공방',
      title: '자연이 머무는 숲속 작은 집,\n당신만의 향기를 만납니다.',
      desc: '“도심을 벗어나 자연 속에서 나만의 숨결을 조향하는 힐링 아틀리에”\n라벤더와 로즈마리가 자라는 전원주택 정원에서 허브티 한 잔의 여유와 함께 온전한 쉼을 경험해 보세요.'
    },
    {
      image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1800&q=85',
      badge: '💧 Slide 02 / 03 · 100% Pure Botanical | 합성향 무첨가 테라피 등급 원료',
      title: '머리 아픈 인공향 대신,\n깊게 숨 쉴수록 맑아지는 자연의 결.',
      desc: '프랑스 프로방스 라벤더, 이탈리아 베르가못, 모로코 시더우드 등\n학명과 원산지가 투명하게 검증된 40여 종의 천연 에센셜 오일을 한 방울씩 정성껏 블렌딩합니다.'
    },
    {
      image: 'https://images.unsplash.com/photo-1709666414115-47ecd5143293?auto=format&fit=crop&w=1800&q=85',
      badge: '✨ Slide 03 / 03 · Bespoke Perfumery | 햇살 가득한 통창 앞 1:1 맞춤 조향',
      title: '햇살이 머무는 창가에서 완성하는,\n세상에 단 하나뿐인 시그니처 퍼퓸.',
      desc: '연인과의 특별한 데이트, 친구와의 근교 힐링 나들이, 기업·교직원 단체 워크숍까지\n수석 조향사의 1:1 가이드로 초보자도 나만의 인생 향수와 포뮬러 차트를 완성할 수 있습니다.'
    }
  ]
};

const DEFAULT_NAV = [
  { id: 'home', label: '홈 (Home)', url: 'index.html', visible: true },
  { id: 'about', label: '공방 소개', url: 'about.html', visible: true },
  { id: 'class', label: '클래스 & 예약', url: 'class.html', visible: true },
  { id: 'shop', label: '온라인 숍', url: 'shop.html', visible: true },
  { id: 'reviews', label: '갤러리 & 후기', url: 'reviews.html', visible: true },
  { id: 'contact', label: '문의 & 오시는 길', url: 'contact.html', visible: true }
];

const DEFAULT_CLASSES = [
  {
    id: 'class-signature-50',
    name: '나만의 시그니처 천연 향수 (50ml)',
    price: 55000,
    duration: '90분',
    maxSeats: 6,
    desc: '40여 종 천연 에센셜 오일 시향 및 Top·Middle·Base 노트 설계, 커스텀 라벨링 포함 원데이 클래스'
  },
  {
    id: 'class-signature-30',
    name: '나만의 시그니처 천연 향수 (30ml)',
    price: 45000,
    duration: '75분',
    maxSeats: 6,
    desc: '휴대성이 좋은 30ml 콤팩트 보틀에 나만의 천연 향기를 담아가는 입문용 원데이 클래스'
  },
  {
    id: 'class-aroma-room',
    name: '아로마 힐링 룸스프레이 & 필로우 미스트 (100ml)',
    price: 42000,
    duration: '70분',
    maxSeats: 6,
    desc: '숙면 유도, 릴랙싱, 실내 공기 정화 목적의 아로마테라피 홈 프래그런스 제작'
  },
  {
    id: 'class-expert-4weeks',
    name: '보태니컬 천연 조향 심화 과정 (4주 코스)',
    price: 280000,
    duration: '주 1회 120분 (총 4주)',
    maxSeats: 4,
    desc: '4대 향조별 천연 어코드 구조 및 숙성 학문을 다루며 4주 동안 4종의 향수 창작'
  }
];

// 2. 통합 로컬 데이터 저장소 (AtelierStore)
window.AtelierStore = {
  getProducts: function() {
    try {
      const data = localStorage.getItem('gumi_atelier_products');
      return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  },
  saveProducts: function(prods) {
    localStorage.setItem('gumi_atelier_products', JSON.stringify(prods));
  },

  getHeroConfig: function() {
    try {
      const data = localStorage.getItem('gumi_atelier_hero_config');
      return data ? JSON.parse(data) : DEFAULT_HERO_CONFIG;
    } catch (e) {
      return DEFAULT_HERO_CONFIG;
    }
  },
  saveHeroConfig: function(config) {
    localStorage.setItem('gumi_atelier_hero_config', JSON.stringify(config));
  },

  getNavConfig: function() {
    try {
      const data = localStorage.getItem('gumi_atelier_nav_config');
      return data ? JSON.parse(data) : DEFAULT_NAV;
    } catch (e) {
      return DEFAULT_NAV;
    }
  },
  saveNavConfig: function(nav) {
    localStorage.setItem('gumi_atelier_nav_config', JSON.stringify(nav));
  },

  getClasses: function() {
    try {
      const data = localStorage.getItem('gumi_atelier_classes');
      return data ? JSON.parse(data) : DEFAULT_CLASSES;
    } catch (e) {
      return DEFAULT_CLASSES;
    }
  },
  saveClasses: function(classes) {
    localStorage.setItem('gumi_atelier_classes', JSON.stringify(classes));
  },

  getBookings: function() {
    try {
      const data = localStorage.getItem('gumi_atelier_bookings');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },
  addBooking: function(booking) {
    const list = this.getBookings();
    booking.id = 'BK-' + Date.now().toString().slice(-6);
    booking.createdAt = new Date().toLocaleString('ko-KR');
    booking.status = '대기';
    list.unshift(booking);
    localStorage.setItem('gumi_atelier_bookings', JSON.stringify(list));
    return booking;
  },
  updateBookingStatus: function(id, status) {
    const list = this.getBookings().map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem('gumi_atelier_bookings', JSON.stringify(list));
  },
  deleteBooking: function(id) {
    const list = this.getBookings().filter(b => b.id !== id);
    localStorage.setItem('gumi_atelier_bookings', JSON.stringify(list));
  },

  getAtelierInfo: function() {
    try {
      const data = localStorage.getItem('gumi_atelier_info');
      return data ? JSON.parse(data) : {
        name: '구미 천연향수공방',
        owner: '김아로마',
        phone: '054-456-7890',
        address: '경상북도 구미시 금오산로 전원길 (수점동 전원마을)',
        hours: '화~일 10:30 - 20:00 (월요일 휴무)',
        parking: '공방 마당 앞 전용 주차 공간 4대 무료'
      };
    } catch (e) {
      return {};
    }
  },
  saveAtelierInfo: function(info) {
    localStorage.setItem('gumi_atelier_info', JSON.stringify(info));
  },

  exportAll: function() {
    return {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      products: this.getProducts(),
      heroConfig: this.getHeroConfig(),
      navConfig: this.getNavConfig(),
      classes: this.getClasses(),
      bookings: this.getBookings(),
      atelierInfo: this.getAtelierInfo()
    };
  },
  importAll: function(data) {
    if (data.products) this.saveProducts(data.products);
    if (data.heroConfig) this.saveHeroConfig(data.heroConfig);
    if (data.navConfig) this.saveNavConfig(data.navConfig);
    if (data.classes) this.saveClasses(data.classes);
    if (data.bookings) localStorage.setItem('gumi_atelier_bookings', JSON.stringify(data.bookings));
    if (data.atelierInfo) this.saveAtelierInfo(data.atelierInfo);
  },
  resetDefaults: function() {
    localStorage.removeItem('gumi_atelier_products');
    localStorage.removeItem('gumi_atelier_hero_config');
    localStorage.removeItem('gumi_atelier_nav_config');
    localStorage.removeItem('gumi_atelier_classes');
    localStorage.removeItem('gumi_atelier_info');
  }
};

// 동적 PRODUCTS_DATA 연동
function getActiveProducts() {
  return window.AtelierStore.getProducts();
}

function formatKRW(num) {
  return (num || 0).toLocaleString('ko-KR') + '원';
}

// 장바구니 로직
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('gumi_atelier_cart') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('gumi_atelier_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
  });
}

function addToCart(productId, packageOption, packagePrice) {
  const products = getActiveProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const key = `${productId}__${packageOption}`;
  const existing = cart.find(item => item.key === key);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      key,
      productId,
      name: product.name,
      packageOption,
      unitPrice: product.price + packagePrice,
      qty: 1
    });
  }
  saveCart(cart);
  showToast(`'${product.name}' (${packageOption}) 상품이 장바구니에 담겼습니다.`);
}

function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.style.cssText = `
      position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
      background: #2A3C35; color: #FDFBF7; padding: 14px 24px;
      border-radius: 99px; font-size: 0.92rem; font-weight: 600;
      box-shadow: 0 10px 30px rgba(0,0,0,0.22); z-index: 3000;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
  }, 3000);
}

// 상품 모달
function openProductModal(productId) {
  const products = getActiveProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let modal = document.getElementById('product-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-detail-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="닫기" onclick="closeModal('product-detail-modal')">&times;</button>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px;">
        <div>
          <img src="${product.image}" alt="${product.name}" style="width:100%; height:280px; object-fit:cover; border-radius:14px; margin-bottom:16px;">
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px;">
            ${(product.moods || []).map(m => `<span class="mood-tag" style="background:var(--secondary-light); color:var(--secondary-dark);">${m}</span>`).join('')}
          </div>
          <div style="background:var(--bg-alt); padding:16px; border-radius:12px;">
            <h4 style="font-size:0.95rem; color:var(--primary-dark); margin-bottom:8px;">향 피라미드 (Scent Pyramid)</h4>
            <div class="scent-pyramid">
              <div class="pyramid-tier pyramid-top">
                <span class="pyramid-label">Top Note (첫인상 · 15~30분)</span>
                <span class="pyramid-notes">${product.pyramid?.top || '시트러스, 허브'}</span>
              </div>
              <div class="pyramid-tier pyramid-middle">
                <span class="pyramid-label">Middle Note (중심향 · 1~3시간)</span>
                <span class="pyramid-notes">${product.pyramid?.middle || '플로럴, 그린'}</span>
              </div>
              <div class="pyramid-tier pyramid-base">
                <span class="pyramid-label">Base Note (잔향 · 3~6시간)</span>
                <span class="pyramid-notes">${product.pyramid?.base || '우디, 앰버'}</span>
              </div>
            </div>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <span class="section-subtitle" style="margin-bottom:8px;">${product.categoryLabel || '시그니처 향기'}</span>
            <h3 style="font-size:1.5rem; color:var(--primary-dark); margin-bottom:10px;">${product.name}</h3>
            <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:16px;">${product.summary || ''}</p>
            <div style="font-family:var(--font-serif); font-size:1.45rem; font-weight:700; color:var(--primary); margin-bottom:20px;">
              ${formatKRW(product.price)}
              ${product.soldOut ? '<span style="font-size:0.9rem; color:var(--danger); margin-left:8px;">[품절]</span>' : ''}
            </div>

            <h4 style="font-size:0.92rem; color:var(--primary-dark); margin-bottom:8px;">천연 에센셜 오일 학명 및 원산지 고지</h4>
            <table style="width:100%; border-collapse:collapse; font-size:0.82rem; margin-bottom:20px; background:#fff; border:1px solid var(--border); border-radius:8px; overflow:hidden;">
              <thead>
                <tr style="background:var(--primary-soft); color:var(--primary-dark); text-align:left;">
                  <th style="padding:8px 10px;">원료명</th>
                  <th style="padding:8px 10px;">학명 (Botanical Name)</th>
                  <th style="padding:8px 10px;">원산지</th>
                </tr>
              </thead>
              <tbody>
                ${(product.ingredients || [{ name: '천연 에센셜 오일', latin: 'Pure Essential Oils', origin: '원산지 검증 완료' }]).map(ing => `
                  <tr style="border-top:1px solid var(--border-light);">
                    <td style="padding:8px 10px; font-weight:600;">${ing.name}</td>
                    <td style="padding:8px 10px; font-style:italic; color:var(--text-muted);">${ing.latin}</td>
                    <td style="padding:8px 10px;">${ing.origin}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="form-group" style="margin-bottom:20px;">
              <label for="pkg-select">친환경 선물 포장 옵션 (Eco Gift Packaging)</label>
              <select id="pkg-select" class="form-control">
                <option value="기본 친환경 크라프트 상자|0">기본 친환경 크라프트 상자 (+0원)</option>
                <option value="헴프 끈 & 드라이 플라워 택 패키지|3500">헴프 끈 & 정원 드라이 플라워 택 패키지 (+3,500원)</option>
                <option value="시그니처 원목 기프트 박스 & 메시지 카드|7000">시그니처 원목 기프트 박스 & 캘리그라피 카드 (+7,000원)</option>
              </select>
            </div>
          </div>

          <div style="display:flex; gap:10px;">
            <button class="btn btn-outline" style="flex:1;" ${product.soldOut ? 'disabled' : ''} onclick="handleModalAddToCart('${product.id}', false)">장바구니 담기</button>
            <button class="btn btn-primary" style="flex:1;" ${product.soldOut ? 'disabled' : ''} onclick="handleModalAddToCart('${product.id}', true)">바로 구매하기</button>
          </div>
        </div>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

function handleModalAddToCart(productId, openCartNow) {
  const select = document.getElementById('pkg-select');
  const [pkgName, pkgPriceStr] = (select ? select.value : '기본 친환경 크라프트 상자|0').split('|');
  addToCart(productId, pkgName, parseInt(pkgPriceStr, 10) || 0);
  closeModal('product-detail-modal');
  if (openCartNow) {
    openCartModal();
  }
}

function openCartModal() {
  let modal = document.getElementById('cart-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  modal.innerHTML = `
    <div class="modal-content" style="max-width:580px;">
      <button class="modal-close" onclick="closeModal('cart-modal')">&times;</button>
      <h3 style="font-size:1.45rem; color:var(--primary-dark); margin-bottom:18px;">장바구니 (Shopping Bag)</h3>
      ${cart.length === 0 ? `
        <div style="text-align:center; padding:40px 0; color:var(--text-muted);">
          장바구니에 담긴 천연 향기 제품이 없습니다.
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
          ${cart.map((item, idx) => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; padding:14px 16px; border:1px solid var(--border-light); border-radius:10px;">
              <div>
                <div style="font-weight:700; color:var(--primary-dark);">${item.name}</div>
                <div style="font-size:0.82rem; color:var(--text-muted);">포장옵션: ${item.packageOption} | 수량: ${item.qty}개</div>
              </div>
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-weight:700;">${formatKRW(item.unitPrice * item.qty)}</span>
                <button onclick="removeCartItem(${idx})" style="color:var(--danger); font-size:0.85rem; text-decoration:underline;">삭제</button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="booking-summary-box" style="margin-bottom:20px;">
          <div class="booking-summary-row">
            <span>상품 합계</span>
            <span>${formatKRW(total)}</span>
          </div>
          <div class="booking-summary-row">
            <span>배송비 (5만원 이상 무료)</span>
            <span>${total >= 50000 ? '무료' : '3,000원'}</span>
          </div>
          <div class="booking-summary-total">
            <span>총 결제 예정 금액</span>
            <span>${formatKRW(total >= 50000 ? total : total + 3000)}</span>
          </div>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-outline" style="flex:1;" onclick="clearCart()">장바구니 비우기</button>
          <button class="btn btn-primary" style="flex:1.5;" onclick="checkoutCart()">네이버페이 / 카드 결제하기</button>
        </div>
      `}
    </div>
  `;
  modal.classList.add('active');
}

function removeCartItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  openCartModal();
}

function clearCart() {
  saveCart([]);
  openCartModal();
}

function checkoutCart() {
  saveCart([]);
  closeModal('cart-modal');
  showToast('주문이 정상 접수되었습니다! 알림톡으로 발송 일정을 안내해 드립니다.');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// 온라인 숍 페이지 렌더링
function initShopPage() {
  const grid = document.getElementById('shop-product-grid');
  if (!grid) return;

  let currentCat = 'all';
  let currentMood = 'all';

  function renderProducts() {
    const products = getActiveProducts();
    const filtered = products.filter(p => {
      const matchCat = currentCat === 'all' || p.category === currentCat;
      const matchMood = currentMood === 'all' || (p.moods || []).includes(currentMood);
      return matchCat && matchMood;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:var(--text-muted);">선택하신 조건에 해당하는 제품이 없습니다. 다른 무드 태그를 선택해 보세요.</div>`;
      return;
    }

    grid.innerHTML = filtered.map(p => `
      <article class="product-card">
        <div class="product-img-wrap" onclick="openProductModal('${p.id}')" style="cursor:pointer;">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="product-tags">
            ${(p.moods || []).map(m => `<span class="mood-tag">${m}</span>`).join('')}
          </div>
          ${p.soldOut ? '<span style="position:absolute; top:12px; right:12px; background:var(--danger); color:#fff; font-size:0.75rem; font-weight:bold; padding:3px 8px; border-radius:4px;">품절</span>' : ''}
        </div>
        <div class="product-body">
          <div class="product-cat">${p.categoryLabel || p.category}</div>
          <h3 class="product-title" style="cursor:pointer;" onclick="openProductModal('${p.id}')">${p.name}</h3>
          <p class="product-notes-summary">${p.summary || ''}</p>
          <div style="font-size:0.78rem; color:var(--primary); background:var(--primary-soft); padding:6px 10px; border-radius:6px; margin-bottom:12px;">
            <strong>Key Notes:</strong> ${p.pyramid?.middle || '플로럴, 허브'}
          </div>
          <div class="product-bottom">
            <span class="product-price">${formatKRW(p.price)}</span>
            <button class="btn btn-outline btn-sm" onclick="openProductModal('${p.id}')">향 피라미드 · 구매</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  document.querySelectorAll('[data-cat-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-cat-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.getAttribute('data-cat-filter');
      renderProducts();
    });
  });

  document.querySelectorAll('[data-mood-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-mood-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMood = btn.getAttribute('data-mood-filter');
      renderProducts();
    });
  });

  renderProducts();
}

// 클래스 예약 캘린더 & 관리자 연동
function initBookingCalendar() {
  const daysContainer = document.getElementById('calendar-days');
  if (!daysContainer) return;

  let currentYear = 2026;
  let currentMonth = 9; // 10월
  let selectedDay = 24;
  let selectedSlot = '14:00';
  let selectedSeatsLeft = 4;

  const monthTitle = document.getElementById('calendar-month-label');
  const timeslotContainer = document.getElementById('timeslot-list');
  const classSelect = document.getElementById('booking-class-select');
  const countSelect = document.getElementById('booking-count-select');

  // 관리자 설정 클래스 목록으로 셀렉트박스 동기화
  if (classSelect) {
    const classes = window.AtelierStore.getClasses();
    classSelect.innerHTML = classes.map(c => `
      <option value="${c.name}|${c.price}">${c.name} (${c.price.toLocaleString()}원/1인)</option>
    `).join('');
  }

  function getSlotsForDay(day) {
    const mod = day % 3;
    if (mod === 0) {
      return [
        { time: '11:00', seats: 4, status: 'open' },
        { time: '14:00', seats: 2, status: 'open' },
        { time: '17:00', seats: 6, status: 'open' }
      ];
    } else if (mod === 1) {
      return [
        { time: '11:00', seats: 0, status: 'full' },
        { time: '14:00', seats: 5, status: 'open' },
        { time: '17:00', seats: 3, status: 'open' }
      ];
    }
    return [
      { time: '11:00', seats: 6, status: 'open' },
      { time: '14:00', seats: 4, status: 'open' },
      { time: '17:00', seats: 0, status: 'full' }
    ];
  }

  function renderCalendar() {
    if (monthTitle) {
      monthTitle.textContent = `${currentYear}년 ${currentMonth + 1}월`;
    }
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    let html = '';
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="calendar-day disabled"></div>`;
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      const isMonday = dateObj.getDay() === 1;
      const isPast = currentYear === 2026 && currentMonth === 9 && d < 19;
      const disabled = isMonday || isPast;
      const isSelected = d === selectedDay && !disabled;

      html += `
        <div class="calendar-day ${disabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}"
             data-day="${d}" ${disabled ? '' : `onclick="window.__selectBookingDay(${d})"`}>
          <span>${d}</span>
          ${!disabled ? '<span class="calendar-day-dot"></span>' : '<span style="font-size:0.65rem;color:#999;">휴무</span>'}
        </div>
      `;
    }
    daysContainer.innerHTML = html;
    renderTimeslots();
    updateBookingSummary();
  }

  function renderTimeslots() {
    if (!timeslotContainer) return;
    const slots = getSlotsForDay(selectedDay);
    timeslotContainer.innerHTML = slots.map(s => {
      const isFull = s.status === 'full';
      const isActive = s.time === selectedSlot && !isFull;
      return `
        <button type="button" class="timeslot-btn ${isFull ? 'full' : ''} ${isActive ? 'active' : ''}"
                ${isFull ? 'disabled' : `onclick="window.__selectTimeslot('${s.time}', ${s.seats})"`}>
          <span class="timeslot-time">${s.time}</span>
          <span class="timeslot-seats">${isFull ? '마감 (Full)' : `잔여 ${s.seats}석 / 6석`}</span>
        </button>
      `;
    }).join('');
  }

  function updateBookingSummary() {
    const dateEl = document.getElementById('summary-date');
    const classEl = document.getElementById('summary-class');
    const countEl = document.getElementById('summary-count');
    const totalEl = document.getElementById('summary-total');

    const [className, unitPriceStr] = (classSelect ? classSelect.value : '나만의 시그니처 향수 50ml|55000').split('|');
    const unitPrice = parseInt(unitPriceStr, 10) || 55000;
    const count = parseInt(countSelect ? countSelect.value : '2', 10) || 2;

    if (dateEl) dateEl.textContent = `${currentYear}.${String(currentMonth + 1).padStart(2, '0')}.${String(selectedDay).padStart(2, '0')} (${selectedSlot})`;
    if (classEl) classEl.textContent = className;
    if (countEl) countEl.textContent = `${count}명 (프라이빗 테이블)`;
    if (totalEl) totalEl.textContent = formatKRW(unitPrice * count);
  }

  window.__selectBookingDay = function(day) {
    selectedDay = day;
    const slots = getSlotsForDay(day);
    const firstOpen = slots.find(s => s.status === 'open');
    if (firstOpen) {
      selectedSlot = firstOpen.time;
      selectedSeatsLeft = firstOpen.seats;
    }
    renderCalendar();
  };

  window.__selectTimeslot = function(time, seats) {
    selectedSlot = time;
    selectedSeatsLeft = seats;
    renderTimeslots();
    updateBookingSummary();
  };

  const prevBtn = document.getElementById('cal-prev-btn');
  const nextBtn = document.getElementById('cal-next-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentMonth > 9) {
        currentMonth--;
        selectedDay = 20;
        renderCalendar();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentMonth < 11) {
        currentMonth++;
        selectedDay = 5;
        renderCalendar();
      }
    });
  }

  if (classSelect) classSelect.addEventListener('change', updateBookingSummary);
  if (countSelect) countSelect.addEventListener('change', updateBookingSummary);

  const bookingForm = document.getElementById('realtime-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      const guestName = document.getElementById('booking-guest-name')?.value || '고객';
      const guestPhone = document.getElementById('booking-guest-phone')?.value || '';
      const [className, unitPriceStr] = (classSelect ? classSelect.value : '나만의 시그니처 향수 50ml|55000').split('|');
      const unitPrice = parseInt(unitPriceStr, 10) || 55000;
      const count = parseInt(countSelect ? countSelect.value : '2', 10) || 2;
      const dateTime = `${currentYear}.${String(currentMonth + 1).padStart(2, '0')}.${String(selectedDay).padStart(2, '0')} (${selectedSlot})`;

      // 관리자 저장소에 실제 예약 등록
      window.AtelierStore.addBooking({
        name: guestName,
        phone: guestPhone,
        className,
        dateTime,
        count,
        totalPrice: unitPrice * count
      });

      showToast(`${guestName}님, ${dateTime} 클래스 예약이 성공적으로 접수되었습니다! (관리자 페이지에 자동 등록됨)`);
      bookingForm.reset();
      updateBookingSummary();
    });
  }

  renderCalendar();
}

// 히어로 3장 슬라이더 로직
function initHeroSlider() {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;

  // 관리자 설정에서 슬라이드 내용 동기화
  const heroConfig = window.AtelierStore.getHeroConfig();
  if (heroConfig.slides && heroConfig.slides.length >= 3) {
    heroConfig.slides.forEach((s, i) => {
      const slideEl = slider.querySelector(`.hero-slide-${i + 1}`);
      if (slideEl) {
        if (s.image) {
          slideEl.style.backgroundImage = `linear-gradient(115deg, rgba(31, 45, 39, 0.8) 0%, rgba(59, 82, 73, 0.56) 55%, rgba(59, 82, 73, 0.35) 100%), url('${s.image}')`;
        }
        const badgeEl = slideEl.querySelector('.hero-eyebrow span:first-child');
        if (badgeEl && s.badge) badgeEl.textContent = s.badge;
        const titleEl = slideEl.querySelector('.hero-title');
        if (titleEl && s.title) titleEl.innerHTML = s.title.replace(/\n/g, '<br>');
        const sloganEl = slideEl.querySelector('.hero-slogan');
        if (sloganEl && s.desc) sloganEl.innerHTML = s.desc.replace(/\n/g, '<br>');
      }
    });
  }

  const slides = slider.querySelectorAll('.hero-slide');
  const dots = slider.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('hero-prev-btn');
  const nextBtn = document.getElementById('hero-next-btn');

  let currentIndex = 0;
  let autoTimer = null;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 4500);
  }

  function stopAutoSlide() {
    if (autoTimer) clearInterval(autoTimer);
  }

  window.__goToHeroSlide = function(idx) {
    showSlide(idx);
    startAutoSlide();
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      startAutoSlide();
    });
  }

  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();
}

// 상단 배너 동기화
function syncTopBanner() {
  const heroConfig = window.AtelierStore.getHeroConfig();
  const banner = document.querySelector('.top-banner');
  if (banner && heroConfig.topBanner) {
    banner.innerHTML = `
      ${heroConfig.topBanner.text || ''}
      <a href="${heroConfig.topBanner.link || 'class.html#booking-section'}">실시간 잔여석 확인하기 &rarr;</a>
    `;
  }
}

// 헤더 네비게이션 동기화
function syncNavigation() {
  const navConfig = window.AtelierStore.getNavConfig();
  const mainNav = document.getElementById('main-nav');
  if (mainNav && navConfig) {
    const currentPath = location.pathname.split('/').pop() || 'index.html';
    mainNav.innerHTML = navConfig.filter(item => item.visible !== false).map(item => `
      <a href="${item.url}" class="nav-link ${currentPath === item.url ? 'active' : ''}">${item.label}</a>
    `).join('');
  }
}

// 푸터 관리자 링크 추가
function syncFooterAdminLink() {
  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom && !document.getElementById('footer-admin-link')) {
    const adminLink = document.createElement('a');
    adminLink.id = 'footer-admin-link';
    adminLink.href = 'admin.html';
    adminLink.innerHTML = '🔐 공방 관리자 센터';
    adminLink.style.cssText = 'color:rgba(253,251,247,0.7); font-size:0.8rem; text-decoration:underline; margin-left:14px;';
    footerBottom.appendChild(adminLink);
  }
}

// 아코디언 UI
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.accordion-item').forEach(other => {
        other.classList.remove('open');
        const otherBody = other.querySelector('.accordion-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

// 갤러리 필터
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('[data-gallery-filter]');
  const items = document.querySelectorAll('[data-gallery-cat]');
  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-gallery-filter');
      items.forEach(item => {
        const cat = item.getAttribute('data-gallery-cat');
        item.style.display = (target === 'all' || cat === target) ? '' : 'none';
      });
    });
  });
}

// DOM 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  syncTopBanner();
  syncNavigation();
  syncFooterAdminLink();
  updateCartBadge();
  initHeroSlider();
  initShopPage();
  initBookingCalendar();
  initAccordions();
  initGalleryFilter();

  const mobileBtn = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }
});
