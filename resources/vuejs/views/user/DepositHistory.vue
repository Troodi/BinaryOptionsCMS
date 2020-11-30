<template>
    <div class="content-body">
        <div class="row">
            <div class="col-md-12">
                <section class="card">
                    <div class="card-header">
                        <h4 class="card-title">История пополнений</h4>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <div class="card-text">
                                <div class="table-responsive">
                                    <table class="table" id="historyDeposit">
                                        <thead>
                                        <tr>
                                            <th>Сумма платежа</th>
                                            <th>Статус</th>
                                            <th>Платежная система</th>
                                            <th>Дата</th>
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
              "url": "/locales/Russian.json"
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
                      string = '<div class="badge badge-primary">Ожидание оплаты</div>';
                    } else if(data == 1){
                      string = '<div class="badge badge-success">Успешно</div>';
                    } else if(data == 2){
                      string = '<div class="badge badge-success">Отменено</div>';
                    }
                  }
                  return string;
                }
              },
              {
                orderable: false,
                searchable: false,
                data: 'system_id',
                name: 'system_id',
                render: function(data, type) {
                  return 'Payeer';
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