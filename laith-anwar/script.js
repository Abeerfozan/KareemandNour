const INVITATION_CONFIG = {
  // Replace with the exact event date/time from the original Canva invitation.
  // Example: '2026-09-18T19:00:00+03:00'
  eventDate: '',
  venueName: '',
  venueAddress: '',
  mapsUrl: '',
  rsvpUrl: ''
};

const $ = (id) => document.getElementById(id);
const opening = $('openingScreen');
const invitation = $('invitation');
const openButton = $('openInvitation');

document.body.classList.add('locked');

function enterInvitation() {
  opening.classList.add('is-open');
  invitation.classList.add('visible');
  invitation.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('locked');
  setTimeout(() => document.querySelector('.hero .reveal')?.classList.add('in-view'), 350);
}
openButton.addEventListener('click', enterInvitation);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: '0px 0px -5% 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

function applyConfig() {
  const { eventDate, venueName, venueAddress, mapsUrl, rsvpUrl } = INVITATION_CONFIG;

  if (eventDate) {
    const date = new Date(eventDate);
    const locale = 'ar-JO';
    $('dayName').textContent = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    $('monthName').textContent = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date).toUpperCase();
    $('dayNumber').textContent = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date);
    $('yearNumber').textContent = date.getFullYear();
    $('eventTime').textContent = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }).format(date);
    $('dateHint').hidden = true;
    startCountdown(date);
  } else {
    $('countdownSection').style.display = 'none';
  }

  if (venueName) $('venueName').textContent = venueName;
  if (venueAddress) $('venueAddress').textContent = venueAddress;
  if (mapsUrl) {
    const link = $('mapsLink');
    link.href = mapsUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.classList.remove('disabled');
    link.removeAttribute('aria-disabled');
  }
  if (rsvpUrl) {
    const link = $('rsvpLink');
    link.href = rsvpUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.classList.remove('disabled');
    link.removeAttribute('aria-disabled');
  }
}

function startCountdown(targetDate) {
  const render = () => {
    let diff = Math.max(0, targetDate.getTime() - Date.now());
    const day = 86400000;
    const hour = 3600000;
    const minute = 60000;
    const days = Math.floor(diff / day); diff %= day;
    const hours = Math.floor(diff / hour); diff %= hour;
    const minutes = Math.floor(diff / minute); diff %= minute;
    const seconds = Math.floor(diff / 1000);
    $('days').textContent = String(days).padStart(2, '0');
    $('hours').textContent = String(hours).padStart(2, '0');
    $('minutes').textContent = String(minutes).padStart(2, '0');
    $('seconds').textContent = String(seconds).padStart(2, '0');
  };
  render();
  setInterval(render, 1000);
}

function spawnPetal() {
  if (document.visibilityState !== 'visible') return;
  const p = document.createElement('span');
  p.className = 'petal';
  p.style.left = `${Math.random() * 100}%`;
  p.style.opacity = (0.18 + Math.random() * 0.34).toFixed(2);
  p.style.setProperty('--drift', `${-70 + Math.random() * 140}px`);
  p.style.animationDuration = `${8 + Math.random() * 7}s`;
  p.style.transform = `rotate(${Math.random() * 180}deg) scale(${0.55 + Math.random() * 0.8})`;
  $('petals').appendChild(p);
  setTimeout(() => p.remove(), 16000);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(spawnPetal, 1100);
}

applyConfig();
