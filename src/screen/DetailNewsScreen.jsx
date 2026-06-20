import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import theme from '../../assets/theme';

const { colors } = theme;

export default function DetailNewsScreen({ route }) {

  const { item } = route.params;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <View style={styles.content}>

        <Text style={styles.category}>
          {item.category}
        </Text>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.description}>
          {item.content}
        </Text>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.light(),
  },

  image: {
    width: '100%',
    height: 260,
  },

  content: {
    padding: 24,
  },

  category: {
    color: colors.primary(),
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark(),
    marginBottom: 15,
  },

  description: {
    fontSize: 15,
    color: colors.textSecondary(),
    lineHeight: 28,
  },
});