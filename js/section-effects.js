(function(){
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;if(rm)return;
// ---- Services: infinite conveyor, boxes in sequence
try{const sv=document.querySelector('#services .sv');if(sv&&!sv.parentNode.classList.contains('svw')){const boxes=[...sv.children];boxes.forEach((b,i)=>{b.classList.remove('rv');b.style.setProperty('--i',i)});
const wr=document.createElement('div');wr.className='svw';sv.parentNode.insertBefore(wr,sv);wr.appendChild(sv);
for(let k=0;k<2;k++)boxes.forEach(b=>{const c=b.cloneNode(true);c.setAttribute('aria-hidden','true');sv.appendChild(c)});
new IntersectionObserver(es=>wr.classList.toggle('off',!es[0].isIntersecting)).observe(wr)}}catch(e){}
// ---- Company: starfield + drifting nebula behind floating content
try{const sec=document.getElementById('pyc'),cv=sec&&sec.querySelector('.spc');if(cv){const x=cv.getContext('2d'),clp=(v,a,b)=>Math.min(b,Math.max(a,v));let W,H,dpr,S=[],vis=false,last=0,T=0,mx=0,my=0,sx=0,sy=0,sh=null,nx=3;
function rs(){dpr=Math.min(devicePixelRatio||1,(window.__perf&&window.__perf.lite)?1:1.5);W=cv.clientWidth;H=cv.clientHeight;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);x.setTransform(dpr,0,0,dpr,0,0);
const n=Math.round(clp(W*H/5200,60,260));S=Array.from({length:n},()=>{const r=Math.random(),z=r<.6?.35:r<.88?.7:1;return{x:Math.random()*W,y:Math.random()*H,z:z,r:z*1.1+.2,ph:Math.random()*6.28,tw:.6+Math.random()*1.6}})}
function fr(t){if(!vis)return;const dt=Math.min(.05,(t-(last||t))/1000);last=t;T+=dt;sx+=(mx-sx)*.05;sy+=(my-sy)*.05;x.clearRect(0,0,W,H);
for(const s of S){s.x-=s.z*9*dt;s.y+=s.z*2.5*dt;if(s.x<-4)s.x=W+4;if(s.y>H+4)s.y=-4;const al=(.3+.7*s.z)*(.6+.4*Math.sin(T*s.tw+s.ph));x.fillStyle='rgba(216,228,236,'+al.toFixed(3)+')';x.beginPath();x.arc(s.x-sx*s.z*34,s.y-sy*s.z*22,s.r,0,6.2832);x.fill()}
nx-=dt;if(nx<=0&&!sh){sh={x:W*(.45+Math.random()*.5),y:-10,l:0};nx=7+Math.random()*6}
if(sh){sh.l+=dt;const k=sh.l/.9,px=sh.x-k*W*.35,py=sh.y+k*H*.45;const g=x.createLinearGradient(px,py,px+90,py-58);g.addColorStop(0,'rgba(216,228,236,'+(1-k).toFixed(2)+')');g.addColorStop(1,'rgba(216,228,236,0)');x.strokeStyle=g;x.lineWidth=1.4;x.beginPath();x.moveTo(px,py);x.lineTo(px+90,py-58);x.stroke();if(k>=1)sh=null}
requestAnimationFrame(fr)}
rs();addEventListener('resize',rs);
if(matchMedia('(pointer:fine)').matches)sec.addEventListener('pointermove',e=>{const r=sec.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5});
new IntersectionObserver(es=>{vis=es[0].isIntersecting;last=0;if(vis)requestAnimationFrame(fr)},{rootMargin:'10% 0px'}).observe(sec)}}catch(e){}
})();
