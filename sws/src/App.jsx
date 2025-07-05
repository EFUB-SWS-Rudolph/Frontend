import { BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import Main from './main/page/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Signup />} />
          <Route path="/main" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
