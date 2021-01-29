<template>
    <footer class="footer footer-light footer-static" v-if="!this.$route.meta.hideFooter">
        <p class="clearfix mb-0">
            <span class="float-left d-inline-block">2020 &copy; {{ title }}</span>
            <span class="float-right d-sm-inline-block d-none">{{ support_mail }}</span>
        </p>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        props: ['title', 'domain', 'support_mail'],
    }
</script>

<style scoped>

</style>