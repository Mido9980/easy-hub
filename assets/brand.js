/* EASY CODE — hub page */
const APPS = [
  { n:'EASY VIDEO',  d:'مولّد فيديو بالكتابة، مع استوديو ونشر', i:'🎬', u:'https://mido9980.github.io/easy-video/', t:'مميز' },
  { n:'القرآن الكريم', d:'مصحف كامل بالخط العثماني، 9 لغات', i:'📖', u:'https://mido9980.github.io/quran/', t:'جديد' },
  { n:'EASY LINK',   d:'مختصر روابط بعدّاد نقرات وQR',    i:'🔗', u:'https://mido9980.github.io/easy-link/' },
  { n:'EASY API',    d:'أداة اختبار واجهات HTTP من الموبايل', i:'⚡', u:'https://mido9980.github.io/easy-api/' },
  { n:'EASY CHAT',   d:'شات ذكي بواجهة سوداء وذهبية',     i:'💬', u:'https://mido9980.github.io/easy-chat/' },
  { n:'TikTok Studio', d:'قوالب فيديو عمودية وتصدير سريع', i:'🎞️', u:'https://mido9980.github.io/tiktok-studio/' },
  { n:'EASY BOOK',   d:'دفتر ملاحظات ومحتوى منظم',        i:'🗂️', u:'https://mido9980.github.io/easy-book/' },
  { n:'EASY OFFERS', d:'صفحة عروض وأكواد خصم جاهزة',      i:'🏷️', u:'https://mido9980.github.io/easy-offers/' },
  { n:'EASY PAY',    d:'صفحة دفع واشتراك مع بوابة',       i:'💳', u:'https://mido9980.github.io/easy-pay/' },
  { n:'EASY HUB',    d:'بوابة تشغيل المواقع مع API',      i:'🚀', u:'https://mido9980.github.io/easy-hub/' },
  { n:'AI Video Agent', d:'وكيل فيديو ذكي نسخة PWA',      i:'🤖', u:'https://mido9980.github.io/ai-video-agent/' },
  { n:'الأكاديمية', d:'دروس وصفحات تعليمية',              i:'🎓', u:'https://mido9980.github.io/easy-code-academy/' }
];

/* masked WhatsApp: only revealed on explicit tap, per privacy rule */
const PHONE = '201100102398';

function toast(m) {
  const el = document.getElementById('toast');
  el.textContent = m; el.classList.add('on');
  clearTimeout(el._h); el._h = setTimeout(() => el.classList.remove('on'), 1900);
}

function renderApps() {
  const grid = document.getElementById('grid');
  grid.innerHTML = APPS.map(a => `<a class="app" href="${a.u}" target="_blank" rel="noopener">
      ${a.t ? `<span class="tag">${a.t}</span>` : ''}
      <span class="ai">${a.i}</span>
      <b>${a.n}</b>
      <p>${a.d}</p>
    </a>`).join('');
}

/* WhatsApp: masked until tapped, then copy + open */
let revealed = false;
function bindWhatsApp() {
  const btn = document.getElementById('waBtn');
  const num = document.getElementById('waNum');
  const act = document.getElementById('waAct');
  btn.onclick = async () => {
    if (!revealed) {
      revealed = true;
      const pretty = '+20 110 010 2398';
      num.textContent = pretty;
      act.textContent = 'افتح واتساب';
      try { await navigator.clipboard.writeText('+201100102398'); toast('الرقم اتنسخ ✓'); } catch (e) {}
      return;
    }
    window.open('https://wa.me/' + PHONE, '_blank');
  };
}

/* install as an app */
let deferred = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); deferred = e;
  const b = document.getElementById('installBtn'); if (b) b.hidden = false;
});
function bindInstall() {
  const b = document.getElementById('installBtn');
  if (!b) return;
  b.onclick = async () => {
    if (!deferred) { toast('من قائمة المتصفح: إضافة إلى الشاشة الرئيسية'); return; }
    deferred.prompt();
    await deferred.userChoice;
    deferred = null; b.hidden = true;
  };
  if (window.matchMedia('(display-mode: standalone)').matches) b.hidden = true;
}

document.addEventListener('DOMContentLoaded', () => {
  renderApps();
  bindWhatsApp();
  bindInstall();
  const sync=()=>document.body.classList.toggle('offline',!navigator.onLine);
  sync(); window.addEventListener('online',sync); window.addEventListener('offline',sync);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
});
