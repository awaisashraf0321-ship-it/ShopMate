import { Text, View, Image, StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sizeHelper from '../../helpers/sizeHelper';
import Bizo from '../../components/Bizo';
import colors from '../../theme/colors';
import styles from './style';

const Design = ({ SLIDES, onDone }) => {
  const renderItem = item => {
    const slide = item.item;
    return (
      <View style={styles.slideContainer}>
        <Image source={slide.img} style={styles.img} />
        <Text style={styles.titleText}>{slide.title}</Text>
        <Text style={styles.context}>{slide.text}</Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.navButton} pointerEvents="none">
        <Icon
          name="arrow-forward"
          size={sizeHelper.calHp(28)}
          color={colors.white}
        />
      </View>
    );
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.navButton} pointerEvents="none">
        <Icon
          name="arrow-back"
          size={sizeHelper.calHp(28)}
          color={colors.white}
        />
      </View>
    );
  };

  const renderSkipButton = () => {
    return <Text style={styles.skipText}>Skip</Text>;
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Get Started</Text>
        <Icon
          name={'arrow-forward'}
          size={sizeHelper.calHp(32)}
          color={colors.white}
        />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView
        style={[styles.safeArea]}
        edges={['top', 'right', 'bottom', 'left']}
      >
        <StatusBar hidden={true} />

        <View style={styles.sliderContainer}>
          <AppIntroSlider
            data={SLIDES}
            activeDotStyle={styles.activeDot}
            initialNumToRender={1}
            dotStyle={styles.dotStyle}
            renderItem={renderItem}
            showSkipButton
            showPrevButton
            renderNextButton={renderNextButton}
            renderPrevButton={renderPrevButton}
            renderSkipButton={renderSkipButton}
            renderDoneButton={renderDoneButton}
            onDone={onDone}
            onSkip={onDone}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Design;
