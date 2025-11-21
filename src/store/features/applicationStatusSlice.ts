import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  savedClickStep : "",
  isApplicationIdGenerated: false,
  ScrutinyStatus: 0,
}


const fileUploadSlice = createSlice({
    name:'applicationstatus',
    initialState,
    reducers:{
        setSavedClickStep(state, action) {
           state.savedClickStep = "";
           state.savedClickStep = action.payload;
           return state;
        },
       setIsApplicationIdGenerated(state, action){
        state.isApplicationIdGenerated = false;
        state.isApplicationIdGenerated = action.payload
        return state;
       },
       setScrutinyStatus(state, action){
          state.ScrutinyStatus = action.payload;
          return state;
       },
       resetApplicationStatus(state){
        state = initialState;
        return state;
    }
        
    }
})

export const { setSavedClickStep, setIsApplicationIdGenerated, setScrutinyStatus, resetApplicationStatus } = fileUploadSlice.actions
export default fileUploadSlice.reducer