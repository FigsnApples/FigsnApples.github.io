const root=document.documentElement;
const themeButton=document.querySelector('#theme');
function setTheme(theme){root.dataset.theme=theme;themeButton.setAttribute('aria-label',`Switch to ${theme==='dark'?'light':'dark'} mode`);themeButton.textContent=theme==='dark'?'☀':'◐';document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#080e16':'#f7f5f0';}
try{setTheme(localStorage.getItem('omeed-theme')==='dark'?'dark':'light')}catch{setTheme('light')}
themeButton.addEventListener('click',()=>{const theme=root.dataset.theme==='dark'?'light':'dark';setTheme(theme);try{localStorage.setItem('omeed-theme',theme)}catch{}});
const menu=document.querySelector('#menu'),nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close −':'Menu +'});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu +'}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu +';menu.focus()}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});let count=0;document.querySelectorAll('.publication').forEach(pub=>{pub.hidden=button.dataset.filter==='first'&&pub.dataset.first!=='true';if(!pub.hidden)count++});document.querySelector('#pub-count').textContent=`Showing ${count} publications`;}));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('current',a.hash===`#${entry.target.id}`))}})},{rootMargin:'-10% 0px -65% 0px'});document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));}
