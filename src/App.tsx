import Route from './components/Route';
import Link from './components/Link';
import AddWordsPage from './pages/AddWordsPage';
import DictionaryPage from './pages/DictionaryPage';
import FileDownloadForm from './components/FileDownloadForm';
import RecentlyAdded from './components/RecentlyAdded';
import Header from './components/Header';


function App() {
  return <>
    <Header></Header>

    <div className='container'>
      <Route path='/'>
        <div className='flex gap-x-8 mb-[45px]'>
          <Link to='/addWords' className='bg-(--color-primary) text-lg text-(--color-white) p-[8px_28px] rounded-lg'>Добавить слово/слова</Link>
          <Link to='/dictionary' className='bg-(--color-primary) text-lg text-(--color-white) p-[8px_70px] rounded-lg'>Словарь</Link>
        </div>

        <div className='flex gap-x-8'>
          <RecentlyAdded />
          <FileDownloadForm />
        </div>
      </Route>

      <Route path='/addWords'>
        <AddWordsPage />
      </Route>

      <Route path='/dictionary'>
        <DictionaryPage />
      </Route>
    </div>
  </>
}

export default App
