<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">Выплаты</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="withdrawalHistory">
                      <thead>
                      <tr>
                        <th>Сумма</th>
                        <th>Платежная система</th>
                        <th>Статус</th>
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
  </div>
</template>

<script>
export default {
name: "Withdrawal"
}
</script>

<style scoped>

</style>