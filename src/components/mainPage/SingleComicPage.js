import {useState, useEffect} from 'react';
import { useParams, NavLink } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';


const SingleComicPage = () => {
    const {comicID} = useParams();
    const [comic, setComic] = useState();
    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() =>{
        updateComic();
    },[comicID]);
    

    
    
    const updateComic = () => {
        clearError();
        getComics(comicID)
        .then(onComicLoaded)
        
    }


    function onComicLoaded (comic) {
        setComic(comic);
    }

    console.log(comicID)

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;
    return(
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <NavLink to='/comics' className="single-comic__back">Back to all</NavLink>
        </div>
    )
}

export default SingleComicPage;