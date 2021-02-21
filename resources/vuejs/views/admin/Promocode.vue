<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_promocode_list_title') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="promocode">
                      <thead>
                      <tr>
                        <th>{{ $i18n.t('admin_promocode_list_promocode') }}</th>
                        <th>{{ $i18n.t('admin_promocode_list_type') }}</th>
                        <th>{{ $i18n.t('admin_promocode_list_status') }}</th>
                        <th>{{ $i18n.t('admin_promocode_list_date') }}</th>
                      </tr>
                      </thead>
                    </table>
                  </div>
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
export default {
  name: "Promocode",
  mounted() {
    $('#promocode').DataTable();
  }
}
</script>

<style scoped>

</style>