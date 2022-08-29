import React from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipesId, view404 } from "../../redux/actions";
import s from './Detail.module.css';
import imageLoader from '../../images/loader.gif'
import imagestar from '../../images/estrella.png'
import image404 from '../../images/404.webp'

const Detail = ({ id }) => {
    const dispatch = useDispatch();
    const recipe = useSelector((state) => { return state.recipe; })
    const resultName = useSelector((state) => { return state.resultName; })

    useEffect(() => {
        (resultName)[1] === 'f' ? dispatch(view404(image404)) : dispatch(getRecipesId(id))

    }, [dispatch, id, resultName]);
    console.log(recipe)

    let n = 0;

    return (
        <div className={s.detail}>
            {
                (recipe.length) ?
                    <div className={s.container}>
                        <h2>{recipe[0].name}</h2>
                        <img className={s.img} src={recipe[0].image} alt="img" />
                        <div ><h4>Summary: </h4><p dangerouslySetInnerHTML={{ __html: recipe[0].summary, }} /></div>
                        <div ><h4>Instructions: </h4><p dangerouslySetInnerHTML={{ __html: recipe[0].instructions, }} /></div>
                        <div><h4>Score: </h4><img src={imagestar} alt="" width="20" height="20" />&nbsp;&nbsp;{recipe[0].healthScore}</div>
                        <h4>Diets: </h4>
                        <div className={s.diet}>{recipe[0].diets?.map((e) => {
                            n++
                            return (<p key={n}>&nbsp;&nbsp;&nbsp;{e} </p>)
                        })}</div>

                    </div>
                    :
                    <div>
                        <div><img className={s.cargando} src={imageLoader} alt="Cargando...." /></div>
                    </div>
            }
        </div>
    )
};

export default Detail;