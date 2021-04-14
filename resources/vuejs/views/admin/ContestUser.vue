<template>
    <div class="content-wrapper">
      <div class="content-body">
        <UserBalanceControl :save_url="'/admin/data/changeBalance/'+userId" :load_url="'/admin/data/getControlInfo/'+userId"></UserBalanceControl>
      </div>
    </div>
</template>

<script>
import UserBalanceControl from "../../components/UserBalanceControl";

export default {
  name: "ContestUser",
  components: { UserBalanceControl: UserBalanceControl },
  computed: {
    userId: function (){
      return this.$route.params.id == null ? null : this.$route.params.user_id;
    },
    contestId: function (){
      return this.$route.params.id == null ? null : this.$route.params.contest_id;
    },
  },
}
</script>

<style scoped>

</style>