(function(){
var dock=document.getElementById('dock'),toast=document.getElementById('toast'),root=document.documentElement,tt;
function say(m){if(!toast)return;toast.textContent=m;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('on')},2200)}window.__say=say;
// copy-to-clipboard buttons
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-copy]');if(!b)return;var v=b.getAttribute('data-copy');
function fb(){var t=document.createElement('textarea');t.value=v;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();try{document.execCommand('copy');say('Email copied to clipboard')}catch(_){say(v)}t.remove()}
if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(v).then(function(){say('Email copied to clipboard')},fb);else fb()});
// r\u00e9sum\u00e9 download: a normal browser downloads the file from the link; inside the Claude preview plain downloads are blocked, so its own save feature is used
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[data-dl]');if(!a||!window.claude||!claude.use)return;e.preventDefault();
var name=a.getAttribute('download')||'file.pdf',href=a.getAttribute('href');
function blob(){var m=/^data:([^;,]*)(;base64)?,(.*)$/.exec(href);if(m){var bin=atob(m[3]),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return Promise.resolve(new Blob([u],{type:m[1]||'application/pdf'}))}return fetch(href).then(function(r){return r.blob()})}
claude.use('downloads').then(function(d){if(!d){say('Download works on the live site');return}return blob().then(function(b){return d.save({filename:name,data:b})}).then(function(){say('R\u00e9sum\u00e9 saved')},function(err){if(!err||err.code!=='declined')say('Could not save here \u2014 it works on the live site')})}).catch(function(){say('Download works on the live site')})});
if(!dock)return;
// floating "Let's collaborate" + back-to-top with scroll-progress ring
var top=dock.querySelector('.dock-top'),ring=dock.querySelector('.r1'),C=2*Math.PI*19,hide={};ring.style.strokeDasharray=C;
function upd(){var sy=scrollY,max=root.scrollHeight-innerHeight,p=max>0?Math.min(1,sy/max):0;ring.style.strokeDashoffset=C*(1-p);
var busy=hide.contact||hide.footer||root.classList.contains('ld')||root.classList.contains('zl');dock.classList.toggle('on',sy>innerHeight*.9&&!busy)}
if(window.IntersectionObserver){[['contact',document.getElementById('contact')],['footer',document.querySelector('footer')]].forEach(function(p){if(!p[1])return;new IntersectionObserver(function(es){hide[p[0]]=es[0].isIntersecting;upd()},{threshold:.12}).observe(p[1])})}
addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
top.addEventListener('click',function(){scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})});
})();
