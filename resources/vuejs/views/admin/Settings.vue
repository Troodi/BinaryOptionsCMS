<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div v-for="value in settingsErrors" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div class="d-flex align-items-center">
          <i class="bx bx-error"></i>
          <span>
            {{ value }}
          </span>
        </div>
      </div>

      <div v-for="value in settingsSuccess" class="alert bg-rgba-success alert-dismissible mb-2" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div class="d-flex align-items-center">
          <i class="bx bx-error"></i>
          <span>
            {{ value }}
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Основные настройки</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <form id="settingsForm">
                  <div class="row">
                    <div v-for="(setting, index) in settings" class="col-md-6">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('settings_'+index) }}</label>
                        <input type="text" class="form-control" :name="index" :value="setting.value">
                      </fieldset>
                    </div>
                    <div class="col-md-12">
                      <button type="button" @click="save" class="btn btn-outline-primary float-right">Сохранить настройки</button>
                    </div>
                  </div>
                </form>
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
    this.getSettings();
  },
  data: function (){
    return {
      settingsErrors: [],
      settingsSuccess: [],
      settings: {},
      allInputs: []
    }
  },
  methods: {
    getSettings: function (){
      let self = this;
      axios.post('/admin/data/settings')
          .then(function (response) {
            self.settings = response.data;
          });
    },
    save: function (){
      this.settingsErrors = [];
      this.settingsSuccess = [];
      let serialized = $('#settingsForm').serialize();
      let self = this;
      axios.post('/admin/data/settings/save', { data: serialized }).then((response) => {
        if(response.data.success === false) {
          self.settingsErrors = [];
          self.settingsErrors.push(response.data.message);
        } else {
          self.settingsSuccess = [];
          self.settingsSuccess.push(response.data.message);
        }
        $('html, body').animate({scrollTop : 0},1000);
        self.getSettings();
      });
    }
  }
}
</script>

<style scoped>

</style>