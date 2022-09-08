import { React } from 'react';
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
} from "../../redux/actions";
import s from './Organize.module.css';

const Organize = () => {
    let n = 0;
    const dispatch = useDispatch();
    const diets = useSelector((state) => { return state.diets; })
    const resultName = useSelector((state) => { return state.resultName; });

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
        const diet = e.target.value
        console.log(diet)
        if (diet === 'All diets...') {
            console.log('elige una opción')
            dispatch(currentPageReset())
            dispatch(recipesReset())
            dispatch(recipeReset())
            dispatch(nameReset())
            dispatch(getRecipes())
            dispatch(copyRecipes())
            dispatch(getRecipes());
        } else if
            (resultName[1] === 'f') {
            console.log('no hay recipes')
        } else {

            dispatch(filterDiets(diet))
        }
    }


    console.log('diets', diets)
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

                    <div> Menor
                        <input
                            type="radio"
                            id="p"
                            name="ordenRating"
                            value='p'
                        />
                    </div>
                    <div> Mayor
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
                <select id='diets' name="select" onChange={handleOnChangeDiets}>
                    <option value="All diets..." selected key={n}>All diets...</option>
                    {diets?.map((e) => {
                        n++
                        return <option value={e} key={n}>{e}</option>
                    })}
                </select>
            </div>

        </div >
    )
};

export default Organize;
