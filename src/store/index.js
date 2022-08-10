import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'

import userReducer from './slices/userSlice'
import usersReducer from './slices/usersSlice'
import avatarReducer from './slices/avatarSlice'
import usernameReducer from './slices/usernameSlice'
import personalBoardsReducer from './slices/personalBoardsSlice'
import boardReducer from './slices/boardSlice'
import currentListsReducer from './slices/currentListsSlice'
import currentCardsReducer from './slices/currentCardsSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
    user: userReducer,
    users: usersReducer,
    avatar: avatarReducer,
    username: usernameReducer,
    personalBoards: personalBoardsReducer,
    board: boardReducer,
    currentLists: currentListsReducer,
    currentCards: currentCardsReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)