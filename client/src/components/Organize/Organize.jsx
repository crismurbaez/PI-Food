import { React } from 'react';
import { useDispatch } from 'react-redux';
import { ordenRecipe, currentPageReset, ordenRecipeScore } from "../../redux/actions";
import s from './Organize.module.css';




const Organize = () => {
    // 
    const dispatch = useDispatch();


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


        </div >
    )
};

export default Organize;
