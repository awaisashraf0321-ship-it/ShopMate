import React, { useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../theme/colors';
import sizeHelper from '../helpers/sizeHelper';

const ExpenseOverview = ({
  selectedTab,
  setSelectedTab,
  filterData,
  totalSpending,
  setPeriod,
  Graph,
}) => {
  const graphdata = Graph?.Buckets || [];
  // const currentBucketIndex = graphdata.findIndex(
  //   item => item.IsCurrent === true,
  // );

  const maxAmount = Math.max(
    ...graphdata.map(item => Number(item.Amount) || 0),
    1,
  );
  console.log('chartData', graphdata);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Top Summary Cards */}
        <View style={styles.con}>
          <Text style={styles.penText}>Total Spending</Text>
        </View>

        <View style={styles.amount}>
          <Text style={styles.amountText}>{totalSpending}</Text>
        </View>

        {/* Date Filter */}
        <View style={styles.main}>
          <View style={styles.filterWrapper}>
            <View style={styles.filterContainer}>
              {filterData.map(item => {
                const isTabSelected = selectedTab === item.id;

                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      setSelectedTab(item.id);
                      setPeriod(item.label);
                    }}
                    style={[styles.btnrow, isTabSelected && styles.selectedTab]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.text,
                        isTabSelected && styles.selectedText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Graph */}
        <View style={styles.graphContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flex: 1,
              width: '100%',
              gap: sizeHelper.calWp(8),
            }}
          >
            {graphdata.map(item => (
              <View
                key={item.BucketNo}
                style={[
                  styles.bar,
                  {
                    height: sizeHelper.calHp(
                      Math.max(
                        ((Number(item.Amount) || 0) / maxAmount) * 250,
                        3,
                      ),
                    ),
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <FlatList
          data={graphdata}
          keyExtractor={item => item.BucketNo.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          ItemSeparatorComponent={() => (
            <View style={{ width: sizeHelper.calHp(70) }} />
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.label}>
              <Text style={styles.labelsText}>{item.BucketLabel}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ExpenseOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    marginTop: sizeHelper.calHp(34),
    width: '95%',
    paddingVertical: sizeHelper.calHp(20),
    paddingHorizontal: sizeHelper.calWp(20),
    backgroundColor: colors.white,
    borderRadius: sizeHelper.calHp(24),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  topSummaryRow: {
    flexDirection: 'row',
    gap: sizeHelper.calWp(14),
    marginBottom: sizeHelper.calHp(24),
  },

  topSummaryCard: {
    flex: 1,
    minWidth: 0,
    minHeight: sizeHelper.calHp(190),
    padding: sizeHelper.calHp(18),
    borderRadius: sizeHelper.calHp(22),
    justifyContent: 'space-between',
  },

  balanceCard: {
    backgroundColor: colors.primaryGradientStart || '#4A24B8',
  },

  businessCard: {
    backgroundColor: '#26384A',
  },

  topSummaryIcon: {
    width: sizeHelper.calWp(55),
    height: sizeHelper.calHp(55),
    borderRadius: sizeHelper.calHp(16),
    backgroundColor: '#FFFFFF25',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: sizeHelper.calHp(14),
  },

  topSummaryLabel: {
    fontSize: sizeHelper.calHp(23),
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },

  topSummaryAmount: {
    fontSize: sizeHelper.calHp(30),
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: sizeHelper.calHp(8),
    fontFamily: 'Poppins-SemiBold',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  arrow: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  main: {
    flexDirection: 'row',
  },

  filterWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },

  filterContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    width: '100%',
    backgroundColor: '#F1F3F5',
    borderRadius: sizeHelper.calHp(20),
    padding: sizeHelper.calHp(10),
    marginTop: sizeHelper.calHp(10),
  },

  btnrow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(20),
  },

  selectedTab: {
    backgroundColor: colors.white,
  },

  text: {
    fontSize: sizeHelper.calHp(26),
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: colors.dark,
  },

  selectedText: {
    color: colors.dark,
    fontWeight: '800',
    fontFamily: 'Poppins-Regular',
  },

  graphContainer: {
    position: 'relative',
    height: sizeHelper.calHp(200),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: sizeHelper.calHp(150),
    backgroundColor: 'white',
    paddingVertical: sizeHelper.calHp(20),
    // paddingHorizontal: sizeHelper.calWp(20),
  },

  bar: {
    flex: 1,
    maxWidth: sizeHelper.calHp(100),
    backgroundColor: colors.mutedText,
    borderTopLeftRadius: sizeHelper.calHp(18),
    borderTopRightRadius: sizeHelper.calHp(18),
  },

  label: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: sizeHelper.calWp(40),
    overflow: 'hidden',
    marginTop: sizeHelper.calHp(25),
  },

  labelsText: {
    fontSize: sizeHelper.calHp(30),
    color: '#858296',
  },

  grid: {
    position: 'absolute',
    top: sizeHelper.calHp(20),
    left: sizeHelper.calWp(20),
    right: sizeHelper.calWp(20),
    gap: sizeHelper.calHp(77),
    bottom: sizeHelper.calHp(45),
    justifyContent: 'space-between',
  },

  line: {
    height: 1,
    backgroundColor: '#E9E5F2',
  },

  con: {
    marginHorizontal: sizeHelper.calWp(8),
    marginBottom: sizeHelper.calHp(10),
    marginTop: sizeHelper.calHp(20),
  },

  penText: {
    color: colors.dark,
    fontSize: sizeHelper.calHp(35),
    fontFamily: 'PlusJakartaSans-Bold',
    fontWeight: 'bold',
  },

  amount: {
    marginHorizontal: sizeHelper.calWp(8),
    marginBottom: sizeHelper.calHp(10),
  },

  amountText: {
    fontSize: sizeHelper.calHp(50),
    fontFamily: 'PlusJakartaSans-Bold',
    fontWeight: 'bold',
  },

  dateText: {
    color: '#00000070',
    fontSize: sizeHelper.calHp(30),
  },
});
