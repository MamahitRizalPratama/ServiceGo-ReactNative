import React, { useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';

import { Clock, Star } from 'lucide-react-native';
import theme from '../../assets/theme';

const { colors } = theme;

export default function DetailScreen({
  route,
  navigation,
  setBookmarks,
}) {

  const { item } = route.params;

  const scaleAnim = useRef(
    new Animated.Value(1)
  ).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleBooking = () => {

    if (setBookmarks) {

      const bookingData = {
        id: Date.now(),
        title: item.title,
        category: item.category,
        price: item.price,
        time: item.time,
        image: item.image,
        bookingDate: new Date().toLocaleDateString(),
      };

      setBookmarks((prev) => [
        ...prev,
        bookingData,
      ]);
    }

    const message =
      `Halo, saya ingin memesan layanan ${item.title} dengan harga ${item.price}`;

    const url =
      `https://wa.me/6282257765307?text=${encodeURIComponent(message)}`;

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>

      <ImageBackground
        source={{ uri: item.image }}
        style={styles.image}
        imageStyle={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>
            ←
          </Text>
        </TouchableOpacity>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {item.category}
          </Text>
        </View>

      </ImageBackground>

      <View style={styles.content}>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.price}>
          {item.price}
        </Text>

        <Text style={styles.desc}>
          Layanan {item.title} dilakukan oleh mekanik profesional
          dan berpengalaman untuk menjaga performa kendaraan
          tetap optimal.
        </Text>

        <View style={styles.infoRow}>

          <Clock
            size={14}
            color={colors.textSecondary()}
          />

          <Text style={styles.infoText}>
            {item.time}
          </Text>

          <Star
            size={14}
            color={colors.accent()}
          />

          <Text style={styles.infoText}>
            {item.rating}
          </Text>

        </View>

        <Animated.View
          style={{
            transform: [
              {
                scale: scaleAnim,
              },
            ],
          }}
        >

          <TouchableOpacity
            style={styles.button}
            onPress={handleBooking}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>
              Booking via WhatsApp
            </Text>
          </TouchableOpacity>

        </Animated.View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.light(),
  },

  image: {
    width: '120%',
    height: 250,
    justifyContent: 'space-between',
    padding: 20,
  },

  backBtn: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  badge: {
    backgroundColor: colors.primary(),
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },

  badgeText: {
    color: '#fff',
    fontSize: 12,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.dark(),
    marginBottom: 10,
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary(),
    marginBottom: 10,
  },

  desc: {
    fontSize: 14,
    color: colors.textSecondary(),
    lineHeight: 22,
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },

  infoText: {
    fontSize: 12,
    color: colors.textSecondary(),
  },

  button: {
    backgroundColor: colors.primary(),
    padding: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});