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
                <router-link v-for="(route,index) in this.$router.options.routes" :key="index" :to="route.path" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <li class="nav-item" :class="[isExactActive && 'active']">
                        <a :href="href" @click="navigate">
                            <i class="menu-livicon" :data-icon="route.meta.icon"></i>
                            <span class="menu-title">{{ route.name }}</span>
<!--                            <span class="badge badge-light-danger badge-pill badge-round float-right mr-2">1</span>-->
                        </a>
                    </li>
                </router-link>

<!--                <router-link to="/" v-slot="{ href, route, navigate, isActive, isExactActive }">-->
<!--                    <li class="nav-item" :class="[isExactActive && 'active']">-->
<!--                        <a :href="href" @click="navigate">-->
<!--                            <i class="menu-livicon" data-icon="gear"></i>-->
<!--                            <span class="menu-title">{{ route.name }}</span>-->
<!--                        </a>-->
<!--                    </li>-->
<!--                </router-link>-->

<!--&lt;!&ndash;                sidebar-group-active&ndash;&gt;-->
<!--                <li class="nav-item has-sub">-->
<!--                    <a onclick="return false;">-->
<!--                        <i class="menu-livicon" data-icon="gear"></i>-->
<!--                        <span class="menu-title">Финансы</span>-->
<!--                    </a>-->
<!--                    <ul class="menu-content">-->
<!--                        <router-link to="/history/real" v-slot="{ href, route, navigate, isActive, isExactActive }">-->
<!--                            <li :class="[isExactActive && 'active']">-->
<!--                                <a :href="href" @click="navigate">-->
<!--                                    <i class="bx bx-right-arrow-alt"></i>-->
<!--                                    <span class="menu-item">{{ route.name }}</span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                        </router-link>-->
<!--                        <router-link to="/history/demo" v-slot="{ href, route, navigate, isActive, isExactActive }">-->
<!--                            <li :class="[isExactActive && 'active']">-->
<!--                                <a :href="href" @click="navigate">-->
<!--                                    <i class="bx bx-right-arrow-alt"></i>-->
<!--                                    <span class="menu-item">{{ route.name }}</span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                        </router-link>-->
<!--                    </ul>-->
<!--                </li>-->

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