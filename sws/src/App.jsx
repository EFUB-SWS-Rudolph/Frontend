import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Main from './main/page/Main';
import EwhainList from './ewhainList/pages/EwhainList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Signup />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="ewhainlist" element={<EwhainList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
