import '@/assets/themes-cayman/page-markdown.scss';

import "@/assets/css/element-ui.styl";
import "@/assets/css/base-style.css";

import Code from "./../components/Code";
import Source from "./../components/Source";
import SourceCode from "./../components/SourceCode";
import URLInput from "./../components/URLInput.vue";
import NavBar from "./../components/NavBar";
import Lottie from "./../components/Lottie";
import QRCode from "./../components/QRCode.vue";
import SearchBar from "./../components/SearchBar.vue";
import DebuggerPopover from "./../components/DebuggerPopover.vue";

import VueTable from './../components/table/index';

import BaiduTts from '@/components/BaiduTts.vue';

import { fetch } from "./common";

const global = {
    install(Vue) {
        Vue.component("vue-code", Code);
        Vue.component("vue-source", Source);
        Vue.component("vue-lottie", Lottie);
        Vue.component("vue-nav-bar", NavBar);

        Vue.component("url-input", URLInput);
        Vue.component("source-code", SourceCode);
        Vue.component("search-bar", SearchBar);
        Vue.component("qr-code", QRCode);
        Vue.component("vue-debugger", DebuggerPopover);

        Vue.component('vue-tts', BaiduTts);

        Vue.use(VueTable);

        Vue.prototype.$fetch = fetch;
        Vue.prototype.$videoList = [
            { label: "樱花小镇 1080P MP4", value: "/assets/medias/cherry_town.mp4" },
            { label: "森林 1080P MP4", value: "/assets/medias/forest.mp4" },
            { label: "Piper 720P", value: "/assets/medias/Piper_720P.mp4" },
            { label: "Piper 1080P", value: "/assets/medias/Piper_1080P.mp4" },
            { label: "汽车 绿幕 720P", value: "/assets/medias/green-screen-car.mp4" },
            { label: "锦里 音频 mp3", value: "/assets/medias/jinli.mp3" },
        ];
    },
};
/**Vue 全局属性、方法*/
export default global;