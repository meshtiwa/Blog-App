import React, {useContext, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context); //"Context" here is the actual object, not the class

    useEffect(() => {
        getBlogPosts(); //invoked only once to prevent an infinite loop of multiple rerenders

        const listener = navigation.addListener('didFocus', () => { //"addListener" - any time a certain screen is displayed (like index), invoke the thing inside the callback function
            getBlogPosts();
        });

        return () => { //this statement is invoked when index is NOT in focus
            listener.remove(); //do this to prevent a memory leak
        };
    }, [])

    return (
        <View>
            <FlatList 
                vertical={true}
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return (
                    <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id})}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.title} - {item.id}</Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Feather
                                    style={styles.trashIcon} 
                                    name="trash" 
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    );
                }}    
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => { // using the plus icon
    return { //this object that is returned from this function can be used to customize the header
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" size={30} />
          </TouchableOpacity>
        )
      };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title : {
        fontSize: 18
    },
    trashIcon: {
        fontSize: 24
    }
    

});

export default IndexScreen;