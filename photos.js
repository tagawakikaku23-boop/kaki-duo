(() => {
  const story = document.querySelector('.photo-story');
  if (!story) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const scene = story.querySelector('.orchard-scene');
  const photos = [...story.querySelectorAll('.photo-reveal')];
  let observer;
  let frame = false;
  const clamp = value => Math.min(1,Math.max(0,value));
  function update() {
    frame = false;
    if (motion.matches || !scene) return;
    const rect = scene.getBoundingClientRect();
    if(rect.bottom < 0 || rect.top > innerHeight * 1.2) return;
    const progress = clamp((innerHeight * .85 - rect.top) / (innerHeight * .95));
    scene.style.setProperty('--photo-inset',`${3 * (1-progress)}vw`);
    scene.style.setProperty('--photo-radius',`${24 * (1-progress)}px`);
    scene.style.setProperty('--photo-zoom',1.07 - progress * .07);
  }
  function schedule() {if(!frame){frame=true;requestAnimationFrame(update);}}
  function setup() {
    observer?.disconnect();
    story.classList.remove('photo-motion');
    if(motion.matches) return;
    if('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});
      },{threshold:.12});
      photos.forEach(photo => observer.observe(photo));
      story.classList.add('photo-motion');
    }
    schedule();
  }
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  motion.addEventListener('change',setup);
  setup();
})();
