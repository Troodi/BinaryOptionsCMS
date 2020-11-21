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
                <li class="nav-item d-none d-lg-block">
                  <a><ping-component></ping-component></a>
                </li>
              </ul>
            </div>
            <ul class="nav navbar-nav float-right">
              <li class="dropdown dropdown-language nav-item lang-padding">
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
                    <span class="user-name">Администратор</span>
                    <span class="user-status text-muted">Панель управления</span>
                  </div>
                  <span><img class="round" src="/images/portrait/small/avatar-s-11.jpg" alt="avatar" height="40" width="40"></span>
                </a>
                <div class="dropdown-menu dropdown-menu-right pb-0">
                  <a class="dropdown-item" href="#"><i class="bx bx-message mr-50"></i> Статистика</a>
                  <div class="dropdown-divider mb-0"></div>
                  <a class="dropdown-item" href="#"><i class="bx bx-power-off mr-50"></i> Logout</a>
                </div>
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