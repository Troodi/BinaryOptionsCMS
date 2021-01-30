<template>
  <div class="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
    <div class="navbar-header">
      <ul class="nav navbar-nav flex-row">
        <li class="nav-item mr-auto">
          <a class="navbar-brand" href="/trading" style="margin-top: 0px;margin-left: 0px;">
            <div class="brand-logo">
              <img :src="logo_url" class="logo" alt="" style="height: auto;left:0px;margin-top: 4px;">
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
        <li class="nav-item" :class="{'active' : this.$route.path === '/admin'}">
          <router-link :to="'/admin'">
            <i class="menu-livicon" :data-icon="'desktop'"></i>
            <span class="menu-title">Статистика системы</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{'active' : this.$route.path === '/admin/settings'}">
          <router-link :to="'/admin/settings'">
            <i class="menu-livicon" :data-icon="'gear'"></i>
            <span class="menu-title">Настройки системы</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{'active' : this.$route.path === '/admin/deposit/systems'}">
          <router-link :to="'/admin/deposit/systems'">
            <i class="menu-livicon" :data-icon="'plus'"></i>
            <span class="menu-title">Системы пополнения</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{'active' : this.$route.path === '/admin/withdraw/systems'}">
          <router-link :to="'/admin/withdraw/systems'">
            <i class="menu-livicon" :data-icon="'minus'"></i>
            <span class="menu-title">Системы вывода</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{'active' : this.$route.path === '/admin/symbols'}">
          <router-link :to="'/admin/symbols'">
            <i class="menu-livicon" :data-icon="'british-pound'"></i>
            <span class="menu-title">Валютные пары</span>
          </router-link>
        </li>
<!--        Пользователь-->
        <li v-show="this.$route.path.includes('admin/user')" class="nav-item" :class="{'has-sub sidebar-group-active open' : this.$route.path.includes('admin/user')}">
          <router-link :to="'/admin/user/profile/'+this.$route.params.id">
            <i class="menu-livicon" :data-icon="'user'"></i>
            <span class="menu-title">Пользователь</span>
          </router-link>
          <ul class="menu-content">
            <li :class="{'active' : this.$route.path === '/admin/user/control/'+this.$route.params.id}">
              <router-link :to="'/admin/user/control/'+this.$route.params.id">
                <i class="bx bx-right-arrow-alt"></i>
                <span class="menu-title">Управление</span>
              </router-link>
            </li>
            <li :class="{'active' : this.$route.path === '/admin/user/profile/'+this.$route.params.id}">
              <router-link :to="'/admin/user/profile/'+this.$route.params.id">
                <i class="bx bx-right-arrow-alt"></i>
                <span class="menu-title">Профиль</span>
              </router-link>
            </li>
            <li :class="{'active' : this.$route.path === '/admin/user/deposit/'+this.$route.params.id}">
              <router-link :to="'/admin/user/deposit/'+this.$route.params.id">
                <i class="bx bx-right-arrow-alt"></i>
                <span class="menu-title">Пополнения</span>
              </router-link>
            </li>
            <li :class="{'active' : this.$route.path === '/admin/user/withdrawal/'+this.$route.params.id}">
              <router-link :to="'/admin/user/withdrawal/'+this.$route.params.id">
                <i class="bx bx-right-arrow-alt"></i>
                <span class="menu-title">Выплаты</span>
              </router-link>
            </li>
            <li :class="{'active' : this.$route.path === '/admin/user/history/'+this.$route.params.id}">
              <router-link :to="'/admin/user/history/'+this.$route.params.id">
                <i class="bx bx-right-arrow-alt"></i>
                <span class="menu-title">История торговли</span>
              </router-link>
            </li>
            <li :class="{'active' : this.$route.path === '/admin/user/partner/'+this.$route.params.id}">
              <router-link :to="'/admin/user/partner/'+this.$route.params.id">
                <i class="bx bx-right-arrow-alt"></i>
                <span class="menu-title">Рефералы</span>
              </router-link>
            </li>
            <li :class="{'active' : this.$route.path === '/admin/user/promocode/'+this.$route.params.id}">
              <router-link :to="'/admin/user/promocode/'+this.$route.params.id">
                <i class="bx bx-right-arrow-alt"></i>
                <span class="menu-title">Промокоды</span>
              </router-link>
            </li>
          </ul>
        </li>
<!--        Конец Пользователь-->
        <li class="nav-item" :class="{'active' : this.$route.path === '/admin/promocodes'}">
          <router-link :to="'/admin/promocodes'">
            <i class="menu-livicon" :data-icon="'gift'"></i>
            <span class="menu-title">Промокоды</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{'active' : this.$route.path === '/admin/deposit'}">
          <router-link :to="'/admin/deposit'">
            <i class="menu-livicon" :data-icon="'bank'"></i>
            <span class="menu-title">Пополения</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{'active' : this.$route.path === '/admin/withdrawal'}">
          <router-link :to="'/admin/withdrawal'">
            <i class="menu-livicon" :data-icon="'coins'"></i>
            <span class="menu-title">Выплаты</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{'active' : this.$route.path === '/admin/partner'}">
          <router-link :to="'/admin/partner'">
            <i class="menu-livicon" :data-icon="'diagram'"></i>
            <span class="menu-title">Заявки партнеров</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{'active' : this.$route.path === '/admin/verify'}">
          <router-link :to="'/admin/verify'">
            <i class="menu-livicon" :data-icon="'bulb'"></i>
            <span class="menu-title">Верификация</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{'active' : this.$route.path === '/admin/history'}">
          <router-link :to="'/admin/history'">
            <i class="menu-livicon" :data-icon="'coins'"></i>
            <span class="menu-title">История торговли</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{'active' : this.$route.path === '/logout'}">
          <router-link :to="'/close'">
            <i class="menu-livicon" :data-icon="'close'"></i>
            <span class="menu-title">Выйти</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: ['logo_url', 'icon_url'],
  methods: {
    checkVisible(href, hide, route){
      return true;
      if(!hide){
        return true;
      } else {
        return this.$router.currentRoute.path.includes(this.$route.meta.pathActive) && href.includes(this.$route.meta.pathActive);
      }
    },
    checkActive(href, hide, isExactActive, children){
      if(!hide && isExactActive){
        return true;
      } else {
        return this.$router.currentRoute.path.includes(this.$route.meta.pathActive) && href.includes(this.$route.meta.pathActive) && !children;
      }
    }
  },
  computed: {
    routes: function () {
      return this.$router.options.routes;
    }
  }
}
</script>

<style scoped>

</style>