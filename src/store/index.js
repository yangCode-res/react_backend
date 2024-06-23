import { configureStore } from "@reduxjs/toolkit";
import TabReduce from "./reducers/tab"
export default configureStore({
    reducer:{
        tab:TabReduce
    }
})