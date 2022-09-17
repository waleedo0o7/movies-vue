<template>

  <div class="homepage-wrapper">

    <div class="home-slider-wrapper">


      <div v-if="homeSliderList.length == 0" class="d-flex justify-content-center align-items-center w-100 animated-bg"
        style="min-height: 70vh">
        <div class="lds-ellipsis" style="opacity : 0.7">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div> <!-- animated-bg -->



      <swiper v-else :modules="modules" :slides-per-view="4" :space-between="0" navigation @swiper="onSwiper"
        @slideChange="onSlideChange">
        <swiper-slide v-for="(movie, index) in homeSliderList" :key="index">

          <div class="slider-item-wrapper item-with-overlay">

            <img class="item-image img-fluid" :src="`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`">

            <router-link :to="`/movie-details/${movie.id}`" class="overlay" href="#">

              <img class="img-fluid play-icon mb-3" src="@/assets/play.png" alt="">

              <h4 class="movie-title white"> {{ movie.title }}</h4>

            </router-link>

          </div> <!-- slider-item-wrapper -->
        </swiper-slide>
      </swiper>

    </div><!-- home-slider-wrapper -->

    <div class="home-section cards-slider popular-movies-wrapper">

      <div class="container">

        <h1> Movies </h1>

        <div class="taps-buttons-wrapper">
          <a :class="moviesActiveTap == 'popular' ? 'active' : ''"
            @click="moviesActiveTap = 'popular'; this.getMovies(`${service.apiURL}movie/popular?api_key=${service.apiKey}`);">
            Popular </a>

          <a :class="moviesActiveTap == 'top_rated' ? 'active' : ''"
            @click="moviesActiveTap = 'top_rated'; this.getMovies(`${service.apiURL}movie/top_rated?api_key=${service.apiKey}`);">
            Top Rated </a>

          <a :class="moviesActiveTap == 'upcoming' ? 'active' : ''"
            @click="moviesActiveTap = 'upcoming'; this.getMovies(`${service.apiURL}movie/upcoming?api_key=${service.apiKey}`);">
            Upcoming </a>
        </div><!-- taps-buttons-wrapper -->

        <div class="taps-components-wrapper">
          <div class="tap" v-if="moviesActiveTap === 'popular'">

            <div class="row">

              <swiper :modules="modules" :slides-per-view="6" :space-between="0" navigation
                :pagination="{ clickable: true }" @swiper="onSwiper" @slideChange="onSlideChange" class="navigation">

                <swiper-slide v-for="(movie, index) in popularMoviesList" :key="index">
                  <div class="slider-item-wrapper">
                    <MovieCard :movie="movie" />
                  </div><!-- slider-item-wrapper -->
                </swiper-slide>

              </swiper>

            </div> <!-- row -->

          </div><!-- tap -->
          <div class="tap" v-if="moviesActiveTap === 'top_rated'">
            <div class="row">

              <swiper :modules="modules" :slides-per-view="6" :space-between="0" navigation
                :pagination="{ clickable: true }" @swiper="onSwiper" @slideChange="onSlideChange" class="navigation">

                <swiper-slide v-for="(movie, index) in popularMoviesList" :key="index">
                  <div class="slider-item-wrapper">
                    <MovieCard :movie="movie" />
                  </div><!-- slider-item-wrapper -->
                </swiper-slide>

              </swiper>

            </div> <!-- row -->
          </div><!-- tap -->
          <div class="tap" v-if="moviesActiveTap === 'upcoming'">
            <div class="row">

              <swiper :modules="modules" :slides-per-view="6" :space-between="0" navigation
                :pagination="{ clickable: true }" @swiper="onSwiper" @slideChange="onSlideChange" class="navigation">

                <swiper-slide v-for="(movie, index) in popularMoviesList" :key="index">
                  <div class="slider-item-wrapper">
                    <MovieCard :movie="movie" />
                  </div><!-- slider-item-wrapper -->
                </swiper-slide>

              </swiper>

            </div> <!-- row -->
          </div><!-- tap -->
        </div><!-- taps-components-wrapper -->

      </div><!-- container -->

    </div><!-- popular-movies-wrapper -->

    <div class="home-section bg-gray cards-slider trending-movies-wrapper">



      <div class="container">

        <h1> Trending </h1>


        <div class="taps-buttons-wrapper">
          <a :class="trendingActiveTap == 'movie' ? 'active' : ''"
            @click="trendingActiveTap = 'movie'; this.getTrending(`${service.apiURL}trending/movie/day?api_key=${service.apiKey}`);">
            Movies </a>
          <a :class="trendingActiveTap == 'tv' ? 'active' : ''"
            @click="trendingActiveTap = 'tv'; this.getTrending(`${service.apiURL}trending/tv/day?api_key=${service.apiKey}`);">
            TV </a>
        </div><!-- taps-buttons-wrapper -->

        <div class="taps-components-wrapper">
          <div class="tap" v-if="trendingActiveTap === 'movie'">

            <div class="row">

              <swiper :modules="modules" :slides-per-view="6" :space-between="0" navigation
                :pagination="{ clickable: true }" @swiper="onSwiper" @slideChange="onSlideChange" class="navigation">

                <swiper-slide v-for="(movie, index) in trendingList" :key="index">
                  <div class="slider-item-wrapper">
                    <MovieCard :movie="movie" />
                  </div><!-- slider-item-wrapper -->
                </swiper-slide>

              </swiper>

            </div> <!-- row -->

          </div><!-- tap -->
          <div class="tap" v-if="trendingActiveTap === 'tv'">
            <div class="row">

              <swiper :modules="modules" :slides-per-view="6" :space-between="0" navigation
                :pagination="{ clickable: true }" @swiper="onSwiper" @slideChange="onSlideChange" class="navigation">

                <swiper-slide v-for="(movie, index) in trendingList" :key="index">
                  <div class="slider-item-wrapper">
                    <MovieCard :movie="movie" />
                  </div><!-- slider-item-wrapper -->
                </swiper-slide>

              </swiper>

            </div> <!-- row -->
          </div><!-- tap -->

        </div><!-- taps-components-wrapper -->

      </div><!-- container -->

    </div><!-- trending-movies-wrapper -->

    <div class="home-section cards-slider upcoming-trailers-wrapper">

      <div class="container">

        <h1> Upcoming Trailers </h1>


        <swiper :modules="modules" :slides-per-view="2" :space-between="0" navigation @swiper="onSwiper"
          @slideChange="onSlideChange">

          <swiper-slide v-for="(trailer, index) in trailersList" :key="index">


            <div class="slider-item-wrapper p-0 item-with-overlay" @click="this.trailerVideoId = trailer">

              <img class="img-fluid item-image w-100" :src="`https://img.youtube.com/vi/${trailer}/0.jpg`" alt="">

              <div class="overlay" data-toggle="modal" data-target="#videoModal">

                <img class="img-fluid play-icon mb-3" src="@/assets/play.png" alt="">

                <p class="watch-now"> Watch Now </p>

              </div> <!-- overlay -->

            </div> <!-- slider-item-wrapper -->

          </swiper-slide>

        </swiper>

      </div> <!-- container -->

    </div> <!-- upcoming-trailers-wrapper -->

    <!-- Modal -->
    <div class="modal fade" id="videoModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">

            <iframe width="100%" height="500" :src="`https://www.youtube.com/embed/${trailerVideoId}`"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen controls="false"></iframe>

          </div> <!-- modal-body -->
        </div> <!-- modal-content -->
      </div> <!-- modal-dialog -->
    </div> <!-- modal -->

  </div><!-- homepage-wrapper -->

</template>

<script>

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue';

import MovieCard from "@/components/MovieCard.vue"

import service from '@/components/service';

export default {
  name: "HomeView",

  components: {
    Swiper,
    SwiperSlide,
    MovieCard
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
      moviesActiveTap: 'popular',
      trendingActiveTap: 'movie',
      popularMoviesList: null,
      trendingList: null,
      upcomingList: null,
      upcomingListIds: null,
      trailersList: [],
      trailerVideoId: null,
      homeSliderList: [],
      service: service
    };
  },

  mounted() {
    this.getMovies(`${service.apiURL}movie/popular?api_key=${service.apiKey}`);
    this.getTrending(`${service.apiURL}trending/movie/day?api_key=${service.apiKey}`);
    this.getLatestTrailers(`${service.apiURL}movie/upcoming?api_key=${service.apiKey}`)
  },

  methods: {

    async getMovies(url) {
      const dataRes = await service.functions.getMovies(url);
      this.popularMoviesList = dataRes.data.results;
      if (!this.homeSliderList.length) {
        this.homeSliderList = dataRes.data.results;
      }
    },

    async getTrending(url) {
      const dataRes = await service.functions.getTrending(url);
      this.trendingList = dataRes.data.results;
    },

    async getLatestTrailers(url) {
      const dataRes = await service.functions.getLatestTrailers(url);
      this.upcomingList = dataRes.data.results;
      for (let i = 0; i < this.upcomingList.length; i++) {
        this.getMovieVideoById(this.upcomingList[i].id);
      }
    },

    async getMovieVideoById(id) {
      const dataRes = await service.functions.getMovieVideoById(id);
      for (let i = 0; i < dataRes.data.results.length; i++) {
        if (dataRes.data.results[i].type === 'Trailer') {
          this.trailersList.push(dataRes.data.results[i].key)
        }
      }
    },

  },

};
</script>
