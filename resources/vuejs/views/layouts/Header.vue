<template>
    <nav class="header-navbar main-header-navbar navbar-expand-lg navbar navbar-with-menu fixed-top" data-bgcolor="bg-white">
        <div class="navbar-wrapper">
            <div class="navbar-container content">
                <div class="navbar-collapse" id="navbar-mobile">
                    <div class="mr-auto float-left bookmark-wrapper d-flex align-items-center">

                        <ul class="nav navbar-nav">
                            <li class="nav-item mobile-menu d-xl-none mr-auto">
                                <a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#">
                                    <i class="ficon bx bx-menu"></i>
                                </a>
                            </li>
                        </ul>

                        <ul class="nav navbar-nav bookmark-icons">
                            <li class="nav-item d-none d-lg-block">
                                <a class="nav-link nav-link-expand" style="padding: 0.567rem 1.33rem; padding-right: 0.5rem; padding-left: 0.5rem;" data-toggle="tooltip" data-placement="top" title="На весь экран">
                                    <i class="ficon bx bx-fullscreen"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <ul class="nav navbar-nav float-right">
                        <li class="nav-item" style="padding-top: 1rem">
                            <button type="button" class="btn btn-success glow w-100">
                                <i class="bx bx-trending-up"></i> <span class="align-middle ml-25">Пополнить счет</span>
                            </button>
                        </li>

                        <li class="nav-item">
                            <h4>
                                <router-link to="/deposit" class="nav-link" style="padding-top:1.4rem">
                                    <template>
                                        <animated-number :value="parseFloat(balance).toFixed(2)" :formatValue="formatToPrice" :duration="1000"/>
                                    </template>
                                </router-link>
                            </h4>
                        </li>
                        <li class="dropdown dropdown-language nav-item">
                            <a class="dropdown-toggle nav-link" id="dropdown-flag" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="flag-icon flag-icon-us"></i><span class="selected-language">English</span>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdown-flag">
                                <a class="dropdown-item" href="/lang/en" data-language="en">
                                    <i class="flag-icon flag-icon-us mr-50"></i> English
                                </a>
                                <a class="dropdown-item" href="/lang/fr" data-language="fr">
                                    <i class="flag-icon flag-icon-fr mr-50"></i> French
                                </a>
                                <a class="dropdown-item" href="/lang/de" data-language="de">
                                    <i class="flag-icon flag-icon-de mr-50"></i> German
                                </a>
                                <a class="dropdown-item" href="/lang/pt" data-language="pt">
                                    <i class="flag-icon flag-icon-pt mr-50"></i> Portuguese
                                </a>
                            </div>
                        </li>
                        <li class="dropdown dropdown-user nav-item">
                            <a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown">
                                <div class="user-nav d-sm-flex d-none">
                                    <span class="user-name">Трейдер</span>
                                    <span class="user-status text-muted">гость</span>
                                </div>
                                <span><img class="round" src="/images/portrait/small/avatar-s-11.jpg" alt="avatar" height="40" width="40"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right pb-0">
                                <a class="dropdown-item" href="#">
                                    <i class="bx bx-user mr-50"></i> Edit Profile
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="bx bx-envelope mr-50"></i> My Inbox
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="bx bx-check-square mr-50"></i> Task</a>
                                <a class="dropdown-item" href="#"><i class="bx bx-message mr-50"></i> Chats
                                </a>
                                <div class="dropdown-divider mb-0"></div>
                                <a class="dropdown-item" href="#"><i class="bx bx-power-off mr-50"></i> Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import AnimatedNumber from "animated-number-vue";
    export default {
        name: "Header",
        props: ['user'],
        components: {
            AnimatedNumber
        },
        mounted() {
            this.$echo.private('balance.'+this.user.id).listen('ChangeBalance', (payload) => {
                this.balance = payload.balance;
            });
            setInterval(() => {
                axios.post('/ping');
            }, 30000);
        },
        data: function() {
            return {
                balance: this.user.balance,
            }
        },
        methods: {
            formatToPrice(value) {
                return `${value.toFixed(2)} $`;
            }
        }
    }
</script>

<style scoped>

</style>