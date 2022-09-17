<template>
    <div class="movies-card-view">
        <router-link :to="`/movie-details/${movie.id}`" class="movie-card">
            <img class="img-fluid" v-bind:src="imagePath + movie.poster_path" />
            <div class="p-2">
                <h2 class="max-lines one m-0" v-if="movie.title"> {{ movie.title }} </h2>
                <h2 class="max-lines one m-0" v-if="movie.name"> {{ movie.name }} </h2>
            </div>
        </router-link><!--  movie-card -->
    </div> <!-- movies-card-view -->
</template>
  
<script>

export default {
    name: 'MovieCard',

    data() {
        return {
            imagePath: 'https://image.tmdb.org/t/p//w500/'
        }
    },
    props: ['movie']
};
</script>