import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

import theme from '../../assets/theme';

const { colors } = theme;

export default function BookmarkScreen({
  bookmarks,
}) {

  const data = bookmarks || [];

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Riwayat Booking
      </Text>

      {data.length === 0 ? (

        <Text style={styles.empty}>
          Belum ada booking servis
        </Text>

      ) : (

        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={({ item }) => (

            <View style={styles.card}>

              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />

              <View style={styles.content}>

                <Text style={styles.bookingId}>
                  Booking ID :
                  {' '}
                  {item.id}
                </Text>

                <Text style={styles.name}>
                  {item.title}
                </Text>

                <Text style={styles.category}>
                  Kategori :
                  {' '}
                  {item.category}
                </Text>

                <Text style={styles.price}>
                  Harga :
                  {' '}
                  {item.price}
                </Text>

                <Text style={styles.time}>
                  Estimasi :
                  {' '}
                  {item.time}
                </Text>

                <Text style={styles.date}>
                  Tanggal :
                  {' '}
                  {item.bookingDate}
                </Text>

              </View>

            </View>

          )}
        />

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.light(),
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark(),
    marginBottom: 20,
  },

  empty: {
    textAlign: 'center',
    marginTop: 80,
    fontSize: 16,
    color: colors.textSecondary(),
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
  },

  image: {
    width: 100,
    height: 120,
  },

  content: {
    flex: 1,
    padding: 12,
  },

  bookingId: {
    fontSize: 11,
    color: colors.textSecondary(),
    marginBottom: 4,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark(),
    marginBottom: 5,
  },

  category: {
    fontSize: 13,
    color: colors.primary(),
    marginBottom: 3,
  },

  price: {
    fontSize: 13,
    color: '#16A34A',
    fontWeight: 'bold',
    marginBottom: 3,
  },

  time: {
    fontSize: 13,
    color: colors.textSecondary(),
    marginBottom: 3,
  },

  date: {
    fontSize: 12,
    color: colors.textSecondary(),
  },

});