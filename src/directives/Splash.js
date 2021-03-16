import Vue from 'vue';
import VueSplash from '@/components/Splash.vue';
import { addClass, removeClass, getStyle } from '@/utils/dom.js';
const Splash = Vue.extend(VueSplash);

function insertDom(parent, el, binding) {
    //显示中
    if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
        el.domVisible = true;
        parent.appendChild(el.mask);
        Vue.nextTick(() => {
            if (el.instance.hiding) {
                el.instance.$emit('after-leave');
            } else {
                el.instance.visible = true;
            }
        });
        el.domInserted = true;
    } else if (el.domVisible && el.instance.hiding === true) {
        el.instance.visible = true;
        el.instance.hiding = false;
    }

    console.log('蒙层插入到', parent);
}

function toggleLoading(el, binding) {
    if (el.instance.visible) { //显示
        Vue.nextTick(() => {
            if (binding.modifiers.fullscreen) {
                el.maskStyle.zIndex = 99999;
                addClass(el.mask, 'is-fullscreen');
                insertDom(document.body, el, binding);
            } else {
                removeClass(el.mask, 'is-fullscreen');
                insertDom(el, el, binding);
            }
        });
    } else {
        //过渡动画播放结束后处理
        el.instance.$once('after-leave', () => {
            if (!el.instance.hiding) return;
            el.domVisible = false;
            const target = binding.modifiers.fullscreen ? document.body : el;
            removeClass(target, 'el-loading-parent--relative');
            removeClass(target, 'el-loading-parent--hidden');
            el.instance.hiding = false;
            target.removeChild(el.mask);
        });
        el.instance.visible = false;
        el.instance.hiding = true;
    }
}

const splash = {
    bind(el, binding, vnode) {
        console.log('bind 2', el, binding);

        const vm = vnode.context;
        const mask = new Splash({
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
    update(el, binding) {
        el.instance.setText(binding.value);
        el.instance.visible = !!binding.arg;

        if (binding.arg != binding.oldArg) {
            toggleLoading(el, binding);
        }
        console.log('Splash - update', el, binding);
        console.log("el.instance", el.instance);
    },
    unbind(el, binding, vnode) {
        console.log('Splash - unbind', el, binding);
        if (el.domInserted) {
            el.instance.visible = false;
            toggleLoading(el, binding);
        }
        el.instance && el.instance.$destroy();
    }
}

/**
 * v-splash:[visible].fullscreen="value"
 * binding 下的所有值都是只读的，不可以更改
 * 
 * binding.arg              控制显示隐藏
 * binding.value            加载提示文本 / 加载百分比
 * binding.modifiers.fullscreen     全屏还是局部
 * 
 */
export default {
    install(Vue) {
        if (Vue.prototype.$isServer) return;
        Vue.directive('splash', splash);
    }
}