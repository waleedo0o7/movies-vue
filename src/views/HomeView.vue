<template>
  <div class="home">
    <p> {{ text }} </p>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      text: "hello",
    };
  },
};
</script>
