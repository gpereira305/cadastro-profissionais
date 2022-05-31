<template>
  <button
    type="submit"
    class="consulta__btn"
    :style="`background-color:${backgroundProp};color:${colorProp};`"
  >
    {{ btnTitle }}
  </button>
</template>
<script>
export default {
  name: "ConsultaButton",
  props: {
    btnTitle: String,
    backgroundProp: String,
    colorProp: String,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="css" scoped>
.consulta__btn {
  border: none;
  outline: none;
  border-radius: 15px;
  text-transform: uppercase;
  height: 35px;
  width: 100%;
  font-weight: 700;
  line-height: 2.4;
  transition: var(--transition);
  font-family: var(--primary-font);
}

.consulta__btn:hover {
  filter: var(--hover-effect);
}
</style>
