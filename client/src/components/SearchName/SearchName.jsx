import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    getRecipes,
    resultDietReset,
    recipeReset,
    recipesReset,
    nameReset,
    currentPageReset,
    copyRecipes,
    view404,
    nameRecipes,
} from "../../redux/actions";
import imagelupe from '../../images/Lupa3.png'
import image404 from '../../images/404.png'
import s from './SearchName.module.css';

const SearchName = () => {
    const [input, setInput] = useState(""); //En el input se ingresa el name
    const resultName = useSelector((state) => { return state.resultName; })

    const dispatch = useDispatch();

    //cambiar esto, mandar el 404 al back, para que no me muestre nada
    //tal vez hacer una página de 404
    useEffect(() => {
        (resultName)[1] === 'f' ? dispatch(view404(image404)) : console.log('no despacho nada')
    }, [resultName, dispatch]);

    const radioCheckedFalseandAllDiets = () => {
        document.getElementById('a-z').checked = false;
        document.getElementById('z-a').checked = false;
        document.getElementById('p').checked = false;
        document.getElementById('u').checked = false;
        document.getElementById('diets').value = "All diets...";
    }

    const handleOnChange = (e) => {
        setInput(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (input.trim() !== "") {
            dispatch(currentPageReset());
            dispatch(nameRecipes(input.trim()));
            setInput("");
            radioCheckedFalseandAllDiets()
        }
    }
    // poner en componente aparte
    const handleOnAllRecipes = () => {
        dispatch(currentPageReset());
        dispatch(recipesReset());
        dispatch(recipeReset());
        dispatch(nameReset());
        dispatch(getRecipes());
        dispatch(copyRecipes());
        radioCheckedFalseandAllDiets();
        dispatch(resultDietReset());
    }


    return (
        <div className={s.container}>
            <div className={s.search}>
                <div className={s.all}><button
                    className={s.buttonAll}
                    onClick={handleOnAllRecipes}
                // poner en componente aparte
                >
                    All recipes
                </button></div>
                <form>

                    <input
                        className={s.input}
                        type="text"
                        placeholder="Search recipes..."
                        onChange={handleOnChange}
                        value={input}
                    />


                    <button
                        className={s.buttonLupe}
                        type="submit"
                        onClick={handleOnSubmit}
                    > <img src={imagelupe} alt="Search" width="20" height="20" /> </button>


                </form>


            </div>
            <div className={s.result}>{resultName[0]}</div>
        </div>


    );
};

export default SearchName;