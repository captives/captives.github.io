import VueRouter, { Route } from "vue-router";
import VueSocketIO from "vue-socket.io";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $http: any;
    $message: any;
    socket: any;
    sockets: VueSocketIO;
  }
}
