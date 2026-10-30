(function(){var a=document.querySelector('#live video');if(!a)return;var box=a.parentNode;
if(matchMedia('(prefers-reduced-motion:reduce)').matches){a.removeAttribute('autoplay');a.pause();return}
a.muted=true;a.removeAttribute('loop');a.loop=false;
// two copies of the clip take turns, overlapping by D seconds, so the loop never pauses, re-buffers or jumps
var b=a.cloneNode(false);b.removeAttribute('autoplay');b.removeAttribute('poster');b.style.opacity=0;b.muted=true;box.appendChild(b);
var cur=a,nxt=b,z=2,D=.6,swapping=false,vis=false,inView=false,raf=0,lastT=-1,lastMove=0;
function play(v){var p=v.play();if(p&&p.catch)p.catch(function(){})}
function swap(){swapping=true;var c=cur,n=nxt;try{n.currentTime=0}catch(e){}n.style.transition='none';n.style.opacity=0;n.style.zIndex=++z;play(n);
requestAnimationFrame(function(){n.style.transition='opacity '+D+'s linear';n.style.opacity=1});
setTimeout(function(){c.pause();c.style.transition='none';c.style.opacity=0;try{c.currentTime=0}catch(e){}cur=n;nxt=c;swapping=false;lastMove=performance.now()},D*1000+60)}
function loop(t){raf=0;if(!vis)return;var d=cur.duration;
if(d&&!swapping&&cur.currentTime>d-D-.15)swap();
// watchdog: if playback ever stalls or ends, kick it again
if(cur.currentTime!==lastT){lastT=cur.currentTime;lastMove=t}else if(!swapping&&t-lastMove>2500){play(cur);if(t-lastMove>6000){cur.load();play(cur);lastMove=t}}
if(cur.ended&&!swapping){try{cur.currentTime=0}catch(e){}play(cur)}
raf=requestAnimationFrame(loop)}
function on(){if(vis)return;vis=true;lastMove=performance.now();play(cur);if(swapping)play(nxt);if(!raf)raf=requestAnimationFrame(loop)}
function off(){vis=false;cur.pause();nxt.pause()}
new IntersectionObserver(function(es){inView=es[0].isIntersecting;inView&&!document.hidden?on():off()},{threshold:.05}).observe(box);
document.addEventListener('visibilitychange',function(){document.hidden?off():(inView&&on())});
})();
