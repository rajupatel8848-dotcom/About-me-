(function(){
var sec=document.getElementById('contact'),ct=sec&&sec.querySelector('.ct');
if(!ct||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
try{
var cts=document.createElement('div');cts.className='cts';ct.parentNode.insertBefore(cts,ct);cts.appendChild(ct);
[].forEach.call(ct.children,function(el,i){el.style.setProperty('--ci',i)});
var lines='';[[12,34,36],[12,24,44],[24,60],[12,40,30],[12,52],[24,46,20],[12,30,50]].forEach(function(r,k){var tot=0,g=4,fill=[1,1,.72,1,.56,1,.8][k],x=12;r.forEach(function(w){tot+=w});var sc=(76*fill-g*(r.length-1))/tot;r.forEach(function(w){var ww=w*sc;lines+='<i style="top:'+(13+k*10.5)+'%;left:'+x+'%;width:'+ww+'%"></i>';x+=ww+g})});
var wrap=document.createElement('div');wrap.className='mail-wrap';
wrap.innerHTML='<div class="env" role="button" tabindex="0" aria-label="Open the letter to see how to contact me"><div class="env-in"><div class="env-sh"></div><div class="env-back"></div><div class="env-ltr">'+lines+'</div>'
+'<div class="env-pk"><i class="l"></i><i class="r"></i><i class="b"></i><svg class="fd" viewBox="0 0 100 66" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 L50 37 L100 0 M0 66 L50 37 L100 66" fill="none" stroke="rgba(216,228,236,.32)" stroke-width="1" vector-effect="non-scaling-stroke"/></svg>'
+'<div class="env-stamp"><span>AP</span></div><svg class="env-pm" viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="none" stroke="#D8E4EC" stroke-width="1.4"/><circle cx="30" cy="30" r="19" fill="none" stroke="#D8E4EC" stroke-width="1"/><path d="M13 30 q4.5-5 9 0 t9 0 t9 0 t9 0" fill="none" stroke="#D8E4EC" stroke-width="1.4"/></svg>'
+'<div class="env-addr"><b>Aditya Patel</b><span>Jabalpur &middot; India</span></div></div>'
+'<div class="env-flap"><i class="ff"></i><i class="fb"></i><span class="env-seal">AP</span></div><span class="env-badge">1</span></div><div class="env-cue">Click to open</div></div>';
cts.appendChild(wrap);sec.classList.add('mail-on','mail-closed');
var env=wrap.querySelector('.env'),inEl=wrap.querySelector('.env-in'),back=wrap.querySelector('.env-back'),ltr=wrap.querySelector('.env-ltr'),pk=wrap.querySelector('.env-pk'),flap=wrap.querySelector('.env-flap'),seal=wrap.querySelector('.env-seal'),badge=wrap.querySelector('.env-badge'),cue=wrap.querySelector('.env-cue'),sh=wrap.querySelector('.env-sh'),opened=false;
function place(){var h=cts.clientHeight,eh=inEl.offsetHeight;env.style.setProperty('--mt',Math.max(10,Math.min(h*.5,330)-eh/2)+'px')}
place();addEventListener('resize',place);
// special delivery: the envelope flies in the first time it is seen
var arrived=false;function arrive(){if(arrived)return;arrived=true;inEl.style.opacity=1;inEl.animate([{transform:'translate3d(-70vw,-18vh,0) rotate(-28deg) scale(.7)',opacity:0},{transform:'translate3d(0,8px,0) rotate(3deg) scale(1.02)',opacity:1,offset:.7},{transform:'translate3d(0,0,0) rotate(0) scale(1)',opacity:1}],{duration:1150,easing:'cubic-bezier(.2,.8,.25,1)'})}
if(window.IntersectionObserver)new IntersectionObserver(function(es){if(es[0].isIntersecting)arrive()},{threshold:.3}).observe(cts);else arrive();
setTimeout(function(){inEl.style.opacity=1},6000);
function lock(e){e.preventDefault()}
function open(){if(opened)return;opened=true;arrive();inEl.style.opacity=1;env.classList.add('go');env.removeAttribute('tabindex');env.removeAttribute('role');env.style.cursor='default';
addEventListener('wheel',lock,{passive:false});addEventListener('touchmove',lock,{passive:false});
inEl.getAnimations().forEach(function(a){a.cancel()});inEl.style.animation='none';sh.style.animation='none';badge.style.animation='none';
[cue,badge].forEach(function(el){el.animate([{opacity:1},{opacity:0}],{duration:250,fill:'forwards'})});
// 1 the seal cracks
seal.animate([{transform:'scale(1) rotate(0)',opacity:1},{transform:'scale(1.25) rotate(-8deg)',opacity:1,offset:.25},{transform:'scale(.9) rotate(10deg)',opacity:1,offset:.45},{transform:'translateY(26px) scale(.6) rotate(50deg)',opacity:0}],{duration:520,fill:'forwards',easing:'ease-in'});
// 2 the flap opens
var t0=250;flap.style.transition='none';flap.animate([{transform:'rotateX(0deg)'},{transform:'rotateX(-180deg)'}],{duration:750,delay:t0,fill:'forwards',easing:'cubic-bezier(.45,.05,.3,1)'});
setTimeout(function(){flap.style.zIndex=1},t0+375);
// 3 the letter slides out
var B=back.getBoundingClientRect(),rise=B.height*.5,tr=t0+700;ltr.style.transition='none';
ltr.animate([{transform:'translateY(0) rotate(0)'},{transform:'translateY('+(-rise)+'px) rotate(-1.4deg)'}],{duration:760,delay:tr,fill:'forwards',easing:'cubic-bezier(.2,.8,.3,1)'});
// 4 it grows into the contact page while the envelope drops away
setTimeout(function(){var b=back.getBoundingClientRect(),T=ct.getBoundingClientRect(),P={left:b.left+.06*b.width,top:b.top+.09*b.height,width:.88*b.width,height:.84*b.height};
ltr.style.zIndex=10;
ltr.animate([{transform:'translate(0px,'+(-rise)+'px) rotate(-1.4deg) scale(1,1)'},{transform:'translate('+(T.left-P.left)+'px,'+(T.top-P.top)+'px) rotate(0deg) scale('+(T.width/P.width)+','+(T.height/P.height)+')'}],{duration:1150,fill:'forwards',easing:'cubic-bezier(.22,.78,.2,1)'});
[].forEach.call(ltr.children,function(i){i.animate([{opacity:1},{opacity:0}],{duration:520,delay:250,fill:'forwards'})});
[back,pk,sh].forEach(function(el){el.animate([{transform:'translateY(0) scale(1)',opacity:1},{transform:'translateY(110px) scale(.9)',opacity:0}],{duration:900,delay:120,fill:'forwards',easing:'ease-in'})});
flap.animate([{transform:'translateY(0) scale(1) rotateX(-180deg)',opacity:1},{transform:'translateY(110px) scale(.9) rotateX(-180deg)',opacity:0}],{duration:900,delay:120,fill:'forwards',easing:'ease-in'});
// 5 the real contact page takes over from the paper, the envelope is removed
setTimeout(function(){sec.classList.remove('mail-closed');sec.classList.add('mail-go');ct.animate([{opacity:0},{opacity:1}],{duration:420,fill:'backwards'})},950);
setTimeout(function(){wrap.animate([{opacity:1},{opacity:0}],{duration:300,fill:'forwards'}).onfinish=function(){wrap.remove()};sec.classList.add('mail-done');
removeEventListener('wheel',lock);removeEventListener('touchmove',lock);removeEventListener('resize',place);
setTimeout(function(){sec.classList.remove('mail-go')},1800)},1250)},tr+950)}
env.addEventListener('click',open);
env.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
}catch(e){var s=document.getElementById('contact'),w=s&&s.querySelector('.mail-wrap');if(w)w.remove();if(s)s.classList.remove('mail-on','mail-closed')}
})();
