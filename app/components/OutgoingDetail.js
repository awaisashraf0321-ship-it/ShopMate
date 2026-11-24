import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';
import sizeHelper from '../helpers/sizeHelper';

const OutgoingDetails = ({
  Description,
  onPress,
  onEdit,
  module,
  amount,
  reciptDate,
  formatAmount,
  formatDate,
  paymentMode,
  reciptNo,
  sentTo,
  name,
  id,
  navigation,
}) => {
  const paymentDate = formatDate ? formatDate(reciptDate) : reciptDate;

  const formattedAmount = formatAmount
    ? formatAmount(amount)
    : String(amount ?? '0');

  const DetailRow = ({ label, value, icon, blue = true }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>

      <View style={blue ? styles.borderBalnce : styles.detailValueContainer}>
        {icon ? (
          <Icon
            name={icon}
            size={sizeHelper.calHp(37)}
            color={colors.textSecondary}
            style={styles.valueIcon}
          />
        ) : null}

        <Text style={styles.detailValue}>
          {value === null || value === undefined || value === ''
            ? '-'
            : String(value)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <View style={styles.scrollView}>
        {/* Payment summary */}
        <View style={styles.heroCard}>
          <View style={styles.heroDecorTop} />
          <View style={styles.heroDecorBottom} />

          <View style={styles.heroIcon}>
            <Icon
              name="north-east"
              size={sizeHelper.calHp(55)}
              color={colors.white}
            />
          </View>

          <Text style={styles.paidToLabel}>Paid to {sentTo || '-'}</Text>

          <Text
            style={styles.amount}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.65}
          >
            - Rs {formattedAmount}
          </Text>

          <View style={styles.completedBadge}>
            <Icon name="check" size={sizeHelper.calHp(40)} color="#246B48" />
            <Text style={styles.completedText}>Completed</Text>
          </View>

          <Text style={styles.heroFooterText}>
            {paymentDate || '-'} · {paymentMode || '-'}
          </Text>
        </View>

        {/* Transaction information */}
        <View style={styles.detailsCard}>
          <View style={styles.divider} />

          <DetailRow label="Account" value={module} blue={false} />

          <View style={styles.divider} />

          <DetailRow
            label="Reference"
            value={reciptNo || id}
            icon="content-copy"
          />

          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <Text numberOfLines={2} style={styles.descriptionValue}>
              {Description?.trim() || 'No description added'}
            </Text>
          </View>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.8}
            onPress={onPress}
          >
            <Icon
              name="delete-outline"
              size={sizeHelper.calHp(45)}
              color="#B83B3B"
            />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OutgoingDetails;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background || '#F6F5FB',
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: sizeHelper.calWp(36),
    paddingTop: sizeHelper.calHp(18),
    paddingBottom: sizeHelper.calHp(488),
  },

  heroCard: {
    backgroundColor: colors.primary || '#4A24B8',
    borderRadius: sizeHelper.calHp(44),
    minHeight: sizeHelper.calHp(470),
    paddingHorizontal: sizeHelper.calWp(40),
    paddingVertical: sizeHelper.calHp(48),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: sizeHelper.calHp(44),
  },

  heroDecorTop: {
    position: 'absolute',
    width: sizeHelper.calWp(180),
    height: sizeHelper.calHp(180),
    borderRadius: sizeHelper.calHp(90),
    backgroundColor: '#FFFFFF',
    opacity: 0.09,
    top: sizeHelper.calHp(-30),
    right: sizeHelper.calWp(-40),
  },

  heroDecorBottom: {
    position: 'absolute',
    width: sizeHelper.calWp(350),
    height: sizeHelper.calHp(350),
    borderRadius: sizeHelper.calHp(175),
    backgroundColor: '#FFFFFF',
    opacity: 0.09,
    bottom: -80,
    left: -35,
  },

  heroIcon: {
    width: sizeHelper.calWp(150),
    height: sizeHelper.calHp(120),
    borderRadius: sizeHelper.calHp(39),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: sizeHelper.calHp(25),
  },

  paidToLabel: {
    color: '#E1D8FF',
    fontSize: sizeHelper.calHp(35),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },

  amount: {
    color: colors.white,
    fontSize: sizeHelper.calHp(59),
    lineHeight: sizeHelper.calHp(89),
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: sizeHelper.calHp(6),
    maxWidth: '100%',
  },

  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizeHelper.calWp(15),
    paddingHorizontal: sizeHelper.calWp(30),
    paddingVertical: sizeHelper.calHp(10),
    backgroundColor: '#FFFFFF',
    borderRadius: sizeHelper.calHp(35),
    marginTop: sizeHelper.calHp(17),
  },

  completedText: {
    color: '#246B48',
    fontSize: sizeHelper.calHp(32),
    fontFamily: 'Poppins-SemiBold',
  },

  heroFooterText: {
    color: '#E1D8FF',
    fontSize: sizeHelper.calHp(32),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: sizeHelper.calHp(26),
  },

  detailsCard: {
    backgroundColor: colors.surface || '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border || '#E5E7EB',
    borderRadius: sizeHelper.calHp(45),
    paddingHorizontal: sizeHelper.calWp(34),
    paddingVertical: sizeHelper.calHp(15),
  },

  detailRow: {
    minHeight: sizeHelper.calHp(160),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: sizeHelper.calWp(30),
  },

  detailLabel: {
    flex: 1,
    color: colors.textSecondary || '#6B6880',
    fontSize: sizeHelper.calHp(33),
    fontFamily: 'Poppins-Regular',
  },

  detailValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 1,
    maxWidth: '65%',
  },

  valueIcon: {
    marginRight: sizeHelper.calWp(27),
  },

  detailValue: {
    color: colors.textPrimary || '#17142B',
    fontSize: sizeHelper.calHp(33),
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'right',
    flexShrink: 1,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider || '#F0EEF6',
  },

  descriptionSection: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider || '#F0EEF6',
    paddingTop: sizeHelper.calHp(36),
    paddingBottom: sizeHelper.calHp(40),
  },

  descriptionLabel: {
    color: colors.textSecondary || '#6B6880',
    fontSize: sizeHelper.calHp(32),
    fontFamily: 'Poppins-Regular',
    marginBottom: sizeHelper.calHp(25),
  },

  descriptionValue: {
    color: colors.textPrimary || '#17142B',
    fontSize: sizeHelper.calHp(32),
    lineHeight: sizeHelper.calHp(50),
    fontFamily: 'Poppins-Medium',
  },

  bottomBar: {
    flexDirection: 'row',
    gap: sizeHelper.calWp(20),
    marginTop: sizeHelper.calHp(20),
  },

  deleteButton: {
    flex: 1,
    minHeight: sizeHelper.calHp(127),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeHelper.calWp(18),
    borderWidth: 2,
    borderColor: '#EAD1D1',
    borderRadius: sizeHelper.calHp(35),
    backgroundColor: colors.surface || '#FFFFFF',
  },

  deleteText: {
    color: '#B83B3B',
    fontSize: sizeHelper.calHp(35),
    fontFamily: 'Poppins-SemiBold',
  },

  borderBalnce: {
    minHeight: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calHp(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: sizeHelper.calWp(320),
    backgroundColor: '#DCEAFF',
  },
});
