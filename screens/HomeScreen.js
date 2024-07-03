import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import {stylee} from '../theme'
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/movieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { fetchTrendingMovies,fetchUpcomingMovies,fetchTopRatedMovies } from '../api/moviedb'

const HomeScreen = () => {


  const [trending,setTrending] = useState([]);
  const [upcoming,setUpcoming] = useState([]);
  const [topRated,setToprated] = useState([]);
  const [loading,setLoading] = useState(true); 
  const navigation= useNavigation();
  
  useEffect(()=>{
     getTrendingMovies();
     getUpComingMovies();
     getTopRatedMovies();
  },[])

  const getTrendingMovies= async()=>{
    const data =  await fetchTrendingMovies();
    if(data&& data.results) setTrending(data.results);
    setLoading(false);
  }
  const getUpComingMovies= async()=>{
    const data =  await fetchUpcomingMovies();
    // console.log('got upcoming  movies :',data);
    if(data&& data.results) setUpcoming(data.results);
    
  }
  const getTopRatedMovies= async()=>{
    const data =  await fetchTopRatedMovies();
    // console.log('got toprated movies :',data);
    if(data&& data.results) setToprated(data.results);
  }

  return (
    <View className="flex-1 bg-black">
     <SafeAreaView className='mt-3'>
         <View className="flex-row justify-between items-center mx-4">
         <Bars3CenterLeftIcon size="25" strokeWidth={2} color="white" />
         <Text className="text-white text-3xl font-bold">
           <Text style={stylee.text}>M</Text>ovies</Text>
         <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="20" strokeWidth={2} color="white" />
         </TouchableOpacity>
         </View>
     </SafeAreaView>

     {
      loading?(
        <Loading/>
      ):(
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={{paddingBottom:10}}
       >

        {
          trending.length>0 && <TrendingMovies data={trending}/>
        }
         <MovieList title="Upcoming" data={upcoming}/>
         <MovieList title="Top Rated" data={topRated}/>
       </ScrollView>
      )
     }

   
    </View>
  )
}

export default HomeScreen
