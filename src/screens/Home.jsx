import { FlatList } from 'react-native'
import CategoryItem from '../components/CategoryItem'
import categories from '../data/categories.json'
import ShopLayout from '../components/darkModeLayout/ShopLayout'

const Home = ({ navigation }) => {

    return (
        <ShopLayout>
            <FlatList
                alignItems='center'
                showsVerticalScrollIndicator={false}
                keyExtractor={category => category.category}
                data={categories}
                renderItem={({ item }) => (
                    <CategoryItem
                        navigation={navigation}
                        category={item}
                    />
                )}
            />
        </ShopLayout>


    )
}

export default Home