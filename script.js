/* Contact is a local preview, not an email service. */
document.addEventListener('DOMContentLoaded',()=>{
 const form=document.querySelector('.contact-form');
 const preview=document.querySelector('#message-preview');
 form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const name=document.querySelector('#contact-name').value.trim();
  const email=document.querySelector('#contact-email').value.trim();
  const message=document.querySelector('#contact-message').value.trim();
  if(name.length<2||message.length<10)return;
  document.querySelector('#message-text').textContent=`Name: ${name}\nEmail: ${email}\n\n${message}`;
  preview.hidden=false;
  preview.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
 });
 form.addEventListener('reset',()=>{preview.hidden=true;document.querySelector('#message-text').textContent='';});
 /* Close the Bootstrap menu after a mobile navigation choice. */
 document.querySelectorAll('.navbar .nav-link').forEach(link=>link.addEventListener('click',()=>{
  const menu=document.querySelector('#portfolio-nav');
  if(menu.classList.contains('show')&&window.bootstrap)bootstrap.Collapse.getOrCreateInstance(menu).hide();
 }));
});

/* Let keyboard and pointer users pause the decorative character movement. */
document.querySelectorAll('.mascot-toggle').forEach(button=>button.addEventListener('click',()=>{
 const figure=button.closest('.portrait-figure');
 const paused=figure.classList.toggle('mascot-paused');
 button.setAttribute('aria-pressed',String(paused));
 button.setAttribute('aria-label',paused?'Play character animation':'Pause character animation');
 button.textContent=paused?'Play animation':'Pause animation';
}));
