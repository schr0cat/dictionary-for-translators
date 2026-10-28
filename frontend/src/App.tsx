import Route from './components/Route';
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
      <Route path='/'>
        <IndexPage />
      </Route>

      {/* TODO: добавить кнопку логаута и настроить её показ в шапке */}

      <Route path='/addWords'>
        <AddWordsPage />
      </Route>

      <Route path='/dictionary'>
        <DictionaryPage />
      </Route>

      <Route path='/registration'>
        <RegistrationPage />
      </Route>

      <Route path='/authorization'>
        <AuthorizationPage />
      </Route>
    </div>
  </>
}

export default App
