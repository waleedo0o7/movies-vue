<template>
  <div class="main-header mb-4">
    <nav>
      <router-link to="/popular-movies">Popular Movies</router-link>
      <router-link to="/">
        <img
          class="img-fluid logo"
          src="@/assets/logo.png"
          alt="website logo"
        />
      </router-link>
      <router-link to="/about">Trending Movies</router-link>
    </nav>
  </div>
  <!-- main-header -->
</template>


<script>
export default {
  name: "headerApp",
};
</script>
 