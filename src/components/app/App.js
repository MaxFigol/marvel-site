import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../mainPage/MainPage';
import AppHeader from '../appHeader/AppHeader';
import ComicsList from '../comicsList/ComicsList';


const App = () => {
 
        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                        <main>
                            <Routes>
                                <Route path='/' element={<MainPage/>} />
                                <Route path='/comics' element={<ComicsList/>} />
                            </Routes>   
                        </main>
                </div>
            </Router>
        )
}

export default App;