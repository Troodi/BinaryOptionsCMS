<template>
    <div>
      <Trading v-show="showTradingPanel"></Trading>
      <router-view></router-view>
    </div>
</template>

<script>
    import Trading from "../user/Trading";
    export default {
        name: "App",
        components : {
          Trading
        },
        data(){
          return {
            showTradingPanel: false,
          }
        },
        watch: {
          $route(to, from) {
            this.showTradingPanel = this.$router.currentRoute.path.includes('/trading');
          }
        }
    }
</script>

<style scoped>

</style>