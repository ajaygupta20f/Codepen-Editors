import projectReducer from "./projectReducer";
import searchReducer from "./searchReducer"
import userAuthReducer from "./userAuthReducer";
import { combineReducers} from "redux";
const myReducer=combineReducers({
     user:userAuthReducer,
     projects:projectReducer,
     searchTerm: searchReducer
})

export default myReducer;