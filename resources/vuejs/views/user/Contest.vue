<template>
    <div class="content-wrapper">
      <section class="faq-search">
        <div class="row">
          <div class="col-12">
            <div class="card faq-bg bg-transparent box-shadow-0 p-1 p-md-5">
              <div class="card-content">
                <div class="card-body p-0">
                  <h1 class="faq-title text-center mb-1">{{ $i18n.t('tournament_for_traders') }}</h1>
                  <p class="card-text text-center">
                    <img src="/images/icon/cup.png" height="120" width="120" class="img-fluid">
                  </p>
                  <p class="card-text text-center mt-1 font-medium-1 text-muted" v-html="$i18n.t('tournament_for_traders_desc')"></p>
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
                      <div class="swiper-slide rounded swiper-shadow" id="planned" style="width: 30% !important;min-width: 200px;"> <i
                        class="bx bx-flag mb-1 font-large-1"></i>
                        <div class="cent-text1">{{ $i18n.t('tournament_panned') }}</div>
                      </div>
                      <div class="swiper-slide rounded swiper-shadow" id="active" style="width: 30% !important;min-width: 200px;"> <i
                        class="bx bx-flag mb-1 font-large-1"></i>
                        <div class="cent-text1">{{ $i18n.t('tournament_active') }}</div>
                      </div>
                      <div class="swiper-slide rounded swiper-shadow" id="ended" style="width: 30% !important;min-width: 200px;"> <i
                        class="bx bx-dollar-circle mb-1 font-large-1"></i>
                        <div class="cent-text1">{{ $i18n.t('tournament_ended') }}</div>
                      </div>
                    </div>
                    <!-- Add Arrows -->
                    <div class="swiper-button-next remove"></div>
                    <div class="swiper-button-prev remove"></div>
                  </div>

                  <div class="wrapper-content" data-faq="planned">
                    <div class="text-center p-md-4 p-sm-1 py-1 p-0">
                      <h1 class="faq-title">{{ $i18n.t('tournament_panned') }}</h1>
                      <p>{{ $i18n.t('tournament_planned_desc') }}</p>
                    </div>
                    <ContestItems :type="'planned'" :contests_items="'planned' in contests ? contests.planned : []"></ContestItems>
                  </div>

                  <div class="main-wrapper-content">
                    <div class="wrapper-content" data-faq="active">
                      <div class="text-center p-md-4 p-sm-1 py-1 p-0">
                        <h1 class="faq-title">{{ $i18n.t('tournament_active') }}</h1>
                        <p>{{ $i18n.t('tournament_active_desc') }}</p>
                      </div>
                      <ContestItems :type="'active'" :contests_items="'active' in contests ? contests.active : []"></ContestItems>
                    </div>

                    <div class="wrapper-content" data-faq="ended">
                      <div class="text-center p-md-4 p-sm-1 py-1 p-0">
                        <h1 class="faq-title">{{ $i18n.t('tournament_ended') }}</h1>
                        <p>{{ $i18n.t('tournament_ended_desc') }}</p>
                      </div>
                      <ContestItems :type="'ended'" :contests_items="'ended' in contests ? contests.ended : []"></ContestItems>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <!-- swiper ends -->
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import ContestItems from "../../components/ContestItems";

export default {
  name: "Contest",
  components: { ContestItems: ContestItems},
  computed: {
    isAdmin: function (){
      return this.$route.meta.isAdmin;
    }
  },
  mounted() {
    let self = this;
    let url = this.isAdmin ? '/data/getAllContests/' + this.$route.params.id : '/data/getAllContests';
    axios.post(url)
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

  },
  data: function () {
    return {
      contests: []
    }
  },
}
</script>

<style scoped>

</style>