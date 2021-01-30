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
              <h4 class="card-title">Управление торговыми символами (все котировки брать с tradingview.com)</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                      <tr>
                        <th>Пара</th>
                        <th>Брокер</th>
                        <th>Фикс %</th>
                        <th>Мин %</th>
                        <th>Макс %</th>
                        <th>Работает с</th>
                        <th>Работает до</th>
                        <th>Активен</th>
                        <th>Действие</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="symbol in symbols">
                        <td class="td-symbols"><input type="text" class="form-control" :value="symbol.symbol" style="width: 130px;"></td>
                        <td class="td-symbols"><input type="text" class="form-control" :value="symbol.broker" style="width: 130px;"></td>
                        <td class="td-symbols"><input type="number" class="form-control" :value="symbol.fixed_percent"></td>
                        <td class="td-symbols"><input type="text" class="form-control" :value="symbol.min_percent"></td>
                        <td class="td-symbols"><input type="text" class="form-control" :value="symbol.max_percent"></td>
                        <td class="td-symbols"><input type="text" class="form-control" :value="symbol.work_from"></td>
                        <td class="td-symbols"><input type="text" class="form-control" :value="symbol.work_to"></td>
                        <td class="td-symbols"><select2 style="width: 200px;" v-model="symbol.status" :options="hiddens" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/></td>
                        <td class="td-symbols">
                          <div style="width: 250px">
                          <button type="button" @click="save(symbol.id)" class="btn btn-outline-primary float-left" style="margin-right: 3px;width: 132px;">Сохранить</button>
                          <button type="button" @click="remove(symbol.id)" class="btn btn-outline-danger float-left" style="margin-left: 3px;width: 112px;">Удалить</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="td-symbols"><input type="text" class="form-control" style="width: 130px;"></td>
                        <td class="td-symbols"><input type="text" class="form-control" style="width: 130px;"></td>
                        <td class="td-symbols"><input type="text" class="form-control"></td>
                        <td class="td-symbols"><input type="text" class="form-control"></td>
                        <td class="td-symbols"><input type="text" class="form-control"></td>
                        <td class="td-symbols"><input type="text" class="form-control"></td>
                        <td class="td-symbols"><input type="text" class="form-control"></td>
                        <td class="td-symbols"><select2 style="width: 200px;" :options="hiddens" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/></td>
                        <td class="td-symbols">
                          <div style="width: 250px">
                            <button type="button" class="btn btn-outline-success w-100">Создать</button>
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
      this.errors = [];
      this.success = [];
      let newId = $('#id'+id).val();
      let system = $('#system'+id).val();
      let order = $('#order'+id).val();
      let active = $('#active'+id).val();
      let self = this;
      axios.post('/admin/data/symbol/save', { id: id, newId: newId, system: system, order: order, active: active}).then((response) => {
        if(response.data.success === false) {
          self.errors = [];
          self.success.push(response.data.message);
        } else {
          self.errors = [];
          self.success.push(response.data.message);
        }
        $('html, body').animate({scrollTop : 0}, 1000);
        self.getSystems();
      });
    },
    remove: function (id){
      this.errors = [];
      this.success = [];
      let self = this;
      axios.post('/admin/data/symbol/remove', { id: id }).then((response) => {
        if(response.data.success === false) {
          self.errors = [];
          self.success.push(response.data.message);
        } else {
          self.errors = [];
          self.success.push(response.data.message);
        }
        $('html, body').animate({scrollTop : 0}, 1000);
        self.getSystems();
      });
    },
    create: function (){
      this.errors = [];
      this.success = [];
      let self = this;
      axios.post('/admin/data/symbol/create', { system: self.system_text, order: self.system_order, active: self.defaultHidden }).then((response) => {
        if(response.data.success === false) {
          self.errors = [];
          self.success.push(response.data.message);
        } else {
          self.errors = [];
          self.success.push(response.data.message);
        }
        $('html, body').animate({scrollTop : 0}, 1000);
        self.getSystems();
      });
    },
    getSymbols: function (){
      let self = this;
      axios.post('/admin/data/symbols')
          .then(function (response) {
            self.symbols = response.data;
          });
    },
  },
  data: function (){
    return {
      symbols: {},
      errors: [],
      success: [],
      system_text: 'Новая система',
      system_order: 1,
      hiddens: [
        { id: 0, text: 'Скрыт' },
        { id: 1, text: 'Активен' },
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