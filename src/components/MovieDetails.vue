<template>
    <p> Original Title : {{ movieDetails.original_title }}</p>
    <p> Overview : {{ movieDetails.overview }}</p>
    <p> Release Date : {{ movieDetails.release_date }}</p>

    {{ $route.params.id }}

    <hr />

    <pre>{{ movieDetails }}</pre>

</template>

<script>

import axios from "axios";

export default {
    name: 'MovieDetails',
    data() {
        return {
            movieDetails: '',
            userId: this.$route.params.id
        }
    },
    props: ['id'],

    mounted() {
        axios
            .get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=83fe1a54d4bb2106a602073bc9642ca2`)
            .then((response) => {
                this.movieDetails = response.data;
                console.log(JSON.parse(JSON.stringify(this.movieDetails)));
            })
            .catch((error) => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
    },
}
</script>