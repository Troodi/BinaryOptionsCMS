<template>
    <footer class="footer footer-light footer-static" v-if="!this.$route.meta.hideFooter">
        <p class="clearfix mb-0">
            <span class="float-left d-inline-block">2020 &copy; GetOption</span>
            <span class="float-right d-sm-inline-block d-none">info@getoption.pro</span>
        </p>
    </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>

</style>