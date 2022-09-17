import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PopularMovies from "../views/PopularMovies.vue";
import TrendingMovies from "../views/TrendingMovies.vue"
import MovieDetails from "../views/MovieDetails.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  }, {
    path: "/popular-movies",
    component: PopularMovies,
  },
  {
    path: "/trending-movies",
    component: TrendingMovies,
  },
  {
    path: "/movie-details/:id",
    component: MovieDetails,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
