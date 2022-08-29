import React from 'react';
import s from './Card.module.css';
import imagestar from '../../images/estrella.png'


const Card = (p) => {
    let n = 0;
    return (
        <div className={s.card}>
            <img className={s.img} src={p.image} alt="img" />
            <h3>{p.name}</h3>
            <div className={s.diets}>
                {
                    p.diets && p.diets.map((e) => {
                        n++;
                        return (
                            <div key={n}>{e}&nbsp;&nbsp;&nbsp;</div>
                        )
                    })
                }
            </div>
            <div className={s.score}><img src={imagestar} alt="" width="20" height="20" />&nbsp;&nbsp;{p.healthScore}</div>


        </div>
    )
}

export default Card;