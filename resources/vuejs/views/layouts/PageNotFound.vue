<template>
  <div class="content-wrapper">
    <div class="content-body">
      <section class="row">
        <div class="col-12">
          <div class="card bg-transparent shadow-none">
            <div class="card-content">
              <div class="card-body text-center bg-transparent miscellaneous">
                <h1 class="error-title">Страница не найдена :(</h1>
                <p class="pb-3">
                  Мы не смогли найти страницу, возможно она улетела на Марс
                </p>
                <p><img class="img-fluid" src="/images/pages/404.png" alt="404 error"></p>
                <router-link to="/trading" class="btn btn-primary round glow mt-3">Вернуться к торговле</router-link>
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