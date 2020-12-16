<template>
  <div class="content-wrapper">
    <div class="content-body">
      <section class="row">
        <div class="col-12">
          <div class="card bg-transparent shadow-none">
            <div class="card-content">
              <div class="card-body text-center bg-transparent miscellaneous">
                <h1 class="error-title">{{ $i18n.t('404_not_found') }} :(</h1>
                <p class="pb-3">
                  {{ $i18n.t('404_cant_find') }}
                </p>
                <p><img class="img-fluid" src="/images/pages/404.png" alt="404 error"></p>
                <router-link to="/trading" class="btn btn-primary round glow mt-3">{{ $i18n.t('404_back_to_trade') }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
name: "PageNotFound"
}
</script>

<style scoped>

</style>