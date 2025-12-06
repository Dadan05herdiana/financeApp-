# 📱 Panduan Lengkap Build APK - Finance App

## 🚀 Cara Setup & Build

### Opsi 1: Menggunakan Expo (TERMUDAH - DIREKOMENDASIKAN)

#### Langkah 1: Install Node.js
Download dan install Node.js dari https://nodejs.org (versi LTS)

#### Langkah 2: Install Expo CLI
```bash
npm install -g expo-cli
```

#### Langkah 3: Buat Project
```bash
npx create-expo-app FinanceApp
cd FinanceApp
```

#### Langkah 4: Install Dependencies
```bash
npm install @react-native-async-storage/async-storage
npm install react-native-chart-kit
npm install react-native-svg
```

#### Langkah 5: Copy Semua File
- Copy semua file yang saya berikan ke folder project:
  - `App.js` → root folder
  - `src/components/` → buat folder ini dan copy semua component
  - `src/screens/` → buat folder ini dan copy semua screen
  - `src/utils/` → buat folder ini dan copy helpers.js

#### Langkah 6: Struktur Folder
```
FinanceApp/
├── App.js
├── package.json
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── TabNavigation.js
│   │   ├── FloatingButton.js
│   │   ├── TransactionModal.js
│   │   └── DebtModal.js
│   ├── screens/
│   │   ├── TransactionsTab.js
│   │   ├── DebtsTab.js
│   │   ├── ReportsTab.js
│   │   └── AIAdvisorTab.js
│   └── utils/
│       └── helpers.js
└── assets/
```

#### Langkah 7: Test di Emulator/HP
```bash
# Test di browser
npm start

# Test di Android
npm run android

# Test di iOS (hanya di Mac)
npm run ios
```

#### Langkah 8: Build APK dengan EAS

##### A. Install EAS CLI
```bash
npm install -g eas-cli
```

##### B. Login ke Expo
```bash
eas login
# Daftar dulu di expo.dev jika belum punya akun
```

##### C. Configure EAS
```bash
eas build:configure
```

##### D. Build APK
```bash
# Build untuk Android
eas build --platform android --profile preview

# Atau untuk production
eas build --platform android --profile production
```

##### E. Download APK
Setelah build selesai (±15-20 menit), download APK dari dashboard Expo atau link yang diberikan.

---

### Opsi 2: Build Manual dengan React Native CLI (Lebih Kompleks)

#### Prerequisites:
- Node.js (v16+)
- JDK 11
- Android Studio
- Android SDK

#### Langkah 1: Install React Native CLI
```bash
npm install -g react-native-cli
```

#### Langkah 2: Create Project
```bash
npx react-native init FinanceApp
cd FinanceApp
```

#### Langkah 3: Install Dependencies
```bash
npm install @react-native-async-storage/async-storage
npm install react-native-chart-kit
npm install react-native-svg
npm install react-native-vector-icons
```

#### Langkah 4: Link Native Modules
```bash
npx react-native link
```

#### Langkah 5: Setup Android
1. Buka `android/app/build.gradle`
2. Update `versionCode` dan `versionName`
3. Tambahkan permissions di `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

#### Langkah 6: Generate Release APK
```bash
cd android
./gradlew assembleRelease
```

APK akan ada di: `android/app/build/outputs/apk/release/app-release.apk`

#### Langkah 7: Install APK di HP
Transfer file `app-release.apk` ke HP Android dan install.

---

## 🔧 Troubleshooting

### Error: "Unable to load script"
```bash
npm start -- --reset-cache
```

### Error: "Task :app:validateSigningRelease FAILED"
Buat keystore baru:
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### Error: "SDK location not found"
Buat file `local.properties` di folder `android/`:
```
sdk.dir=/Users/USERNAME/Library/Android/sdk
# atau di Windows:
# sdk.dir=C:\\Users\\USERNAME\\AppData\\Local\\Android\\Sdk
```

### Build Gagal di EAS
Pastikan `app.json` sudah benar:
```json
{
  "expo": {
    "name": "Finance App",
    "slug": "finance-app",
    "version": "1.0.0",
    "android": {
      "package": "com.yourcompany.financeapp",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#6366f1"
      }
    }
  }
}
```

---

## 📦 File Yang Belum Saya Berikan

Anda masih perlu membuat:

### 1. `src/screens/DebtsTab.js`
### 2. `src/screens/ReportsTab.js`
### 3. `src/components/DebtModal.js`

Mau saya buatkan file-file ini sekarang?

---

## 🎯 Rekomendasi Saya

**Untuk Pemula:** Gunakan **Expo + EAS Build**
- Paling mudah
- Tidak perlu setup Android Studio
- Build di cloud (gratis untuk personal)
- Dapat APK dalam 20 menit

**Untuk Developer Berpengalaman:** Gunakan **React Native CLI**
- Kontrol penuh
- Bisa custom native module
- Build lokal

---

## 📱 Testing di HP

### Via Expo Go (Tanpa Build)
1. Install "Expo Go" dari Play Store
2. Jalankan `npm start`
3. Scan QR code dengan Expo Go
4. App langsung jalan di HP!

### Via APK
1. Enable "Install from Unknown Sources" di HP
2. Transfer APK
3. Install APK
4. Buka app

---

## 🚀 Deploy ke Google Play Store

1. Build production APK dengan EAS
2. Buat akun Google Play Console ($25 satu kali)
3. Upload APK
4. Isi detail app (screenshot, deskripsi, dll)
5. Submit untuk review
6. Tunggu approval (1-3 hari)

---

## 💰 Biaya

- **Expo Free Plan:** Gratis (limit 30 build/bulan)
- **Expo Production Plan:** $29/bulan
- **Google Play Developer:** $25 (sekali seumur hidup)

---

## ❓ Butuh Bantuan?

Jika ada error, screenshot dan kirim ke saya. Saya akan bantu troubleshoot!

Mau saya buatkan file-file yang masih kurang (DebtsTab, ReportsTab, DebtModal)?