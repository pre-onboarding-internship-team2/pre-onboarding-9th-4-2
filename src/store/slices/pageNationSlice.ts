import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    pageNumber: 0,
}

const pageNationSlice = createSlice({
    name: 'pageNation',
    initialState,
    reducers: {
        pageNumClick: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        },
    },
})

export const { pageNumClick } = pageNationSlice.actions
export default pageNationSlice.reducer
