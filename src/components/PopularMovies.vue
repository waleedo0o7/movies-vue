<template>
  <div class="popular-movies-view">

    <div class="container">
      <div class="row">
        <div v-for="(movie, index) in popularMoviesList" :key="index" class="col-md-3 mb-4">

            <router-link :to="`/movie-details/${movie.id}`" class="d-block movie-card">
              <img class="img-fluid" v-bind:src="imagePath + movie.poster_path" />
              <h2> {{ movie.title }} </h2>
            </router-link><!--  movie-card -->

        </div> <!-- col-md-3 -->
      </div> <!-- row -->
    </div> <!-- container -->

  </div> <!-- popular-movies-view -->
</template>

<script>
import axios from "axios";
export default {
  name: 'PopularMovies',

  data() {
    return {
      popularMoviesList: null,
      imagePath: 'https://image.tmdb.org/t/p//w500/'
    }
  },


  mounted() {
    axios
      .get("https://api.themoviedb.org/3/movie/popular?api_key=83fe1a54d4bb2106a602073bc9642ca2")
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