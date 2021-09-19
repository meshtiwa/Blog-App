import React, { useReducer} from 'react';

//this file is basically what we are doing in "BlogContext" but in a more automated fashion

export default (reducer, actions, initialState) => {
    const Context = React.createContext();

    const Provider = ({ children }) => { 
        const [state, dispatch] = useReducer(reducer, initialState);

        const boundActions = {};
        for (let key in actions){
            //key === 'addBlogPost'
            boundActions[key] = actions[key](dispatch);
        }

        return ( //this value is making the blogposts (state) available to all the classes in the entire App
            <Context.Provider value={{ state, ...boundActions }}> 
                {children}
            </Context.Provider>
        );
    };
    return { Context, Provider };
};