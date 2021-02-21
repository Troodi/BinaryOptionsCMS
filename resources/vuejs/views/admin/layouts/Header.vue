<template>
  <div>
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
              <li class="dropdown dropdown-language nav-item lang-padding">
                <a class="dropdown-toggle nav-link" id="dropdown-flag" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i :class="'flag-icon flag-icon-' + getLangCookie"></i><span class="selected-language">{{ getLangText }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdown-flag">
                  <a class="dropdown-item" href="/lang/en" data-language="en">
                    <i class="flag-icon flag-icon-us mr-50"></i> English
                  </a>
                  <a class="dropdown-item" href="/lang/ru" data-language="ru">
                    <i class="flag-icon flag-icon-ru mr-50"></i> Русский
                  </a>
                  <a class="dropdown-item" href="/lang/es" data-language="es">
                    <i class="flag-icon flag-icon-es mr-50"></i> Español
                  </a>
                </div>
              </li>
              <li class="dropdown dropdown-user nav-item">
                <a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown">
                  <div class="user-nav d-sm-flex d-none">
                    <span class="user-name">{{ $i18n.t('admin_header_admin') }}</span>
                    <span class="user-status text-muted">{{ $i18n.t('admin_header_panel') }}</span>
                  </div>
                  <span><img class="round" src="/images/portrait/small/avatar-s-11.jpg" alt="avatar" height="40" width="40"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <!-- Modal -->
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
export default {
  name: "Header",
  props: ['user'],
  computed: {
    getLangCookie: function(){
      if(this.$i18n.locale === 'en'){
        return 'us';
      }
      return this.$i18n.locale;
    },
    getLangText: function (){
      if(this.$i18n.locale === 'en'){
        return 'English';
      }
      if(this.$i18n.locale === 'ru'){
        return 'Русский';
      }
      if(this.$i18n.locale === 'es'){
        return 'Español';
      }
    }
  },
  components: {
    AnimatedNumber
  },
  mounted() {
    $('.dropdown-toggle').dropdown()
  }
}
</script>

<style scoped>
@media screen and (max-width: 1000px) {
  .lang-padding {
    padding: 17px 0 !important;
  }
}
</style>