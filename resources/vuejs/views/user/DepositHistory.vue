<template>
    <div class="content-body">
        <div class="row">
            <div class="col-md-12">
                <section class="card">
                    <div class="card-header">
                        <h4 class="card-title">{{ $i18n.t('deposit_history_title') }}</h4>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <div class="card-text">
                                <div class="table-responsive">
                                    <table class="table" id="historyDeposit" style="width:100%">
                                        <thead>
                                        <tr>
                                            <th>{{ $i18n.t('deposit_history_amount') }}</th>
                                            <th>{{ $i18n.t('deposit_history_status') }}</th>
                                            <th>{{ $i18n.t('deposit_history_system') }}</th>
                                            <th>{{ $i18n.t('deposit_history_date') }}</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import dateformat from "dateformat";
    import { getCookie } from "../../js/functions";

    require('../../../vendors/js/tables/datatable/datatables.min.js');
    require('../../../vendors/js/tables/datatable/dataTables.bootstrap4.min.js');

    export default {
      name: "DepositHistory",
      mounted() {
        this.updateDatatables();
      },
      computed: {
        isAdmin: function (){
          return this.$route.meta.isAdmin;
        },
        userId: function (){
          return this.$route.params.id;
        },
      },
      methods: {
        updateDatatables: function(){
          $("#historyDeposit").dataTable().fnDestroy();
          let self = this;
          $('#historyDeposit').DataTable({
            "iDisplayLength": 10,
            "processing": true,
            "serverSide": true,
            "order": [[3, "desc"]],
            "drawCallback": function(settings) {
              $('[data-toggle="popover"]').popover({ html : true });
            },
            "ajax": {
              url: self.isAdmin ? "/data/depositHistory/"+self.userId : "/data/depositHistory",
              type: "POST"
            },
            "language": {
              "url": "/locales/"+ (getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en') +".json"
            },
            columns: [
              {
                orderable: false,
                searchable: false,
                data: 'amount',
                name: 'amount',
                render: function(data, type) {
                  return parseFloat(data).toFixed(2) + ' $';
                }
              },
              {
                data: 'status',
                name: 'status',
                orderable: false,
                searchable: false,
                render: function(data, type) {
                  let string = '';
                  if (type === 'display') {
                    if(data == 0){
                      string = '<div class="badge badge-primary">' + self.$i18n.t('deposit_history_waiting') + '</div>';
                    } else if(data == 1){
                      string = '<div class="badge badge-success">' + self.$i18n.t('deposit_history_success') + '</div>';
                    } else if(data == 2){
                      string = '<div class="badge badge-success">' + self.$i18n.t('deposit_history_cancel') + '</div>';
                    }
                  }
                  return string;
                }
              },
              {
                orderable: false,
                searchable: false,
                data: 'deposit_system.text',
                name: 'deposit_system.text',
                render: function(data, type) {
                  return data;
                }
              },
              {
                data: 'created_at',
                name: 'created_at',
                render: function(data, type) {
                  let date = new Date();
                  if (type === 'display') {
                    date = new Date(data);
                  }
                  return dateformat(date, 'HH:MM:ss dd-mm-yyyy');
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
