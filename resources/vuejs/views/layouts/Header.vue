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
                        <li class="nav-item d-none d-md-block mr-1" style="padding-top: 13px;">
                          <button type="button" class="btn btn-success glow w-100" v-show="!isDemo">
                              <i class="bx bx-trending-up"></i> <span class="align-middle ml-25">Пополнить счет</span>
                          </button>
                          <button @click="$router.push('/')" v-show="isDemo" type="button" class="btn btn-outline-warning w-100" v-bind:style="{ color: realButtonColor }" @mouseover="realButtonColor='#FFF !important'" @mouseleave="realButtonColor='#FDAC41 !important'">
                            <i class="bx bxs-briefcase-alt"></i>
                            <span class="align-middle ml-25 text-warning">Торговать на реальном счете</span>
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
                          <b-tooltip target="disabled-wrapper">Сделать баланс равным 1000 $</b-tooltip>
                        </li>
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
    <!-- Modal -->
    <div class="modal fade" id="discountModal" tabindex="-1" role="dialog" aria-labelledby="discountModalLabel" aria-hidden="true">
      <div class="modal-dialog gradient-border" role="document" style="top:25vh">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Специальное предложение!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <div class="text-center mb-2">
                Специально для Вас мы подготовили скидку 50% на первое пополнение, используйте её чтобы получить больше прибыли.
              </div>
              <vue-countdown-timer :start-time="'2020-01-01 00:00:00'" :end-time="new Date().getTime() + 3600 * 4 * 1000" :interval="1000">
                <template slot="countdown" slot-scope="scope">
                  <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-2">
                      <h1 class="mb-0">{{scope.props.hours}}</h1><p class="count-down">Часа</p>
                    </div>
                    <div class="col-md-2">
                      <h1 class="mb-0">{{scope.props.minutes}}</h1><p class="count-down">Минут</p>
                    </div>
                    <div class="col-md-2">
                      <h1 class="mb-0">{{scope.props.seconds}}</h1><p class="count-down">Секунд</p>
                    </div>
                    <div class="col-md-3"></div>
                  </div>
                </template>
              </vue-countdown-timer>
              <div class="text-center">
                Пополните сейчас, чтобы успеть использовать промокод <code>START50BONUS</code> и начать уверенно торговать!
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning">Пополнить баланс</button>
          </div>
        </div>
      </div>
    </div>
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
            $(document).ready(function (){
              $('.dropdown-toggle').dropdown();
            });
            setTimeout(() => {
              //$('#discountModal').modal('show');
            }, 5000);
            this.isDemo = 'demoPage' in this.$router.currentRoute.meta;
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
                realButtonColor: '#FDAC41 !important'
            }
        },
        methods: {
            formatToPrice(value) {
                return `${value.toFixed(2)} $`;
            },
            refillDemoBalance: function (){
              let self = this;
              axios.post('/data/demo/refill')
                  .then(function (response) {
                    if(response.data.success === true) {
                      toastr.success(response.data.message, 'Успешно!', {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                      });
                    } else {
                      toastr.error(response.data.message, 'Ошибка!', {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                      });
                    }
                  });
            }
        },
      watch:{
        $route (to, from){
          this.isDemo = 'demoPage' in this.$router.currentRoute.meta;
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