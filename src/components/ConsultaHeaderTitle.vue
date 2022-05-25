<template>
  <div class="header-title">
    <h1>{{ headerTitle }}</h1>
    <h3 class="mt-3">{{ subHeaderTitle }}</h3>
  </div>
</template>
<script>
export default {
  name: "ConsultaHeaderTitle",
  props: {
    headerTitle: String,
    subHeaderTitle: String,
  },
  data() {
    return {};
  },
};
</script>
<style lang="css" scoped>
.header-title {
  width: 100%;
}

.header-title h1 {
  color: var(--primary0);
  font-size: 3rem;
  font-weight: 700;
}

.header-title h3 {
  font-family: var(--secondary-font);
}
</style>
