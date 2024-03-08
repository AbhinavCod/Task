import { BrowserRouter as Router , Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'

function App() {

  return (
   <Router>
    <Routes>
      <Route path="/" element={
        <Login />
      }>
      </Route>
      <Route path="/home" element={
        <Home />
      }>
      </Route>
      <Route path="/signup" element={
        <SignUp />
      }>
      </Route>
      <Route path="/forgot-password" element={
        <ForgotPassword />
      }>
      </Route>
      <Route path="*" element={
        <Login />
      }>
      </Route>
    </Routes>
   </Router>
  )
}

export default App
