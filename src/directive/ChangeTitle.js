const setTitle = title => {
  if (title === undefined || window.document.title === title) {
    return;
  };
  
  document.title = title;
  
  // 微信不生效fix http://blog.csdn.net/xuexiiphone/article/details/51966342
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.addEventListener("load", () => {
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 9);
  }, false);
  iframe.src = "/favicon.ico";
  document.body.appendChild(iframe);
};

export {setTitle};

let changeTitle = {};

changeTitle.install = function (Vue) {
  Vue.directive('title', {
    update: function (el, binding){
      setTitle(binding.value);
    }
  });
};

export default changeTitle;
