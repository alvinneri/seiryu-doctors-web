import { combineReducers } from "redux";

import publicReducer from "./public/reducers";
import adminReducer from "./admin/reducers";
import loaderReducer from "./loader/reducers";
import recruiterReducer from "./recruiter/reducers";

const rootReducer = (state, action, history) => {
  const allReducers = combineReducers({
    public: publicReducer,
    admin: adminReducer,
    loader: loaderReducer,
    recruiter: recruiterReducer,
  });

  return allReducers(state, action);
};

export default rootReducer;
