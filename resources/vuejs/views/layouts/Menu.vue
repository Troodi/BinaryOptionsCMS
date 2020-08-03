<template>
    <div class="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
        <div class="navbar-header">
            <ul class="nav navbar-nav flex-row">
                <li class="nav-item mr-auto">
                    <a class="navbar-brand" href="/">
                        <div class="brand-logo">
                            <img src="/images/logo/logo.png" class="logo" alt="">
                        </div>
                        <h2 class="brand-text mb-0">
                            GetOption
                        </h2>
                    </a>
                </li>
                <li class="nav-item nav-toggle">
                    <a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
                        <i class="bx bx-x d-block d-xl-none font-medium-4 primary"></i>
                        <i class="toggle-icon bx bx-disc font-medium-4 d-none d-xl-block primary" data-ticon="bx-disc"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="shadow-bottom"></div>
        <div class="main-menu-content">
            <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation" data-icon-style="lines">
                <li class="nav-item" v-for="route in this.$router.options.routes">
<!--                    <a href="/">-->
<!--                        <i class="menu-livicon" data-icon="desktop"></i>-->
<!--                        <span class="menu-title">Title</span>-->
<!--                        <span class="badge badge-light-danger badge-pill badge-round float-right mr-2">tag</span>-->
<!--                    </a>-->
                    <router-link :to="route.path">
                        <i class="menu-livicon" data-icon="desktop"></i>
                        <span class="menu-title">{{ route.name }}</span>
                        <span class="badge badge-light-danger badge-pill badge-round float-right mr-2">1</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        created() {
            console.log(this.$router);
        }
    }
</script>

<style scoped>

</style>