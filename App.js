import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  LoginScreen  from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
 

function HomeScreen({ navigation }) {
  return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button 
    title="Dasboard Screen"
    onPress={()=> navigation.navigate('DashboardScreen')}
    />
      </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="LoginScreen">
       <Stack.Screen name="Home" component={HomeScreen}/>
       <Stack.Screen name="LoginScreen" component={LoginScreen}/>
       <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});