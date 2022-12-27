import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { setConversions } from "../utils/index.js";
import reducers from "./reducers/index.js";

//Middlewares
const middlewares = [thunk];

//Redux Logging
if (process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}
//chrome ext
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Creates redux store
 * @param {Object} preloadedState 
 */
export default function configureStore(preloadedState) {
    const store = createStore(
        reducers(),
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                ...middlewares
            )
        )
    );
    store.subscribe(() => {
        setConversions(store.getState().history.conversions);
    })
    return store
}