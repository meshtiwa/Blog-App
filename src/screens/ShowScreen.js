import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(Context);
    //blogPostofSS -> blogPost that is going to show up on ShowScreen
    const blogPostofSS = state.find((blogPost) => blogPost.id === navigation.getParam('id')); //find and set blogPostofSS to the blogpost that we click on 

    return (
     <View>
        <Text style={styles.title}>{blogPostofSS.title}</Text>
        <Text>{blogPostofSS.content}</Text>
    </View>
    );
};

ShowScreen.navigationOptions = ({ navigation }) => { //the edit icon
    return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id')})}>
              <EvilIcons name="pencil" size={35} />
          </TouchableOpacity>
        )
      };
};

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});

export default ShowScreen;