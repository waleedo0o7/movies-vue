<template>

    <div class="page movie-details-page">



        <div class="movie-details-intro d-flex justify-content-center align-items-center"
            :style="`background-image:url(https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path})`">

            <div class="container p-0 m-0">
                <div class="movie-main-pref w-100">
                    <div class="row no-gutters">

                        <div class="col-md-4">
                            <div v-if="movieDetails == ''"
                                class="d-flex justify-content-center align-items-center w-100 animated-bg"
                                style="min-height: 570px">
                                <div class="lds-ellipsis" style="opacity : 0.7">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div> <!-- animated-bg -->

                            <img v-else class="img-fluid movie-poster"
                                :src="`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`" />
                        </div><!-- col-md -->

                        <div class="col-md-8">

                            <div v-if="movieDetails == ''"
                                class="d-flex justify-content-center align-items-center w-100 animated-bg"
                                style="min-height: 570px">
                                <div class="lds-ellipsis" style="opacity : 0.7">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div> <!-- animated-bg -->


                            <div v-else class="pl-4 pt-4 movie-main-details-wrapper">
                                <h1 class="title"> {{ movieDetails.title }}</h1>
                                <div class="d-flex">
                                    <div class="rate-wrapper mr-4">
                                        <strong> Release Date : </strong> {{ movieDetails.release_date }}
                                    </div><!-- rate-wrapper -->
                                    <div class="time-wrapper mr-4">
                                        <strong> Time : </strong> {{ convertRuntimeToMinutes(movieDetails.runtime) }}
                                    </div><!-- time-wrapper -->
                                    <p class="rate">
                                        <strong> Rate : </strong> {{ movieDetails.vote_average }}
                                    </p>
                                </div>

                                <div class="genres-wrapper mb-4">

                                    <h3> Genres </h3>

                                    <ul class="reset-ul genres d-flex">


                                        <li v-for="(item, index) in movieDetails.genres" :key="index">
                                            {{ item.name }}
                                        </li>
                                    </ul>
                                </div><!-- genres-wrapper -->

                                <div class="overview-wrapper">
                                    <h3 ref="movieOverview"> overview </h3>
                                    <p> {{ movieDetails.overview }} </p>
                                </div><!-- overview-wrapper -->

                            </div><!-- movie-main-details-wrapper -->

                        </div><!-- col-md -->

                    </div><!-- row -->

                </div><!-- movie-main-pref -->
            </div><!-- container -->
        </div><!-- movie-details-intro -->

        <div class="cast-wrapper bg-black white">

            <h1 class="text-center mb-4"> Movie Cast </h1>

            <swiper :modules="modules" :slides-per-view="5.2" :space-between="0" navigation @swiper="onSwiper"
                @slideChange="onSlideChange">

                <swiper-slide v-for="(cast, index) in this.movieCast" :key="index">
                    <div class="slider-item-wrapper">



                        <div v-if="movieCast == null"
                            class="d-flex justify-content-center align-items-center w-100 animated-bg"
                            style="min-height: 570px">
                            <div class="lds-ellipsis" style="opacity : 0.7">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div> <!-- animated-bg -->


                        <div v-else class="cast-card-view">
                            <div class="cast-card">
                                <img class="img-fluid" v-if="cast.profile_path"
                                    :src="`https://image.tmdb.org/t/p/w500/${cast.profile_path}`">
                                <img class="img-fluid" v-else src="@/assets/default-cast.png">
                                <p class="name max-lines one lead mt-2"> {{ cast.name }}
                                    <small class="colored"> ( {{ cast.character }} )</small>
                                </p>
                            </div><!-- cast-card -->
                        </div><!-- cast-card-view -->



                    </div><!-- slider-item-wrapper -->
                </swiper-slide>

            </swiper>

        </div><!-- cast-wrapper -->

        <div class="video-wrapper d-flex justify-content-enter align-items-center"
            :style="`background-image:url(https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path})`">

            <div class="video">
                <iframe width="100%" height="100%" :src="`https://www.youtube.com/embed/${trailersList[0]}`"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
            </div><!-- video -->



        </div><!-- video-wrapper -->

        <div class="movie-gallery p-5 text-center d-none">
            <h1> Movie Gallery </h1>

            {{ trailersList }}
        </div><!-- movie-gallery -->

    </div><!-- movie-details-wrapper -->

    <!-- 

    <hr />

    <p> Original Title : {{ movieDetails.original_title }}</p>

    <p> Overview : {{ movieDetails.overview }}</p>

    <p> Release Date : {{ movieDetails.release_date }}</p>

    {{ $route.params.id }}

    <hr />

    <pre>{{ movieDetails }}</pre>

    <p> movieCast </p>

    <pre style="height:500px">{{ this.movieCast }}</pre>

    -->


    <!-- {{this.$refs}}

    {{this.$store.state}} -->


</template>

<script>

import axios from "axios";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { store } from "../main";

import service from '../components/service'


export default {
    name: 'MovieDetails',


    props: ['id'],


    components: {
        Swiper,
        SwiperSlide,
    },

    setup() {
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, Pagination, Scrollbar, A11y],
        };
    },


    data() {
        return {
            movieDetails: '',
            movieId: this.$route.params.id,
            movieCast: null,
            trailersList: []
        }
    },

    created() {
        console.log('created run');
    },

    activated() {
        console.log('activated run');
    },

    mounted() {

        setTimeout(() => {
            console.log(store);
            console.log('testNum');
            console.log(service.methods.test());
        }, 1000);

        console.log('mounted run');

        axios.get(`${service.apiURL}movie/${this.$route.params.id}?api_key=83fe1a54d4bb2106a602073bc9642ca2`)
            .then((response) => {
                this.movieDetails = response.data;

            })
            .catch((error) => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));

        this.getMovieCastById();

        this.getMovieVideoById(`${this.movieId}`);

    },

    methods: {

        convertRuntimeToMinutes(time) {
            let hours = '';
            let minutes = '';
            hours = Math.floor(time / 60);
            minutes = time % 60;
            return `${hours}h : ${minutes}m`;
        },

        getMovieCastById() {

            axios.get(`${service.apiURL}movie/${this.movieId}/credits?api_key=83fe1a54d4bb2106a602073bc9642ca2`)
                .then((response) => {
                    this.movieCast = response.data.cast;
                })
                .catch((error) => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.loading = false));

        },

        getMovieVideoById(id) {
            axios
                .get(`${service.apiURL}movie/${id}/videos?api_key=83fe1a54d4bb2106a602073bc9642ca2`)
                .then((response) => {
                    for (let i = 0; i < response.data.results.length; i++) {
                        this.trailersList.push(response.data.results[i].key);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
        },

    }
}

</script>