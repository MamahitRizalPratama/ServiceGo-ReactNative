import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import theme from '../../assets/theme';

const { colors } = theme;

export default function DiscoverScreen() {

  const navigation = useNavigation();

  const scrollY = new Animated.Value(0);

  const [search, setSearch] = useState('');

  const newsData = [
    {
      id: 1,
      title: 'Tips Merawat Motor Saat Musim Hujan',
      category: 'Perawatan',
      image:
        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
      desc:
        'Musim hujan dapat menyebabkan beberapa bagian motor cepat rusak jika tidak dirawat dengan baik.',
      content:
        'Saat musim hujan, pengendara motor perlu memperhatikan kebersihan rantai, rem, dan oli mesin. Air hujan dapat mempercepat karat pada bagian logam sehingga penting untuk mencuci motor setelah terkena hujan.',
    },

    {
      id: 2,
      title: 'Kapan Waktu Ideal Ganti Oli?',
      category: 'Oli',
      image:
        'https://www.adira.co.id/api/files/artikelgantiolijpg.jpg',
      desc:
        'Penggantian oli secara rutin membuat performa mesin lebih awet.',
      content:
        'Penggantian oli motor disarankan setiap 2000-3000 km tergantung jenis oli dan penggunaan kendaraan. Oli yang telat diganti dapat menyebabkan mesin cepat panas.',
    },

    {
      id: 3,
      title: 'Cara Mengetahui Aki Motor Mulai Lemah',
      category: 'Aki',
      image:
        'https://www.suzuki.co.id/uploads/image/2024/tanda_aki_lemah.png',
      desc:
        'Aki motor memiliki usia pemakaian tertentu dan perlu diperiksa secara berkala.',
      content:
        'Tanda aki mulai lemah biasanya ditunjukkan oleh starter yang sulit, lampu redup, dan klakson melemah. Segera lakukan pengecekan agar motor tidak mogok.',
    },

    {
      id: 4,
      title: 'Penyebab Ban Motor Cepat Botak',
      category: 'Ban',
      image:
         'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
      desc:
        'Ban cepat aus bisa dipengaruhi gaya berkendara dan tekanan angin.',
      content:
        'Tekanan ban yang tidak sesuai dan sering melakukan pengereman mendadak membuat ban cepat botak. Pastikan tekanan ban sesuai standar.',
    },
  ];

  // SEARCH FILTER
  const filteredNews = newsData.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.category
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.id
        .toString()
        .includes(search)
  );

  // HEADER ANIMATION
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              {
                translateY: headerTranslate,
              },
            ],
          },
        ]}
      >

        <Text style={styles.headerTitle}>
          Discover News
        </Text>

        <Text style={styles.headerSub}>
          Informasi & berita seputar servis motor
        </Text>

        {/* SEARCH */}
        <TextInput
          placeholder="Cari berita / id berita..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

      </Animated.View>

      {/* LIST */}
      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: 180,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
      >

        {filteredNews.length === 0 ? (

          <Text style={styles.empty}>
            Berita tidak ditemukan
          </Text>

        ) : (

          filteredNews.map((item) => (

            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('DetailNews', {
                  item,
                })
              }
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

                <Text style={styles.desc}>
                  {item.desc}
                </Text>

                {/* ID BERITA */}
                <Text style={styles.newsId}>
                  ID Berita : {item.id}
                </Text>

              </View>
            </TouchableOpacity>
          ))
        )}

      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.light(),
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    backgroundColor: colors.light(),
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark(),
  },

  headerSub: {
    marginTop: 5,
    color: colors.textSecondary(),
    fontSize: 14,
    marginBottom: 15,
  },

  // SEARCH
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 50,
    elevation: 2,
    color: colors.dark(),
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 200,
  },

  content: {
    padding: 15,
  },

  category: {
    color: colors.primary(),
    fontSize: 12,
    marginBottom: 5,
    fontWeight: '600',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark(),
    marginBottom: 8,
  },

  desc: {
    fontSize: 13,
    color: colors.textSecondary(),
    lineHeight: 20,
  },

  newsId: {
    marginTop: 10,
    color: colors.primary(),
    fontWeight: 'bold',
    fontSize: 12,
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: colors.textSecondary(),
  },
});