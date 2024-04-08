import { FlatList, StyleSheet, View } from 'react-native'
import { colors } from '../constants/colors'
import CategoryItem from '../components/CategoryItem'
import categories from '../data/categories.json'

const Home = () => {
    return (
        <View style={styles.flatListContainer}>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={category => category}
                data={categories.sort()}
                renderItem={({ item }) => <CategoryItem category={item} />}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    flatListContainer: {
        backgroundColor: colors.yellow1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        gap: 10
    }
})