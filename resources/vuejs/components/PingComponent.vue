<template>
  <div class="p-0" style="margin-top:10.5px;margin-left: 20px;">{{ $i18n.t('header_ping') }}: {{ ping }} {{ $i18n.t('header_ms') }}</div>
</template>

<script>
export default {
  name: "PingComponent",
  mounted(){
    setInterval(() => { this.checkPing(); }, 1000);
  },
  data: function (){
    return {
      ping: 0,
      start: new Date(),
      favicon: 'favicon.ico',
    }
  },
  methods: {
    checkPing(){
      this.start = new Date();
      let img = new Image();
      img.onload = this.pingOnLoad;
      img.onerror = this.pingOnError;
      img.src = window.location.protocol + '//' + window.location.hostname + '/' + this.favicon + "?" + (+new Date());
    },
    pingOnLoad(e){
      this.ping = new Date()-this.start;
    },
    pingOnError(e){
      this.ping = new Date()-this.start;
    }
  }
}
</script>

<style scoped>

</style>