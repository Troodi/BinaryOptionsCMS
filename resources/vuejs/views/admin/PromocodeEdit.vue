<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">

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

          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ title }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="row">
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>ID</label>
                        <input v-model="promocodeId" disabled="disabled" type="text" class="form-control" placeholder="*">
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_code') }}</label>
                        <input v-model="code" type="text" class="form-control">
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_size') }}</label>
                        <b-form-input v-model="bonus_size" :id="'type-number4'" :type="'number'"></b-form-input>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_link') }}</label>
                        <input v-model="image" type="text" class="form-control">
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label class="align-top">{{ $i18n.t('admin_promocode_edit_public') }}</label>
                        <select2 v-model="value_public_options" :options="public_options" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_for_new') }}</label>
                        <select2 v-model="value_new_options" :options="new_options" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_tries') }}</label>
                        <b-form-input v-model="times" :id="'type-number3'" :type="'number'"></b-form-input>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label class="align-top">{{ $i18n.t('admin_promocode_edit_type') }}</label>
                        <select2 v-model="value_type_options" :options="type_options" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_turnover') }}</label>
                        <b-form-input v-model="turnover" :id="'type-number2'" :type="'number'"></b-form-input>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_min_amount') }}</label>
                        <b-form-input v-model="min_deposit" :id="'type-number1'" :type="'number'"></b-form-input>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_active_from') }}</label>
                        <b-form-datepicker v-model="from_date" id="example-datepicker" class="mb-2"></b-form-datepicker>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_active_to') }}</label>
                        <b-form-datepicker v-model="to_date" id="example-datepicker2" class="mb-2"></b-form-datepicker>
                      </fieldset>
                    </div>
                    <div class="col-md-12" v-for="locale in locales">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_desc') }} ({{ $i18n.t('admin_tournament_language_description') }}: {{ locale }})</label>
                        <textarea v-model="desc[locale]" type="text" class="form-control" style="width: 100%; height: 150px;"></textarea>
                      </fieldset>
                    </div>
                    <div class="col-md-12">
                      <button type="button" @click="savePromocode" class="btn btn-outline-primary float-right">{{ button_text }}</button>
                      <button type="button" @click="back" class="btn btn-outline-danger float-right mr-1">{{ $i18n.t('admin_promocode_edit_back') }}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "PromocodeEdit",
  mounted() {
    this.loadData();
  },
  data: function (){
    return {
      code: 'PROMOCODE',
      image: '/images/promocode_first.jpg',
      turnover: 30,
      times: 1,
      min_deposit: 10,
        desc: [],
      from_date: new Date(),
      to_date: new Date(),
      bonus_size: 10,
      value_public_options: 1,
      value_new_options: 0,
      value_type_options: 1,
      success: [],
      errors: [],
      public_options: [
        { id: 1, text: this.$i18n.t('admin_promocode_edit_public_code') },
        { id: 2, text: this.$i18n.t('admin_promocode_edit_promocode_in_deposit') },
      ],
      new_options: [
        { id: 0, text: this.$i18n.t('admin_promocode_edit_no') },
        { id: 1, text: this.$i18n.t('admin_promocode_edit_yes') },
      ],
      type_options: [
        { id: 1, text: this.$i18n.t('admin_promocode_edit_without_deposit') },
        { id: 2, text: this.$i18n.t('admin_promocode_edit_deposit') },
      ],
        locales: window.locales,
    }
  },
  computed: {
    promocodeId: function (){
      return this.$route.params.id == null ? null : this.$route.params.id;
    },
    title: function (){
      return this.$route.params.id == null ? this.$i18n.t('admin_promocode_edit_create') : this.$i18n.t('admin_promocode_edit_edit');
    },
    button_text: function (){
      return this.$route.params.id == null ? this.$i18n.t('admin_promocode_edit_create_button') : this.$i18n.t('admin_promocode_edit_save');
    },
  },
  methods: {
    back: function (){
      this.$router.push({ path: '/admin/promocodes' });
    },
    loadData: function(){
      let self = this;
      if(this.promocodeId != null) {
        axios.post('/admin/data/loadPromocode', {id: self.promocodeId})
            .then(function (response) {
              self.code = response.data.code;
              self.image = response.data.image;
              self.turnover = response.data.turnover;
              self.times = response.data.attempts;
              self.min_deposit = response.data.min_amount;
              self.desc = response.data.description;
              self.from_date = new Date(response.data.active_from);
              self.to_date = new Date(response.data.active_to);
              self.value_public_options = response.data.public_code;
              self.value_new_options = response.data.for_new;
              self.value_type_options = response.data.type;
              self.bonus_size = response.data.bonus_size;
            }).catch(function (error) {
        });
      }
    },
    savePromocode: function (){
      let self = this;
      self.success = [];
      self.errors = [];
      let url = this.promocodeId != null ? '/admin/data/savePromocode' : '/admin/data/createPromocode';
      axios.post(url, {
        id: self.promocodeId == null ? 0 : self.promocodeId,
        code: self.code,
        image: self.image,
        turnover: self.turnover,
        times: self.times,
        min_deposit: self.min_deposit,
          desc: { ...self.desc }, //desc: self.desc,
        from_date: self.from_date,
        to_date: self.to_date,
        value_public_options: self.value_public_options,
        value_new_options: self.value_new_options,
        value_type_options: self.value_type_options,
        bonus_size: self.bonus_size,
      })
          .then(function (response) {
            if(response.data.success === true) {
              if(self.promocodeId != null) {
                self.success.push(response.data.message);
                self.loadData();
              } else {
                toastr.success(response.data.message, self.$i18n.t('partner_success'), {
                  positionClass: 'toast-bottom-left',
                  containerId: 'toast-bottom-left'
                });
                self.$router.push({ path: '/admin/promocode/edit/'+response.data.data.id });
              }
            } else {

            }
          })
          .catch(function (error) {
            for (const [key, value] of Object.entries(error.response.data.errors)) {
              value.forEach(element => {
                self.errors.push(element);
              });
            }
          });
    }
  }
}
</script>

<style scoped>

</style>