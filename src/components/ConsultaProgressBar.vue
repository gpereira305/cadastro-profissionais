<template>
  <section class="d-flex align-items-center w-100 consulta__progress mt-4 mb-3">
    <div>
      <span :style="`width:${barLength}; border-radius:${barBorder}`"></span>
    </div>
    <h5>{{ barSteps }} de 2</h5>
  </section>
</template>

<script>
export default {
  name: "ConsultaProgressBar",
  props: {
    backgroundBar: String,
    barLength: Number,
    barBorder: String,
    barSteps: Number,
  },
};
</script>

<style lang="css" scoped>
.consulta__progress {
}

.consulta__progress div {
  width: 100%;
  height: 20px;
  border-radius: 3px;
  /* border: 1px solid var(--primary0); */
  flex: 3;
  position: relative;
}

.consulta__progress span {
  background-color: var(--primary0);
  position: absolute;
  height: 100%;
}

.consulta__progress h5 {
  width: 100%;
  flex: 1;
  text-align: center;
  font-weight: 700;
  color: var(--primary0);
  margin: 0;
}
</style>
