import { View, Image, StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import { theme } from '../../theme';
import { AppText } from '../../ui';
import LanguageChips from '../../components/LanguageChips';
import { t } from '../../i18n';

const Design = ({ SLIDES, onDone }) => {
  const renderItem = item => {
    const slide = item.item;
    return (
      <View style={styles.slideContainer}>
        <Image source={slide.img} style={styles.img} />
        <AppText variant="h1" style={styles.titleText}>
          {slide.title}
        </AppText>
        <AppText variant="body" color="textSecondary" style={styles.context}>
          {slide.text}
        </AppText>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.navButton} pointerEvents="none">
        <Icon
          name="arrow-forward"
          size={theme.sizes.icon.md}
          color={theme.colors.onPrimary}
        />
      </View>
    );
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.navButton} pointerEvents="none">
        <Icon
          name="arrow-back"
          size={theme.sizes.icon.md}
          color={theme.colors.onPrimary}
        />
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <AppText variant="label" color="textSecondary" style={styles.skipText}>
        {t('onboarding.skip')}
      </AppText>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.doneButton}>
        <AppText variant="bodyStrong" color="onPrimary">
          {t('onboarding.start')}
        </AppText>
        <Icon
          name={'arrow-forward'}
          size={theme.sizes.icon.md}
          color={theme.colors.onPrimary}
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
        <StatusBar barStyle="dark-content" />
        {/* Pick a language before reading anything else */}
        <LanguageChips style={{ marginTop: theme.spacing.md }} />

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
