import React, { useState } from 'react';

import {
  View,
 Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import theme from '../../assets/theme';

import { supabase } from '../services/supabase';

const { colors } = theme;

export default function LoginScreen({
  navigation,
  setIsLogin,
}) {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  // ================= LOGIN =================
  const handleLogin = async () => {

    if (!email || !password) {
      Alert.alert('Isi email dan password');
      return;
    }

    try {

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password);

      if (error) {
        console.log(error);
        Alert.alert('Login gagal');
        return;
      }

      if (data.length > 0) {

        Alert.alert('Login berhasil');

        setIsLogin(true);

      } else {

        Alert.alert('Email atau password salah');

      }

    } catch (error) {

      console.log(error);

      Alert.alert('Terjadi kesalahan');

    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        ServiceGo
      </Text>

      <Text style={styles.subtitle}>
        Login to continue
      </Text>

      {/* EMAIL */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* PASSWORD */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* BUTTON LOGIN */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

      {/* REGISTER */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.register}>
          Belum punya akun? Register
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: colors.light(),
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary(),
  },

  subtitle: {
    marginBottom: 30,
    color: colors.textSecondary(),
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    elevation: 2,
  },

  button: {
    backgroundColor: colors.primary(),
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  register: {
    marginTop: 20,
    textAlign: 'center',
    color: colors.primary(),
  },
});