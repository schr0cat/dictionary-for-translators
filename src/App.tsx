import Route from './components/Route';
import Link from './components/Link';
import AddWordsPage from './pages/AddWordsPage';
import DictionaryPage from './pages/DictionaryPage';


function App() {
  return <div>
    <Link to='/addWords'>To add words page</Link>

    <Link to='/dictionary'>To dictionary page</Link>

    <Route path='/addWords'>
      <AddWordsPage />
    </Route>

    <Route path='/dictionary'>
      <DictionaryPage />
    </Route>
  </div>
}

export default App
