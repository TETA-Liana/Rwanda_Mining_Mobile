# Rwanda Mining Week Check-In App

A React Native mobile application for scanning QR codes and verifying attendee eligibility at the Rwanda Mining Week event.

## Features

- **QR Code Scanning**: Scan QR codes or IDs to verify attendee status
- **Real-time Verification**: Check against mock database for eligibility
- **Admin Dashboard**: View statistics and recent scans
- **Modern UI**: Clean, Rwanda-themed design with TailwindCSS
- **Mock Data**: Simulated attendee, sponsor, and exhibitor data

## Tech Stack

- **React Native** with Expo
- **TailwindCSS** via NativeWind
- **React Navigation** (Stack + Tab navigation)
- **Expo Barcode Scanner** for QR code scanning
- **Zustand** for state management
- **React Native SVG Charts** for data visualization

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS) or Android Studio (for Android)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd RwandaMiningMobile
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your phone

## Project Structure

```
RwandaMiningMobile/
├── src/
│   ├── data/           # Mock JSON data files
│   ├── screens/        # React Native screens
│   ├── services/       # Data services and API calls
│   └── store/          # Zustand state management
├── assets/             # App icons and images
├── App.js              # Main app component
├── package.json        # Dependencies
├── app.json           # Expo configuration
├── tailwind.config.js # TailwindCSS configuration
└── babel.config.js    # Babel configuration
```

## Usage

### Scanning QR Codes

1. **Home Screen**: Tap "Start Scanning" to begin
2. **Scanner Screen**:
   - Point camera at QR code
   - Or use "Mock Scan" button for testing
3. **Result Screen**: View attendee details and eligibility status

### Admin Dashboard

- **Statistics**: View total scans, valid/invalid counts
- **Charts**: Pie chart showing breakdown by role
- **Recent Scans**: List of last 10 scanned people
- **Quick Actions**: Start scanning or export data

### Mock Data

The app includes mock data for testing:

- **Attendees**: 5 registered attendees
- **Sponsors**: 4 sponsors with different levels
- **Exhibitors**: 5 exhibitors with booth numbers

**Valid IDs for testing:**

- `ATT001`, `ATT002`, `ATT003`, `ATT004`, `ATT005`
- `SPO001`, `SPO002`, `SPO003`, `SPO004`
- `EXH001`, `EXH002`, `EXH003`, `EXH004`, `EXH005`

**Invalid IDs for testing:**

- `INVALID001`, `TEST123`, or any other ID

## Customization

### Colors

Rwanda-themed colors are defined in `tailwind.config.js`:

- `rwanda-green`: #1a5f3c (Primary green)
- `rwanda-gold`: #f4c430 (Gold accent)
- `rwanda-blue`: #0066cc (Blue accent)
- `rwanda-red`: #ce1126 (Red accent)

### Mock Data

Edit the JSON files in `src/data/` to modify the mock database:

- `attendees.json` - Attendee data
- `sponsors.json` - Sponsor data
- `exhibitors.json` - Exhibitor data

### Adding Real Backend

Replace the mock data service in `src/services/dataService.js` with real API calls:

```javascript
export const lookupPerson = async (scannedId) => {
  try {
    const response = await fetch(`https://your-api.com/attendees/${scannedId}`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      data: {
        /* error data */
      },
    };
  }
};
```

## Troubleshooting

### Common Issues

1. **Camera Permission Denied**

   - The app will show a fallback screen with "Mock Scan" option
   - Enable camera permissions in device settings

2. **Metro Bundler Issues**

   ```bash
   npm start -- --clear
   ```

3. **NativeWind Not Working**

   ```bash
   npm install nativewind@latest
   npx tailwindcss init
   ```

4. **Expo Go Issues**
   - Make sure you have the latest Expo Go app
   - Try clearing Expo Go cache

### Development Tips

- Use the "Mock Scan" button for quick testing without camera
- Check the Dashboard tab to see scan history
- Use the "Clear All" button in Dashboard to reset data
- Pull to refresh on Dashboard to update statistics

## Building for Production

1. **Configure app.json** with your app details
2. **Add proper icons** in the assets folder
3. **Build the app**:
   ```bash
   expo build:android  # For Android
   expo build:ios      # For iOS
   ```

## License

This project is created for demonstration purposes. Feel free to modify and use for your own events.

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review Expo documentation
3. Check React Navigation documentation
4. Verify all dependencies are properly installed
