<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Добавление новой торговой пары</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-2">
                    <label><small><i>{{ $i18n.t('admin_symbol_settings_symbol') }}</i></small></label>
                    <input v-bind:disabled="create_ajax" type="text" class="form-control w-100" :id="'create_pair'" v-model="pair">
                  </div>
                  <div class="col-md-2">
                    <label><small><i>{{ $i18n.t('admin_symbol_settings_broker') }}</i></small></label>
                    <input v-bind:disabled="create_ajax" type="text" class="form-control w-100" :id="'create_broker'" v-model="broker">
                  </div>
                  <div class="col-md-2">
                    <label><small><i>{{ $i18n.t('admin_symbol_settings_fix') }} %</i></small></label>
                    <input v-show="create_ajax" disabled="disabled" type="text" class="form-control">
                    <select2 v-show="!create_ajax" style="width: 100%" :id="'create_fix'" v-model="fix" :options="percents_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                  </div>
                  <div class="col-md-2">
                    <label><small><i>{{ $i18n.t('admin_symbol_settings_min') }} %</i></small></label>
                    <input v-show="create_ajax" disabled="disabled" type="text" class="form-control">
                    <select2 v-show="!create_ajax" style="width: 100%" :id="'create_min'" v-model="min" :options="percents_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                  </div>
                  <div class="col-md-2">
                    <label><small><i>{{ $i18n.t('admin_symbol_settings_max') }} %</i></small></label>
                    <input v-show="create_ajax" disabled="disabled" type="text" class="form-control">
                    <select2 v-show="!create_ajax" style="width: 100%" :id="'create_max'" v-model="max" :options="percents_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                  </div>
                  <div class="col-md-2">
                    <label><small><i>{{ $i18n.t('admin_symbol_settings_work_from') }}</i></small></label>
                    <input v-show="create_ajax" disabled="disabled" type="text" class="form-control">
                    <select2 v-show="!create_ajax" style="width: 100%" :id="'create_from'" v-model="work_from" :options="time_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                  </div>
                </div>
                <div class="row" style="margin-top: 5px;">
                  <div class="col-md-2">
                    <label><small><i>{{ $i18n.t('admin_symbol_settings_work_to') }}</i></small></label>
                    <input v-show="create_ajax" disabled="disabled" type="text" class="form-control">
                    <select2 v-show="!create_ajax" style="width: 100%" :id="'create_to'" v-model="work_to" :options="time_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                  </div>

                  <div class="col-md-2">
                    <label><small><i>Минимальная экспирация в сек</i></small></label>
                    <b-form-input v-bind:disabled="create_ajax" :id="'create_min_exp'" :type="'number'" min=5 v-model="min_expiration_time"></b-form-input>
                  </div>

                  <div class="col-md-2">
                    <label><small><i>Мин % для тех анализа</i></small></label>
                    <input v-show="create_ajax" disabled="disabled" type="text" class="form-control">
                    <select2 v-show="!create_ajax" style="width: 100%" :id="'create_tech'" v-model="min_percent_tech" :options="resistance_options" :settings="{ settingOption: 'value', settingOption: 'value'}"/>
                  </div>

                  <div class="col-md-2">
                    <label><small><i>Мин % для новостей</i></small></label>
                    <input v-show="create_ajax" disabled="disabled" type="text" class="form-control">
                    <select2 v-show="!create_ajax" style="width: 100%" :id="'create_news'" v-model="min_percent_news" :options="resistance_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                  </div>

                  <div class="col-md-2">
                    <label><small><i>Мин % для юзера</i></small></label>
                    <input v-show="create_ajax" disabled="disabled" type="text" class="form-control">
                    <select2 v-show="!create_ajax" style="width: 100%" :id="'create_user'" v-model="min_percent_user" :options="resistance_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                  </div>

                  <div class="col-md-2">
                    <label><small><i>{{ $i18n.t('admin_symbol_settings_active') }}</i></small></label>
                    <input v-show="create_ajax" disabled="disabled" type="text" class="form-control">
                    <select2 v-show="!create_ajax" style="width: 100%" :id="'create_status'" v-model="status" :options="hiddens" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                  </div>
                  <div class="col-md-12 mt-2">
                    <button v-bind:disabled="create_ajax" @click="create" type="button" class="btn btn-outline-success w-100" v-html="create_ajax ? loading : $i18n.t('admin_symbol_settings_create')"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_symbol_settings_title') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div v-for="(symbol, index) in paginate">
                  <div class="row">
                    <div class="col-md-2">
                      <label><small><i>{{ $i18n.t('admin_symbol_settings_symbol') }}</i></small></label>
                      <input v-bind:disabled="true" type="text" class="form-control w-100" :id="'pair'+symbol.symbol" v-model="symbol.first_symbol + '/' + symbol.second_symbol">
                    </div>
                    <div class="col-md-2">
                      <label><small><i>{{ $i18n.t('admin_symbol_settings_broker') }}</i></small></label>
                      <input v-bind:disabled="true" type="text" class="form-control w-100" :id="'broker'+symbol.symbol" v-model="symbol.broker">
                    </div>
                    <div class="col-md-2">
                      <label><small><i>{{ $i18n.t('admin_symbol_settings_fix') }} %</i></small></label>
                      <input v-show="ajax[symbol.symbol]" disabled="disabled" type="text" class="form-control">
                      <select2 v-show="!ajax[symbol.symbol]" style="width: 100%" :id="'fix'+symbol.symbol" v-model="symbol.fixed_percent" :options="percents_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                    </div>
                    <div class="col-md-2">
                      <label><small><i>{{ $i18n.t('admin_symbol_settings_min') }} %</i></small></label>
                      <input v-show="ajax[symbol.symbol]" disabled="disabled" type="text" class="form-control">
                      <select2 v-show="!ajax[symbol.symbol]" style="width: 100%" :id="'min'+symbol.symbol" v-model="symbol.min_percent" :options="percents_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                    </div>
                    <div class="col-md-2">
                      <label><small><i>{{ $i18n.t('admin_symbol_settings_max') }} %</i></small></label>
                      <input v-show="ajax[symbol.symbol]" disabled="disabled" type="text" class="form-control">
                      <select2 v-show="!ajax[symbol.symbol]" style="width: 100%" :id="'max'+symbol.symbol" v-model="symbol.max_percent" :options="percents_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                    </div>
                    <div class="col-md-2">
                      <label><small><i>{{ $i18n.t('admin_symbol_settings_work_from') }}</i></small></label>
                      <input v-show="ajax[symbol.symbol]" disabled="disabled" type="text" class="form-control">
                      <select2 v-show="!ajax[symbol.symbol]" style="width: 100%" :id="'from'+symbol.symbol" v-model="symbol.work_from" :options="time_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                    </div>
                  </div>
                  <div class="row" style="margin-top: 5px;">
                    <div class="col-md-2">
                      <label><small><i>{{ $i18n.t('admin_symbol_settings_work_to') }}</i></small></label>
                      <input v-show="ajax[symbol.symbol]" disabled="disabled" type="text" class="form-control">
                      <select2 v-show="!ajax[symbol.symbol]" style="width: 100%" :id="'to'+symbol.symbol" v-model="symbol.work_to" :options="time_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                    </div>

                    <div class="col-md-2">
                      <label><small><i>Минимальная экспирация в сек</i></small></label>
                      <b-form-input v-bind:disabled="ajax[symbol.symbol]" :id="'min_exp'+symbol.symbol" :type="'number'" min=5 v-model="symbol.min_expiration_time"></b-form-input>
                    </div>

                    <div class="col-md-2">
                      <label><small><i>Мин % для тех анализа</i></small></label>
                      <input v-show="ajax[symbol.symbol]" disabled="disabled" type="text" class="form-control">
                      <select2 v-show="!ajax[symbol.symbol]" style="width: 100%" :id="'tech'+symbol.symbol" v-model="symbol.min_percent_tech" :options="resistance_options" :settings="{ settingOption: 'value', settingOption: 'value'}"/>
                    </div>

                    <div class="col-md-2">
                      <label><small><i>Мин % для новостей</i></small></label>
                      <input v-show="ajax[symbol.symbol]" disabled="disabled" type="text" class="form-control">
                      <select2 v-show="!ajax[symbol.symbol]" style="width: 100%" :id="'news'+symbol.symbol" v-model="symbol.min_percent_news" :options="resistance_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                    </div>

                    <div class="col-md-2">
                      <label><small><i>Мин % для юзера</i></small></label>
                      <input v-show="ajax[symbol.symbol]" disabled="disabled" type="text" class="form-control">
                      <select2 v-show="!ajax[symbol.symbol]" style="width: 100%" :id="'user'+symbol.symbol" v-model="symbol.min_percent_user" :options="resistance_options" :settings="{ settingOption: 'value', settingOption: 'value' }"/>
                    </div>

                    <div class="col-md-2">
                      <label><small><i>{{ $i18n.t('admin_symbol_settings_active') }}</i></small></label>
                      <input v-show="ajax[symbol.symbol]" disabled="disabled" type="text" class="form-control">
                      <select2 v-show="!ajax[symbol.symbol]" style="width: 100%" :id="'active'+symbol.symbol" v-model="symbol.status" :options="hiddens" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                    </div>
                    <div class="col-md-6">
                      <button type="button" @click="save(symbol)" class="btn btn-outline-primary w-100 mt-1" style="margin-right: 3px;width: 132px;" v-bind:disabled="ajax[symbol.symbol]" v-html="ajax[symbol.symbol] ? loading : $i18n.t('admin_symbol_settings_save')"></button>
                    </div>
                    <div class="col-md-6">
                      <button type="button" @click="remove(symbol)" class="btn btn-outline-danger w-100 mt-1" style="margin-left: 3px;width: 112px;" v-bind:disabled="ajax[symbol.symbol]" v-html="ajax[symbol.symbol] ? loading : $i18n.t('admin_symbol_settings_delete')"></button>
                    </div>
                  </div>
                  <hr v-show="index % (itemsPerPage-1) !== 0 || index === 0">
                </div>
                <div class="row">
                  <div class="table-responsive">
                    <nav class="mt-2">
                      <ul class="pagination justify-content-center">
                        <template v-for="pageNumber in totalPages" v-if="Math.abs(pageNumber - currentPage) < maxPages || pageNumber === totalPages || pageNumber === 1">
                          <li class="page-item" v-if="pageNumber === totalPages && Math.abs(pageNumber - currentPage) > maxPages">
                            <a style="cursor: not-allowed;" class="page-link">...</a>
                          </li>

                          <li class="page-item" :class="{active: currentPage === pageNumber}">
                            <a style="cursor: pointer;" class="page-link" v-bind:key="pageNumber" @click="setPage(pageNumber)">{{ pageNumber }}</a>
                          </li>

                          <li class="page-item" v-if="pageNumber === 1 && Math.abs(pageNumber - currentPage) > maxPages">
                            <a style="cursor: not-allowed;" class="page-link">...</a>
                          </li>
                        </template>
                      </ul>
                    </nav>
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
    for(let i=0; i<24; i++){
      this.time_options.push({ id: i, text: i.toString()});
    }
    for(let i=1; i<101; i++){
      this.percents_options.push({ id: i, text: i.toString()});
    }
    this.resistance_options.push({ id: 0, text: 'Отключено'});
    for(let i=1; i<101; i++){
      this.resistance_options.push({ id: i, text: i.toString()});
    }
  },
  methods: {
    setPage: function(pageNumber) {
      this.currentPage = pageNumber
    },
    save: function(symbolObject){
      this.$set(this.ajax, symbolObject.symbol, true);
      let obj = this.symbols.find(x => x.symbol === symbolObject.symbol);
      let self = this;
      axios.post('/admin/data/symbol/save', {
        pair: obj.symbol,
        broker: obj.broker,
        fix: obj.fixed_percent,
        min: obj.min_percent ,
        max: obj.max_percent,
        work_from: obj.work_from,
        work_to: obj.work_to,
        active: obj.status,
        min_expiration_time: obj.min_expiration_time,
        min_percent_tech: obj.min_percent_tech,
        min_percent_news: obj.min_percent_news,
        min_percent_user: obj.min_percent_user,
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
        self.$set(self.ajax, symbolObject.symbol, false);
      });
    },
    remove: function (symbolObject){
      let self = this;
      axios.post('/admin/data/symbol/remove', { id: symbolObject.symbol }).then((response) => {
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
          self.symbols.splice(self.symbols.findIndex(x => x.symbol === symbolObject.symbol), 1);
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
        min_expiration_time: self.min_expiration_time,
        min_percent_tech: self.min_percent_tech,
        min_percent_news: self.min_percent_news,
        min_percent_user: self.min_percent_user,
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
          self.currentPage = self.totalPages;
          window.scrollTo(0,document.body.scrollHeight);
          self.pair = 'EUR/USD';
          self.broker = 'FX';
          self.fix = 75;
          self.min = 65;
          self.max = 85;
          self.work_from = 1;
          self.work_to = 23;
          self.status = 0;
          self.min_expiration_time = 30;
          self.min_percent_tech = 0;
          self.min_percent_news = 0;
          self.min_percent_user = 0;
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
    getSymbol: function (symbolObject){
      let self = this;
      axios.post('/admin/data/symbol', { id: symbolObject.symbol })
          .then(function (response) {
            let obj = self.symbols.find(x => x.symbol === symbolObject.symbol);
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
  computed: {
    totalPages: function() {
      return Math.ceil(this.resultCount / this.itemsPerPage)
    },
    paginate: function() {
      if (this.symbols.length === undefined || this.symbols.length < 1) {
        return
      }
      this.resultCount = this.symbols.length
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages
      }
      let index = this.currentPage * this.itemsPerPage - this.itemsPerPage
      return this.symbols.slice(index, index + this.itemsPerPage)
    }
  },
  data: function (){
    return {
      maxPages: 3,
      currentPage: 1,
      itemsPerPage: 10,
      resultCount: 0,
      // Модели для создания
      pair: 'EUR/USD',
      broker: 'FX',
      fix: 75,
      min: 65,
      max: 85,
      work_from: 1,
      work_to: 23,
      status: 0,
      min_expiration_time: 30,
      min_percent_tech: 0,
      min_percent_news: 0,
      min_percent_user: 0,
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
      min_percent_tech_options: [
        { id: 0, text: 'Отключено' },
      ],
      min_percent_news_options: [
        { id: 0, text: 'Отключено' },
      ],
      min_percent_user_options: [
        { id: 0, text: 'Отключено' },
      ],
      time_options: [],
      percents_options: [],
      resistance_options: [],
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