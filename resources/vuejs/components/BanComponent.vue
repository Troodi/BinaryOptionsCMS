<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">{{ $i18n.t('admin_control_block_user') }}</h4>
        </div>
        <div class="card-content">
          <div class="card-body">
            <div class="row">
              <div class="col-md-10">
                <fieldset class="form-group">
                  <label class="align-top">{{ $i18n.t('admin_control_action') }}</label>
                  <select2 v-model="banAction" :options="banActions" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                </fieldset>
              </div>
              <div class="col-md-2">
                <label class="align-top">&nbsp;</label>
                <button @click="banClick" type="button" class="btn btn-outline-primary w-100">{{ $i18n.t('admin_control_execute') }}</button>
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
  name: "BanComponent",
  props: ['options', 'url', 'load_url'],
  mounted() {
    this.loadBanInfo();
  },
  data: function (){
    return {
      banAction: this.current,
      banActions: this.options,
      link: this.url,
      getInfoUrl: this.load_url,
    }
  },
  methods: {
    banClick: function (){
      let self = this;
      axios.post(self.link, { action: self.banAction })
        .then(function (response) {
          if(response.data.success === true) {
            self.loadBanInfo();
            toastr.success(response.data.message, self.$i18n.t('profile_success'), {
              positionClass: 'toast-bottom-left',
              containerId: 'toast-bottom-left'
            });
          } else {
            toastr.error(response.data.message, self.$i18n.t('profile_error'), {
              positionClass: 'toast-bottom-left',
              containerId: 'toast-bottom-left'
            });
          }
        });
    },
    loadBanInfo: function (){
      let self = this;
      axios.post(self.getInfoUrl)
        .then(function (response) {
          if(response.data.banned !== null) {
            self.banAction = response.data.banned;
          } else {
            self.banAction = self.banActions[0].id;
          }
        });
    },
  }
}
</script>

<style scoped>

</style>