import React from 'react';
import { SafeAreaView, StyleSheet, View,Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ImageSlider from './ImageSlider';
import { useNavigation } from '@react-navigation/native';


const TrendingMovies = ({data}) => {
 
  const navigation = useNavigation();
  const handlePress = (item) => {
    navigation.navigate('Movie',item);
  };



  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
    <SafeAreaView className='bg-black' >
    <View>
           <Text className="text-white text-2xl font-bold mt-3 mx-5">Trending</Text>
        </View>
        <View className="-my-5">
          <ImageSlider data={data} onPressItem={handlePress} />
        </View>
      </SafeAreaView>
  </GestureHandlerRootView>
  );
};

export default TrendingMovies;
