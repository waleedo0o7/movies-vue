<template>

  <div class="popular-movies-view pt-4">

    <div class="container">

      <div class="row">

        <div v-if="popularMoviesList == null" class="d-flex justify-content-center align-items-center w-100 animated-bg"
          style="min-height: 570px">
          <div class="lds-ellipsis" style="opacity : 0.7">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div> <!-- animated-bg -->

        <div v-else v-for="(movie, index) in popularMoviesList" :key="index" class="col-md-3 mb-4">

          <MovieCard :movie="movie" />

        </div> <!-- col-md-3 mb-4 -->

      </div> <!-- row -->

    </div> <!-- container -->

  </div> <!-- popular-movies-view -->

</template>

<script>



import axios from "axios";

import MovieCard from "@/components/MovieCard.vue";

import service from '@/components/service';

export default {
  name: 'PopularMovies',

  components: {
    MovieCard
  },

  data() {
    return {
      popularMoviesList: null
    }
  },


  mounted() {
    axios
      .get(`${service.apiURL}movie/popular?api_key=${service.apiKey}`)
      .then((response) => {
        this.popularMoviesList = response.data.results;
        console.log(JSON.parse(JSON.stringify(this.popularMoviesList)));
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },

};
</script>