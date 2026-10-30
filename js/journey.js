(function(){const URL_='https://pycrafters-official.vercel.app/';
const D=[{k:'01',l:'School',t:'School Foundation',c:'#D8E4EC',d:'Spring Day Higher Secondary School, Jabalpur.',s:'Jabalpur · Foundation'},
{k:'02',l:'86%',t:'Class 10',c:'#B2B6C1',d:'Academic result: 86%.',s:'Spring Day Higher Secondary School'},
{k:'03',l:'88.4%',t:'Class 12',c:'#C8C9D3',d:'Academic result: 88.4%.',s:'Spring Day Higher Secondary School'},
{k:'04',t:'Engineering Journey',c:'#A2A3A8',img:'por',d:'Gyan Ganga Institute of Technology.',s:'B.Tech · Gyan Ganga Institute of Technology'},
{k:'05',l:'AIML',t:'B.Tech in AIML',c:'#869196',d:'Currently pursuing a Bachelor of Technology in Artificial Intelligence and Machine Learning.',s:'In progress'},
{k:'06',t:'Building Pycrafters',c:'#D8E4EC',img:'logo',d:'Started a company with my team while developing my technical skills and exploring real-world digital products.',s:'Company · Web · Automation',h:URL_}];
const n=D.length,w=document.getElementById('journey'),tk=document.getElementById('dtk'),inf=document.getElementById('inf'),dn=document.getElementById('dn'),dp=document.getElementById('dp'),rmq=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
const logo=document.querySelector('.lg'),por=document.getElementById('pimg');let idx=-1,pos=0,mx=0,my=0;
const PF=window.__perf||{lite:false,ultra:false,report(){}},dsEl=w.querySelector('.ds');let top0=0,span=0,fc=0;
function measure(){const r=w.getBoundingClientRect();top0=r.top+scrollY;span=r.height-(dsEl?dsEl.offsetHeight:innerHeight)}
function go(i){measure();scrollTo({top:top0+span*(.04+.92*i/(n-1))})}
function show(i){idx=i;const o=D[i],a=document.getElementById('iv');document.getElementById('ik').textContent='Milestone '+o.k;document.getElementById('it2').textContent=o.t;document.getElementById('id2').textContent=o.d;document.getElementById('is').textContent=o.s;
if(o.h){a.hidden=false;a.href=o.h;a.target='_blank';a.rel='noopener'}else{a.hidden=true;a.removeAttribute('href')}
dn.textContent='0'+(i+1)+' / 0'+n;inf.classList.remove('go');void inf.offsetWidth;inf.classList.add('go')}
const els=D.map((o,i)=>{const b=document.createElement('button');b.type='button';b.className='d';b.setAttribute('aria-label','Milestone '+o.k+': '+o.t);
b.innerHTML='<span class="e e1"></span><span class="e e2"></span><span class="sh"></span><span class="f"><span class="rt"><span class="sp"></span></span><span class="lb"><b>'+o.k+'</b><i>'+(o.l||'')+'</i></span><span class="hh"></span><span class="gl"></span></span>';
const lb=b.querySelector('.lb');lb.style.setProperty('--lc',o.c);if(o.img){lb.classList.add('im');lb.style.backgroundImage='url("'+(o.img=='logo'?logo.src:por.src)+'")'}
const e={b,rt:b.querySelector('.rt'),a:i*50,h:false};
b.onclick=()=>{if(rmq){show(i);return}if(i!==idx)go(i);else if(o.h)window.open(o.h,'_blank','noopener')};b.onfocus=()=>{if(!rmq&&i!==idx)go(i);else show(i)};
b.onpointerenter=()=>e.h=true;b.onpointerleave=()=>e.h=false;tk.appendChild(b);return e});
const I=.04,O=.04,SP=.32,smt=t=>t*t*(3-2*t),clp=(v,a,b)=>Math.min(b,Math.max(a,v));
let q=false,pIdle=0,pr=0,vis=false,last=0;
function prog(){return span>0?clp((scrollY-top0)/span,0,1):0}
measure();addEventListener('load',measure);addEventListener('orientationchange',measure);
if(window.ResizeObserver){let rq=0;new ResizeObserver(()=>{cancelAnimationFrame(rq);rq=requestAnimationFrame(measure)}).observe(document.documentElement)}
// pos = which disc is at the centre. Outside the pinned part it runs by itself in an endless loop (wraps round);
// inside it follows the scroll exactly. The two are blended at the edges so nothing jumps.
function upd(){q=false;if(rmq){if(idx<0)show(0);return}
const H=innerHeight,W=innerWidth,m=W<760,gap=m?.6:.34,lim=Math.min(m?1.7:3.2,PF.ultra?1.3:(PF.lite?2.2:9)),p=pr,act=smt(clp(p/I,0,1))*(1-smt(clp((p-1+O)/O,0,1))),ps=clp((p-I)/(1-I-O),0,1)*(n-1);
pos=ps*act+(pIdle+(p>.5?n:0))*(1-act);const Hn=n/2+act*n/2;
dp.style.transform='scaleX('+(act>.5?ps/(n-1):(((pos%n)+n)%n)/n).toFixed(4)+')';
const ci=((Math.round(pos)%n)+n)%n;if(ci!==idx)show(ci);
els.forEach((e,i)=>{let d=i-pos;d-=2*Hn*Math.floor((d+Hn)/(2*Hn));const a=Math.abs(d),y=Math.sin(i*1.9)*H*.045,op=Math.max(.4,1-a*.3)*clp((lim-a)/.5,0,1);
if(op<.01){if(!e.x){e.b.style.visibility='hidden';e.x=1}return}if(e.x){e.b.style.visibility='';e.x=0}
e.b.style.transform='translate3d(calc(-50% + '+(d*gap*W-mx*30*(1+a*.5)).toFixed(1)+'px),calc(-50% + '+(y-my*20).toFixed(1)+'px),'+(-a*220).toFixed(1)+'px) rotateY('+(-d*26+mx*8).toFixed(2)+'deg) rotateX('+(8-my*6).toFixed(2)+'deg) scale('+(1-Math.min(a,3)*.09).toFixed(3)+')';
e.b.style.opacity=op.toFixed(2);e.b.style.zIndex=50-Math.round(a*10);
e.rt.style.transform='rotate('+(e.a+pos*60).toFixed(2)+'deg)'})}
function sch(){if(!vis&&!q){q=true;requestAnimationFrame(upd)}}addEventListener('resize',sch);
if(fine&&!rmq)addEventListener('pointermove',ev=>{mx=ev.clientX/innerWidth-.5;my=ev.clientY/innerHeight-.5;sch()});
function loop(t){if(!vis)return;if(PF.lite&&(pr<.0005||pr>.9995)&&(fc++&1)){requestAnimationFrame(loop);return}
const dtr=t-(last||t),dt=Math.min(.05,dtr/1000);last=t;if(dtr)PF.report(dtr);const tp=prog();pr+=(tp-pr)*(1-Math.exp(-dt*10));if(Math.abs(tp-pr)<1e-4)pr=tp;
const a0=smt(clp(pr/I,0,1))*(1-smt(clp((pr-1+O)/O,0,1))),hov=els.some(e=>e.h);if(a0<.17)pIdle+=SP*(hov?.2:1)*dt*(1-a0*6);if(a0===0)pIdle=((pIdle+n/2)%n+n)%n-n/2;
els.forEach(e=>{e.a+=dt*14*(e.h?.25:1)});upd();requestAnimationFrame(loop)}
if(!rmq)new IntersectionObserver(en=>{vis=en[0].isIntersecting;last=0;if(vis){measure();pr=prog();requestAnimationFrame(loop)}},{rootMargin:'15% 0px'}).observe(w);
pr=prog();upd()})();
