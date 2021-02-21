<template>
  <div class="content-wrapper">
    <div class="content-body">
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

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_control_verify_user') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <button v-bind:disabled="'profile' in info && info.profile.user_verify_at || !('profile' in info)" @click="verifyClick" type="button" class="btn btn-outline-success w-100">{{ $i18n.t('admin_control_verify_user_action') }}</button>
                  </div>
                  <div class="col-md-6">
                    <button v-bind:disabled="'profile' in info && !info.profile.user_verify_at || !('profile' in info)" @click="unVerifyClick" type="button" class="btn btn-outline-danger w-100">{{ $i18n.t('admin_control_take_off_verify') }}</button>
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
              <h4 class="card-title">{{ $i18n.t('admin_control_delete_user') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <button v-bind:disabled="'user' in info && !info.user.deleted_at || !('user' in info)" @click="banClick" type="button" class="btn btn-outline-info w-100">{{ $i18n.t('admin_control_delete_user') }}</button>
                  </div>
                  <div class="col-md-6">
                    <button v-bind:disabled="'user' in info && info.user.deleted_at || !('user' in info)" @click="banClick" type="button" class="btn btn-outline-light w-100">{{ $i18n.t('admin_control_restore_user') }}</button>
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
              <h4 class="card-title">{{ $i18n.t('admin_control_connect_partner') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <button v-bind:disabled="'user' in info && info.user.partner_status || !('user' in info)" @click="changePartner('approvePartner')" type="button" class="btn btn-outline-primary w-100">{{ $i18n.t('admin_control_make_partner') }}</button>
                  </div>
                  <div class="col-md-6">
                    <button v-bind:disabled="'user' in info && !info.user.partner_status || !('user' in info)" @click="changePartner('discardPartner')" type="button" class="btn btn-outline-warning w-100">{{ $i18n.t('admin_control_exclude_partner') }}</button>
                  </div>
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
  name: "Control",
  data: function (){
    let self = this;
    return {
      amount: 0,
      balanceAction: 2,
      balanceActions: [
        { id: "0", text: self.$i18n.t('admin_control_add_to_balance') },
        { id: "1", text: self.$i18n.t('admin_control_sub_from_balance') },
        { id: "2", text: self.$i18n.t('admin_control_set_balance') },
      ],
      banAction: 0,
      banActions: [
        { id: "0", text: self.$i18n.t('admin_control_unblocked') },
        { id: "1", text: self.$i18n.t('admin_control_ban_multi_account') },
        { id: "2", text: self.$i18n.t('admin_control_ban_inactive') },
        { id: "3", text: self.$i18n.t('admin_control_ban_rules') },
        { id: "4", text: self.$i18n.t('admin_control_ban_and_referrals') },
      ],
      info: {},
    }
  },
  mounted: function() {
    this.loadUserInfo();
  },
  methods: {
    verifyClick: function (){
      let self = this;
      axios.post('/admin/data/verifyAccount', { id: this.$route.params.id }).then((response) => {
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
        self.loadUserInfo();
      });
    },
    unVerifyClick: function (){
      let self = this;
      axios.post('/admin/data/unVerifyAccount', { id: this.$route.params.id }).then((response) => {
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
        self.loadUserInfo();
      });
    },
    changePartner: function(action){
      let self = this;
      axios.post('/admin/data/'+action, { id: self.userId })
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
    balanceClick: function (){
      let self = this;
      axios.post('/admin/data/changeBalance', {id: self.userId, balance: self.amount, action: self.balanceAction})
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
    banClick: function (){
      let self = this;
      axios.post('/admin/data/banAction', {id: self.userId, action: self.banAction})
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
      axios.post('/admin/data/getControlInfo', {id: self.userId})
          .then(function (response) {
            self.info = response.data;
            if(self.info.user.banned !== null) {
              self.banAction = self.info.user.banned;
            } else {
              self.banAction = 0;
            }
            self.amount = self.info.user.balance;
          });
    },
  },
  computed: {
    userId: function (){
      return this.$route.params.id;
    },
  },
}
</script>

<style scoped>

</style>