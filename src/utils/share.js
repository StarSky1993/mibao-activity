import {setTitle} from '@/directive/ChangeTitle.js';

const appendLogo = (logo)=>{
  let wp = document.createElement("div");
  wp.style.cssText = "overflow:hidden; width:0px; height:0; position:absolute; top:-1000%; z-index:-2;";
  wp.innerHTML='<img src="' + logo + '">';
  
  let first=document.body.firstChild;
  document.body.insertBefore(wp,first);
};

const share = {
  shareWX:(obj)=>{
    let logo = obj.logo;
    let title = obj.title;
    setTitle(title);
    appendLogo(logo);
  },
};

export {
  share
};
