import { FlatList, StyleSheet, View } from 'react-native'
import { colors } from '../constants/colors'
import CategoryItem from '../components/CategoryItem'
import categories from '../data/categories.json'

const Home = ({ navigation }) => {
    
    return (
        <View style={styles.flatListContainer}>
            <FlatList
                style={styles.flatList}
                alignItems='center'
                showsVerticalScrollIndicator={false}
                keyExtractor={category => category.category}
                data={categories}
                renderItem={({ item }) =>  (
                    <CategoryItem
                        navigation={navigation}
                        category={item}
                    />
                )}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    flatListContainer: {
        backgroundColor: colors.white,
        flex: 1,
        width: '100%'
    },
    flatList: {

    }
})