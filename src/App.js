import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserProfile from './pages/UserProfile';
import TableData from './pages/TableData';

function App() {
  return (
   <BrowserRouter>
    <Routes>
        <Route index element={<Home />} />
        <Route path="userProfile" element={<UserProfile />} />
           <Route path="tableData" element={<TableData />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
