import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        singlejob: null,
        allAdminJobs: [],
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singlejob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setsearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        },
        setsearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        }
    }
})
export const { setAllJobs, setSingleJob, setAllAdminJobs, setAllAppliedJobs, setsearchJobByText, setsearchedQuery } = jobSlice.actions
export default jobSlice.reducer;