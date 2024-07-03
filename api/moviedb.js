import axios from "axios";
import { apiKey } from "../constants";

const apiBaseUrl ='https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_Key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_Key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_Key=${apiKey}`

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTEwMmJmMjYwMWNhY2JlYWIwNjFkMjNlOWNkZGY1YyIsInN1YiI6IjY2NmE5MGUwNTNkZGJlZGMyOTM4MjEyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VJFR6zU7WFkoT53QHin-wRHSG5h6VmH7cQrUWZtZ1bU';

const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_Key=${apiKey}`
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_Key=${apiKey}`
const similarmovieEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_Key=${apiKey}`
const searchmovieEndpoint = `${apiBaseUrl}/search/movie?api_Key=${apiKey}`

const personDetailEndpoint = id=> `${apiBaseUrl}/person/${id}?api_Key=${apiKey}`
const personMovieEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_Key=${apiKey}`

export const image500 = path => path?`https://image.tmdb.org/t/p/w500${path}` :  null;
export const image342 = path => path?`https://image.tmdb.org/t/p/w342${path}` :  null;
export const image185 = path => path?`https://image.tmdb.org/t/p/w185${path}` :  null;

export const fallbackMoviePoster = 'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-gray-solid-color-background.jpg';
export const fallbackPersonImage = 'https://www.iconbolt.com/preview/facebook/eva-fill/person.svg';

const apiCall = async (endpoint,params)=>{

    const options = {
     method: 'GET',
     url:endpoint,
     params : params ? params:{},
     headers: {
        'Authorization': `Bearer ${accessToken}`
    },
    }

    try{
        const response = await axios.request(options);
        return response.data;

    }catch(error){
        console.log('error',error);
        return {};
    }
}
export const fetchTrendingMovies=()=>{
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies=()=>{
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies=()=>{
    return apiCall(topRatedMoviesEndpoint);
}
export const fetchMovieDetails=(id)=>{
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMoviecredits=(id)=>{
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchSimilarMovie=(id)=>{
    return apiCall(similarmovieEndpoint(id));
}
export const fetchPersonDetails=(id)=>{
    return apiCall(personDetailEndpoint(id));
}
export const fetchPersonMovie=(id)=>{
    return apiCall(personMovieEndpoint(id));
}
export const searchMovie=params=>{
    return apiCall(searchmovieEndpoint,params);
}
