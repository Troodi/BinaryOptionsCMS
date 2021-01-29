<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Основные настройки</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div v-for="(setting, index) in settings" :key="setting.value" class="col-md-6">
                    <fieldset class="form-group">
                      <label>{{ $i18n.t('settings_'+index) }}</label>
                      <input type="text" class="form-control" v-model="setting.value">
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Настройки платежных систем для пополнения</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Настройки платежных систем для выплат</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  mounted() {
    let self = this;
    axios.post('/admin/data/settings')
        .then(function (response) {
          self.settings = response.data;
          console.log(self.settings);
        });
  },
  data: function (){
    return {
      settings: {},
    }
  }
}
</script>

<style scoped>

</style>