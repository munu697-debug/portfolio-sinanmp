import { rtdb } from './firebase-config.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const RTDB_PATHS = {
  work: '/workItems/current/items',
  testimonials: '/testimonials/current/items'
};

const DEFAULT_WORK = [
  { title: 'Video Editing', subtitle: 'Project One', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop' },
  { title: 'Visual Storytelling', subtitle: 'Project Two', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop' },
  { title: 'Apple Style Video', subtitle: 'Project Three', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop' }
];

const DEFAULT_TESTIMONIALS = [
  { quote: "Ajzal transformed our brand's social media presence with his motion graphics. The engagement on our reels skyrocketed.", name: 'Sarah L.', role: 'Marketing Director', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
  { quote: 'Fast, professional, and incredibly creative. He understands the YouTube algorithm and edits for retention.', name: 'David K.', role: 'Content Creator', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
  { quote: 'The promo video Ajzal created for our product launch was nothing short of cinematic. Highly recommended.', name: 'Michael T.', role: 'Founder, TechFlow', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' }
];

function escapeHtml(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function getItems(path, fallback) {
  const snap = await get(ref(rtdb, path));
  if (!snap.exists()) return fallback;
  const data = snap.val();
  return Array.isArray(data) ? data : fallback;
}

async function renderDynamicWork() {
  const items = await getItems(RTDB_PATHS.work, DEFAULT_WORK);
  const grid = document.querySelector('#work > .max-w-7xl > .relative > .grid');
  if (!grid) return;
  grid.innerHTML = '';
  items.forEach((it, i) => {
    const img = it.image || (DEFAULT_WORK[i] && DEFAULT_WORK[i].image) || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop';
    const delay = ['delay-100', 'delay-200', 'delay-300'][i % 3];
    const isCenter = i === 1;
    const card = document.createElement('div');
    card.className = isCenter
      ? 'group relative rounded-3xl overflow-hidden bg-[#120f1d]/40 border border-purple-500/40 aspect-[4/5] flex flex-col justify-end p-6 transition-all duration-500 shadow-[0_20px_50px_rgba(109,40,217,0.15)] md:scale-105 z-20 reveal ' + delay
      : 'group relative rounded-3xl overflow-hidden bg-[#120f1d]/40 border border-white/[0.05] aspect-[4/5] flex flex-col justify-end p-6 transition-all duration-500 hover:border-purple-500/30 reveal ' + delay;
    card.innerHTML = `
      <div class="absolute inset-0 z-0 overflow-hidden">
        <img src="${escapeHtml(img)}" alt="${escapeHtml(it.title || 'Project')}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isCenter ? '' : 'opacity-80 group-hover:opacity-100'}">
        <div class="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/${isCenter ? '30' : '40'} to-transparent"></div>
      </div>
      <div class="relative z-10 space-y-1">
        <span class="text-purple-400 font-mono text-xs tracking-wider uppercase">${escapeHtml(it.subtitle || '')}</span>
        <h3 class="text-2xl font-bold tracking-tight text-white">${escapeHtml(it.title || '')}</h3>
      </div>
      <div class="absolute inset-0 flex items-center justify-center ${isCenter ? '' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 z-20">
        <div class="${isCenter ? 'w-16 h-16 bg-white text-black' : 'w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20'} rounded-full flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  // Re-trigger observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  grid.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

async function renderDynamicTestimonials() {
  const items = await getItems(RTDB_PATHS.testimonials, DEFAULT_TESTIMONIALS);
  const grid = document.querySelector('.testimonials-grid');
  if (!grid) return;
  grid.innerHTML = '';
  items.forEach((t, i) => {
    const delay = ['delay-100', 'delay-200', 'delay-300'][i % 3];
    const avatar = t.avatar || (DEFAULT_TESTIMONIALS[i] && DEFAULT_TESTIMONIALS[i].avatar) || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80';
    const card = document.createElement('div');
    card.className = 'testimonial-card reveal ' + delay;
    card.innerHTML = `
      <div>
        <div class="quote-icon">\u201c</div>
        <p class="testimonial-text">\u201c${escapeHtml(t.quote || '')}\u201d</p>
      </div>
      <div class="client-info">
        <div class="client-avatar" style="background-image: url('${escapeHtml(avatar)}');"></div>
        <div class="client-details">
          <h3>${escapeHtml(t.name || '')}</h3>
          <p>${escapeHtml(t.role || '')}</p>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  grid.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

renderDynamicWork();
renderDynamicTestimonials();
