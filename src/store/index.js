import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from './slices/userSlice'
import usersReducer from './slices/usersSlice'
import allBoardsReducer from './slices/allBoardsSlice'
import allCardsReducer from './slices/allCardsSlice'
import allListsReducer from './slices/allListsSlice'
import personalBoardsReducer from './slices/personalBoardsSlice'
import notPersonalBoardsReducer from './slices/notPersonalBoardsSlice'
import boardReducer from './slices/boardSlice'
import currentListsReducer from './slices/currentListsSlice'
import currentCardsReducer from './slices/currentCardsSlice'
import currentCommentsReducer from './slices/currentCommentsSlice'
import notificationsReducer from './slices/notificationsSlice'
import currentDragStartCardReducer from './slices/currentDragStartCardSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
    user: userReducer,
    users: usersReducer,
    allBoards: allBoardsReducer,
    allCards: allCardsReducer,
    allLists: allListsReducer,
    personalBoards: personalBoardsReducer,
    notPersonalBoards: notPersonalBoardsReducer,
    board: boardReducer,
    currentLists: currentListsReducer,
    currentCards: currentCardsReducer,
    currentComments: currentCommentsReducer,
    notifications: notificationsReducer,
    currentDragStartCard: currentDragStartCardReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  composeWithDevTools,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)