const colors = {
  primary: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`, // hijau utama
  secondary: (opacity = 1) => `rgba(5, 150, 105, ${opacity})`, // hijau tua
  accent: (opacity = 1) => `rgba(234, 179, 8, ${opacity})`, // kuning aksen
  
  light: (opacity = 1) => `rgba(248, 250, 252, ${opacity})`,
  dark: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`,
  
  textPrimary: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
  textSecondary: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,

  border: (opacity = 1) => `rgba(226, 232, 240, ${opacity})`,
};

export default colors;