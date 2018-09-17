import Vue from 'vue';
//const ToastConstructor = Vue.extend(require('./toast1.vue'))

const ToastConstructor = Vue.extend({
	template: "<transition name='fade'><div v-show='visible' :class='position' class='toast'><i>{{message}}</i></div></transition>",
	data: function() {
            return {
                visible: false,
                message : '',
                position : '',
            };
        }
})
let removeDom = event => {
    event.target.parentNode.removeChild(event.target);

};
ToastConstructor.prototype.close = function() {
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);

    flag = true;
};

var flag = true;    // 控制toast每次只能显示一条

const Toast = (options = {}) => {
    var instance = new ToastConstructor().$mount(document.createElement('div'))
    let duration = options.duration || 2500;
    instance.message = typeof options === 'string' ? options : options.message
    instance.position = options.position || 'middle'
    document.body.appendChild(instance.$el);

    if(flag) {
      instance.visible = true;
      flag = false;
      Vue.nextTick(() => {
        instance.timer = setTimeout(function() {
          instance.close();
        }, duration);
      })
    }
    return instance
}

export default Toast;
