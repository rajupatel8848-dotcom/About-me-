(function(){
if(matchMedia('(prefers-reduced-motion:reduce)').matches||!window.CSS||!CSS.supports('transform-style','preserve-3d')||(navigator.deviceMemory&&navigator.deviceMemory<=2))return;
const $$=(s,r)=>[...(r||document).querySelectorAll(s)],esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),cl=(v,a,b)=>Math.min(b,Math.max(a,v)),sm=t=>t*t*(3-2*t),sl=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const TAU=Math.PI*2,Z0=80,ZP=220,I=.06,O=.06,OM=TAU/48,SI=.72;
const pn=(b,s)=>'<div class="pn"><b>'+esc(b)+'</b><span>'+esc(s)+'</span></div>';
const wrap=(u,A,B)=>'<div class="bar"><i></i><i></i><i></i><span>'+esc(u)+'</span></div><div class="vp"><div class="pgs"><div class="scr">'+A+'</div><div class="scr">'+B+'</div></div></div>';
// ---- cards built from the page's own Work + Skills content ----
const work=$$('#projects .pj').map(a=>{
const dl=$$('dt',a).map(d=>[d.textContent.replace(/[:\s]+$/,''),d.nextElementSibling?d.nextElementSibling.textContent:'']);
const lab=a.querySelector('.lab').textContent,t=a.querySelector('h3').textContent,ds=a.querySelector('p').textContent,tech=((dl.find(x=>x[0]=='Tech')||['',''])[1]).replace(/\.$/,'').split(',').map(x=>x.trim()).filter(Boolean);
const ln=$$('.lk a',a).find(x=>/^https?:/.test(x.getAttribute('href')||'')),hasLk=!!a.querySelector('.lk');let host='';try{host=ln?new URL(ln.href).host:''}catch(e){}
const cta=ln?'<a class="cta" href="'+esc(ln.href)+'" target="_blank" rel="noopener">Visit live site \u2197</a>':hasLk?'<div class="cta off">Link coming soon</div>':'';
return{kind:'Project',lab:lab,t:t,d:ds,node:a.querySelector('.pi').cloneNode(true),
h:wrap(host||'work / '+sl(t),pn('Aditya Patel','Work')+'<div class="slot"></div><div class="lab">'+esc(lab)+'</div><h3>'+esc(t)+'</h3><p>'+esc(ds)+'</p><div class="tg">'+tech.map(x=>'<span>'+esc(x)+'</span>').join('')+'</div>',
pn('Aditya Patel','Details')+'<div class="lab">Project details</div><h3 class="sm">'+esc(t)+'</h3>'+dl.map(r=>'<div class="rw"><b>'+esc(r[0])+'</b><span>'+esc(r[1])+'</span></div>').join('')+cta)}});
const skills=$$('#skills .k').map((k,i)=>{const t=k.querySelector('h3').textContent,tg=k.querySelector('.tg'),n='0'+(i+1),tags=$$('span',tg).map(x=>x.textContent);
return{kind:'Skill set',lab:'Skill set',t:t,d:tags.join(' \u00b7 '),node:tg.cloneNode(true),
h:wrap('toolkit / '+sl(t),pn('Toolkit',n)+'<div class="big3">'+n+'</div><div class="lab">Skill set</div><h3>'+esc(t)+'</h3><div class="slot"></div><div class="sk3"><i></i><i></i><i></i></div>',
pn('Toolkit','In focus')+'<div class="lab">In this group</div><h3 class="sm">'+esc(t)+'</h3>'+tags.map(x=>'<div class="rw sg"><b>'+esc(x)+'</b><span>\u2192</span></div>').join(''))}});
function init(){const root=document.querySelector('.st3d[data-k=all]');const cards=[].concat(work,skills),N=cards.length;if(!root||root.dataset.init||N<4)return;root.dataset.init=1;root.style.setProperty('--n',N);
const q=s=>root.querySelector(s),pin=q('.pin'),rig=q('.rig'),scn=q('.scn'),bg=q('.bgl'),cap=q('.cap'),pb=q('.pb u'),hint=q('.hint'),step=TAU/N;
const ps=cards.map(c=>{const e=document.createElement('div');e.className='p3';e.innerHTML='<div class="fc">'+c.h+'<div class="sheen"></div><div class="dm"></div></div><div class="bk"></div><div class="sx r"></div><div class="sx l"></div><div class="sy t"></div><div class="sy b"></div>';const s=e.querySelector('.slot');if(s&&c.node){c.node.querySelectorAll('img').forEach(m=>{m.loading='eager';m.decoding='async'});s.replaceWith(c.node)}e._d=e.querySelector('.dm');e._s=e.querySelector('.sheen');e._g=e.querySelector('.pgs');e._i=-1;rig.appendChild(e);return e});
const PF=window.__perf||{lite:false,ultra:false,report(){}};let top0=0,span=0,fc=0;
let W,H,P,kp,mb,R,D,tp=0,cp=0,mx=0,my=0,cx=0,cy=0,live=false,raf=0,last=0,born=0,phiFree=0,ci=-1;
function size(){W=pin.clientWidth;H=pin.clientHeight;mb=W<760;P=mb?1300:1800;const mf=P/(P-(Z0+ZP));kp=Math.min((mb?.5:.66)*H/780,.84*W/(380*mf));R=Math.max(180,(380*kp*SI/2)/Math.tan(Math.PI/N)*1.28);D=R-Z0;scn.style.perspective=P+'px'}
function measure(){const r=root.getBoundingClientRect();top0=r.top+scrollY;span=r.height-H}
function pos(){tp=span>0?cl((scrollY-top0)/span,0,1):0}
function draw(now,dt){const p=cp,e1=sm(cl(p/I,0,1)),e2=sm(cl((p-1+O)/O,0,1)),act=e1*(1-e2);
// idle: ring turns by itself. active: scroll owns the angle. handoff is a linear blend, so no jumps.
if(act<.17)phiFree-=OM*dt*(1-act*6);
if(act<.01){if(phiFree<-Math.PI)phiFree+=TAU;if(phiFree>=Math.PI)phiFree-=TAU}
const uu=cl((p-I)/(1-I-O),0,1)*N,k=Math.min(Math.floor(uu),N-1),fr=uu-k,r=k+sm(cl((fr-.7)/.3,0,1)),phi=(-step*r)*act+(phiFree-(p>.5?TAU:0))*(1-act);
// every panel gets its own focus window: forward -> side reveal -> back to face -> content scrolls inside -> return
const E=[],RY=[],SC=[];let pe=0,pi=-1;
for(let i=0;i<N;i++){const t=uu-i;let env=0,ry=0,sc=0;if(t>0&&t<1){env=sm(cl(t/.15,0,1))*(1-sm(cl((t-.55)/.15,0,1)));ry=-78*sm(cl((t-.15)/.15,0,1))*(1-sm(cl((t-.3)/.12,0,1)));sc=sm(cl((t-.42)/.2,0,1))*(1-sm(cl((t-.6)/.1,0,1)))}
E[i]=env;RY[i]=ry;SC[i]=sc;if(env>pe){pe=env;pi=i}}
const tilt=-7*(1-pe*.9)-cy*3,Y=Math.sin(-7*(1-pe*.9)*Math.PI/180)*(R+ZP*pe)-(mb?.07*H*pe:0);
rig.style.transform='translate3d(0,'+Y.toFixed(1)+'px,'+(-D).toFixed(1)+'px) rotateX('+tilt.toFixed(2)+'deg) rotateY('+(cx*6).toFixed(2)+'deg)';
bg.style.transform='translate3d('+(-cx*30-Math.sin(phi)*24).toFixed(1)+'px,'+(-cy*20).toFixed(1)+'px,0) scale('+(1+pe*.05).toFixed(3)+')';
const bt=now/1000;
for(let i=0;i<N;i++){const el=ps[i],env=E[i],ang=i*step+phi,cs=Math.cos(ang);
if(PF.lite){const keep=env>.01||cs>(PF.ultra?.35:-.25);if(!keep){if(!el._h){el.style.visibility='hidden';el._h=1}continue}if(el._h){el.style.visibility='';el._h=0}}
const bob=Math.sin(bt*.9+i*1.7)*8*(1-act*.9),ent=born?cl((now-born)/1000/1.1-i*.08,0,1):1,ee=1-Math.pow(1-ent,3),ey=(1-ee)*(i%2?1:-1)*H*1.2;
const tr='rotateY('+(ang*57.2958).toFixed(2)+'deg) translateZ('+(R+ZP*env).toFixed(1)+'px) translateY('+(bob*(1-env)+ey).toFixed(1)+'px) rotateY('+RY[i].toFixed(2)+'deg) scale('+(kp*(SI+(1-SI)*env)).toFixed(4)+')';
if(tr!==el._t){el._t=tr;el.style.transform=tr}
const op=(env>.01?0:Math.pow(1-(cs+1)/2,.9)*.62+.3*pe).toFixed(2);if(op!==el._o){el._o=op;el._d.style.opacity=op}
if(!PF.lite)el._s.style.transform='translateX('+(-Math.sin(ang)*70-RY[i]*4).toFixed(1)+'px)';
const sv=Math.round(SC[i]*500)/500;if(sv!==el._i){el._i=sv;el._g.style.transform='translateY('+(-sv*50).toFixed(2)+'%)'}}
if(pi>=0&&pi!==ci){ci=pi;const c=cards[pi];cap.innerHTML='<div class="lab">'+String(pi+1).padStart(2,'0')+' / '+N+' \u00b7 '+esc(c.kind)+'</div><h3>'+esc(c.t)+'</h3><p>'+esc(c.d)+'</p>'}
const o=cl((pe-.25)/.5,0,1);cap.style.opacity=o.toFixed(3);cap.style.transform='translateY('+((1-o)*14).toFixed(1)+'px)';hint.style.opacity=(1-cl(p/.05,0,1)).toFixed(2);pb.style.transform='scaleX('+p.toFixed(4)+')'}
function frame(now){raf=0;if(!live)return;if(PF.lite&&(cp<.0005||cp>.9995)&&Math.abs(tp-cp)<.0005&&(fc++&1)){raf=requestAnimationFrame(frame);return}
const dtr=last?now-last:0,dt=last?Math.min(.05,dtr/1000):0;last=now;if(dtr)PF.report(dtr);if(!born)born=now;
cp+=(tp-cp)*(1-Math.exp(-dt*10));if(Math.abs(tp-cp)<.00005)cp=tp;cx+=(mx-cx)*(1-Math.exp(-dt*5));cy+=(my-cy)*(1-Math.exp(-dt*5));draw(now,dt);raf=requestAnimationFrame(frame)}
root.classList.add('on');size();measure();pos();cp=tp;draw(performance.now(),0);const sk=document.getElementById('skills');if(sk)sk.hidden=true;
new IntersectionObserver(es=>{live=es[0].isIntersecting;if(live){measure();pos();cp=tp;last=0;if(!raf)raf=requestAnimationFrame(frame)}},{rootMargin:'30% 0px'}).observe(root);
addEventListener('scroll',pos,{passive:true});
const rs=()=>{size();measure();pos();cp=tp;draw(performance.now(),0)};addEventListener('resize',rs);addEventListener('orientationchange',rs);addEventListener('load',()=>{measure();pos()});
if(window.ResizeObserver){let rq=0;new ResizeObserver(()=>{cancelAnimationFrame(rq);rq=requestAnimationFrame(()=>{measure();pos()})}).observe(document.documentElement)}
if(matchMedia('(pointer:fine)').matches){pin.addEventListener('pointermove',e=>{const r=pin.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5});pin.addEventListener('pointerleave',()=>{mx=my=0})}}
try{init()}catch(e){const r=document.querySelector('.st3d');if(r)r.classList.remove('on');const k=document.getElementById('skills');if(k)k.hidden=false}
})();
