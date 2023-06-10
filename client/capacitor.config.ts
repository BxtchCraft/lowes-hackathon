import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lowes.hackathon',
  appName: 'PRO Competitive Pricing',
  webDir: 'public',
  server: {
    androidScheme: 'https',
    allowNavigation: ["https://hackathon-api-service.onrender.com"],
    cleartext: true,
  }
};

export default config;
