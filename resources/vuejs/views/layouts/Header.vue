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
                                <a class="nav-link nav-link-expand" style="padding: 0.567rem 1.33rem; padding-right: 0.5rem; padding-left: 0.5rem;" data-toggle="tooltip" data-placement="top" :title="$i18n.t('header_fullpage')">
                                    <i class="ficon bx bx-fullscreen"></i>
                                </a>
                            </li>
                          <li class="nav-item d-none d-lg-block">
                            <a><ping-component></ping-component></a>
                          </li>
                        </ul>
                    </div>
                    <ul class="nav navbar-nav float-right">
                        <li class="nav-item d-none d-md-block mr-1" style="padding-top: 13px;">
                          <button @click="$router.push('/deposit')" type="button" class="btn btn-success glow w-100" v-show="!isDemo">
                              <i class="bx bx-trending-up"></i> <span class="align-middle ml-25">{{ $i18n.t('header_deposit') }}</span>
                          </button>
                          <button @click="$router.push('/trading')" v-show="isDemo" type="button" class="btn btn-outline-warning w-100" v-bind:style="{ color: realButtonColor }" @mouseover="realButtonColor='#FFF !important'" @mouseleave="realButtonColor='#FDAC41 !important'">
                            <i class="bx bxs-briefcase-alt"></i>
                            <span class="align-middle ml-25 text-warning">{{ $i18n.t('header_trade_on_real') }}</span>
                          </button>
                        </li>

                        <li class="nav-item">
                            <h4 :class="{'mr-1': !isDemo}">
                                <router-link to="/deposit" class="nav-link" style="padding-top:1.4rem" v-show="!isDemo">
                                    <template>
                                        <animated-number :value="balance" :formatValue="formatToPrice" :duration="1000"/>
                                    </template>
                                </router-link>
                                <router-link to="/deposit" class="nav-link" style="padding-top:1.4rem" v-show="isDemo">
                                  <template>
                                    <animated-number :value="demo_balance" :formatValue="formatToPrice" :duration="1000"/>
                                  </template>
                                </router-link>
                            </h4>
                        </li>
                        <li class="nav-item mr-1 cursor-pointer" @click="refillDemoBalance" v-show="isDemo">
                          <div id="disabled-wrapper" class="font-animated mx-auto text-center" style="margin-top: 19px;">
                            <div class="fonticon-wrap">
                              <i class="livicon-evo" data-options="name: refresh.svg; size: 30px; style: lines-alt;"></i>
                            </div>
                          </div>
                          <b-tooltip target="disabled-wrapper">{{ $i18n.t('header_make_balance_1000') }}</b-tooltip>
                        </li>
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
                                    <span class="user-name">{{ $i18n.t('header_trader') }}</span>
                                    <span class="user-status text-muted">{{ $i18n.t('header_online') }}</span>
                                </div>
                                <span><img class="round" src="/images/portrait/small/avatar-s-11.jpg" alt="avatar" height="40" width="40"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right pb-0">
                                <a class="dropdown-item" href="#">
                                    <i class="bx bx-user mr-50"></i> {{ $i18n.t('header_profile') }}
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="bx bx-envelope mr-50"></i> {{ $i18n.t('header_make_deposit') }}
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="bx bx-check-square mr-50"></i> {{ $i18n.t('header_withdrawal') }}</a>
                                <a class="dropdown-item" href="#"><i class="bx bx-message mr-50"></i> {{ $i18n.t('header_support') }}
                                </a>
                                <div class="dropdown-divider mb-0"></div>
                                <a class="dropdown-item" href="/logout" @click.prevent="logout"><i class="bx bx-power-off mr-50"></i> {{ $i18n.t('header_logout') }}</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <!-- Modal discount -->
    <div class="modal fade" id="discountModal" tabindex="-1" role="dialog" aria-labelledby="discountModalLabel" aria-hidden="true">
      <div class="modal-dialog gradient-border" role="document" style="top:25vh">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ $i18n.t('header_special_offer') }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <div class="text-center mb-2">
                {{ $i18n.t('header_special_offer_desc') }}
              </div>
              <vue-countdown-timer :start-time="'2020-01-01 00:00:00'" :end-time="new Date(user.created_at).getTime() + 24 * 60 * 60 * 1000" :interval="1000">
                <template slot="countdown" slot-scope="scope">
                  <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-2">
                      <h1 class="mb-0">{{scope.props.hours}}</h1><p class="count-down">{{ $i18n.t('header_hours') }}</p>
                    </div>
                    <div class="col-md-2">
                      <h1 class="mb-0">{{scope.props.minutes}}</h1><p class="count-down">{{ $i18n.t('header_minutes') }}</p>
                    </div>
                    <div class="col-md-2">
                      <h1 class="mb-0">{{scope.props.seconds}}</h1><p class="count-down">{{ $i18n.t('header_seconds') }}</p>
                    </div>
                    <div class="col-md-3"></div>
                  </div>
                </template>
              </vue-countdown-timer>
              <div class="text-center" v-html="$i18n.t('header_deposit_sub_desc', { code: '<code>START50BONUS</code>' })"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="moveToBalance" class="btn btn-warning">{{ $i18n.t('header_deposit_balance') }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End modal -->
  </div>
</template>

<script>
    import AnimatedNumber from "animated-number-vue";
    import {getCookie} from '../../js/functions';

    export default {
        name: "Header",
        props: ['user'],
        components: {
            AnimatedNumber
        },
        mounted() {
            $('.dropdown-toggle').dropdown();
            if(new Date(this.user.created_at).getTime() + 24*60*60*1000 > new Date().getTime() && parseInt(this.user.balance) === 0){
              if(localStorage.getItem('popupWindowDiscount') === null){
                localStorage.setItem('popupWindowDiscount', (new Date().getTime() + 60*60*1000).toString());
                $('#discountModal').modal('show');
              }
              if(parseFloat(localStorage.getItem('popupWindowDiscount')) < new Date().getTime()){
                localStorage.setItem('popupWindowDiscount', (new Date().getTime() + 60*60*1000).toString());
                $('#discountModal').modal('show');
              }
            }
            this.$echo.private('balance.'+this.user.id).listen('ChangeBalance', (payload) => {
                this.balance = parseFloat(payload.balance).toFixed(2);
            });
            this.$echo.private('demo_balance.'+this.user.id).listen('ChangeDemoBalance', (payload) => {
              this.demo_balance = parseFloat(payload.balance).toFixed(2);
            });
            setInterval(() => {
                axios.post('/ping');
            }, 30000);

        },
        data: function() {
            return {
                balance: parseFloat(this.user.balance).toFixed(2),
                demo_balance: parseFloat(this.user.demo_balance).toFixed(2),
                isDemo: false,
                isContest: false,
                contestId: 0,
                realButtonColor: '#FDAC41 !important'
            }
        },
        methods: {
            logout: function (){
              axios.post('/logout').then((response) => {
                window.location.href = '';
              });
              return false;
            },
            moveToBalance: function (){
              this.$router.push('/deposit');
              $('#discountModal').modal('hide')
            },
            formatToPrice(value) {
                return `${value.toFixed(2)} $`;
            },
            refillDemoBalance: function (){
              let self = this;
              axios.post('/data/demo/refill')
                  .then(function (response) {
                    if(response.data.success === true) {
                      toastr.success(response.data.message, self.$i18n.t('header_success'), {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                      });
                    } else {
                      toastr.error(response.data.message, self.$i18n.t('header_error'), {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                      });
                    }
                  });
            }
        },
      watch:{
        $route (to, from){
          this.isDemo = (this.$router.currentRoute.params.type != null ? this.$router.currentRoute.params.type : false) === 'demo';
          this.isContest = (this.$router.currentRoute.params.type != null ? this.$router.currentRoute.params.type : false) === 'contest';
          this.contestId = this.$router.currentRoute.params.id != null ? this.$router.currentRoute.params.id : '0';
        }
      },
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
      }
    }
</script>

<style>
    @media screen and (max-width: 1000px) {
        .lang-padding {
            padding: 17px 0 !important;
        }
    }


    .gradient-border {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Lato, sans-serif;
      font-size: 1rem;
      color: white;
      background: #272e48;
      border-radius: 3px;
    }

    .gradient-border::after {
      position: absolute;
      content: "";
      top: calc(-1 * 3px);
      left: calc(-1 * 3px);
      z-index: -1;
      width: calc(100% + 3px * 2);
      height: calc(100% + 3px * 2);
      background: linear-gradient(
          60deg,
          hsl(224, 85%, 66%),
          hsl(269, 85%, 66%),
          hsl(314, 85%, 66%),
          hsl(359, 85%, 66%),
          hsl(44, 85%, 66%),
          hsl(89, 85%, 66%),
          hsl(134, 85%, 66%),
          hsl(179, 85%, 66%)
      );
      background-size: 300% 300%;
      background-position: 0 50%;
      border-radius: calc(2 * 3px);
      animation: moveGradient 4s alternate infinite;
    }

    @keyframes moveGradient {
      50% {
        background-position: 100% 50%;
      }
    }

    .gradient-text {
      text-align: center;
      color: #f35626;
      background-image: -webkit-linear-gradient(180deg, #f35626, #feab3a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-animation: hue 10s infinite linear;
    }

    @-webkit-keyframes hue {
      from {
        -webkit-filter: hue-rotate(0deg);
      }
      to {
        -webkit-filter: hue-rotate(-360deg);
      }
    }

    .count-down {
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
      font-family: 'Roboto', sans-serif;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
    }
</style>