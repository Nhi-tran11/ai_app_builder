
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
