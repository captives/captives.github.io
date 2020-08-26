import './../assets/css/code-style.css';
import './../assets/css/element-ui.styl';
import Code from './../components/Code';
import Source from './../components/Source';
import SourceCode from './../components/SourceCode';
import URLInput from './../components/URLInput.vue';
import NavMenu from './../components/NavMenu';
import Lottie from './../components/Lottie';
import { fetch } from './common';


const global = {
    install(Vue) {
        Vue.component('url-input', URLInput);
        Vue.component('vue-code', Code);
        Vue.component('vue-source', Source);
        Vue.component('vue-lottie', Lottie);
        Vue.component('vue-menu', NavMenu);
        Vue.component('source-code', SourceCode);

        Vue.prototype.$fetch = fetch;
        Vue.prototype.$videoList = [
            { label: "Parkour 720P MP4", value: "/assets/medias/parkour_720P.mp4" },
            { label: "Parkour 720P WEBM", value: "/assets/medias/parkour_720P.webm" },
            { label: "Parkour 1080P MP4", value: "/assets/medias/parkour_1080P.mp4" },
            { label: "Parkour 1080P WEBM", value: "/assets/medias/parkour_1080P.webm" },

            { label: "Piper 720P", value: "/assets/medias/Piper_720P.mp4" },
            { label: "Piper 1080P", value: "/assets/medias/Piper_1080P.mp4" },

            { label: "汽车 绿幕视频", value: "/assets/medias/green-screen-car.mp4" },
        ];
    }
};
/**Vue 全局属性、方法*/
export default global