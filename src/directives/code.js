import Vue from 'vue';
import VueCode from '@/components/VueCode.vue';
import { addClass, removeClass, getStyle } from '@/utils/dom.js';
const Code = Vue.extend(VueCode);

function toggleLoading(el, binding) {

}
const directive = {
    bind(el, binding, vnode) {
        console.log('bind 2', el, binding);
        const vm = vnode.context;
        const mask = new Code({
            el: document.createElement('div'),
            data: {
                text: binding.value,
                visible: !!binding.arg,
                fullscreen: !!binding.modifiers.fullscreen
            }
        });
        el.instance = mask; // 蒙版 Vue 实例对象
        el.mask = mask.$el; // 蒙版 Dom 对象
        el.maskStyle = {};
        console.log('bind 2', el, binding, el.mask);
        mask.visible && toggleLoading(el, binding);
    },
    update(el, binding) {},
    unbind(el, binding, vnode) {}
}

export default {
    install(Vue) {
        if (Vue.prototype.$isServer) return;
        Vue.directive('code', directive);
    }
}