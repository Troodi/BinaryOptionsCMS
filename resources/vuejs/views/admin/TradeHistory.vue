<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_trade_title') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <TradeHistoryTable :load_url="'/admin/data/history/' + userId" :element_id="'real_trade_history'"></TradeHistoryTable>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_trade_title_demo') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <TradeHistoryTable :load_url="'/admin/data/history/demo/' + userId" :element_id="'demo_trade_history'"></TradeHistoryTable>
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
import TradeHistoryTable from "../../components/TradeHistoryTable";

export default {
  name: "TradeHistory",
  components: { TradeHistoryTable: TradeHistoryTable },
  computed: {
    userId: function (){
      return this.$route.params.id != null ? this.$route.params.id : 0;
    }
  }
}
</script>

<style scoped>

</style>