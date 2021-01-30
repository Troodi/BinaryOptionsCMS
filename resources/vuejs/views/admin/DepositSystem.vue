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
              <h4 class="card-title">Управление платежными системами для пополнения (удаление, изменение id, добавление - может сломать пополнения)</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                      <tr>
                        <th>ID (не стоит менять)</th>
                        <th>Система</th>
                        <th>Порядок</th>
                        <th>Активность</th>
                        <th>Действие</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="system in systems">
                          <td><input type="text" class="form-control" :id="'id'+system.id" :value="system.id"></td>
                          <td><input type="text" class="form-control" :id="'system'+system.id" :value="system.text"></td>
                          <td><input type="text" class="form-control" :id="'order'+system.id" :value="system.order"></td>
                          <td><select2 v-model="system.hidden" :id="'active'+system.id" :options="hiddens" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/></td>
                          <td>
                            <button type="button" @click="save(system.id)" class="btn btn-outline-primary">Сохранить</button>
                            <button type="button" @click="remove(system.id)" class="btn btn-outline-danger">Удалить</button>
                          </td>
                      </tr>
                      <tr>
                        <td><input disabled type="text" class="form-control"></td>
                        <td><input type="text" v-model="system_text" class="form-control"></td>
                        <td><input type="text" v-model="system_order" class="form-control"></td>
                        <td><select2 v-model="defaultHidden" :options="hiddens" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/></td>
                        <td><button @click="create" type="button" class="btn btn-outline-success">Создать</button></td>
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
    save: function(id){
      this.errors = [];
      this.success = [];
      let newId = $('#id'+id).val();
      let system = $('#system'+id).val();
      let order = $('#order'+id).val();
      let active = $('#active'+id).val();
      let self = this;
      axios.post('/admin/data/deposit/systems/save', { id: id, newId: newId, system: system, order: order, active: active}).then((response) => {
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
      axios.post('/admin/data/deposit/systems/remove', { id: id }).then((response) => {
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
      axios.post('/admin/data/deposit/systems/create', { system: self.system_text, order: self.system_order, active: self.defaultHidden }).then((response) => {
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
      system_text: 'Новая система',
      system_order: 1,
      hiddens: [
        { id: "0", text: 'Скрыта' },
        { id: "1", text: 'Активна' },
      ],
      defaultHidden: 0,
    }
  }
}
</script>

<style scoped>

</style>