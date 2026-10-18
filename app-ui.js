/* Native-feeling single-document navigation for the iPhone PWA. */
(() => {
  const nav = document.querySelector('.nav');
  const destinations = [['home','Home','⌂'],['progress','Progress','⌁'],['workout','Workout','＋'],['library','Library','▤'],['body','Body','◉'],['more-menu','More','•••']];
  nav.replaceChildren();
  for (const [id,label,symbol] of destinations) {
    const button=document.createElement('button');button.type='button';button.className=id==='workout'?'nav-plus':'app-tab';button.dataset.appNav=id;button.setAttribute('aria-label',label);button.innerHTML=`<span>${symbol}</span>${id==='workout'?'':`<small>${label}</small>`}`;nav.append(button);
  }
  const originalPage=page;
  page=function(name,options={}){
    if(name==='more-menu'){document.querySelector('#more-menu')?.showModal();return}
    originalPage(name);
    nav.querySelectorAll('[data-app-nav]').forEach(button=>{const selected=button.dataset.appNav===name;button.classList.toggle('active',selected);if(selected)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current')});
    if(options.history!==false&&location.hash!==`#${name}`)history.pushState({page:name},'',`#${name}`);
    window.scrollTo({top:0,behavior:'smooth'});
  };
  nav.addEventListener('click',event=>{const button=event.target.closest('[data-app-nav]');if(!button)return;const target=button.dataset.appNav;if(target==='workout')begin();else page(target)});
  const valid=['home','workout','progress','library','body','cardio','muscles','plan','photos','settings','import','library-detail'];
  window.addEventListener('popstate',()=>{const requested=location.hash.slice(1);page(valid.includes(requested)?requested:'home',{history:false})});
  const initial=location.hash.slice(1);page(valid.includes(initial)?initial:'home',{history:false});
})();
