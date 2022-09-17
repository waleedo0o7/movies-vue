import axios from "axios";

export default {
    apiURL: 'https://api.themoviedb.org/3/',
    apiKey: '83fe1a54d4bb2106a602073bc9642ca2',
    functions: {

        async getMovies(url) {
            const result = axios.get(url);
            return result;
        },

        async getTrending(url){
            const result = axios.get(url);
            return result;
        },

        async getLatestTrailers(url) {
            const result = axios.get(url);
            return result;
        },

        async getMovieVideoById(id) {
            const result = axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=83fe1a54d4bb2106a602073bc9642ca2`);
            return result;
        },

    }
}