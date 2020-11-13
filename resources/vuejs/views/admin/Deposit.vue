<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">Пополнения</h4>
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
  </div>
</template>

<script>
export default {
name: "Deposit"
}
</script>

<style scoped>

</style>