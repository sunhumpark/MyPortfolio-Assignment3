import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import {AuthProvider} from './auth.jsx';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Education from './pages/Education.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return <AuthProvider><Layout><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/education" element={<Education />} />
    <Route path="/services" element={<Services />} />
    <Route path="/contact" element={<Contact />} />
  <Route path="/signup" element={<Signup/>}/><Route path="/signin" element={<Signin/>}/></Routes></Layout></AuthProvider>;
}
