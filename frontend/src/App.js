import './App.css';
import Footer from './Components/Layouts/Footer';
import Header from './Components/Layouts/Header';
import ProductPage from './Components/Layouts/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
function App() {
  return (
    <Router>
       <div className="App d-flex flex-column min-vh-100"> 
      <Header />
      <main className="flex-fill">  
        <HelmetProvider>

        <Routes>
        <Route path='/' element={<ProductPage/>}/>
       </Routes>
  
        </HelmetProvider>

       
      </main>
      <Footer />  
    </div>
    </Router>
   
  );
}

export default App;
