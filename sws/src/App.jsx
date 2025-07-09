import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Main from './main/page/Main';
import UnivInfo from './signUp/pages/UnivInfo';
import Certification from './signUp/pages/Certification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Signup />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/univ" element={<UnivInfo />} />
          <Route path="/signup" element={<Certification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
