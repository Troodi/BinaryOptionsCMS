<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_symbol_settings_title') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                      <tr>
                        <th>{{ $i18n.t('admin_symbol_settings_symbol') }}</th>
                        <th>{{ $i18n.t('admin_symbol_settings_broker') }}</th>
                        <th>{{ $i18n.t('admin_symbol_settings_fix') }} %</th>
                        <th>{{ $i18n.t('admin_symbol_settings_min') }} %</th>
                        <th>{{ $i18n.t('admin_symbol_settings_max') }} %</th>
                        <th>{{ $i18n.t('admin_symbol_settings_work_from') }}</th>
                        <th>{{ $i18n.t('admin_symbol_settings_work_to') }}</th>
                        <th>{{ $i18n.t('admin_symbol_settings_active') }}</th>
                        <th>{{ $i18n.t('admin_symbol_settings_action') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="symbol in symbols">
                        <td class="td-symbols"><input v-bind:disabled="ajax[symbol.id]" type="text" class="form-control" :id="'pair'+symbol.id" v-model="symbol.symbol" style="width: 130px;"></td>
                        <td class="td-symbols"><input v-bind:disabled="ajax[symbol.id]" type="text" class="form-control" :id="'broker'+symbol.id" v-model="symbol.broker" style="width: 130px;"></td>
                        <td class="td-symbols"><input v-bind:disabled="ajax[symbol.id]" type="number" class="form-control" :id="'fix'+symbol.id" v-model="symbol.fixed_percent"></td>
                        <td class="td-symbols"><input v-bind:disabled="ajax[symbol.id]" type="text" class="form-control" :id="'min'+symbol.id" v-model="symbol.min_percent"></td>
                        <td class="td-symbols"><input v-bind:disabled="ajax[symbol.id]" type="text" class="form-control" :id="'max'+symbol.id" v-model="symbol.max_percent"></td>
                        <td class="td-symbols"><input v-bind:disabled="ajax[symbol.id]" type="text" class="form-control" :id="'work_from'+symbol.id" v-model="symbol.work_from"></td>
                        <td class="td-symbols"><input v-bind:disabled="ajax[symbol.id]" type="text" class="form-control" :id="'work_to'+symbol.id" v-model="symbol.work_to"></td>
                        <td class="td-symbols">
                          <input v-show="ajax[symbol.id]" disabled="disabled" type="text" class="form-control">
                          <select2 v-show="!ajax[symbol.id]" style="width: 200px;" :id="'active'+symbol.id" v-model="symbol.status" :options="hiddens" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                        </td>
                        <td class="td-symbols">
                          <div style="width: 250px">
                            <button type="button" @click="save(symbol.id)" class="btn btn-outline-primary float-left" style="margin-right: 3px;width: 132px;" v-bind:disabled="ajax[symbol.id]" v-html="ajax[symbol.id] ? loading : $i18n.t('admin_symbol_settings_save')"></button>
                            <button type="button" @click="remove(symbol.id)" class="btn btn-outline-danger float-left" style="margin-left: 3px;width: 112px;" v-bind:disabled="ajax[symbol.id]" v-html="ajax[symbol.id] ? loading : $i18n.t('admin_symbol_settings_delete')"></button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="td-symbols"><input v-bind:disabled="create_ajax" v-model="pair" type="text" class="form-control" style="width: 130px;"></td>
                        <td class="td-symbols"><input v-bind:disabled="create_ajax" v-model="broker" type="text" class="form-control" style="width: 130px;"></td>
                        <td class="td-symbols"><input v-bind:disabled="create_ajax" v-model="fix" type="text" class="form-control"></td>
                        <td class="td-symbols"><input v-bind:disabled="create_ajax" v-model="min" type="text" class="form-control"></td>
                        <td class="td-symbols"><input v-bind:disabled="create_ajax" v-model="max" type="text" class="form-control"></td>
                        <td class="td-symbols"><input v-bind:disabled="create_ajax" v-model="work_from" type="text" class="form-control"></td>
                        <td class="td-symbols"><input v-bind:disabled="create_ajax" v-model="work_to" type="text" class="form-control"></td>
                        <td class="td-symbols">
                          <input v-show="create_ajax" disabled="disabled" type="text" class="form-control">
                          <select2 v-show="!create_ajax" style="width: 200px;" v-model="status" :options="hiddens" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                        </td>
                        <td class="td-symbols">
                          <div style="width: 250px">
                            <button v-bind:disabled="create_ajax" @click="create" type="button" class="btn btn-outline-success w-100" v-html="create_ajax ? loading : $i18n.t('admin_symbol_settings_create')"></button>
                          </div>
                        </td>
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
  name: "Symbol",
  mounted() {
    this.getSymbols();
  },
  methods: {
    save: function(id){
      this.$set(this.ajax, id, true);
      let pair = $('#pair'+id).val();
      let broker = $('#broker'+id).val();
      let fix = $('#fix'+id).val();
      let min = $('#min'+id).val();
      let max = $('#max'+id).val();
      let work_from = $('#work_from'+id).val();
      let work_to = $('#work_to'+id).val();
      let active = $('#active'+id).val();

      let obj = this.symbols.find(x => x.id === id);
      obj.symbol = pair;
      obj.broker = broker;
      obj.fixed_percent = fix;
      obj.min_percent = min;
      obj.max_percent = max;
      obj.work_from = work_from;
      obj.work_to = work_to;
      obj.status = active;

      let self = this;
      axios.post('/admin/data/symbol/save', {
        id: id,
        pair: pair,
        broker: broker,
        fix: fix,
        min: min,
        max: max,
        work_from: work_from,
        work_to: work_to,
        active: active,
      }).then((response) => {
        if(response.data.success === false) {
          toastr.error(response.data.message, self.$i18n.t('profile_error'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        } else {
          toastr.success(response.data.message, self.$i18n.t('profile_success'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        }
        self.getSymbol(id);
      }).finally(() => {
        self.$set(self.ajax, id, false);
      });
    },
    remove: function (id){
      let self = this;
      axios.post('/admin/data/symbol/remove', { id: id }).then((response) => {
        if(response.data.success === false) {
          toastr.error(response.data.message, self.$i18n.t('profile_error'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        } else {
          toastr.success(response.data.message, self.$i18n.t('profile_success'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
          self.symbols.splice(self.symbols.findIndex(x => x.id === id), 1);
          self.symbols.__ob__.dep.notify();
        }
      });
    },
    create: function (){
      this.create_ajax = true;
      let self = this;
      axios.post('/admin/data/symbol/create', {
        pair: self.pair,
        broker: self.broker,
        fix: self.fix,
        min: self.min,
        max: self.max,
        work_from: self.work_from,
        work_to: self.work_to,
        status: self.status,
        create_ajax: false,
      }).then((response) => {
        if(response.data.success === false) {
          toastr.error(response.data.message, self.$i18n.t('profile_error'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        } else {
          toastr.success(response.data.message, self.$i18n.t('profile_success'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
          self.pair = '';
          self.broker = '';
          self.fix = '';
          self.min = '';
          self.max = '';
          self.work_from = '';
          self.work_to = '';
          self.status = 0;
          self.symbols.push(response.data.created);
        }
      }).finally(()=>{
        this.create_ajax = false;
      });
    },
    getSymbols: function (){
      let self = this;
      axios.post('/admin/data/symbols')
          .then(function (response) {
            self.symbols = response.data;
          });
    },
    getSymbol: function (id){
      let self = this;
      axios.post('/admin/data/symbol', { id: id })
          .then(function (response) {
            let obj = self.symbols.find(x => x.id === id);
            obj.symbol = response.data.symbol;
            obj.broker = response.data.broker;
            obj.fixed_percent = response.data.fixed_percent;
            obj.min_percent = response.data.min_percent;
            obj.max_percent = response.data.max_percent;
            obj.work_from = response.data.work_from;
            obj.work_to = response.data.work_to;
            obj.status = response.data.status;
            self.symbols.__ob__.dep.notify();
          });
    }
  },
  data: function (){
    return {
      // Модели для создания
      pair: '',
      broker: '',
      fix: '',
      min: '',
      max: '',
      work_from: '',
      work_to: '',
      status: 0,
      create_ajax: false,
      //
      symbols: {},
      errors: [],
      success: [],
      system_text: this.$i18n.t('admin_symbol_settings_new'),
      system_order: 1,
      loading: '<span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>',
      ajax: [],
      hiddens: [
        { id: 0, text: this.$i18n.t('admin_symbol_settings_hidden') },
        { id: 1, text: this.$i18n.t('admin_symbol_settings_active_status') },
      ],
      defaultHidden: 0,
    }
  }
}
</script>

<style scoped>
  .td-symbols {
    padding: 3px !important;
  }
</style>