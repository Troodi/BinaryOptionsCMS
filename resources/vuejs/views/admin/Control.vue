<template>
  <div class="content-wrapper">
    <div class="content-body">
      <UserBalanceControl :save_url="'/admin/data/changeBalance/'+userId" :load_url="'/admin/data/getControlInfo/'+userId"></UserBalanceControl>
      <BanComponent :options="banActions" :url="'/admin/data/banAction/' + userId" :load_url="'/admin/data/getUserBan/' + userId"></BanComponent>

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
                    <button v-bind:disabled="'user' in info && !info.user.deleted_at || !('user' in info)" type="button" class="btn btn-outline-info w-100">{{ $i18n.t('admin_control_delete_user') }}</button>
                  </div>
                  <div class="col-md-6">
                    <button v-bind:disabled="'user' in info && info.user.deleted_at || !('user' in info)" type="button" class="btn btn-outline-light w-100">{{ $i18n.t('admin_control_restore_user') }}</button>
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
import UserBalanceControl from "../../components/UserBalanceControl";
import BanComponent from "../../components/BanComponent";

export default {
  name: "Control",
  components: {BanComponent, UserBalanceControl: UserBalanceControl },
  data: function (){
    let self = this;
    return {
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
    loadUserInfo: function (){
      let self = this;
      axios.post('/admin/data/getControlInfo/' + self.userId)
          .then(function (response) {
            self.info = response.data;
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