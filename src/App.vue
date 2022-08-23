<template>
  <HeaderApp />
  <router-view />
</template>

<script>
import HeaderApp from "./components/HeaderApp.vue";

export default {
  components: {
    HeaderApp,
  },
};
</script>
 