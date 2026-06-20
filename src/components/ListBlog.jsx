import React from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Bookmark, BookmarkCheck } from 'lucide-react-native';
import theme from '../../assets/theme';

const { colors } = theme;

const data = [
  {
    id: 1,
    title: 'Servis Motor Lengkap',
    category: 'Servis',
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3',
  },
  {
    id: 2,
    title: 'Ganti Oli Mesin',
    category: 'Oli',
    image:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e',
  },
  {
    id: 3,
    title: 'Penggantian Ban',
    category: 'Ban',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
  },
  {
    id: 4,
    title: 'Ganti Aki',
    category: 'Aki',
    image:
       'https://dynavolt.co.id/wp-content/uploads/2025/05/Pemasangan-Aki-Motor-Dynavolt-Pada-Aerox-3-1.jpg',
  },
  {
    id: 5,
    title: 'Cuci Kendaraan',
    category: 'Cuci',
    image:
        'https://blog.moservice.id/wp-content/uploads/2023/02/cara-mencuci-motor-agar-tampil-kinclong-mengkilap.jpeg',
  },
];

export default function ListBlog({
  category,
  onSelect,
  onBookmark,
  bookmarks,
}) {
  const filteredData = data.filter(
    (item) => item.category === category
  );

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const isBookmarked = bookmarks.some(
          (b) => b.id === item.id
        );

        return (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onSelect(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.description}>
                {item.description}
              </Text>

              <TouchableOpacity
                style={styles.bookmark}
                onPress={() => onBookmark(item)}
              >
                {isBookmarked ? (
                  <BookmarkCheck
                    size={22}
                    color={colors.primary()}
                  />
                ) : (
                  <Bookmark
                    size={22}
                    color={colors.textSecondary()}
                  />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark(),
  },
  description: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textSecondary(),
  },
  bookmark: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});