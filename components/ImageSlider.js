import React from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { image500 } from '../api/moviedb';

const { width: screenWidth } = Dimensions.get('window');

// const posterPaths = data.map(movie => movie.poster_path);
  // console.log('poster_path : ', posterPaths);

const ImageSlider = ({ data, onPressItem }) => {
  const renderItem = ({ item }) => (
      <View style={styles.slide}>
        <TouchableWithoutFeedback onPress={() => onPressItem(item)}>
        <Image  source={{ uri: image500(item.poster_path) }} style={styles.image} />
          </TouchableWithoutFeedback> 
      </View>
  );

  return (
    <Carousel
      width={screenWidth}
      height={500}
      data={data}
      renderItem={renderItem}
      mode="parallax"
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 500,
    borderRadius: 30,
    
  },
});

export default ImageSlider;
