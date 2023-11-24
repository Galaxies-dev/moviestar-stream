import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export const unstable_settings = {
  initialRouteName: 'index',
};

const Layout = () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.blue7.get(),
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'My Favorites',
          headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        }}
      />
      <Stack.Screen
        name="movie/[id]"
        options={{
          title: '',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="tv/[id]"
        options={{
          title: '',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
};
export default Layout;
