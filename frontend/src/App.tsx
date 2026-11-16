// import Route from './components/Route';
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

      {/* TODO: добавить кнопку логаута и настроить её показ в шапке */}
    </div>
  </>
}

export default App
