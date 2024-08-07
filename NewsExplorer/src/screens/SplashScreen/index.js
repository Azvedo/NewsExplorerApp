import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Logo } from '../../components/atoms/Logo';


export const SplashScreen = () =>{
  return (
    <View style={styles.container}>
      <Logo height={150} width={350}/>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 20, 20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
