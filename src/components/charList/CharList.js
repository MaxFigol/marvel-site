import {useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    
    const [newItemLoading, setItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnd, setCharEnd] = useState(false);

    
    const {loading, error, getAllCharacters, clearError} = useMarvelService();

    useEffect(() => {
       getAllCharacters()
            .then(onCharListLoaded)
    }, [])

    // componentDidMount() {
    //     this.marvelService.getAllCharacters()
    //         .then(this.onCharListLoaded)
    //         .catch(this.onError)
    // }

    const onRequest = (offset) => {
        onCharLoading();
        getAllCharacters(offset)
            .then(onCharListLoaded)
            
    }

    const onCharLoading = () => {
        setItemLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }
    
        setCharList(charList => [...charList, ...newCharList]);
        setItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnd(ended)
    }

    

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        // const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button className="button button__main button__long" disabled={newItemLoading} onClick={() => onRequest(offset)} style={{'display': charEnd ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    
}

export default CharList;