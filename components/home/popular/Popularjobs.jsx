import {useState} from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useRouter } from "expo-router";


import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';

import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const [selectedJob, setSelectedJob] = useState();
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1
  });

  const handleCardPress = () => {

  };

  const router = useRouter();
  return (
    <View style={styles.container} >
      <View style={styles.header} >
        <Text style={styles.headerTitle} >Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn} >Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer} >
        {
          isLoading ? (
          <ActivityIndicator />
          ) : error ? (
              <Text>somethiing went Wrong</Text>
            ) : <FlatList
                data={data}
                renderItem={({item}) => (
                  <PopularJobCard item={item} selectedJob={selectedJob} handleCardPress={handleCardPress} />
                )}
                keyExtractor={item => item}
                contentContainerStyle={{ columnGap: SIZES.medium }}
                horizontal
            />

        }
        
      </View>
    </View>
  )
}

export default Popularjobs