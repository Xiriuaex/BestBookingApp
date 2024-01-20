import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';
import MyHotels from './pages/MyHotels';


  

const App = () => {  

  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
          <Route path='/' element={<Layout><p>home page</p></Layout>}></Route>
          <Route path='/dev' element={<Layout><p>web dev</p></Layout>}></Route>
          <Route path='/register' element={<Layout><Register/></Layout>}></Route>
          <Route path='/sign-in' element={<Layout><SignIn/></Layout>}></Route>
          {isLoggedIn && (
            <>
              <Route 
                path='/add-hotel' 
                element={
                  <Layout>
                    <AddHotel />
                  </Layout>
                }
              >
              </Route>
              <Route 
                path='/my-hotels' 
                element={
                  <Layout>
                    <MyHotels />
                  </Layout>
                }
              >
              </Route>
            </>
          )}
          
      </Routes>
    </Router>
  )
}

export default App
