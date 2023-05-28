<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div v-for="value in errors" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
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

      <div v-for="value in success" class="alert bg-rgba-success alert-dismissible mb-2" role="alert">
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
              <h4 class="card-title">{{ $i18n.t('admin_deposit_settings_title') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="table-responsive">
                    <table class="table" style="width:100%">
                      <thead>
                      <tr>
                        <th>{{ $i18n.t('admin_deposit_settings_description') }}</th>
                        <th>{{ $i18n.t('admin_deposit_settings_system') }}</th>
                        <th>{{ $i18n.t('admin_deposit_settings_order') }}</th>
                        <th>{{ $i18n.t('admin_deposit_settings_active') }}</th>
                        <th>{{ $i18n.t('admin_deposit_settings_action') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="system in systems">
                          <td><input type="text" class="form-control" :id="'description'+system.text.replace(/[^a-zA-Z0-9]/g, '')" :value="system.description"></td>
                          <td><input type="text" class="form-control" :id="'text'+system.text.replace(/[^a-zA-Z0-9]/g, '')" :value="system.text"></td>
                          <td><input type="text" class="form-control" :id="'order'+system.text.replace(/[^a-zA-Z0-9]/g, '')" :value="system.order"></td>
                          <td><select2 v-model="system.hidden" :id="'hidden'+system.text.replace(/[^a-zA-Z0-9]/g, '')" :options="hiddens" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/></td>
                          <td>
                            <button type="button" @click="save(system)" class="btn btn-outline-primary">{{ $i18n.t('admin_deposit_settings_save') }}</button>
                            <button type="button" @click="remove(system.text)" class="btn btn-outline-danger">{{ $i18n.t('admin_deposit_settings_delete') }}</button>
                          </td>
                      </tr>
                      <tr>
                        <td><input type="text" v-model="system_description" class="form-control"></td>
                        <td><input type="text" v-model="system_text" class="form-control"></td>
                        <td><input type="text" v-model="system_order" class="form-control"></td>
                        <td><select2 v-model="defaultHidden" :options="hiddens" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/></td>
                        <td><button @click="create" type="button" class="btn btn-outline-success">{{ $i18n.t('admin_deposit_settings_create') }}</button></td>
                      </tr>
                      </tbody>
                    </table>
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
  name: "DepositSystem",
  mounted() {
    this.getSystems();
  },
  methods: {
    save: function(systemObject){
      let system = $('#text'+systemObject.text.replace(/[^a-zA-Z0-9]/g, '')).val();
      let order = $('#order'+systemObject.text.replace(/[^a-zA-Z0-9]/g, '')).val();
      let active = $('#hidden'+systemObject.text.replace(/[^a-zA-Z0-9]/g, '')).val();
      let description = $('#description'+systemObject.text.replace(/[^a-zA-Z0-9]/g, '')).val();
      this.errors = [];
      this.success = [];
      let self = this;
      axios.post('/admin/data/deposit/systems/save', { prevText: systemObject.text, text: system, order: order, active: active, description: description }).then((response) => {
        if(response.data.success === false) {
          self.errors = [];
          self.errors.push(response.data.message);
        } else {
          self.success = [];
          self.success.push(response.data.message);
        }
        $('html, body').animate({scrollTop : 0}, 1000);
        self.getSystems();
      }).catch(function(error){
        Object.values(error.response.data.errors).forEach(function callback(currentValue, index, array) {
          currentValue.forEach(function callback(currentValueText, indexText, arrayText) {
            toastr.error(currentValueText, self.$i18n.t('profile_error'), {
              positionClass: 'toast-bottom-left',
              containerId: 'toast-bottom-left'
            });
          });
        });
      });
    },
    remove: function (system){
      this.errors = [];
      this.success = [];
      console.log(system);
      let self = this;
      axios.post('/admin/data/deposit/systems/remove', { text: system}).then((response) => {
        if(response.data.success === false) {
          self.errors = [];
          self.errors.push(response.data.message);
        } else {
          self.success = [];
          self.success.push(response.data.message);
        }
        $('html, body').animate({scrollTop : 0}, 1000);
        self.getSystems();
      }).catch(function(error){
        console.log(error.response.data.errors);
        Object.values(error.response.data.errors).forEach(function callback(currentValue, index, array) {
          currentValue.forEach(function callback(currentValueText, indexText, arrayText) {
            toastr.error(currentValueText, self.$i18n.t('profile_error'), {
              positionClass: 'toast-bottom-left',
              containerId: 'toast-bottom-left'
            });
          });
        });
      });
    },
    create: function (){
      this.errors = [];
      this.success = [];
      let self = this;
      axios.post('/admin/data/deposit/systems/create', {
        system: self.system_text,
        order: self.system_order,
        active: self.defaultHidden,
        description: self.system_description
      }).then((response) => {
        if(response.data.success === false) {
          self.errors = [];
          self.errors.push(response.data.message);
        } else {
          self.success = [];
          self.success.push(response.data.message);
        }
        $('html, body').animate({scrollTop : 0}, 1000);
        self.getSystems();
      }).catch(function(error){
        console.log(error.response.data.errors);
        Object.values(error.response.data.errors).forEach(function callback(currentValue, index, array) {
          currentValue.forEach(function callback(currentValueText, indexText, arrayText) {
            toastr.error(currentValueText, self.$i18n.t('profile_error'), {
              positionClass: 'toast-bottom-left',
              containerId: 'toast-bottom-left'
            });
          });
        });
      });
    },
    getSystems: function (){
      let self = this;
      axios.post('/admin/data/deposit/systems')
          .then(function (response) {
            self.systems = response.data;
          });
    },
  },
  data: function (){
    return {
      systems: {},
      errors: [],
      success: [],
      system_text: this.$i18n.t('admin_deposit_settings_new_system'),
      system_order: 1,
      system_description: this.$i18n.t('admin_deposit_settings_description'),
      hiddens: [
        { id: "0", text: this.$i18n.t('admin_deposit_settings_active_status') },
        { id: "1", text: this.$i18n.t('admin_deposit_settings_hidden') },
      ],
      defaultHidden: 0,
    }
  }
}
</script>

<style scoped>

</style>
