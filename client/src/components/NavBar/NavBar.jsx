import { Link } from 'react-router-dom';
import imageFlecha from '../../images/flecha.png'

// import axios from 'axios';
import s from './NavBar.module.css';
import SearchName from '../SearchName/SearchName';
import Organize from '../Organize/Organize';

const NavBar = () => {

    return (
        <div className={s.NavBar}>
            <div>
                <Link to="/">
                    <img className={s.img} src={imageFlecha} alt="LandingPage" />
                </Link>
            </div>
            <div >
                <Link to="/newRecipe">
                    <button className={s.recipe}>Create New Recipe</button>

                </Link>
            </div>
            <div><Organize /></div>
            <div><SearchName /></div>

        </div>
    );

};

export default NavBar;