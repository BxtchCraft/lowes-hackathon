import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lowes.hackathon',
  appName: 'PRO Competitive Pricing',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
