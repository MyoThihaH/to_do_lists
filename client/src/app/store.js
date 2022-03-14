import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/Todo/todoSlice';
import filterReducer from '../features/Filter/filterSlice';
import { one } from './myMiddleWare';
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    filters: filterReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(one),
});
