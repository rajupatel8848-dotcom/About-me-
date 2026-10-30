(function(){var r=document.documentElement,q=location.search.match(/[?&]perf=(full|lite|ultra)/);
// Performance tiers: full (desktop) | lite (phones, tablets, low-end laptops) | ultra (auto-fallback if frames are slow)
var coarse=matchMedia('(pointer:coarse)').matches,small=innerWidth<900||Math.min(screen.width||9999,screen.height||9999)<700,mem=navigator.deviceMemory||8,cores=navigator.hardwareConcurrency||8;
var lite=q?q[1]!=='full':(coarse||small||mem<=4||cores<=4);
var P=window.__perf={lite:lite,ultra:!!(q&&q[1]==='ultra'),n:0,sum:0,slow:0,
report:function(ms){if(!P.lite||P.ultra||ms<=0||ms>250)return;P.n++;P.sum+=ms;if(P.n>=30){P.slow=(P.sum/P.n>42)?P.slow+1:Math.max(0,P.slow-1);P.n=0;P.sum=0;if(P.slow>=2){P.ultra=true;r.dataset.perf='ultra'}}}};
r.dataset.perf=P.ultra?'ultra':lite?'lite':'full';
})();
