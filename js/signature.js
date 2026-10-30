(function(){
var root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
// ---- developer signature in the browser console
try{console.log('%c Aditya Patel %c  hand-built, no templates. Curious how it works? Say hi: rajupatel8848@gmail.com','background:#14181A;color:#D8E4EC;font:700 13px Georgia,serif;padding:6px 10px;border:1px solid #546369','color:#869196;font:12px system-ui,sans-serif')}catch(e){}
// ---- friendly tab title when the visitor switches away
var t0=document.title;document.addEventListener('visibilitychange',function(){document.title=document.hidden?'\uD83D\uDC4B Come back soon \u2014 Aditya Patel':t0});
// ---- quick menu / command palette (Ctrl/Cmd + K or /)
var cmds=[
{g:'Go to',t:'Home',k:'hero'},{g:'Go to',t:'About',k:'about'},{g:'Go to',t:'Journey (education)',k:'journey'},{g:'Go to',t:'Skills & work',k:'projects'},{g:'Go to',t:'Services',k:'services'},{g:'Go to',t:"Let's collaborate",k:'collab'},{g:'Go to',t:'Contact',k:'contact'},
{g:'Actions',t:'Copy email address',run:function(){var b=document.querySelector('[data-copy]');if(b)b.click()}},
{g:'Actions',t:'Send an email',run:function(){location.href='mailto:rajupatel8848@gmail.com'}},
{g:'Actions',t:'Download r\u00E9sum\u00E9',run:function(){var a=document.querySelector('a[data-dl]');if(a)a.click()}},
{g:'Actions',t:'Visit Pycrafters \u2197',run:function(){window.open('https://pycrafters-official.vercel.app/','_blank','noopener')}},
{g:'Actions',t:'Back to top',run:function(){scrollTo({top:0,behavior:reduced?'auto':'smooth'})}}];
var pal=document.createElement('div');pal.className='pal';pal.hidden=true;pal.setAttribute('role','dialog');pal.setAttribute('aria-modal','true');pal.setAttribute('aria-label','Quick menu');
pal.innerHTML='<div class="pal-bg"></div><div class="pal-box"><div class="pal-in"><span aria-hidden="true">\u2318</span><input type="text" placeholder="Jump to a section or run an action\u2026" autocomplete="off" spellcheck="false" aria-label="Search commands"><kbd>Esc</kbd></div><ul role="listbox"></ul><div class="pal-ft"><span><kbd>\u2191</kbd><kbd>\u2193</kbd> navigate</span><span><kbd>\u21B5</kbd> select</span></div></div>';
document.body.appendChild(pal);
var inp=pal.querySelector('input'),ul=pal.querySelector('ul'),act=0,list=[],prev=null;
function render(){var q=inp.value.trim().toLowerCase();list=cmds.filter(function(c){return !q||(c.t+' '+c.g).toLowerCase().indexOf(q)>-1});if(act>=list.length)act=Math.max(0,list.length-1);
var h='',g='';list.forEach(function(c,i){if(c.g!==g){g=c.g;h+='<li class="pal-g" role="presentation">'+g+'</li>'}h+='<li role="option" class="pal-i'+(i===act?' on':'')+'" data-i="'+i+'" aria-selected="'+(i===act)+'">'+c.t.replace(/&/g,'&amp;')+'</li>'});
ul.innerHTML=h||'<li class="pal-g" role="presentation">No matches</li>';var on=ul.querySelector('.on');if(on&&on.scrollIntoView)on.scrollIntoView({block:'nearest'})}
function open(){if(root.classList.contains('zl')||root.classList.contains('ld'))return;prev=document.activeElement;inp.value='';act=0;pal.hidden=false;render();inp.focus()}
function close(){pal.hidden=true;if(prev&&prev.focus)prev.focus()}
function run(i){var c=list[i];if(!c)return;close();if(c.k){var el=document.getElementById(c.k);if(el)el.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'})}else if(c.run)setTimeout(c.run,60)}
inp.addEventListener('input',function(){act=0;render()});
inp.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();act=Math.min(list.length-1,act+1);render()}else if(e.key==='ArrowUp'){e.preventDefault();act=Math.max(0,act-1);render()}else if(e.key==='Enter'){e.preventDefault();run(act)}else if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='Tab'){e.preventDefault()}});
ul.addEventListener('click',function(e){var li=e.target.closest('.pal-i');if(li)run(+li.getAttribute('data-i'))});
ul.addEventListener('pointermove',function(e){var li=e.target.closest('.pal-i');if(li&&+li.getAttribute('data-i')!==act){act=+li.getAttribute('data-i');[].forEach.call(ul.querySelectorAll('.pal-i'),function(n){n.classList.toggle('on',n===li)})}});
pal.querySelector('.pal-bg').addEventListener('click',close);
document.addEventListener('keydown',function(e){var t=e.target,typing=t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable);
if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();pal.hidden?open():close()}
else if(e.key==='/'&&!typing&&pal.hidden&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();open()}
else if(e.key==='Escape'&&!pal.hidden)close()});
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.dock-k'))open()});
// ---- magnetic buttons (desktop pointers only)
if(!reduced&&matchMedia('(pointer:fine)').matches){var els=[].slice.call(document.querySelectorAll('.btn,.dock-cta,.dock-top,.dock-k')),raf=0,mx=0,my=0;
function tick(){raf=0;els.forEach(function(el){var r=el.getBoundingClientRect();if(r.bottom<-100||r.top>innerHeight+100){return}var cx=r.left+r.width/2,cy=r.top+r.height/2,dx=mx-cx,dy=my-cy,d=Math.sqrt(dx*dx+dy*dy),R=Math.max(70,r.width*.6);
if(d<R){var f=1-d/R;el.style.translate=(dx*f*.28).toFixed(1)+'px '+(dy*f*.4).toFixed(1)+'px';el._m=1}else if(el._m){el.style.translate='';el._m=0}})}
addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(!raf)raf=requestAnimationFrame(tick)},{passive:true});
document.addEventListener('pointerleave',function(){els.forEach(function(el){el.style.translate='';el._m=0})})}
})();
