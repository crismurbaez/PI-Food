import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";
import { recipeReset } from "../../redux/actions";
import { changePage } from "../../redux/actions";
import s from './Home.module.css';
import Card from '../Card/Card';
import Pages from '../Pages/Pages';
import NavBar from '../NavBar/NavBar';
import imageLoader from '../../images/loader.gif'


const Home = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => { return state.recipes; });
    const currentPage = useSelector((state) => { return state.currentPage; });  //página actual
    const [currentRecipes, setcurrentRecipes] = useState([])  //array de recipes mostrados
    const pagination = 9; //cantidad de recipes por página
    const finalPage = currentPage * pagination; //final de página
    const initialPage = finalPage - pagination; //inicio de página

    useEffect(() => {  //pido al back todos las recipes sólo si el store está vacío
        (recipes).length === 0 ? dispatch(getRecipes()) : console.log('no despacho nada')
    }, [dispatch, recipes]);

    useEffect(() => {  //blanqueo el state recipe donde guardo la recipe para el detalle
        dispatch(recipeReset())
    }, [dispatch]);

    useEffect(() => {
        setcurrentRecipes(recipes.slice(initialPage, finalPage))
    }, [recipes, initialPage, finalPage])

    console.log(currentRecipes)
    console.log(recipes)
    console.log(currentPage)
    console.log(initialPage)
    console.log(finalPage)
    console.log(currentRecipes.length)


    return (
        <div>
            <NavBar />
            <div className={s.home}>

                <div>
                    {
                        currentRecipes.length > 0 ?
                            <div>
                                <div><Pages
                                    pagination={pagination}
                                    nRecipes={recipes.length}
                                    changePage={changePage}
                                />
                                </div>
                                <div className={s.cards}>
                                    {currentRecipes.map((e) => {
                                        return (
                                            <Link className={s.card} key={e.id} to={`/home/recipes/${e.id}`}>
                                                <Card
                                                    key={e.id}
                                                    id={e.id}
                                                    name={e.name}
                                                    image={e.image}
                                                    diets={e.diets}
                                                    healthScore={e.healthScore}
                                                    summary={e.summary}
                                                    stepByStep={e.stepByStep}
                                                />
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                            :
                            <div><img className={s.cargando} src={imageLoader} alt="Cargando...." /></div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;