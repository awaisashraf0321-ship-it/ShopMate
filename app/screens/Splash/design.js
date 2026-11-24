import { Text, View, Image, StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../theme/colors';
import styles from './style';
const Design = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <View style={{ flex: 1, backgroundColor: colors.primaryGradientStart }}>
        <View style={styles.container}>
          <View style={styles.imgCon}>
            <Image
              style={styles.khata}
              source={require('../../assets/image/purse (2).jpeg')}
            />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Design;
