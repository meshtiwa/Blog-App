import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

//"state" is our list of blog posts we have
const blogReducer = (state, action) => {
    switch (action.type) { // depending on the action type, run a certain method such as deletion, addition, or manipulation of the blogposts
        case 'delete_blogpost': // "payload" is the id for the blog post that we want to DELETE
            return state.filter((blogPost) => blogPost.id !== action.payload ); //filter function iterates through all elements in the state array and runs the child a function that we pass in
        // case 'add_blogpost': //not necessary now b/c the data is being posted/sent to the json server
        //     return [
        //         ...state, 
        //         {
        //          id: Math.floor(Math.random()*99999), //id is randomly generated for each blogpost
        //          title: action.payload.title,
        //          content: action.payload.content
        //         }
        //     ];
        case 'edit_blogpost':
            return state.map((blogPost) => { // looping through each blogPost; if the current blogPost id matches the one we just edited, return the edited one
                if (blogPost.id === action.payload.id) {
                    return action.payload;
                } else {
                    return blogPost;
                }
            });
        case 'get_blogposts':
            return action.payload; //our TOTAL information bc its a response from our JSON server; no need to apply it to a state
        default:
            return state;
    }
};

const getBlogPosts = (dispatch) => {
    return async () => { //async bc we are making a network request
        const response = await jsonServer.get('/blogposts') //blogposts is concenated with the baseURl by ngrok 
        //response.data = [{}, {}, {}] -> every object is our blogpost
        dispatch({ type: 'get_blogposts', payload: response.data}); //this {} <- object gets passed in as "action" for our blogReducer function
    };
};

const addBlogPost = (dispatch) => { //this function is also being used when the "plus" icon is clicked on, in addition to the button in the indexScreen 
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', {title, content})
        callback();
        // dispatch({ type: 'add_blogpost', payload: { title, content } })//dispatch is created from the createDataContext file
        // callback(); //navigates back to whatever ONLY after action has been dispatched
    };
};
const deleteBlogPost = (dispatch) => { //passing in the id for the blog post that needs to be deleted
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`); //server side deletion
        dispatch({ type: 'delete_blogpost', payload: id}) //this id is from the math.random in add_blogpost
    };
};

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title, content}) //server side edit
        dispatch({ type: 'edit_blogpost', payload: {id, title, content}})
        callback();
    };
};

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts }, []);



//---before the automation---
// import React, { useReducer } from 'react';
// const BlogContext = React.createContext(); //this "BlogContext" object is responsible for moving information from the blog post provider to any class directly

// const blogReducer = (state, action) => {
//     switch (action.type) { // depending on the action type, run a certain method such as deletion, addition, or manipulation of the blogposts
//         case 'add_blogpost':
//             return [...state, { title: `Blog Post #${state.length + 1}` }];
//         default:
//             return state;
//     }
// };

// export const BlogProvider = ({ children }) => {
//     const [blogPosts, dispatch] = useReducer(blogReducer, []);

//     const addBlogPost = () => {
//         dispatch({ type: 'add_blogpost' });
//     };

//   return (
//   <BlogContext.Provider value={{ data: blogPosts, addBlogPost}}>
//       {children}
//   </BlogContext.Provider>
//   );
// };





// -----a less optimal but still good way to do it RIGHT BELOW!!!!!!!-----

//export default BlogContext;

// import React, { useState } from 'react';

// const BlogContext = React.createContext(); //this "BlogContext" object is responsible for moving information from the blog post provider to any class directly

// export const BlogProvider = ({ children }) => {
//     const [blogPosts, setBlogPosts] = useState([]);
    
//     const addBlogPost = () => { //creating a helper function so that new blog posts can be added to the previous list
//         setBlogPosts([...blogPosts, { title: `Blog Post #${blogPosts.length + 1}`} ]);
//     };

//   return (
//   <BlogContext.Provider value={{ data: blogPosts, addBlogPost}}>
//       {children}
//   </BlogContext.Provider>
//   );
// };

// export default BlogContext;