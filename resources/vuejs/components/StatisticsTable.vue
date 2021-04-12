<template>
  <div class="table-responsive">
    <table class="table" :id="tableId">
      <thead>
      <tr>
        <th>{{ $i18n.t('admin_stat_all_deals') }}</th>
        <th>{{ $i18n.t('admin_stat_sum_deals') }}</th>
        <th>{{ $i18n.t('admin_stat_all_profit_deals') }}</th>
        <th>{{ $i18n.t('admin_stat_all_losses_deals') }}</th>
        <th>{{ $i18n.t('admin_stat_profitable') }}</th>
        <th>{{ $i18n.t('admin_stat_losses') }}</th>
        <th>{{ $i18n.t('admin_stat_date') }}</th>
      </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import {getCookie} from "../js/functions";
import dateformat from "dateformat";

export default {
  name: "StatisticsTable",
  props: ['table_id', 'url'],
  data: function () {
    return {
      tableId: this.table_id,
      urlStat: this.url,
    }
  },
  mounted() {
    let self = this;
    $('#'+self.tableId).DataTable({
      "iDisplayLength": 10,
      "processing": true,
      "serverSide": true,
      "order": [[6, "desc"]],
      "ajax": {
        url: self.urlStat,
        type: "POST"
      },
      "language": {
        "url": "/locales/"+ (getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en') +".json"
      },
      columns: [
        {
          data: 'daily_orders_count',
          name: 'daily_orders_count'
        },
        {
          data: 'daily_orders_amount',
          name: 'daily_orders_amount',
          render: function(data, type, row) {
            let text ='';
            if (type === 'display') {
              text = data;
            }
            return '$ ' + text;
          }
        },
        {
          data: 'daily_profit',
          name: 'daily_profit',
          render: function(data, type, row) {
            let text ='';
            if (type === 'display') {
              text = data;
            }
            return '$ ' + text;
          }
        },
        {
          data: 'daily_loss',
          name: 'daily_loss',
          render: function(data, type, row) {
            let text ='';
            if (type === 'display') {
              text = data;
            }
            return '$ ' + text;
          }
        },
        {
          data: 'daily_profit_count',
          name: 'daily_profit_count'
        },
        {
          data: 'daily_loss_count',
          name: 'daily_loss_count'
        },
        {
          data: 'created_at',
          name: 'created_at',
          render: function(data, type, row) {
            let date = new Date();
            if (type === 'display') {
              date = new Date(data);
            }
            return dateformat(date, 'dd-mm-yyyy');
          }
        },
      ]
    });
  }
}
</script>

<style scoped>

</style>