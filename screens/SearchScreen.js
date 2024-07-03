import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { XMarkIcon } from 'react-native-heroicons/solid';
import Loading from '../components/loading';
import { fallbackMoviePoster, image185, searchMovie } from '../api/moviedb';
import { debounce } from 'lodash';

import { LanguageIcon } from 'react-native-heroicons/outline';

const {width,height} = Dimensions.get('window');
const SearchScreen = () => {
    const navigation = useNavigation();
    const [results,setResults] = useState([1,2,3,4]);
    const [loading,setLoading] = useState(false); 
    let movieName = "Ant-Man and the Wasp: Quantumania";

    const handleSearch = (value)=>{
     if(value && value.length>2){
        setLoading(true);
        searchMovie({
            query:value,
            include_adults:'false',
            Language:'en-US',
            page:'1'
        }).then(data =>{
            setLoading(false)
            // console.log('got movies : ',data);
            if(data && data.results)setResults(data.results);
        })}else{
            setLoading(false);
            setResults([]);
        }
     }
    
    const handleTextDebounce = useCallback(debounce(handleSearch,400),[])
    
    return (
   <SafeAreaView
    className="bg-black flex-1" 
    >
    <View
    className="flex-row mx-4 mt-4 mb-3 justify-content item-center border border-neutral-500 rounded-full"
    >
        <TextInput
        onChangeText={handleSearch}
         placeholder='Search Movie'
         placeholderTextColor={'lightgray'}
         className="p-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
     
     <TouchableOpacity
      onPress={()=>navigation.navigate('Home')}
      className="bg-neutral-500 rounded-full p-3 m-1"
     >
    <XMarkIcon size="26" color="white" />
     </TouchableOpacity>
    </View>

    {
        loading?(
           <Loading/>
        ):   
            results.length>0?(
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}
                className="space-y-3"
              >
                  <Text className="text-white font-semibold ml-1" >Results ({results.length})</Text>
                 <View className="flex-row justify-between flex-wrap">
                  {
                      results.map((item,index)=>{
                          return(
                             <TouchableWithoutFeedback 
                             key={index}
                              onPress={()=>navigation.navigate('Movie',item)}
                                      >
                                          <View className="space-y-2 mb-4">
                                          <Image className="rounded-2xl"
                                            source={{uri: image185(item?.poster_path || fallbackMoviePoster)}}
                                            style={{width:width*0.44, height:height*0.3}}
                                           />
                                           <Text className="text-neutral-300 ml-1">{
                                               item?.title?.length>22? item?.title?.slice(0,22)+('...') :item?.title
                                              }</Text>
                                           </View>
                                      </TouchableWithoutFeedback>
                          )
                      })
                  }
          
                 </View>
              </ScrollView>
            ):(
    
                <View className="flex-row justify-center">
                   <Image source={require('../assets/notfoundr.png')}
                   className="mt-10 h-90 w-90"
                   /> 
                </View>
            )
        
    }

 


   </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})