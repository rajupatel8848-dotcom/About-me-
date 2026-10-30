(function(){var d=document,H=d.documentElement,l=d.getElementById('ldr');H.classList.add('ld');window.__t0=Infinity;
var started=false;function fin(){if(started)return;started=true;H.classList.remove('ld');window.__t0=performance.now()}
if(matchMedia('(prefers-reduced-motion:reduce)').matches){fin();l.style.display='none';return}
var cv=d.getElementById('zc'),x=cv&&cv.getContext('2d');if(!x){fin();l.style.display='none';return}
l.style.animation='none';l.classList.add('zip');H.classList.add('zl');

var VW=0,VH=0,dpr=1,cx=0,mob=false,P=18,TL=16,TH=10,y0=0,y1=0,curYs=0,gy=0;
var loaded=d.readyState==='complete',s0=performance.now(),shown=0,ready=false,done=false,p=0,pt=0,tm=0,last=0,tab=0,tabv=0,drag=false,lastYs=null,ty=0,touching=false;
addEventListener('load',function(){loaded=true});setTimeout(function(){loaded=true},6000);
function cl(v,a,b){return Math.min(b,Math.max(a,v))}
// woven-fabric pattern
var pc=d.createElement('canvas');pc.width=pc.height=6;var pg=pc.getContext('2d');pg.strokeStyle='rgba(255,255,255,.045)';pg.lineWidth=1;pg.beginPath();pg.moveTo(0,6);pg.lineTo(6,0);pg.moveTo(-1,1);pg.lineTo(1,-1);pg.moveTo(5,7);pg.lineTo(7,5);pg.stroke();var pat=x.createPattern(pc,'repeat');
function size(){dpr=Math.min(devicePixelRatio||1,2);VW=innerWidth;VH=innerHeight;cv.width=Math.round(VW*dpr);cv.height=Math.round(VH*dpr);x.setTransform(dpr,0,0,dpr,0,0);cx=VW/2;mob=VW<760;P=mob?15:18;TL=mob?13:16;TH=P*.56;y0=VH*.17;y1=VH*.93}
// half-width of the opening at height y: a curved "Y" that flares towards the top, widening as the pull travels down
function hwAt(y,ys,q){var dd=ys-y,u,v=0;if(dd>0){u=dd/VH;v=VW*(.12*u+.5*Math.pow(u,2.2))}return v+q*(VW/2+90)}
function rr(a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.lineTo(a+w-r,b);x.arc(a+w-r,b+r,r,-1.5708,0);x.lineTo(a+w,b+h-r);x.arc(a+w-r,b+h-r,r,0,1.5708);x.lineTo(a+r,b+h);x.arc(a+r,b+h-r,r,1.5708,3.1416);x.lineTo(a,b+r);x.arc(a+r,b+r,r,3.1416,4.7124);x.closePath()}
function draw(){
var q=cl((p-.85)/.15,0,1);q=q*q*(3-2*q);var p1=cl(p/.85,0,1),bob=ready&&p<.01&&!drag?Math.sin(tm*2)*4:0,ys=y0+(y1-y0)*p1+q*VH*.3+bob;curYs=ys;
x.clearRect(0,0,VW,VH);
var N=Math.ceil(VH/12)+2,i,y,ex=[],ey=[];for(i=0;i<=N;i++){y=-8+(VH+16)*i/N;ex.push(hwAt(y,ys,q));ey.push(y)}
function edge(sd,off){x.beginPath();for(var j=0;j<=N;j++){var X=cx+sd*(ex[j]+TL+off);j?x.lineTo(X,ey[j]):x.moveTo(X,ey[j])}}
function panel(sd){edge(sd,0);x.lineTo(sd<0?-8:VW+8,VH+8);x.lineTo(sd<0?-8:VW+8,-8);x.closePath()}
// soft shadow cast by the fabric onto the page
x.lineJoin='round';x.strokeStyle='#000';[[34,.07],[20,.12],[9,.2]].forEach(function(s){x.lineWidth=s[0];x.globalAlpha=s[1];[-1,1].forEach(function(sd){edge(sd,0);x.stroke()})});x.globalAlpha=1;
// fabric
[-1,1].forEach(function(sd){panel(sd);var g=x.createLinearGradient(sd<0?0:VW,0,cx,0);g.addColorStop(0,'#06080a');g.addColorStop(.7,'#12181b');g.addColorStop(1,'#1b2327');x.fillStyle=g;x.fill();x.fillStyle=pat;x.fill()});
if(ys<VH){x.fillStyle='#070a0b';x.fillRect(cx-TL-3,ys,2*TL+6,VH-ys+10)}
// the name sits on the fabric and travels with each half
var yt=VH*.5,hwt=hwAt(yt,ys,q),fs=Math.min(VW*.13,170);
[-1,1].forEach(function(sd){x.save();panel(sd);x.clip();x.fillStyle='#D8E4EC';
if(sd<0){x.font='italic 400 '+fs+'px "Instrument Serif",Georgia,serif';x.textAlign='right';x.fillText('Aditya',cx-hwt-TL-18,yt+fs*.3)}else{x.font='800 '+fs*.86+'px "Barlow Condensed","Arial Narrow",sans-serif';x.textAlign='left';x.fillText('PATEL',cx+hwt+TL+18,yt+fs*.3)}x.restore()});
// stitching
x.save();x.setLineDash([9,7]);x.lineWidth=1.4;x.strokeStyle='rgba(216,228,236,.5)';[-1,1].forEach(function(sd){edge(sd,14);x.stroke()});x.restore();
// teeth: they light up top to bottom while loading, interlock below the pull and part above it
var lit=ready?1:shown/100,half=P/2,k,s2,sd2,h,sl,len,on,near,col;
for(k=-2;k*P<VH+P;k++){for(s2=0;s2<2;s2++){y=k*P+(s2?half:0);h=hwAt(y,ys,q);sl=(hwAt(y+1.5,ys,q)-hwAt(y-1.5,ys,q))/3;sd2=s2?1:-1;len=TL+(y>ys?3:0);on=y<VH*lit;near=Math.abs(y-ys)<110;
col=near&&p>0?'#FFFFFF':on?'#D8E4EC':'#2b353a';
x.save();x.translate(cx+sd2*(h+TL),y);if(sd2>0)x.scale(-1,1);x.rotate(Math.atan(sl));
x.fillStyle=col;x.beginPath();x.moveTo(0,-TH/2);x.lineTo(len-TH/2,-TH/2);x.arc(len-TH/2,0,TH/2,-1.5708,1.5708);x.lineTo(0,TH/2);x.closePath();x.fill();
if(on){x.fillStyle='rgba(84,99,105,.55)';x.fillRect(0,TH*.12,len-TH/2,TH*.38)}x.restore()}}
// slider + pull tab
if(ys<VH+160){x.save();x.translate(cx,ys);var sc=mob?.82:1;x.scale(sc,sc);
x.fillStyle='rgba(0,0,0,.38)';x.beginPath();x.ellipse(3,40,26,7,0,0,6.2832);x.fill();
x.save();x.translate(0,30);x.rotate(tab);var tg=x.createLinearGradient(-14,0,14,0);tg.addColorStop(0,'#546369');tg.addColorStop(.4,'#E7EEF3');tg.addColorStop(1,'#869196');x.fillStyle=tg;rr(-14,4,28,86,12);x.fill();
x.fillStyle='#0d1113';x.beginPath();x.arc(0,24,6,0,6.2832);x.fill();x.fillStyle='rgba(20,24,26,.85)';x.font='700 11px "DM Sans",sans-serif';x.textAlign='center';x.fillText('AP',0,64);x.restore();
var gp=.28+.22*Math.sin(tm*1.4),bg=x.createLinearGradient(-28,0,28,0);bg.addColorStop(0,'#546369');bg.addColorStop(gp,'#F2F7FA');bg.addColorStop(Math.min(1,gp+.32),'#B2B6C1');bg.addColorStop(1,'#3B4549');
x.fillStyle=bg;x.beginPath();x.moveTo(-28,-30);x.lineTo(28,-30);x.lineTo(19,36);x.lineTo(-19,36);x.closePath();x.fill();x.beginPath();x.ellipse(0,-30,28,8,0,0,6.2832);x.fill();
x.fillStyle='rgba(13,17,19,.7)';rr(-3,-24,6,46,3);x.fill();x.restore()}
}
function finish(){if(done)return;done=true;l.classList.add('done');H.classList.remove('zl');scrollTo(0,0);removeEventListener('wheel',onWheel);removeEventListener('keydown',onKey);removeEventListener('touchstart',onTS);removeEventListener('touchmove',onTM);removeEventListener('touchend',onTE);removeEventListener('resize',size);setTimeout(function(){l.style.display='none'},700)}
function frame(now){if(done)return;var dt=Math.min(.05,(now-(last||now))/1000);last=now;tm+=dt;
var el=now-s0,tg=100*(1-Math.pow(1-Math.min(1,el/2300),3));if(!loaded)tg=Math.min(tg,92);shown=tg>=99.9?100:tg;
if(shown>=100&&!ready)ready=true;
if(drag)p=pt;else{p+=(pt-p)*(1-Math.exp(-dt*9));if(Math.abs(pt-p)<.0005)p=pt}
if(p>.9&&!drag)pt=1;
if(p>.03){fin();l.classList.add('opening')}else l.classList.remove('opening');
draw();
// swinging pull tab: reacts to how fast the slider moves, and sways gently while waiting
var vy=lastYs===null?0:(curYs-lastYs)/Math.max(dt,.001);lastYs=curYs;
var acc=-42*tab-4.5*tabv-vy*.0045+(ready&&p<.01?Math.sin(tm*2.4)*1.2:0);tabv+=acc*dt;tab=cl(tab+tabv*dt,-.9,.9);
if(p>=.999){finish();return}
requestAnimationFrame(frame)}
function push(v){if(ready&&!done)pt=cl(pt+v,0,1)}
function onWheel(e){e.preventDefault();push(e.deltaY*(e.deltaMode?.04:.0008))}
function onKey(e){var k=e.key;if(k==='ArrowDown'||k==='PageDown'||k===' '||k==='Spacebar'){e.preventDefault();push(.12)}else if(k==='ArrowUp'||k==='PageUp'){e.preventDefault();push(-.12)}else if(k==='End'){e.preventDefault();push(1)}else if(k==='Home'){e.preventDefault();push(-1)}}
function onTS(e){touching=!drag;ty=e.touches[0].clientY}
function onTM(e){e.preventDefault();if(!touching)return;var y=e.touches[0].clientY;push((ty-y)/VH*1.2);ty=y}
function onTE(){touching=false}
addEventListener('wheel',onWheel,{passive:false});addEventListener('keydown',onKey);addEventListener('touchstart',onTS,{passive:true});addEventListener('touchmove',onTM,{passive:false});addEventListener('touchend',onTE);addEventListener('resize',size);
// drag the zip pull itself
function onSlider(e){return ready&&Math.abs(e.clientX-cx)<48&&e.clientY>curYs-44&&e.clientY<curYs+130}
cv.addEventListener('pointerdown',function(e){if(onSlider(e)){drag=true;touching=false;gy=e.clientY-curYs;try{cv.setPointerCapture(e.pointerId)}catch(_){}}});
cv.addEventListener('pointermove',function(e){if(drag){pt=cl((e.clientY-gy-y0)/(y1-y0),0,1)*.85;if(pt<.02)pt=0}else cv.style.cursor=onSlider(e)?'grab':'default'});
function up(){if(drag){drag=false;if(pt>.8)pt=1}}
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
size();requestAnimationFrame(frame)})();
