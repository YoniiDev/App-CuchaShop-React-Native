import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { colors } from './src/constants/colors';
import { useFonts } from "expo-font"
import Navigator from './src/navigation/Navigator';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
    const [fontsLoaded, fontError] = useFonts({

        //OPEN SANS SEMICONDENSED
        'OpenSans_SemiCondensed-Light': require('./assets/fonts/Open_Sans/static/OpenSans_SemiCondensed-Light.ttf'),
        'OpenSans_SemiCondensed-Regular': require('./assets/fonts/Open_Sans/static/OpenSans_SemiCondensed-Regular.ttf'),
        'OpenSans_SemiCondensed-Medium': require('./assets/fonts/Open_Sans/static/OpenSans_SemiCondensed-Medium.ttf'),
        'OpenSans_SemiCondensed-SemiBold': require('./assets/fonts/Open_Sans/static/OpenSans_SemiCondensed-SemiBold.ttf'),
        'OpenSans_SemiCondensed-Bold': require('./assets/fonts/Open_Sans/static/OpenSans_SemiCondensed-Bold.ttf'),
        'OpenSans_SemiCondensed-ExtraBold': require('./assets/fonts/Open_Sans/static/OpenSans_SemiCondensed-ExtraBold.ttf'),

        //OPEN SANS CONDENSED
        'OpenSans_Condensed-Light': require('./assets/fonts/Open_Sans/static/OpenSans_Condensed-Light.ttf'),
        'OpenSans_Condensed-Regular': require('./assets/fonts/Open_Sans/static/OpenSans_Condensed-Regular.ttf'),
        'OpenSans_Condensed-Medium': require('./assets/fonts/Open_Sans/static/OpenSans_Condensed-Medium.ttf'),
        'OpenSans_Condensed-SemiBold': require('./assets/fonts/Open_Sans/static/OpenSans_Condensed-SemiBold.ttf'),
        'OpenSans_Condensed-Bold': require('./assets/fonts/Open_Sans/static/OpenSans_Condensed-Bold.ttf'),
        'OpenSans_Condensed-ExtraBold': require('./assets/fonts/Open_Sans/static/OpenSans_Condensed-ExtraBold.ttf'),
    });

    if (!fontsLoaded || fontError) {
        return null
    }
    if (fontsLoaded && !fontError) {
        return (
            <SafeAreaView style={styles.container} >
                <Provider store={store}>
                    <Navigator />
                </Provider>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: colors.white,
    }
})

export default App;