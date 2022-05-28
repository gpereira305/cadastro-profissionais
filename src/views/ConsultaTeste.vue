<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 68vh"
  >
    <h1>FIM</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    callFunction() {
      const self = this;
      setTimeout(function () {
        self.$router.push("/");
      }, 4000);
    },
  },
  mounted() {
    this.callFunction();
  },
};
</script>

<style lang="css" scoped></style>
