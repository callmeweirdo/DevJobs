import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter, Stack, useGlobalSearchParams } from 'expo-router';

import useFetch from '../../hook/useFetch';

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';

import { COLORS, icons, SIZES } from '../../constants';

const tabs = ["Responsibility", "About", "Qualifications"];



const JobDetails = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  const params = useGlobalSearchParams();
  const router = useRouter();
  const { data, isLoading, error, reFetch } = useFetch(`job-details`, {
    job_id: params.id,
  });
 
  useEffect(() => {
    // Log the entire data object for inspection
    console.log('Data:', data);
  }, [data]);

  const onRefresh = () => {
    setRefreshing(true);
    // Perform data fetching logic here
    reFetch();
    setRefreshing(false);
  };

const displayTabContent = () => {
    switch (activeTab) {
        case "Qualifications":
            return <Specifics
                title="Qualifications"
                points={data[0].job_highlihts?.Qualifications ?? ['N/A']}
            />
        case "About":
            return <JobAbout
                info={data[0].job_description ?? "No data provided"}
            />
        case "Responsibility":
        return <Specifics
                title="Responsibility"
                points={data[0].job_highlihts?.Responsibilities ?? ['N/A']}
            />
    }
}
    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: true,
          headerBackVisible: true,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()} />
          ),
          headerRight: () => <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />,
          headerTitle: '',
        }}
      />
      <ScrollView showsHorizontalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
                      <Text>No data { console.log( error)} </Text>
        ) : data && data.length > 0 ? (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
            />
                              <JobTabs
                                  tabs={tabs}
                                  activeTab={activeTab}
                                  setActiveTab={setActiveTab}
                                  
                              />
                              {displayTabContent()}
          </View>
        ) : (
          <Text>No data available</Text>
        )}
          </ScrollView>
          <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results' } />
    </SafeAreaView>
  );
};

export default JobDetails;
