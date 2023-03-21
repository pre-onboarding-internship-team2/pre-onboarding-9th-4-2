import { combineReducers } from '@reduxjs/toolkit'
import pageNation from './slices/pageNationSlice'

const reducer = combineReducers({
    pageNation,
})

export type ReducerType = ReturnType<typeof reducer>
export default reducer
