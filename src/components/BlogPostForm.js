import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const BlogPostForm = ({ onSubmit, initialValues }) => { //this form is created seperately since EDIT screen and CREATE screen share many of the same methods || edit: will replace code on submission
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);


    return ( 
        <View>
           <Text style={styles.label}>Enter Title:</Text> 
           <TextInput 
               style={styles.input}
               value={title} 
               onChangeText={(text) => setTitle(text)}
           /> 
           <Text style={styles.label}>Enter Content:</Text>
           <TextInput
               style={styles.input} 
               value={content} 
               onChangeText={(text) => setContent(text)}
            />
           <Button 
              title="Save Blog Post"
              onPress={() => onSubmit(title, content)}
           />
       </View>
       );


};

BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5
    }
});

export default BlogPostForm;

// <Button 
//                    title='SAVE + ADD'
//                    onPress={() => {
//                        addBlogPost(title, content, () => { //navigation.navigate('Index') is integrated with addBlogPost here because if in some scenario, you were fetching data from an API and it took a long time for that request to come in, then the app will immediately navigate back to the screen, and the person won't know what happened!
//                            navigation.navigate('Index')
//                        });
//                    }}
//                    //when we press on the plus sign to make a new post, a random id should be generated for that new blog post being made
//            />