<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">{{ $i18n.t('admin_control_balance') }}</h4>
        </div>
        <div class="card-content">
          <div class="card-body">
            <div class="row">
              <div class="col-md-5">
                <fieldset class="form-group">
                  <label>{{ $i18n.t('admin_control_amount') }}</label>
                  <input type="text" class="form-control" v-model="amount">
                </fieldset>
              </div>
              <div class="col-md-5">
                <fieldset class="form-group">
                  <label class="align-top">{{ $i18n.t('admin_control_action') }}</label>
                  <select2 v-model="balanceAction" :options="balanceActions" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                </fieldset>
              </div>
              <div class="col-md-2">
                <label class="align-top">&nbsp;</label>
                <button  @click="balanceClick" type="button" class="btn btn-outline-primary w-100">{{ $i18n.t('admin_control_execute') }}</button>
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
  name: "UserBalanceControl",
  props: ['save_url', 'load_url'],
  mounted: function() {
    this.loadUserInfo();
  },
  data: function (){
    return {
      urlSave: this.save_url,
      urlLoad: this.load_url,
      amount: 0,
      balanceAction: 2,
      balanceActions: [
        { id: "0", text: this.$i18n.t('admin_control_add_to_balance') },
        { id: "1", text: this.$i18n.t('admin_control_sub_from_balance') },
        { id: "2", text: this.$i18n.t('admin_control_set_balance') },
      ],
      info: {},
    }
  },
  methods: {
    balanceClick: function (){
      let self = this;
      axios.post(self.urlSave, { balance: self.amount, action: self.balanceAction })
        .then(function (response) {
          self.loadUserInfo();
          if(response.data.success === true) {
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
    loadUserInfo: function (){
      let self = this;
      axios.post(self.urlLoad)
        .then(function (response) {
          self.amount = response.data.balance;
        });
    },
  }

}
</script>

<style scoped>

</style>