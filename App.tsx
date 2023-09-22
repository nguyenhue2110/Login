import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from './src/features/authentication/onboarding';

const AuthenticationStack = createNativeStackNavigator();

const AuthenticationNagivator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{headerShown: false}}>
      <AuthenticationStack.Screen name="OnBoarding" component={OnBoarding} />
    </AuthenticationStack.Navigator>
  );
};
function App() {
  return (
    <NavigationContainer>
      <AuthenticationNagivator />
    </NavigationContainer>
  );
}

export default App;
