import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';


  

const App = () => {  
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Layout><p>dsa</p></Layout>}></Route>
          <Route path='/dev' element={<Layout><p>web dev</p></Layout>}></Route>
          <Route path='/register' element={<Layout><Register/></Layout>}></Route>
          <Route path='/sign-in' element={<Layout><SignIn/></Layout>}></Route>
      </Routes>
    </Router>
  )
}

export default App
