import { React, useState } from 'react';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { nameRecipes } from '../../redux/actions';
import { useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import { recipeReset } from "../../redux/actions";
import { recipesReset } from "../../redux/actions";
import { nameReset } from "../../redux/actions";
import { currentPageReset, copyRecipes, view404 } from "../../redux/actions";
import imagelupe from '../../images/Lupa3.png'
import image404 from '../../images/404.png'
import s from './SearchName.module.css';

const SearchName = () => {
    const [input, setInput] = useState(""); //En el input se ingresa el name

    const resultName = useSelector((state) => { return state.resultName; })
    const alldataMemory = useSelector((state) => { return state.alldataMemory; })
    const dispatch = useDispatch();

    useEffect(() => {
        (resultName)[1] === 'f' ? dispatch(view404(image404)) : console.log('no despacho nada')
    }, [resultName, dispatch]);

    const radioCheckedFalse = () => {
        document.getElementById('a-z').checked = false;
        document.getElementById('z-a').checked = false;
        document.getElementById('p').checked = false;
        document.getElementById('u').checked = false;
    }

    const handleOnChange = (e) => {
        setInput(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (input !== "") {
            dispatch(currentPageReset());
            dispatch(nameRecipes(input));
            setInput("");
            radioCheckedFalse()
        }
    }
    const handleOnAllRecipes = () => {
        dispatch(currentPageReset());
        dispatch(recipesReset())
        dispatch(recipeReset())
        dispatch(nameReset())
        if (alldataMemory.length === 0) {
            dispatch(getRecipes())
        } else {
            dispatch(copyRecipes())
        }

        radioCheckedFalse()
    }


    return (
        <div className={s.container}>
            <div className={s.search}>
                <div className={s.all}><button
                    className={s.buttonAll}
                    onClick={handleOnAllRecipes}
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