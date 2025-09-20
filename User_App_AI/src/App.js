
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Form from './components/Form';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feature from './components/Feature';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/form" element={<Form />} />
            <Route path="/feature" element={<Feature />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
