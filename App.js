import { StyleSheet } from 'react-native';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import initialScreen from './screens/initialScreen';
import loginScreen from './screens/loginScreen';
import registerScreen from './screens/registerScreen';
import passResetScreen from './screens/passResetScreen';
import homeScreen from './screens/homeScreen';
import favoritesScreen from './screens/favoritesScreen';
import movieOverview from './screens/movieOverview';


export default function App() {

  const Stack = createNativeStackNavigator();

  const fonts = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });


  if (!fonts) {
    return <AppLoading />;
  }

  const Dark = {
    dark: false,
    colors: {
      primary: '#F54038',
      background: '#000',
      card: '#000',
      text: '#ffff',
      border: '#000',
      notification: '#000',
    },
  };

  return (
    <NavigationContainer theme={Dark}>

      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Initial" component={initialScreen} />
        <Stack.Screen options={{ headerTitleAlign: 'center', headerTitleStyle: 'Inter_400Regular' }} name="Login" component={loginScreen} />
        <Stack.Screen options={{ headerTitleAlign: 'center', headerTitleStyle: 'Inter_400Regular', title: 'Cadastro' }} name="Register" component={registerScreen} />
        <Stack.Screen options={{ headerTitleAlign: 'center', headerTitleStyle: 'Inter_400Regular', title: 'Redefinir Senha' }} name="PassReset" component={passResetScreen} />
        <Stack.Screen options={{ headerBackVisible: false }} name="Home" component={homeScreen} />
        <Stack.Screen options={{ headerTitleStyle: 'Inter_400Regular', title: 'Movie Overview' }} name="Overview" component={movieOverview} />
        <Stack.Screen options={{}} name="Favorites" component={favoritesScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000'
  },
});
