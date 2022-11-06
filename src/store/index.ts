import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import type { PreloadedState } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import allBoardsReducer from './slices/allBoardsSlice';
import allCardsReducer from './slices/allCardsSlice';
import allListsReducer from './slices/allListsSlice';
import personalBoardsReducer from './slices/personalBoardsSlice';
import notPersonalBoardsReducer from './slices/notPersonalBoardsSlice';
import currentListsReducer from './slices/currentListsSlice';
import currentCardsReducer from './slices/currentCardsSlice';
import currentCommentsReducer from './slices/currentCommentsSlice';
import currentRepliesReducer from './slices/currentRepliesSlice';
import notificationsReducer from './slices/notificationsSlice';
import currentDragStartCardReducer from './slices/currentDragStartCardSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  user: userReducer,
  users: usersReducer,
  allBoards: allBoardsReducer,
  allCards: allCardsReducer,
  allLists: allListsReducer,
  personalBoards: personalBoardsReducer,
  notPersonalBoards: notPersonalBoardsReducer,
  currentLists: currentListsReducer,
  currentCards: currentCardsReducer,
  currentComments: currentCommentsReducer,
  currentReplies: currentRepliesReducer,
  notifications: notificationsReducer,
  currentDragStartCard: currentDragStartCardReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // composeWithDevTools,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    // devTools: process.env.NODE_ENV !== 'production',
    // middleware: [thunk],
  })
}

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>