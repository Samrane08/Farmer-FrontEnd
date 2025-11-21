import { createSlice } from "@reduxjs/toolkit";

const initialState = { token : "", isAadharVerified : false, isMobileVerified: false, isEmailVerified: false, isHostelExistingEnable: false, isHostelNewEnable: false, isSwadharExistingEnable: false, isSwadharNewEnable: false, isPaymentEnable: false, userRole:"", isFirstLogin: false, isAapaleSarkarLogin: false, applicationMarathiMessage : "", applicationEnglishMessage : "", IsNew: false };

const authenticateSlice = createSlice({
    name:'authenticate',
    initialState,
    reducers:{
        setToken(state, action) {
            state.token = action.payload;
        },
        setIsFirstLogin(state, action){
            state.isFirstLogin = action.payload;
            return state;
        },
        setUserRole(state, action) {
            state.userRole = action.payload;
            return state;
        },
        setAadharVerified(state, action) {
            state.isAadharVerified = action.payload;
            return state;
        },
        setMobileEmailVerified(state, action) {
            state.isMobileVerified = action.payload.isMobileVerified
            state.isEmailVerified = action.payload.isEmailVerified
            return state;
        },
        setHostelExistingEnable(state, action){
            state.isHostelExistingEnable = action.payload
            return state;
        },
        setHostelNewEnable(state, action){
            state.isHostelNewEnable = action.payload
            return state;
        },
        setSwadharExistingEnable(state, action){
            state.isSwadharExistingEnable = action.payload
            return state;
        },
        setSwadharNewEnable(state, action){
            state.isSwadharNewEnable = action.payload
            return state;
        },
        setPaymentEnable(state, action){
            state.isPaymentEnable = action.payload
            return state;
        },
        setIsAapaleSarkarLogin(state, action){
            state.isAapaleSarkarLogin = action.payload;
            return state;
        },
        resetAllAuthentication(state){
            state = initialState;
            return state;
        },
        setApplicationMarathiMessage(state, action) {
            state.applicationMarathiMessage = action.payload;
            return state;
        },
        setApplicationEnglishMessage(state, action) {
            state.applicationEnglishMessage = action.payload;
            return state;
        },
        setIsSchoolLogin(state, action) {
            state.IsNew = action.payload;
            return state;
        }       
    }
})

export const { setToken,setIsFirstLogin,setUserRole, setAadharVerified, setMobileEmailVerified, setHostelExistingEnable, setHostelNewEnable, setSwadharExistingEnable, setSwadharNewEnable, setPaymentEnable, setIsAapaleSarkarLogin, resetAllAuthentication, setApplicationMarathiMessage, setApplicationEnglishMessage,setIsSchoolLogin } = authenticateSlice.actions
export default authenticateSlice.reducer