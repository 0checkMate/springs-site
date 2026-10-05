// Scroll reveal, mycelium thread and wave parallax (all pages)
(function(){
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
var tp=document.getElementById('tp'),wv=document.getElementById('waves');
function prog(){var h=document.documentElement.scrollHeight-innerHeight;return h>0?Math.min(1,scrollY/h):0}
function ui(){var p=prog();if(tp)tp.style.strokeDashoffset=1-p;if(wv)wv.style.transform='translateY('+(p*60)+'px)'}
addEventListener('scroll',ui,{passive:true});ui();
})();
