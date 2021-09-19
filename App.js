import React from 'react';
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'; 
import IndexScreen from './src/screens/IndexScreen';
import { Provider } from './src/context/BlogContext';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

const navigator = createStackNavigator({ //creating the navigator object 
  Index: IndexScreen,
  Show: ShowScreen,
  Create: CreateScreen,
  Edit: EditScreen
}, {
  initialRouteName: 'Index',
  defaultNavigationOptions: {
    title: 'Blogs'
  }
});

const App = createAppContainer(navigator); //"createAppContainer" takes a navigator object and makes a component out of it

export default () => { //created a custom component so that we can wrap our entire component around every component in this project (so we can actually customize this!)
  //"App" is being passed as the "children" (essentially, this file is passing App into the BlogProvider component)
  return (// 
    <Provider> 
      <App />
    </Provider>
  ); //this component called "provider" has a global value that is passed down to all of the App
};