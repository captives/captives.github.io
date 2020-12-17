// import VueRouter, { Route } from 'vue-router';
import VueSocketIO from "vue-socket.io";
// import VueI18n from 'vue-i18n'
// import axios from 'axios';

declare module "*.svg";
// declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $http: any;
    $message: any;
    $Modal: any;
    // $t: Function;
    // $i18n: VueI18n;
    $socket: any;
    sockets: VueSocketIO;
    // axios: axios;
    // $axios: axios;
  }
}

declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

declare module "*.mp3" {
  const src: string;
  export default src;
}
