import { StyleSheet, Text, Image, View } from 'react-native';
import React from 'react';

import sizeHelper from '../helpers/sizeHelper';
import { theme } from '../theme';

const sizing = {
  large: {
    width: 320,
    height: 130,
    tagline: 28,
  },
  medium: {
    width: 240,
    height: 70,
    tagline: 26,
  },
  small: {
    width: 180,
    height: 50,
    tagline: 24,
  },
};

const Bizo = ({ size = 'large', showTagLine = false }) => {
  const cfg = sizing[size] || sizing.large;

  return (
    <View style={styles.wrap}>
      <Image
        style={{
          height: sizeHelper.calHp(cfg.height),
          width: sizeHelper.calWp(cfg.width),
        }}
        resizeMode="contain"
        source={require('../assets/image/favicon1.png')}
      />

      {showTagLine && (
        <Text
          style={[styles.tagline, { fontSize: sizeHelper.calHp(cfg.tagline) }]}
        >
          Business Management Suite
        </Text>
      )}
    </View>
  );
};

export default Bizo;

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },

  tagline: {
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.onPrimaryMuted,
    marginTop: sizeHelper.calHp(12),
    textAlign: 'center',
    letterSpacing: sizeHelper.calWp(0.4),
  },
});
