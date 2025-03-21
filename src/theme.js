import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e', // black
    textSecondary: '#586069', // grey
    textOnBackground: '#ffffff', // white
    textOnPrimary: '#ffffff', // white
    primary: '#0366d6', // blue
    backgroundAppBar: '#24292e', // dark grey
    background: '#e6e6e6', // light grey
    backgroundOnBackground: '#ffffff',
    error: '#d73a4a', // red
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;