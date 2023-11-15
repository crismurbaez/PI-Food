import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
    ordenRecipe,
    currentPageReset,
    ordenRecipeScore,
    getDiets,
    filterDiets,
    getRecipes,
    recipesReset,
    recipeReset,
    nameReset,
    copyRecipes,
    resultDietReset,
} from "../../redux/actions";
import s from './Organize.module.css';

const Organize = () => {

    let n = 0;
    const dispatch = useDispatch();
    const diets = useSelector((state) => { return state.diets; })
    const resultName = useSelector((state) => { return state.resultName; });
    const resultDiets = useSelector((state) => { return state.resultDiets; });
    const [diet, setDiet] = useState("All Diets...");

    useEffect(() => {  //pido al back todos las diets sólo si el store está vacío
        (diets).length === 0 ? dispatch(getDiets()) : console.log('no despacho nada el diets')
    }, [dispatch, diets]);

    const handleOnChangeName = (e) => {
        dispatch(currentPageReset());
        dispatch(ordenRecipe(e.target.value))
        document.getElementById('p').checked = false;
        document.getElementById('u').checked = false;
    }

    const handleOnChangeScore = (e) => {
        dispatch(currentPageReset());
        dispatch(ordenRecipeScore(e.target.value))
        document.getElementById('a-z').checked = false;
        document.getElementById('z-a').checked = false;
    }
    // poner en componente aparte
    const handleOnChangeDiets = (e) => {
        setDiet(e.target.value);
        // console.log(e.target.value)
        if (e.target.value === "All diets...") {
            // console.log('All diets...');
            dispatch(currentPageReset());
            dispatch(recipesReset());
            dispatch(recipeReset());
            dispatch(nameReset());
            dispatch(getRecipes());
            dispatch(copyRecipes());
            dispatch(getRecipes());
            dispatch(resultDietReset());
        } else if
            (resultName[1] === 'f') {
            // console.log('no hay recipes')
        } else {
            (resultDiets.includes(e.target.value)) ?
                console.log('ya filtraste con  ' + e.target.value)
                :
                dispatch(filterDiets(e.target.value))

        }
    }


    // console.log('diets', diets)

    return (
        <div className={s.container}>
            <div className={s.organizeGroup}>
                <div>Sort by name</div>
                <div className={s.organize} onChange={handleOnChangeName} >
                    <div> A-Z
                        <input
                            type="radio"
                            id="a-z"
                            name="orden"
                            value='a'
                        />
                    </div>
                    <div> Z-A
                        <input
                            className={s.radio}
                            type="radio"
                            id="z-a"
                            name="orden"
                            value='z'
                        />
                    </div>
                </div>
            </div >

            <div className={s.organizeGroup}>
                <div>Sort by score</div>
                <div className={s.organize} onChange={handleOnChangeScore}>

                    <div> Lowest
                        <input
                            type="radio"
                            id="p"
                            name="ordenRating"
                            value='p'
                        />
                    </div>
                    <div> Highest
                        <input
                            className={s.radio}
                            type="radio"
                            id="u"
                            name="ordenRating"
                            value='u'
                        />
                    </div>
                </div>
            </div>
            {/* poner en componente aparte */}
            <div className={s.organizeGroup}>
                <select value={diet} id='diets' name="select" onChange={handleOnChangeDiets}>
                    <option value="All diets..." key={n}>All diets...</option>
                    {diets?.map((e) => {
                        n++
                        return <option value={e} key={n}>{e}</option>
                    })}
                </select>
                <div className={s.resultDiets}>
                    {(resultDiets.map((e, i) => {
                        return (<p key={i} >{e}</p>)
                    }))}
                </div>

            </div>

        </div >
    )
};

export default Organize;
