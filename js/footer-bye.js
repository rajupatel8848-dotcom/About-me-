(function(){var b=document.querySelector('.bye');if(!b)return;
if(!window.IntersectionObserver){b.classList.add('on','run');return}
new IntersectionObserver(function(es){var v=es[0].isIntersecting;if(v)b.classList.add('on');b.classList.toggle('run',v)},{threshold:.25}).observe(b);
})();
