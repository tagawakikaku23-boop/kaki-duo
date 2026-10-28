(() => {
  const section=document.querySelector('.device-mockup');
  if(!section || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){section.classList.add('is-visible');observer.disconnect();}
  },{threshold:.2});
  observer.observe(section);
  section.classList.add('device-motion');
})();
