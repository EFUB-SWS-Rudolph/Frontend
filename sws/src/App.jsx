import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Main from './main/page/Main';
import UnivInfo from './signUp/pages/UnivInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Signup />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/signup/univ" element={<UnivInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
