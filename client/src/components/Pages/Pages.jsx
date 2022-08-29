import React from 'react'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changePage } from "../../redux/actions";
import s from './Pages.module.css'



const Pages = ({ pagination, nRecipes }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => { return state.currentPage; });
    const nPages = []
    const totalPages = Math.ceil(nRecipes / pagination)
    for (let n = 0; n < totalPages; n++) {
        nPages.push(n + 1);
    }

    useEffect(() => {  //le doy el foco al botón que indica la página actual guardada en el store
        document.getElementById(currentPage).focus()
    }, [currentPage]);

    return (
        <>

            <ul className={s.list}>
                {nPages?.map((e) => {
                    return (
                        <li key={e}>
                            <button id={e} className={s.button} onClick={() => dispatch(changePage(e))} >{e}</button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
export default Pages;