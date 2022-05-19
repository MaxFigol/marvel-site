import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../mainPage/MainPage';
import AppHeader from '../appHeader/AppHeader';
import ComicsList from '../comicsList/ComicsList';
import Page404 from '../mainPage/404'
import SingleComicPage from '../mainPage/SingleComicPage';


const App = () => {
 
        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                        <main>
                            <Routes>
                                <Route path='/' element={<MainPage/>} />
                                <Route exact path='/comics' element={<ComicsList/>} />
                                <Route exact path='/comics/:comicID' element={<SingleComicPage/>} />
                                <Route path='*' element={<Page404/>}/>
                            </Routes>   
                        </main>
                </div>
            </Router>
        )
}

export default App;