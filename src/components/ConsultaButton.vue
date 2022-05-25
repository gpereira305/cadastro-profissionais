<template>
  <button
    type="button"
    class="consulta__btn"
    :style="`background-color:${colorProp}`"
  >
    {{ btnTitle }}
  </button>
</template>
<script>
export default {
  name: "ConsultaButton",
  props: {
    btnTitle: String,
    colorProp: String,
  },
};
</script>
<style lang="css" scoped>
.consulta__btn {
  border: none;
  outline: none;
  color: var(--secondary7);
  border-radius: 15px;
  text-transform: uppercase;
  height: 35px;
  width: 100%;
  font-weight: 700;
  line-height: 2.4;
  transition: var(--transition);
  /* width: 390px; */
  /* padding: 5px 16%; */
}

.consulta__btn:hover {
  filter: var(--hover-effect);
}
</style>
