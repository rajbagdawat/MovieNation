import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ChevronLeftIcon, HeartIcon} from 'react-native-heroicons/solid';
import {stylee, theme} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import {fallbackMoviePoster, fetchMovieDetails, fetchMoviecredits, fetchSimilarMovie, image500} from '../api/moviedb';

var {width, height} = Dimensions.get('window');

let movieName = 'Ant-Man and the Wasp: Quantumania';
const MovieScreen = () => {
  const {params: item} = useRoute();
  // const { image, title } = route.params;
  const [isFavourite, touggleFavourite] = useState(false);
  const [cast, setcast] = useState([1, 2, 3, 4, 5]);
  const [similarmovie, setSimilarmovie] = useState([1, 2, 3, 4]);
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [delayPassed, setDelayPassed] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('item is', item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovie(item.id);
  }, [item]);

  const getMovieDetails = async id => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    
    setLoading(false);
  };
  const getMovieCredits = async id => {
    const data = await fetchMoviecredits(id);
    if (data && data.cast) setcast(data.cast);
  };
  const getSimilarMovie = async id => {
    const data = await fetchSimilarMovie(id);
    if (data && data.results) setSimilarmovie(data.results);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayPassed(true);
    }, 900); // 1 second delay

    return () => clearTimeout(timer); // Cleanup the timeout
  }, []);



  const cartandSimilarmovie = () => {
    return (
      <>
        {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
        {similarmovie.length > 0 && <MovieList title="Similar Movies" hideseeall={true} data={similarmovie} />}
      </>
    );
};

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      className="flex-1 bg-black">
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 my-4">
          <TouchableOpacity
            style={styles.bg}
            className="rounded-xl p-1 "
            onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="21" strokeWidth={2.3} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => touggleFavourite(!isFavourite)}>
            <HeartIcon size="28" color={isFavourite ? 'red' : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <View>
          <Image
            source={{uri: image500(movie.poster_path) || fallbackMoviePoster}}
            style={{width, height: height * 0.55}}
          />

          <LinearGradient
            colors={['transparent', 'rgba(9, 9, 9, 0.8)', 'rgba(9, 9, 9, 1)']}
            style={{width, height: height * 0.4}}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            className="absolute bottom-0"
          />
        </View>
      )}

      <View style={{marginTop: -(height * 0.1)}} className="space-y-2">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie.title}
        </Text>

        {movie?.id ? (
          <Text className="text-neutral-400 text-center font-semibold text-base">
            {movie?.status} • {movie?.release_date?.split('-')[0]} •{' '}
            {movie?.runtime} min
          </Text>
        ) : null}

        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genres, index) => {
            let showOut = index+1 != movie.genres.length;
            return (
              <Text key = {index} className="text-neutral-400 text-center font-semibold text-sm ">
               {genres?.name} {showOut? "•" :null}
              </Text>
            );
          })}
          {/* <Text className="text-neutral-400 text-center font-semibold text-sm ">
            Action •
          </Text>
          <Text className="text-neutral-400 text-center font-semibold text-sm ">
            Action •
          </Text>
          <Text className="text-neutral-400 text-center font-semibold text-sm">
            Thrill •
          </Text>
          <Text className="text-neutral-400 text-center font-semibold text-sm">
            Comedy
          </Text> */}
        </View>

        <Text className="text-neutral-400 mx-4 tracking-wide">
         {
          movie?.overview
         }
        </Text>
      </View>
      <View>
      {delayPassed ? cartandSimilarmovie() : null}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 400,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  bg: {
    backgroundColor: '#eab308',
  },
});

export default MovieScreen;
