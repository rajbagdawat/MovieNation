import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
} from 'react-native-heroicons/outline';
import {useNavigation, useRoute} from '@react-navigation/native';
import {HeartIcon} from 'react-native-heroicons/solid';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovie, image342 } from '../api/moviedb';
import MovieList from '../components/movieList';
 
var {width, height} = Dimensions.get('window');
const PersonScreen = () => {

  const {params: item} = useRoute();
  const [isFavourite, touggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false); 
  const [person,setPerson] = useState({}); 
  const [personMovie,setPersonMovies] = useState([]); 
  useEffect(()=>{
     setLoading(true)
     getPersonDetails(item.id);
     getPersonMovies(item.id);
  },[item])

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if(data) setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovie(id);
    if(data && data.cast) setPersonMovies(data.cast);
   
  };
  return (
    <ScrollView
      className="fle1 bg-black"
      contentContainerStyle={{paddingBottom: 20}}>
      <SafeAreaView className="z-20 w-full flex-row justify-between items-center px-4 my-3">
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

      {
        loading?(
        <Loading/>
        ):(
          <View>
          <View
            className="flex-row justify-center mt-3"
            style={{
              elevation: 20,
              shadowColor: 'gray',
              borderWidth: 10,
  
              borderRadius: 150,
            }}>
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-400">
              <Image
                source={{
                  uri: image342( person?.profile_path || fallbackPersonImage),
                }}
                style={{height: height * 0.43, width: width * 0.73}}
              />
            </View>
          </View>
  
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
             {
              person?.name
             }
            </Text>
            <Text className="text-base text-neutral-500 text-center ">
            {
              person?.place_of_birth
             }
            </Text>
          </View>
          <View className="mx-3 p-3 mt-6 flex-row justify-center items-center bg-neutral-700 rounded-full">
            <View className=" border-r-2 border-r-neutral-400 px-4 items-center">
              <Text className="text-neutral-300 font-semibold">Gender</Text>
              <Text className="text-neutral-300 font-semibold">{
                person?.gender == 1? 'Female' : 'Male'
               }
              </Text>
            </View>
  
            <View className=" border-r-2 border-r-neutral-400 px-4 items-center">
              <Text className="text-neutral-300 font-semibold">Birthday</Text>
              <Text className="text-neutral-300 font-semibold">{person?.birthday}</Text>
            </View>
  
            <View className=" border-r-2 border-r-neutral-400 px-4 items-center">
              <Text className="text-neutral-300 font-semibold">Known for</Text>
              <Text className="text-neutral-300 font-semibold">{person?.known_for_department}</Text>
            </View>
  
            <View className="px-4 items-center">
              <Text className="text-neutral-300 font-semibold">Popularity</Text>
              <Text className="text-neutral-300 font-semibold">{person?.popularity?.toFixed(2)}%</Text>
            </View>
          </View>
  
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {
                person?.biography || 'N/A'
              }
            </Text>
          </View>
          <MovieList title="Movies" hideseeall={true} data={personMovie} />
        </View>
        )
      }

    
    </ScrollView>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#eab308',
  },
});
