import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipesId, view404 } from "../../redux/actions";
import s from './Detail.module.css';
import imageLoader from '../../images/loader.gif'
import imagestar from '../../images/estrella.png'
import image404 from '../../images/404.png'
import imagepizarra from '../../images/Pizarra.jpg'
import imageHome from '../../images/home.png'

const Detail = ({ id }) => {
    const dispatch = useDispatch();
    const recipe = useSelector((state) => { return state.recipe; })
    const resultName = useSelector((state) => { return state.resultName; })

    useEffect(() => {
        (resultName)[1] === 'f' ? dispatch(view404(image404)) : dispatch(getRecipesId(id))
    }, [dispatch, id, resultName]);
    console.log('recipe', recipe)


    let n = 0;

    return (
        <div className={s.detail}>


            {
                (recipe.length) ?
                    <div className={s.container}>
                        <Link to={`/home`}>
                            <img className={s.imgHome} src={imageHome} alt="Home" />
                        </Link>
                        <div className={s.containerText2}><h1>{recipe[0].name}</h1></div>

                        <div className={s.containerImg}>

                            <img className={s.img} src={recipe[0].image} alt="img" />
                        </div>

                        <div className={s.containerText1}>
                            <img className={s.imgPizarra} src={imagepizarra} alt="img" />
                            <div className={s.Text1}>
                                <div>{recipe[0].healthScore}&nbsp;&nbsp;<img src={imagestar} alt="" width="20" height="20" /></div>
                                <div>
                                    <h3>Diets </h3>
                                    <div className={s.diet}>{recipe[0].diets?.map((e) => {
                                        n++
                                        return (<p key={n}>&nbsp;&nbsp;&nbsp;{e}</p>)
                                    })}</div>
                                </div>
                            </div>

                        </div>

                        <div className={s.containerText2}>
                            <div ><p dangerouslySetInnerHTML={{ __html: recipe[0].summary, }} /></div>
                        </div>

                        <div className={s.containerText2}>
                            {
                                (recipe[0].stepByStep.length) ?
                                    <div>
                                        <h4>Step by step </h4>
                                        <div>
                                            {(recipe[0].stepByStep.length) ?
                                                <div>
                                                    {(recipe[0].stepByStep[0].steps?.map((e) => {
                                                        return (
                                                            <div>
                                                                <p>{e.number}.&nbsp;{e.step}</p>
                                                            </div>
                                                        )
                                                    }))}
                                                </div>

                                                :
                                                <div></div>
                                            }
                                        </div>
                                    </div>

                                    :
                                    <div>
                                        No step available.
                                    </div>
                            }
                        </div>

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