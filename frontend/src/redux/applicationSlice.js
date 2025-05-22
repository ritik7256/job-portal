import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: [],

    },
    reducers: {
        setALLApplicants: (state, action) => {
            state.applicants = action.payload;

        }
    }
})
export const { setALLApplicants } = applicationSlice.actions

export default applicationSlice.reducer;