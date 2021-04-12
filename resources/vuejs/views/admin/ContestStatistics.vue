<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">Пользователи участвующие в конкурсе</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">

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
              <h4 class="card-title">Статистика конкурса по дням</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <StatisticsTable table_id="contest_stat" url="/admin/data/daily"></StatisticsTable>
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
import StatisticsTable from "../../components/StatisticsTable";

export default {
  name: "ContestStatistics",
  components: { StatisticsTable: StatisticsTable },
}
</script>

<style scoped>

</style>