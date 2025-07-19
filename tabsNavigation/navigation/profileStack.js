import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/profile';
import DetallesUsuario from '../screens/detallesUsuario';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={Profile} />
      <Stack.Screen name="Detalle" component={DetallesUsuario} />
    </Stack.Navigator>
  );
}
