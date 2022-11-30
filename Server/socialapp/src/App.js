import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, useNavigate, } from 'react-router-dom';
import Home from './components/Screens/Home';
import Profile from './components/Screens/Profile';
import SignUp from './components/Screens/Signup';
import SignIn from './components/Screens/Signin';
import CreatePost from './components/Screens/CreatePost';
import { initialState, reducer } from './reducers/userReducer'
import UserProfile from './components/Screens/UserProfile'
import SubscribeUserPost from './components/Screens/SubscribeUserPost'

export const UserContext = createContext()


const Routing = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      dispatch({ type: "USER", payload: user })
    } else {
      navigate('/signin')
    }
  }, [])
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/myfollowingpost" element={<SubscribeUserPost />} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
