import { Routes, Route } from 'react-router';
import AddWordsPage from './pages/AddWordsPage';
import DictionaryPage from './pages/DictionaryPage';
import Header from './components/Header';
import RegistrationPage from './pages/RegistrationPage';
import AuthorizationPage from './pages/AuthorizationPage';
import IndexPage from './pages/IndexPage';


function App() {
  return <>
    <Header></Header>

    <div className='container'>
      <Routes>
        <Route index path='/' element={<IndexPage />}></Route>

        <Route path='/addWords' element={<AddWordsPage />}></Route>

        <Route path='/dictionary' element={<DictionaryPage />}></Route>

        <Route path='/registration' element={<RegistrationPage />}></Route>

        <Route path='/authorization' element={<AuthorizationPage />}></Route>
      </Routes>
    </div>
  </>
}

export default App
