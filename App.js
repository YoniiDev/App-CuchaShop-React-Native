import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { colors } from './src/constants/colors';
import { useFonts } from "expo-font"
import Navigator from './src/navigation/Navigator';
import { Provider, useSelector } from 'react-redux';
import store from './src/store';
import AppLayout from './src/components/darkModeLayout/AppLayout';
import Toast, { BaseToast } from 'react-native-toast-message';

const App = () => {

    const toastConfig = {
        success: (props) => (
            <BaseToast
                {...props}
                style={{
                    backgroundColor: 'white',
                    borderLeftColor: colors.green1,
                }}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
            />
        )
    }

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
                    <AppLayout>
                        <Navigator />
                        <Toast config={toastConfig} />
                    </AppLayout>
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