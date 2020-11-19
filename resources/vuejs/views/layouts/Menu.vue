<template>
    <div class="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
        <div class="navbar-header">
            <ul class="nav navbar-nav flex-row">
                <li class="nav-item mr-auto">
                    <a class="navbar-brand" href="/" style="margin-top: 0px;margin-left: 0px;">
                        <div class="brand-logo">
                            <img src="/images/logo/logo4.png" class="logo" alt="" style="height: auto;width: 150px;left:0px;margin-top: 4px;">
                        </div>
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
                <router-link v-for="(route,index) in this.$router.options.routes" :key="index" :to="route.path" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <li v-if="!route.meta.hide" class="nav-item" :class="[isExactActive && 'active']">
                        <a :href="href" @click="navigate">
                            <i class="menu-livicon" :data-icon="route.meta.icon"></i>
                            <span class="menu-title">{{ route.name }}</span>
                            <span v-if="route.meta.badge" class="badge badge-primary badge-round float-right text-white">{{ route.meta.badge }}</span>
                        </a>
                    </li>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Menu"
    }
</script>

<style scoped>

</style>