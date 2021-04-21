<template>
    <div class="content-wrapper">
      <section class="faq-search">
        <div class="row">
          <div class="col-12">
            <div class="card faq-bg bg-transparent box-shadow-0 p-1 p-md-5">
              <div class="card-content">
                <div class="card-body p-0">
                  <h1 class="faq-title text-center mb-1">Конкурсы для трейдеров</h1>
                  <p class="card-text text-center">
                    <img src="/images/icon/cup.png" height="120" width="120" class="img-fluid">
                  </p>
                  <p class="card-text text-center mt-1 font-medium-1 text-muted">
                    Описание Описание Описание Описание Описание Описание<br>
                    Описание Описание Описание Описание Описание Описание Описание Описание<br>
                    Описание Описание Описание Описание Описание Описание Описание<br>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="faq">
        <div class="row">
          <div class="col-12">
            <!-- swiper start -->
            <div class="card bg-transparent shadow-none">
              <div class="card-content">
                <div class="card-body">
                  <div class="swiper-centered-slides swiper-container p-1">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide rounded swiper-shadow" id="sales-text" style="width: 30% !important;min-width: 200px;"> <i
                        class="bx bx-flag mb-1 font-large-1"></i>
                        <div class="cent-text1">Запланированные конкурсы</div>
                      </div>
                      <div class="swiper-slide rounded swiper-shadow" id="getting-text" style="width: 30% !important;min-width: 200px;"> <i
                        class="bx bx-flag mb-1 font-large-1"></i>
                        <div class="cent-text1">Активные конкурсы</div>
                      </div>
                      <div class="swiper-slide rounded swiper-shadow" id="pricing-text" style="width: 30% !important;min-width: 200px;"> <i
                        class="bx bx-dollar-circle mb-1 font-large-1"></i>
                        <div class="cent-text1">Завершенные конкурсы</div>
                      </div>
                    </div>
                    <!-- Add Arrows -->
                    <div class="swiper-button-next remove"></div>
                    <div class="swiper-button-prev remove"></div>
                  </div>
                  <div class="main-wrapper-content">
                    <div class="wrapper-content" data-faq="getting-text">
                      <div class="text-center p-md-4 p-sm-1 py-1 p-0">
                        <h1 class="faq-title">Список активных конкурсов</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam reprehenderit alias voluptas aspernatur
                          maiores
                          quis molestiae totam deserunt exercitationem ipsam officiis nisi, labore magni, commodi quaerat quia
                          earum
                          quas illo ea amet minus ad dolor?</p>
                      </div>
                      <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3" v-for="(contest, index) in contests">
                          <div class="card">
                            <div class="card-content">
                              <img class="card-img img-fluid" :src="getImageByIndex(index)">
                              <div class="card-img-overlay overlay-dark d-flex justify-content-between flex-column" style="background: rgba(0, 19, 41, 0.7) !important;">
                                <div class="overlay-content">
                                  <h4 class="card-title mb-50">{{ getLocaleText(contest.title) }}</h4>
                                  <p class="card-text text-max-lines">
                                    {{ getLocaleText(contest.description) }}
                                  </p>
                                </div>
                                <div class="overlay-status">
                                  <p class="mb-25"><small>Тип - "{{ contestTypeText(contest.type) }}"</small></p>
                                  <button class="btn btn-outline-info">Подробнее о конкурсе</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="wrapper-content" data-faq="pricing-text">
                      <div class="text-center p-md-4 p-sm-1 py-1 p-0">
                        <h1 class="faq-title">Pricing & Planes</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam reprehenderit alias voluptas aspernatur
                          maiores
                          quis molestiae totam deserunt exercitationem ipsam officiis nisi, labore magni, commodi quaerat quia
                          earum
                          quas illo ea amet minus ad dolor?</p>
                      </div>
                      <!-- accordion start -->

                      <!-- Accordion end -->
                    </div>
                    <div class="wrapper-content" data-faq="sales-text">
                      <div class="text-center p-md-4 p-sm-1 py-1 p-0">
                        <h1 class="faq-title">Sales Question</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam reprehenderit alias voluptas aspernatur
                          maiores
                          quis molestiae totam deserunt exercitationem ipsam officiis nisi, labore magni, commodi quaerat quia
                          earum
                          quas illo ea amet minus ad dolor?</p>
                      </div>
                      <!-- accordion start -->

                    </div>
                    <div class="wrapper-content" data-faq="usage-text">
                      <div class="text-center p-md-4 p-sm-1 py-1 p-0">
                        <h1 class="faq-title">Usage Guides</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam reprehenderit alias voluptas aspernatur
                          maiores
                          quis molestiae totam deserunt exercitationem ipsam officiis nisi, labore magni, commodi quaerat quia
                          earum
                          quas illo ea amet minus ad dolor? Lorem1 </p>
                      </div>
                      <!-- accordion start -->

                      <!-- Accordion end -->
                    </div>
                    <div class="wrapper-content" data-faq="general-text">
                      <div class="text-center p-md-4 p-sm-1 py-1 p-0">
                        <h1 class="faq-title">General Guide</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam reprehenderit alias voluptas aspernatur
                          maiores
                          quis molestiae totam deserunt exercitationem ipsam officiis nisi, labore magni, commodi quaerat quia
                          earum
                          quas illo ea amet minus ad dolor?</p>
                      </div>
                      <!-- accordion start -->

                      <!-- Accordion end -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- swiper ends -->
          </div>
        </div>
      </section>

      <div class="content-body">
        <div class="row">
          <div class="col-md-12">
            <section class="card">
              <div class="card-header">
                <h4 class="card-title">Конкурсы для тейдеров</h4>
              </div>
              <div class="card-content">
                <div class="card-body">
                  <div class="card-text">
                    <p class="mb-0">
                      Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание
                      Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание
                      Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { findLocalizedText } from "../../js/functions";

export default {
  name: "Contest",
  mounted() {
    let self = this;
    axios.post('/data/getAllContests')
      .then(function (response) {
        self.contests = response.data;
      });

    var swiperLength = $(".swiper-slide").length;
    if (swiperLength) {
      swiperLength = Math.floor(swiperLength / 2)
    }

    // Swiper js for this page
    var mySwiper = new Swiper('.swiper-centered-slides', {
      slidesPerView: 'auto',
      initialSlide: swiperLength,
      centeredSlides: true,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // active slide on click
      slideToClickedSlide: true,
    });

    activeSlide(swiperLength);

    // Active slide change on swipe
    mySwiper.on('slideChange', function () {
      activeSlide(mySwiper.realIndex);
    });

    //add class active content of active slide
    function activeSlide(index) {
      var slideEl = mySwiper.slides[index]
      var slideId = $(slideEl).attr('id');
      $(".wrapper-content").removeClass("active");
      $("[data-faq=" + slideId + "]").addClass('active')
    };
  },
  methods: {
    getLocaleText(text){
      return findLocalizedText(text);
    },
    contestTypeText(type){
      switch(type){
        case 1:
          return 'Максимальный баланс';
        case 2:
          return 'Максимальный прирост';
        case 3:
          return 'Максимальный оборот';
      }
    },
    getImageByIndex(index){
      return this.images[index % this.images.length];
    }
  },
  data: function () {
    return {
      contests: [],
      images: [
        'https://image.freepik.com/free-vector/gradient-geometric-shapes-dark-background_23-2148411560.jpg',
        'https://image.freepik.com/free-vector/gradient-geometric-shapes-on-dark-background_23-2148417580.jpg',
        'https://image.freepik.com/free-vector/gradient-geometric-shapes-dark-background_23-2148445831.jpg',
      ],
    }
  },
}
</script>

<style scoped>

</style>