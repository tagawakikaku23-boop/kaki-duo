const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('#nav-links');
function closeMenu() {menu.setAttribute('aria-expanded', 'false');links.classList.remove('is-open');}
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true';menu.setAttribute('aria-expanded', String(open));links.classList.toggle('is-open', open);});
links.addEventListener('click', event => {if(event.target.closest('a')) closeMenu();});
document.addEventListener('keydown', event => {if(event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {closeMenu();menu.focus();}});
const sequence = document.querySelector('.scroll-sequence');
const stage = document.querySelector('.fruit-stage');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const buttons = [...document.querySelectorAll('[data-state]')];
const clamp = value => Math.min(1, Math.max(0, value));
let scheduled = false;
function paint(progress) {
  const open = clamp((progress - .12) / .7);
  sequence.style.setProperty('--open', open);
  sequence.style.setProperty('--closed', 1 - open);
  sequence.style.setProperty('--spread', `${open * (innerWidth < 600 ? 8 : 32)}px`);
  sequence.style.setProperty('--scale', 1 - open * .08);
  sequence.style.setProperty('--cut-scale', .93 + open * .07);
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.state === (open > .5 ? 'open' : 'closed'))));
}
function scrollProgress() {
  scheduled = false;
  if (reduceMotion.matches) return;
  const top = parseFloat(getComputedStyle(stage).top) || 0;
  const distance = sequence.offsetHeight - stage.offsetHeight;
  paint(clamp((top - sequence.getBoundingClientRect().top) / Math.max(1, distance)));
}
function schedule() {if (!scheduled) {scheduled = true;requestAnimationFrame(scrollProgress);}}
addEventListener('scroll', schedule, {passive:true});
addEventListener('resize', schedule);
reduceMotion.addEventListener('change', () => {if(reduceMotion.matches) paint(0);else schedule();});
buttons.forEach(button => button.addEventListener('click', () => {
  const progress = button.dataset.state === 'open' ? 1 : 0;
  if (reduceMotion.matches) {paint(progress);return;}
  const inset = parseFloat(getComputedStyle(stage).top) || 0;
  const start = scrollY + sequence.getBoundingClientRect().top - inset;
  const distance = sequence.offsetHeight - stage.offsetHeight;
  scrollTo({top:start + progress * distance,behavior:'smooth'});
}));
scrollProgress();

