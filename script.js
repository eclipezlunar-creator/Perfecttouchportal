  document.getElementById('year').textContent = new Date().getFullYear();

// ---------------- NAV SCROLL STATE ----------------
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  backToTop.classList.toggle('show', y > 500);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------------- MOBILE DRAWER ----------------
const burger = document.getElementById('burgerBtn');
const drawer = document.getElementById('mobile-drawer');
function closeDrawer(){ drawer.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
function openDrawer(){ drawer.classList.add('open'); burger.classList.add('open'); burger.setAttribute('aria-expanded','true'); }
burger.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

// ---------------- REVEAL ON SCROLL + COUNTERS ----------------
const counted = new WeakSet();
function animateCount(el){
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const dur = 1400, start = performance.now();
  function tick(now){
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      e.target.querySelectorAll('[data-count]').forEach(el => { if (!counted.has(el)) { counted.add(el); animateCount(el); } });
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------------- PATHWAY ----------------
const pathway = [
  { stage:'01', name:'Talent Discovery', desc:'Nationwide scouting identifies raw, exceptional ability.' },
  { stage:'02', name:'Elite Training', desc:'Structured technical, tactical, and physical development.' },
  { stage:'03', name:'Professional Development', desc:'Match-readiness, mentality, and career discipline.' },
  { stage:'04', name:'International Exposure', desc:'Trials, showcases, and visibility to scouts abroad.' },
  { stage:'05', name:'Professional Contracts', desc:'Negotiation and placement with professional clubs.' },
  { stage:'06', name:'Global Success', desc:'A sustained professional career on the world stage.', final:true }
];
document.getElementById('pathwayGrid').innerHTML = pathway.map(p => `
  <div class="pathway-step reveal${p.final ? ' final' : ''}">
    <div class="pnum">${p.stage}</div>
    <h4>${p.name}</h4>
    <p>${p.desc}</p>
  </div>`).join('');
document.querySelectorAll('#pathwayGrid .reveal').forEach(el => io.observe(el));

// ---------------- SERVICES ----------------
const services = [
  { n:'01', name:'Talent Identification', desc:'Discovering exceptional young footballers.' },
  { n:'02', name:'Elite Player Development', desc:'Professional coaching and training programs.' },
  { n:'03', name:'International Scouting', desc:'Connecting players with clubs worldwide.' },
  { n:'04', name:'Player Representation', desc:'Professional athlete management and career guidance.' },
  { n:'05', name:'International Transfers', desc:'Facilitating pathways to professional football opportunities abroad.' },
  { n:'06', name:'Career Mentorship', desc:'Supporting athletes on and off the pitch.' }
];
document.getElementById('serviceGrid').innerHTML = services.map(s => `
  <div class="service-card reveal">
    <span class="snum">${s.n}</span>
    <h3>${s.name}</h3>
    <p>${s.desc}</p>
  </div>`).join('');
document.querySelectorAll('#serviceGrid .reveal').forEach(el => io.observe(el));

// ---------------- WHY CHOOSE US ----------------
const whyPoints = [
  'International Football Network',
  'Professional Development Pathway',
  'FIFA-Linked Agency Experience',
  'Elite Coaching Environment',
  'Global Club Partnerships',
  'Proven Success Stories'
];
document.getElementById('whyList').innerHTML = whyPoints.map((w,i) => `
  <div class="why-item">
    <span class="wnum">${String(i+1).padStart(2,'0')}</span>
    <p>${w}</p>
  </div>`).join('');

// ---------------- FAQ ----------------
const faqs = [
  { q:'How can I join Perfect Touch FC?', a:'Submit a player registration through our recruitment form. Our scouting team reviews every application and follows up with shortlisted candidates for trials.' },
  { q:'What age groups do you recruit?', a:'We work across youth and senior development age groups, tailoring training intensity and academic support to each stage of a player\'s growth.' },
  { q:'Do you work with international clubs?', a:'Yes. Our network spans professional clubs and agents across Europe, Asia, and Africa, giving developed players real routes to trials and contracts abroad.' },
  { q:'Can players from outside Nigeria apply?', a:'Yes. While based in Nigeria, we welcome applications from players across Africa and beyond who meet our development criteria.' },
  { q:'How does the player development pathway work?', a:'Every player moves through six stages — discovery, elite training, professional development, international exposure, contracts, and global success — at their own pace.' },
  { q:'How do international transfers happen?', a:'As a FIFA-linked agency, we manage negotiations, documentation, and club relations directly, so players and families are supported through every step of a move abroad.' }
];
document.getElementById('faqList').innerHTML = faqs.map((f,i) => `
  <div class="faq-item" data-i="${i}">
    <div class="faq-q" role="button" tabindex="0" aria-expanded="false"><span>${f.q}</span><span class="plus"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg></span></div>
    <div class="faq-a"><p>${f.a}</p></div>
  </div>`).join('');
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  function toggle(){
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; o.querySelector('.faq-q').setAttribute('aria-expanded','false'); });
    if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; q.setAttribute('aria-expanded','true'); }
  }
  q.addEventListener('click', toggle);
  q.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
});

// ---------------- RECRUITMENT FORM ----------------
const joinForm = document.getElementById('joinForm');
joinForm.addEventListener('submit', function(e){
  e.preventDefault();
  let valid = true;
  this.querySelectorAll('[required]').forEach(f => { if (!f.value) valid = false; });
  if (!valid) { this.reportValidity(); return; }
  document.getElementById('confirmMsg').classList.add('show');
  this.reset();
});

// ---------------- CONTACT FORM ----------------
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e){
    e.preventDefault();
    
    let valid = true;
    this.querySelectorAll('[required]').forEach(f => { if (!f.value) valid = false; });
    if (!valid) { this.reportValidity(); return; }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;

    // Visual feedback for the user
    submitBtn.innerText = "Sending Message...";
    submitBtn.disabled = true;

    try {
      // Send data to Formspree safely in the background
      const response = await fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Runs your original confirmation slide/show class animation and resets form
        document.getElementById('contactConfirm').classList.add('show');
        this.reset();
        submitBtn.innerText = "Message Sent!";
      } else {
        alert("Oops! There was a problem sending your message. Please try again.");
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    } catch (error) {
      alert("Network error. Please check your internet connection and try again.");
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

// ---------------- SMOOTH SCROLL OFFSET ----------------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const id = this.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 88;
        window.scrollTo({ top, behavior: 'smooth' });
        closeDrawer();
      }
    }
  });
});
