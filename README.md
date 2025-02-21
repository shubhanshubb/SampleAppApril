Movie Browser App

Overview

This is a React Native application that allows users to browse movies from TMDB (The Movie Database) using the provided APIs. The app features navigation, API integration, and a user-friendly UI to display movie details.

Features

Browse movies categorized as Now Playing, Popular, Top Rated, and Upcoming.

View movie details including poster, title, release date, and average rating.

Tabbed navigation for easy category switching.

Custom user context for state management.

Prerequisites

Before running the project, ensure you have the following installed:

Node.js (latest LTS version recommended)

React Native CLI or Expo

Git (for version control)

Setup Instructions

1. Clone the Repository

git clone <repository-url>
cd MovieBrowserApp

2. Install Dependencies

npm install

3. Set Up TMDB API

Create an account at TMDB Developer.

Get your API key and add it to src/api/tmdbApi.js.

4. Run the Application

For iOS (Mac users only):

npx react-native run-ios

For Android:

npx react-native run-android

Dependencies

The project uses the following dependencies:

{
  "@react-navigation/bottom-tabs": "^7.2.0",
  "@react-navigation/native": "^7.0.14",
  "@react-navigation/stack": "^7.1.1",
  "axios": "^1.7.9",
  "react": "18.3.1",
  "react-native": "0.77.0",
  "react-native-gesture-handler": "^2.24.0",
  "react-native-reanimated": "^3.16.7",
  "react-native-safe-area-context": "^5.2.0",
  "react-native-screens": "^4.8.0",
  "react-native-vector-icons": "^10.2.0"
}

Project Structure

MovieBrowserApp/
│── src/
│   ├── api/
│   │   ├── tmdbApi.js  # Handles API requests
│   ├── navigation/
│   │   ├── AppNavigator.js  # Manages navigation
│   │   ├── BottomTab.js  # Manages bottom navigation
│   ├── screens/
│   │   ├── HomeScreen.js  # Displays movie categories
│   │   ├── DetailsScreen.js  # Displays movie details
│   ├── bottomTabs/
│   │   ├── Play.js  # Displays current movie categories
│   │   ├── Popular.js  # Displays popular movie details
│   │   ├── Rated.js  # Displays rated movie categories
│   │   ├── Upcoming.js  # Displays upcoming movie details
│   ├── Components/
│   │   ├── MovieCard.js  # UI component for movies
│── App.js  # Entry point
│── UserContext.js  # User state management
│── Splash.js  # Splash Screen
│── package.json  # Project dependencies

App.js File

import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import UserProvider from './UserContext';

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;

Contribution

Feel free to fork the repository and contribute! Submit a pull request with any improvements.

License

This project is licensed under the MIT License.

