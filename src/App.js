
import { Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Home.jsx'
import Header from './Header.jsx'
import Nav from './Nav.jsx'
import NewPost from './NewPost.jsx'
import Missing from './Missing.jsx';
import About from './About.jsx';
import Footer from './Footer.jsx'
import PostPage from './PostPage.jsx';
import Edit from './Edit.jsx';
import { DataProvider } from './context/DataContext.js';

function App() {
  
  
  return (
    <div className="App">
      <DataProvider>
        <Header title='Siva Social Media' />
        <Nav  />
        <Routes>
          <Route path='/' element={<Home />}/>

          <Route path='/post' >
            <Route index element={<NewPost />}/>

            <Route path=':id' element={<PostPage />}/>

            <Route path='*' element={<Missing/>}/>
          </Route>
          <Route path='/edit/:id' element={<Edit />}/>
          <Route path='*' element={<Missing />}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
        <Footer/>
      </DataProvider>
    </div>
  );
}

export default App;
