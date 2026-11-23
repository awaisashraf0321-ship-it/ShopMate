import React from 'react';
import { ActivityIndicator, Image, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import { useTheme } from '../../theme';
import { AppText } from '../../ui';

/** Brand splash shown while the stored login token is checked. */
const Design = () => {
  const { colors, spacing } = useTheme();
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fill}
      />
      <View style={styles.blobLarge} />
      <View style={styles.blobSmall} />

      <View style={styles.logoRing}>
        <View style={styles.logoCircle}>
          <Image
            style={styles.logo}
            source={require('../../assets/image/favicon1.png')}
            resizeMode="contain"
          />
        </View>
      </View>
      <AppText variant="display" color="onPrimary">
        ShopMate
      </AppText>
      <AppText
        variant="body"
        color="onPrimaryMuted"
        style={{ marginTop: spacing.xs }}
      >
        Expenses and business, in one place
      </AppText>
      <ActivityIndicator
        color={colors.onPrimary}
        style={{ marginTop: spacing.xxl }}
      />
    </View>
  );
};

export default Design;
