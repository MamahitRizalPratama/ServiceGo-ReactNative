import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import theme from '../../assets/theme';

import { supabase } from '../services/supabase';

const { colors } = theme;

export default function ProfileScreen() {

  const [profiles, setProfiles] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plat, setPlat] = useState('');
  const [vehicleType, setVehicleType] = useState('Mobil');
  const [selectedId, setSelectedId] = useState(null);

  // ================= GET =================
  const getProfiles = async () => {

    const { data, error } = await supabase
      .from('profiles')
      .select('*');

    if (error) {
      console.log(error);
      return;
    }

    setProfiles(data);
  };

  useEffect(() => {
    getProfiles();
  }, []);

  // ================= POST =================
  const addProfile = async () => {

    if (!name || !email || !plat || !vehicleType) {
      Alert.alert('Isi semua data');
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          name,
          email,
          plat,
          vehicleType
        },
      ])
      .select();

    if (error) {
      console.log(error);
      return;
    }

    setProfiles([...profiles, data[0]]);

    setName('');
    setEmail('');
    setPlat('');
    setVehicleType('Mobil');

    Alert.alert('Data berhasil ditambah');
  };

  // ================= PUT =================
  const updateProfile = async () => {

    const { data, error } = await supabase
      .from('profiles')
      .update({
        name,
        email,
        plat,
        vehicleType,
      })
      .eq('id', selectedId)
      .select();

    if (error) {
      console.log(error);
      return;
    }

    const updatedData = profiles.map((item) =>
      item.id === selectedId
        ? data[0]
        : item
    );

    setProfiles(updatedData);

    setSelectedId(null);

    setName('');
    setEmail('');
    setPlat('');
    setVehicleType('Mobil');

    Alert.alert('Data berhasil diupdate');
  };

  // ================= DELETE =================
  const deleteProfile = async (id) => {

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    if (error) {
      console.log(error);
      return;
    }

    const filtered = profiles.filter(
      (item) => item.id !== id
    );

    setProfiles(filtered);

    Alert.alert('Data berhasil dihapus');
  };

  // ================= EDIT =================
  const selectProfile = (item) => {
    setSelectedId(item.id);
    setName(item.name);
    setEmail(item.email);
    setPlat(item.plat || '');
    setVehicleType(item.vehicleType || 'Mobil');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile Supabase CRUD</Text>

      <TextInput
        placeholder="Nama"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Plat"
        value={plat}
        onChangeText={setPlat}
        style={styles.input}
      />
      <View style={styles.typeRow}>
        {['Mobil', 'Motor'].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setVehicleType(type)}
            style={[
              styles.typeOption,
              vehicleType === type && styles.typeOptionSelected,
            ]}
          >
            <Text
              style={[
                styles.typeText,
                vehicleType === type && styles.typeTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* BUTTON */}
      {selectedId ? (
        <TouchableOpacity
          style={styles.button}
          onPress={updateProfile}
        >
          <Text style={styles.buttonText}>
            UPDATE
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={addProfile}
        >
          <Text style={styles.buttonText}>
            POST DATA
          </Text>
        </TouchableOpacity>
      )}

      {/* LIST */}
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            {item.plat ? <Text style={styles.subtitle}>Plat: {item.plat}</Text> : null}
            {item.vehicleType ? <Text style={styles.subtitle}>Tipe: {item.vehicleType}</Text> : null}
            <View style={styles.row}>

              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => selectProfile(item)}
              >
                <Text style={styles.btnText}>
                  PUT
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteProfile(item.id)}
              >
                <Text style={styles.btnText}>
                  DELETE
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        )}
      />
    </SafeAreaView>
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

  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
    elevation: 2,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  typeOption: {
    flex: 1,
    backgroundColor: colors.border(),
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  typeOptionSelected: {
    backgroundColor: colors.primary(),
  },
  typeText: {
    color: colors.textSecondary(),
    fontWeight: '600',
  },
  typeTextSelected: {
    color: '#fff',
  },
  subtitle: {
    color: colors.textSecondary(),
    marginTop: 4,
  },

  button: {
    backgroundColor: colors.primary(),
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark(),
  },

  email: {
    color: colors.textSecondary(),
    marginTop: 5,
  },

  row: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },

  editBtn: {
    flex: 1,
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  deleteBtn: {
    flex: 1,
    backgroundColor: '#EF4444',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});