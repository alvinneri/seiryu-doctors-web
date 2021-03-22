import { combineReducers } from "redux";

import publicReducer from "./public/reducers";
import adminReducer from "./admin/reducers";
import loaderReducer from "./loader/reducers";

const rootReducer = (state, action, history) => {
  const allReducers = combineReducers({
    public: publicReducer,
    admin: adminReducer,
    loader: loaderReducer,
  });

  return allReducers(state, action);
};

export default rootReducer;
