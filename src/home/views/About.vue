<template>
  <div class="about">
    <p v-for="(item,index) in list" :key="index">{{item}}</p>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      url: "https://r1---sn-a5meknsd.googlevideo.com/videoplayback?expire=1579164065&ei=Qc0fXruVGsGtkgav26eABg&ip=184.164.66.78&id=o-AGBul7mcCaQIktprmcSdWCNaQ8IDXRorK9H0hd2adjm1&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video/mp4&ratebypass=yes&dur=205.217&lmt=1575296770749532&fvip=1&fexp=23842630&c=WEB&txp=5535432&sparams=expire,ei,ip,id,itag,source,requiressl,vprv,mime,ratebypass,dur,lmt&sig=ALgxI2wwRQIgQ0InP78tbnuqvVV9nobbFpO92xJauUCKwafV8z1kUl0CIQC9ax-SO8YB0edHEDu_wbnez73odQjD5EkW9TXeCDVLOA==&redirect_counter=1&rm=sn-5uad67e&req_id=b37a6e3ad070a3ee&cms_redirect=yes&ipbypass=yes&mip=173.82.151.144&mm=31&mn=sn-a5meknsd&ms=au&mt=1579146103&mv=m&mvi=0&pl=22&lsparams=ipbypass,mip,mm,mn,ms,mv,mvi,pl&lsig=AHylml4wRQIgYypT2FzEg7qlJFY5TKyB2XrQGwlP39C3sw7ytHhi6UgCIQDl1KcUxoxUW8vpfP6-n5oMCDsnPT8xgNhOsCloFFbqFg=="
    }
  },
  computed:{
    list(){
      return this.url.split('&');
    }
  }
}
</script>
