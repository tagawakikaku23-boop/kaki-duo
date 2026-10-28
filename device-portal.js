(() => {
  const section=document.querySelector('.device-mockup');
  if(!section) return;
  const sequence=section.querySelector('.device-sequence');
  const stage=section.querySelector('.device-stage');
  const logo=section.querySelector('.logo-pop');
  const devices=section.querySelector('.device-cutout');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const maskSupported=CSS.supports('mask-image','url("assets/persimmon-mark.svg")') || CSS.supports('-webkit-mask-image','url("assets/persimmon-mark.svg")');
  const clamp=v=>Math.max(0,Math.min(1,v));
  const phase=(p,start,end)=>clamp((p-start)/(end-start));
  let frame=false;
  function paint(){
    frame=false;
    if(!section.classList.contains('portal-motion')) return;
    const rect=sequence.getBoundingClientRect();
    const inset=parseFloat(getComputedStyle(stage).top)||0;
    const distance=Math.max(1,sequence.offsetHeight-stage.offsetHeight);
    const p=clamp((inset-rect.top)/distance);
    const lift=1-Math.pow(1-phase(p,.12,.39),3);
    const zoom=phase(p,.4,.84);
    const base=logo.offsetWidth;
    const maxScale=Math.max(stage.clientWidth,stage.clientHeight)*3.5/base;
    const scale=zoom>0?1.08+(maxScale-1.08)*Math.pow(zoom,2.7):.18+.9*lift;
    const x=-devices.clientWidth*.05*(1-lift);
    const y=(-18*(1-lift)-72*lift)*(1-zoom);
    const values={
      '--devices-opacity':1-phase(p,.29,.55),
      '--devices-scale':1-.06*phase(p,.18,.55),
      '--hint-opacity':1-phase(p,.04,.17),
      '--logo-opacity':phase(p,.12,.2)*(1-phase(p,.62,.75)),
      '--logo-scale':scale,
      '--logo-x':`${x}px`,
      '--logo-y':`${y}px`,
      '--portal-size':`${base*scale}px`,
      '--portal-opacity':phase(p,.56,.72),
      '--caption-opacity':phase(p,.84,.96)
    };
    for(const [key,value] of Object.entries(values)) sequence.style.setProperty(key,String(value));
    sequence.dataset.progress=p.toFixed(3);
  }
  function schedule(){if(!frame){frame=true;requestAnimationFrame(paint);}}
  function setup(){section.classList.toggle('portal-motion',!motion.matches&&maskSupported);schedule();}
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  motion.addEventListener('change',setup);
  setup();
})();
