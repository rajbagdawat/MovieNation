import { StyleSheet, Text, TouchableOpacity, View ,Image, Dimensions, TouchableWithoutFeedback,ScrollView } from 'react-native'
import React from 'react'
import { stylee } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');
const MovieList = ({title,data , hideseeall}) => {
    const navigation = useNavigation();
    let movieName = "Ant-Man and the Wasp: Quantumania";
  return (

    <View className="mb-8 space-y-4 ">
        <View  className="flex-row justify-between item-center mx-5" >
         <Text className='text-white text-s  '>{title}</Text>
         {
              !hideseeall && (
                  <TouchableOpacity>
            <Text style={stylee.text} className='text-s'>See All</Text>
         </TouchableOpacity>
            )
        }
        </View>
        <ScrollView
        
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}>
            {
                data.map((item,index)=>{

                    return(
                        <TouchableWithoutFeedback
                        key={index}
                        onPress={()=> navigation.push('Movie',item) }>
                            <View className="space-y-1 mr-4">
                                <Image source={{uri: image185(item.poster_path) || fallbackMoviePoster}}
                                className="rounded-lg"
                                style={{width:width*0.33, height:height*0.20}}
                                />
                        <Text className="text-neutral-300 ml-1">
                        {item?.title?.length > 14 ? item.title.slice(0, 14) + '...' : item?.title}
                            </Text>
                            </View>
                   </TouchableWithoutFeedback>
                  )
                }
                )
            }
        </ScrollView>
    </View>
  )
}

export default MovieList

const styles = StyleSheet.create({})