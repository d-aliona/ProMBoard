import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'

// import eventsReducer from './slices/eventsSlice'
// import searchTermReducer from './slices/filterSlice'
import userReducer from './slices/userSlice'
import avatarReducer from './slices/avatarSlice'
import usernameReducer from './slices/usernameSlice'
// import membersReducer from './slices/membersSlice'
// import memberUpReducer from './slices/memberUpSlice'
// import participantsReducer from './slices/participantsSlice'
// import selectValueReducer from './slices/selectSlice'
// import visitedEventsReducer from './slices/visitedEventsSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
    user: userReducer,
    avatar: avatarReducer,
    username: usernameReducer,
//   member: memberReducer,
//   members: membersReducer,
//   events: eventsReducer,
//   memberUp: memberUpReducer,
//   participants: participantsReducer,
//   searchTerm: searchTermReducer,
//   value: selectValueReducer,
//   visitedEvents: visitedEventsReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)