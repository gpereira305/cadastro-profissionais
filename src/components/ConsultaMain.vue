<template>
  <div class="revisao d-flex justify-content-between align-items-center mt-3">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "ConsultaMain",
  data() {
    return {};
  },
};
</script>
<style lang="css" scoped>
.revisao__text {
  width: 100%;
  height: 100%;
}

.revisao__image {
  width: 100%;
}

@media (max-width: 990px) {
  .revisao__image {
    display: none;
  }
}
</style>
