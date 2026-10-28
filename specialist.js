const specialist = document.querySelector('.specialist');
const specialistLauncher = specialist.querySelector('.specialist-launcher');
const specialistPanel = specialist.querySelector('.specialist-panel');
const specialistClose = specialist.querySelector('.specialist-panel-close');
function setSpecialistOpen(open, returnFocus = false) {
  specialistPanel.hidden = !open;
  specialistLauncher.setAttribute('aria-expanded', String(open));
  if (open) specialistClose.focus();
  else if (returnFocus) specialistLauncher.focus();
}
specialistLauncher.addEventListener('click', () => setSpecialistOpen(specialistPanel.hidden));
specialistClose.addEventListener('click', () => setSpecialistOpen(false, true));
specialist.addEventListener('keydown', event => {if(event.key === 'Escape') setSpecialistOpen(false, true);});
document.addEventListener('click', event => {if(!specialist.contains(event.target) && !specialistPanel.hidden) setSpecialistOpen(false);});
specialist.querySelector('.specialist-guide').addEventListener('click', () => {
  document.querySelector('.care-details').open = true;
  setSpecialistOpen(false);
  document.querySelector('.care-details summary').focus({preventScroll:true});
});
