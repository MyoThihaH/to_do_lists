import React from 'react';
import { useDispatch } from 'react-redux';
import { Header } from './features/Header/Header';
import { TodoList } from './features/Todo/TodoList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';


import './App.css'
import { fetchTodos } from './features/Todo/todoSlice';
import { Footer } from './features/Footer/footer'

const App = () => {
  const dispatch = useDispatch();
  const theme = createTheme();
dispatch(fetchTodos());
  return (
    <ThemeProvider theme={theme}>
      
      <Header/>
      <TodoList/>
      <Footer/>
      
    </ThemeProvider>
  )
}

export default App;
