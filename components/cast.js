import {
    
    Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { fallbackPersonImage, image185 } from '../api/moviedb';

const cast = ({cast,navigation}) => {
  // let person?.original_name = 'Robert Downey Jr.';
  // let person?.character = 'Tony Stark';

  return (
    <View className="my-6">
      <Text className="text-white mx-4 mb-4 text-lg">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {cast &&
          cast.map((person, index) => {
            return (
              
              <TouchableOpacity key={index}
               onPress={()=>navigation.navigate('Person', person)}
              className="mr-4 items-center">
                
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">

                <Image
                className="rounded-2xl h-24 w-20"
                source={{ uri: image185(person?.profile_path)  || fallbackPersonImage,}}
                ></Image>
                </View>
                <Text className="text-white text-xs mt-1">
                {person?.character?.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character} </Text>

                <Text className="text-neutral-400 text-xs mt-1">
                {person?.original_name?.length > 10 ? person?.original_name.slice(0, 10) + '...' : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default cast;

const styles = StyleSheet.create({
    image: {
        width: '90%',
        height: 400,
        borderRadius: 10,
      },
});
