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
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Home from './pages/Home';


const App = () => {  

  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
          <Route 
            path='/' 
            element={<Layout><Home /></Layout>}>
          </Route>
          
          <Route 
            path='/register' 
            element={<Layout><Register/></Layout>}>
          </Route>

          <Route 
            path='/sign-in' 
            element={<Layout><SignIn/></Layout>}>
          </Route>

          <Route 
            path='/search' 
            element={<Layout><Search /></Layout>}>
          </Route>

          <Route 
            path='/detail/:hotelId'
            element={<Layout><Detail /></Layout>}>
          </Route>

          {isLoggedIn && (
            <>
              <Route 
                path='/my-bookings' 
                element={
                  <Layout>
                    <MyBookings />
                  </Layout>
                }
              />
              <Route 
                path='/hotel/:hotelId/booking' 
                element={
                  <Layout>
                    <Booking />
                  </Layout>
                }
              />
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
              <Route 
                path='/edit-hotel/:hotelId' 
                element={
                  <Layout>
                    <EditHotel />
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
