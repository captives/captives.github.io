import VueSocketIO from "vue-socket.io";

declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

declare module 'vue-hash-calendar' {
  import VueHashCalendar from 'vue-hash-calendar';
  export default VueHashCalendar;
}
declare module 'vue-awesome-swiper' {
  import VueAwesomeSwiper from 'vue-awesome-swiper';
  export default VueAwesomeSwiper;
}

declare module "*.mp3" {
  const src: string;
  export default src;
}
