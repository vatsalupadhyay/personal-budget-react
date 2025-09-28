import './App.css';
import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import Footer from './Footer/Footer';
import LoginPage from './LoginPage/LoginPage';
import HomePage from './Homepage/Homepage';
import AboutPage from './AboutPage/AboutPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Menu/>
      <Hero/>
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </div>
      
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
