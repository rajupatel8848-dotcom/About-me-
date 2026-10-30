(function(){
var sec=document.getElementById('about'),ab=sec&&sec.querySelector('.ab');
if(!ab||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
try{
var GOLD=[[122,88,26],[212,168,58],[250,226,134]];
function mix(a,b,t){return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t]}
function rgb(c,a){return'rgba('+(c[0]|0)+','+(c[1]|0)+','+(c[2]|0)+','+(a==null?1:a)+')'}
// velvet: black-red -> deep red -> bright theatre red
function velv(l){l=l<0?0:l>1?1:l;return l<.5?mix([24,2,5],[132,9,17],l/.5):mix([132,9,17],[232,44,46],(l-.5)/.5)}

var cur=document.createElement('div');cur.className='cur';
cur.innerHTML='<div class="cur-spot"></div><div class="cur-main" role="button" tabindex="0" aria-label="Open the curtain to read the About section"><canvas></canvas><div class="cur-sheen"></div><div class="cur-cuew"><div class="cur-cue"><i></i><b>Click to open</b><i></i></div></div></div><canvas class="cur-frame" aria-hidden="true"></canvas><canvas class="cur-fx" aria-hidden="true"></canvas>';
sec.appendChild(cur);sec.classList.add('cur-on','cur-closed');
var mw=cur.querySelector('.cur-main'),mc=mw.querySelector('canvas'),fr=cur.querySelector('.cur-frame'),fx=cur.querySelector('.cur-fx'),spot=cur.querySelector('.cur-spot'),cuew=cur.querySelector('.cur-cuew'),cue=cur.querySelector('.cur-cue');
// stagger index for the reveal
[].forEach.call(ab.children[1]?ab.children[1].children:[],function(el,i){el.style.setProperty('--ci',i)});
var W=0,H=0,dpr=1,opened=false,rt=0,gone=false,ro=null;

function pleats(c,x0,x1,y0,y1,per,ph,gain){for(var x=x0;x<x1;x+=2){var s=Math.sin(x/per*6.2832+ph+.55*Math.sin(x/(per*2.7)))*.5+.5;s=Math.pow(s,1.3);
var sp=1-Math.min(1,Math.abs(x/W-.5)*1.7)*.5,l=(.16+.84*s)*sp*gain,g=c.createLinearGradient(0,y0,0,y1);
g.addColorStop(0,rgb(velv(l*.32)));g.addColorStop(.2,rgb(velv(l*.8)));g.addColorStop(.6,rgb(velv(l)));g.addColorStop(1,rgb(velv(l*.4)));c.fillStyle=g;c.fillRect(x,y0,2.3,y1-y0)}}
function goldGrad(c,x0,x1){var g=c.createLinearGradient(x0,0,x1,0);g.addColorStop(0,rgb(GOLD[0]));g.addColorStop(.25,rgb(GOLD[2]));g.addColorStop(.5,rgb(GOLD[1]));g.addColorStop(.75,rgb(GOLD[2]));g.addColorStop(1,rgb(GOLD[0]));return g}
function tassel(c,x,y,len){c.fillStyle=rgb(GOLD[0]);c.fillRect(x-1,y,2,len*.2);
var g=c.createLinearGradient(x-9,0,x+9,0);g.addColorStop(0,rgb(GOLD[0]));g.addColorStop(.5,rgb(GOLD[2]));g.addColorStop(1,rgb(GOLD[0]));c.fillStyle=g;
c.beginPath();c.arc(x,y+len*.24,5,0,6.3);c.fill();c.beginPath();c.moveTo(x-5,y+len*.32);c.lineTo(x+5,y+len*.32);c.lineTo(x+9,y+len);c.lineTo(x-9,y+len);c.closePath();c.fill();
c.strokeStyle='rgba(90,60,10,.55)';c.lineWidth=1;for(var k=-8;k<=8;k+=2.5){c.beginPath();c.moveTo(x+k*.55,y+len*.34);c.lineTo(x+k,y+len);c.stroke()}}

function drawMain(){var c=mc.getContext('2d'),mob=W<760,hh=mob?22:30,per=Math.max(46,Math.min(110,W/13));c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,W,H);
pleats(c,0,W,0,H-hh,per,0,1);
// fabric grain + a few specks of dust catching the light
c.globalAlpha=1;for(var i=0;i<260;i++){c.fillStyle='rgba(255,'+(90+Math.random()*60|0)+',90,'+(Math.random()*.035).toFixed(3)+')';c.fillRect(Math.random()*W,0,1,H-hh)}
for(i=0;i<34;i++){c.fillStyle='rgba(255,224,150,'+(.25+Math.random()*.4).toFixed(2)+')';c.fillRect(Math.random()*W,Math.random()*(H-hh),1.3,1.3)}
// gold braid + fringe at the hem
var y=H-hh,g=c.createLinearGradient(0,y,0,y+hh*.55);g.addColorStop(0,rgb(GOLD[0]));g.addColorStop(.4,rgb(GOLD[2]));g.addColorStop(1,rgb(GOLD[1]));c.fillStyle=g;c.fillRect(0,y,W,hh*.55);
for(var x=0;x<W;x+=3){c.fillStyle=rgb(GOLD[(x/3|0)%2?1:2],.95);c.fillRect(x,y+hh*.5,1.6,hh*.5)}
c.fillStyle='rgba(0,0,0,.4)';c.fillRect(0,y+hh*.5,W,2)}

function drawFrame(){var c=fr.getContext('2d'),mob=W<760,band=mob?18:Math.max(26,W*.02),depth=mob?Math.min(112,W*.29):Math.min(180,W*.125),sideW=Math.max(24,Math.min(100,W*.065)),n=Math.max(3,Math.round(W/(mob?150:300))),sw=W/n,yT=band,per=Math.max(40,Math.min(80,W/16));
c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,W,H);
function inner(y){return sideW*(.78+.22*Math.cos(y/H*6.2832))}
// side drapes
[-1,1].forEach(function(sd){c.save();c.beginPath();var st=48,k,y;c.moveTo(sd<0?0:W,0);for(k=0;k<=st;k++){y=H*k/st;c.lineTo(sd<0?inner(y):W-inner(y),y)}c.lineTo(sd<0?0:W,H);c.closePath();c.clip();
pleats(c,sd<0?0:W-sideW,sd<0?sideW:W,0,H,per*.55,sd<0?1.3:.4,.78);
var g=c.createLinearGradient(sd<0?0:W,0,sd<0?sideW:W-sideW,0);g.addColorStop(0,'rgba(0,0,0,.6)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(sd<0?0:W-sideW,0,sideW,H);c.restore();
c.beginPath();for(k=0;k<=st;k++){y=H*k/st;var X=sd<0?inner(y):W-inner(y);k?c.lineTo(X,y):c.moveTo(X,y)}c.lineWidth=3.2;c.strokeStyle=goldGrad(c,0,W);c.stroke();
for(y=band+depth;y<H;y+=6){var X2=sd<0?inner(y):W-inner(y);c.fillStyle=rgb(GOLD[(y/6|0)%2?1:2],.9);c.fillRect(sd<0?X2:X2-7,y,7,1.5)}});
// valance: swags with pleats, gold trim, fringe and tassels
function by(t){return yT+depth*(.5+.5*Math.sin(Math.PI*t))}
c.save();c.shadowColor='rgba(0,0,0,.7)';c.shadowBlur=30;c.shadowOffsetY=14;c.fillStyle='#4a0409';
for(var i=0;i<n;i++){c.beginPath();c.moveTo(i*sw,yT-2);c.lineTo((i+1)*sw,yT-2);for(var k=24;k>=0;k--)c.lineTo(i*sw+sw*k/24,by(k/24));c.closePath();c.fill()}c.restore();
var m=mob?9:15;
for(i=0;i<n;i++){var xi=i*sw;c.save();c.beginPath();c.moveTo(xi,yT-2);c.lineTo(xi+sw,yT-2);for(k=24;k>=0;k--)c.lineTo(xi+sw*k/24,by(k/24));c.closePath();c.clip();
c.fillStyle='#3a0307';c.fillRect(xi,yT-2,sw,depth+4);
for(k=0;k<m;k++){var a0=k/m,a1=(k+1)/m,s=Math.pow(Math.sin(k*1.9+i*.8)*.5+.5,1.3),px=xi+sw*(a0+a1)/2,sp=1-Math.min(1,Math.abs(px/W-.5)*1.7)*.5,l=(.2+.8*s)*sp;
c.beginPath();c.moveTo(xi+sw*(.16+.68*a0),yT-2);c.lineTo(xi+sw*(.16+.68*a1),yT-2);c.lineTo(xi+sw*a1,by(a1));c.lineTo(xi+sw*a0,by(a0));c.closePath();c.fillStyle=rgb(velv(l));c.fill()}
var sg=c.createLinearGradient(0,yT,0,yT+depth*.6);sg.addColorStop(0,'rgba(0,0,0,.55)');sg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=sg;c.fillRect(xi,yT-2,sw,depth);c.restore()}
// gold trim + fringe along every scallop
c.lineWidth=3.6;c.strokeStyle=goldGrad(c,0,W);c.beginPath();for(var x=0;x<=W;x+=3){var ii=Math.min(n-1,x/sw|0),y2=by((x-ii*sw)/sw);x?c.lineTo(x,y2):c.moveTo(x,y2)}c.stroke();
for(x=1;x<W;x+=6){ii=Math.min(n-1,x/sw|0);y2=by((x-ii*sw)/sw);var L=mob?8+4*Math.sin(x*.9):11+5*Math.sin(x*.9);c.fillStyle=rgb(GOLD[(x/6|0)%2?1:2],.95);c.fillRect(x,y2+2,1.6,L);c.beginPath();c.arc(x+.8,y2+2+L,1.7,0,6.3);c.fill()}
for(i=1;i<n;i++){var jx=i*sw,jy=by(0),rg=c.createRadialGradient(jx-2,jy-2,1,jx,jy,mob?8:12);rg.addColorStop(0,rgb(GOLD[2]));rg.addColorStop(.6,rgb(GOLD[1]));rg.addColorStop(1,rgb(GOLD[0]));c.fillStyle=rg;c.beginPath();c.arc(jx,jy,mob?8:12,0,6.3);c.fill();tassel(c,jx,jy+(mob?6:9),mob?34:Math.min(64,depth*.42))}
// proscenium band on top
var bg=c.createLinearGradient(0,0,0,band);bg.addColorStop(0,'#0e0604');bg.addColorStop(.55,'#3b2410');bg.addColorStop(1,'#1a0d06');c.fillStyle=bg;c.fillRect(0,0,W,band);c.fillStyle=goldGrad(c,0,W);c.fillRect(0,band-3,W,3);
for(x=18;x<W;x+=26){c.fillStyle='rgba(226,186,84,.7)';c.beginPath();c.arc(x,band*.46,Math.max(1.4,band*.07),0,6.3);c.fill()}
var cg=c.createRadialGradient(W/2,band*.5,1,W/2,band*.5,band*.9);cg.addColorStop(0,rgb(GOLD[2]));cg.addColorStop(.6,rgb(GOLD[1]));cg.addColorStop(1,rgb(GOLD[0]));c.fillStyle=cg;c.beginPath();c.arc(W/2,band*.5,band*.62,0,6.3);c.fill()}

function size(){W=sec.clientWidth;H=sec.clientHeight;dpr=Math.min(devicePixelRatio||1,(window.__perf&&window.__perf.lite)?1:1.5);
[fr,mc,fx].forEach(function(cv){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)});
cuew.style.paddingTop=Math.round(Math.min(H*.5,340))+'px';drawFrame();if(!opened)drawMain()}
size();
var onr=function(){clearTimeout(rt);rt=setTimeout(function(){if(!gone&&(sec.clientWidth!==W||sec.clientHeight!==H))size()},150)};
if(window.ResizeObserver){ro=new ResizeObserver(onr);ro.observe(sec)}else addEventListener('resize',onr);

// gold dust thrown up as the curtain drops
function dust(){var c=fx.getContext('2d'),P=[],t0=performance.now(),last=t0,sr;c.setTransform(dpr,0,0,dpr,0,0);
for(var i=0;i<46;i++)P.push({x:Math.random()*W,y:H*(.1+Math.random()*.8),vx:(Math.random()-.5)*10,vy:-6-Math.random()*14,g:0,age:0,life:2600+Math.random()*1800,r:.6+Math.random()*1.4,a:.5,d:700+Math.random()*900});
function fr_(now){var t=now-t0,dt=Math.min(.05,(now-last)/1000);last=now;c.clearRect(0,0,W,H);sr=sec.getBoundingClientRect();var hem=mw.getBoundingClientRect().bottom-sr.top;
if(t>200&&t<1500&&hem<H+30)for(var k=0;k<4;k++)P.push({x:Math.random()*W,y:hem-Math.random()*16,vx:(Math.random()-.5)*70,vy:-20-Math.random()*80,g:150,age:0,life:1000+Math.random()*1200,r:.8+Math.random()*2.2,a:.9,d:0});
c.globalCompositeOperation='lighter';
for(k=P.length-1;k>=0;k--){var p=P[k];p.age+=dt*1000;if(p.age>p.life){P.splice(k,1);continue}if(p.age<p.d)continue;p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;var f=1-p.age/p.life;
c.fillStyle='rgba(255,'+(196+Math.random()*30|0)+',110,'+(p.a*f*(.6+.4*Math.random())).toFixed(3)+')';c.beginPath();c.arc(p.x,p.y,p.r,0,6.3);c.fill()}
c.globalCompositeOperation='source-over';if(t<4600)requestAnimationFrame(fr_);else c.clearRect(0,0,W,H)}
requestAnimationFrame(fr_)}

function open(){if(opened)return;opened=true;var dy=sec.clientHeight*1.08;cur.classList.add('open');mw.style.pointerEvents='none';mw.removeAttribute('tabindex');mw.removeAttribute('role');
cue.animate([{opacity:1},{opacity:0}],{duration:280,fill:'forwards'});
var an=mw.animate([{transform:'translateY(0) scaleY(1)',offset:0},{transform:'translateY(-22px) scaleY(1.012)',offset:.13,easing:'cubic-bezier(.3,0,.6,1)'},{transform:'translateY('+dy*.45+'px) scaleY(1)',offset:.62,easing:'cubic-bezier(.4,0,.8,.7)'},{transform:'translateY('+dy+'px) scaleY(.9)',offset:1}],{duration:1750,fill:'forwards'});
an.onfinish=function(){mw.style.display='none';
// curtain has landed: the valance, side drapes, light and dust fade away, then everything is removed and the spare top padding eases back
[fr,spot,fx].forEach(function(el){el.animate([{opacity:getComputedStyle(el).opacity},{opacity:0}],{duration:900,fill:'forwards',easing:'ease-in'})});
setTimeout(function(){gone=true;if(ro)ro.disconnect();removeEventListener('resize',onr);sec.style.transition='padding-top .9s cubic-bezier(.4,0,.2,1)';void sec.offsetHeight;cur.remove();sec.classList.remove('cur-on','cur-closed');setTimeout(function(){sec.style.transition=''},1000)},950)};
spot.animate([{opacity:0},{opacity:1,offset:.35},{opacity:.5}],{duration:2800,delay:450,fill:'forwards',easing:'ease-out'});
sec.classList.remove('cur-closed');sec.classList.add('cur-go');dust();
setTimeout(function(){sec.classList.remove('cur-go')},4600)}
mw.addEventListener('click',open);
mw.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
}catch(e){var s=document.getElementById('about'),c=s&&s.querySelector('.cur');if(c)c.remove();if(s)s.classList.remove('cur-on','cur-closed')}
})();
