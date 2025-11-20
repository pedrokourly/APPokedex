import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation }) => ({
            title: 'Pokédex',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                <Ionicons name="heart" size={24} color={colors.white} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
          options={{ 
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: colors.white,
          }}
        />
        <Stack.Screen 
          name="Favorites" 
          component={FavoritesScreen}
          options={{ title: 'Favorites' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
