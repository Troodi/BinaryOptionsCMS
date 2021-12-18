<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_promocode_list_title') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="promocode" style="width:100%">
                      <thead>
                      <tr>
                        <th>ID</th>
                        <th>{{ $i18n.t('admin_promocode_list_promocode') }}</th>
                        <th>{{ $i18n.t('admin_promocode_list_amount') }}</th>
                        <th>{{ $i18n.t('admin_promocode_list_type') }}</th>
                        <th>{{ $i18n.t('admin_promocode_list_status') }}</th>
                        <th>{{ $i18n.t('admin_promocode_list_turnover') }}</th>
                        <th>{{ $i18n.t('admin_promocode_list_public') }}</th>
                        <th>{{ $i18n.t('admin_promocode_list_used') }}</th>
                        <th>{{ $i18n.t('admin_promocode_list_action') }}</th>
                      </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_promocode_list_create_new') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <router-link to="/admin/promocode/create" v-slot="{href, route, navigate}">
                    <b-button :href="href" @click="navigate" variant="outline-primary" :class="'w-100'">{{ $i18n.t('admin_promocode_list_create_new_button') }}</b-button>
                  </router-link>
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
import {getCookie} from "../../js/functions";
import dateformat from "dateformat";

export default {
  name: "Promocode",
  mounted() {
    this.initDT();
  },
  methods: {
    initDT: function (){
      $("#promocode").dataTable().fnDestroy();
      let self = this;
      $('#promocode').DataTable({
        "iDisplayLength": 25,
        "processing": true,
        "serverSide": true,
        "drawCallback": function() {
          $('.router-push').on('click', function (){
            let url = $(this).attr('data-url');
            self.$router.push({ path: url });
            return false;
          });
          $('.router-del').on('click', function (){
            let id = $(this).attr('data-del');
            axios.post('/admin/data/removePromocode', { id: id })
                .then(function (response) {
                  self.initDT();
                  if(response.data.success === true) {
                    toastr.success(response.data.message, self.$i18n.t('partner_success'), {
                      positionClass: 'toast-bottom-left',
                      containerId: 'toast-bottom-left'
                    });
                  } else {
                    toastr.error(response.data.message, self.$i18n.t('partner_error'), {
                      positionClass: 'toast-bottom-left',
                      containerId: 'toast-bottom-left'
                    });
                  }
                });
            return false;
          });
        },
        "order": [[0, "desc"]],
        "ajax": {
          url: "/admin/data/getAllPromocode",
          type: "POST"
        },
        "language": {
          "url": "/locales/"+ (getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en') +".json"
        },
        columns: [
          {
            data: 'id',
            name: 'id',
          },
          {
            data: 'code',
            name: 'code',
          },
          {
            data: 'bonus_size',
            name: 'bonus_size',
            render: function(data, type, row) {
              let text = '';
              if (type === 'display') {
                if(row.type == 1){
                  text = data + ' $';
                } else {
                  text = data + ' %';
                }
              }
              return text;
            }
          },
          {
            data: 'type',
            name: 'type',
            render: function(data, type, row) {
              let text = '';
              if (type === 'display') {
                if(data == 1){
                  text = self.$i18n.t('admin_promocode_list_without_deposit');
                }
                if(data == 2){
                  text = self.$i18n.t('admin_promocode_list_deposit');
                }
              }
              return text;
            }
          },
          {
            data: 'active_to',
            name: 'active_to',
            render: function(data, type, row) {
              let text = '';
              if (type === 'display') {
                if(new Date(data) > new Date()){
                  text = '<span class="badge badge-success text-white">'+self.$i18n.t('admin_promocode_list_active')+'</span>';
                } else {
                  text = '<span class="badge badge-danger text-white">'+self.$i18n.t('admin_promocode_list_expired')+'</span>';
                }
              }
              return text;
            }
          },
          {
            data: 'turnover',
            name: 'turnover',
            render: function(data, type, row) {
              let text = '';
              if (type === 'display') {
                text = data + ' ' + self.$i18n.t('admin_promocode_list_tries');
              }
              return text;
            }
          },
          {
            data: 'public_code',
            name: 'public_code',
            render: function(data, type, row) {
              let text = '';
              if (type === 'display') {
                if(row.type == 1){
                  text = self.$i18n.t('admin_promocode_list_in_promocodes');
                } else {
                  text = self.$i18n.t('admin_promocode_list_in_deposites');
                }
              }
              return text;
            }
          },
          {
            data: 'used',
            name: 'used',
            render: function(data, type, row) {
              let text = '';
              if (type === 'display') {
                if(data == null){
                  text = 0;
                } else {
                  text = data;
                }
              }
              return text;
            }
          },
          {
            data: 'created_at',
            name: 'created_at',
            render: function(data, type, row) {
              let text = '';
              if (type === 'display') {
                text = '<button data-url="/admin/promocode/edit/'+row.id+'" style="line-height: 1" type="button" class="btn btn-sm btn-primary router-push" data-trigger="hover" data-toggle="tooltip" data-placement="top" data-content="'+self.$i18n.t('admin_promocode_list_edit')+'"><i style="top: 0px;font-size: 12px;" class="bx bx-edit-alt"></i></button>' +
                       '<button data-del="'+row.id+'" style="line-height: 1; margin-left: 3px;" type="button" class="btn btn-sm btn-danger router-del" data-trigger="hover" data-toggle="tooltip" data-placement="top" data-content="'+self.$i18n.t('admin_promocode_list_delete')+'"><i style="top: 0px;font-size: 12px;" class="bx bx-trash-alt"></i></button>';
              }
              return text;
            }
          },
        ]
      });
    }
  }
}
</script>

<style scoped>

</style>
