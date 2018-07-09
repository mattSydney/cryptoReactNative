import { Platform } from 'react-native';    
import { 
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import devTools from 'remote-redux-devtools';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import RootReducer from './reducers';


import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';



const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
 };


 const reducer = persistReducer(persistConfig, RootReducer);
//const middleware = applyMiddleware(thunk, promise, logger);
const middleware = applyMiddleware(thunk, promise);

const Store = createStore(
    reducer,
    compose(
        middleware,       
        devTools({
            name: Platform.OS,
            hostname: 'localhost',
            port: 5678
        }),
    )
);

export default Store;