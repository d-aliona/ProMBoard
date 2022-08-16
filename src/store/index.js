import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from './slices/userSlice'
import usersReducer from './slices/usersSlice'
import avatarReducer from './slices/avatarSlice'
import usernameReducer from './slices/usernameSlice'
import personalBoardsReducer from './slices/personalBoardsSlice'
import boardReducer from './slices/boardSlice'
import currentListsReducer from './slices/currentListsSlice'
import currentCardsReducer from './slices/currentCardsSlice'
import currentDragStartCardReducer from './slices/currentDragStartCardSlice'
import currentDragEndCardReducer from './slices/currentDragEndCardSlice'

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
    currentDragStartCard: currentDragStartCardReducer,
    currentDragEndCard: currentDragEndCardReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  composeWithDevTools,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)