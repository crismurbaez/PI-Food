import { Link } from 'react-router-dom';
import imageHome from '../../images/home.png'
import imageFlecha from '../../images/flecha.png'

// import axios from 'axios';
import s from './NavBar.module.css';
import SearchName from '../SearchName/SearchName';
import Organize from '../Organize/Organize';

const NavBar = () => {

    // const funciond = () => {
    //     axios.post('http://localhost:3001/videogames', { 'name': 'jurgo 2 sjkfsd' })
    //         .then(dataApi => {
    //             console.log(dataApi.data)
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    return (
        <div className={s.NavBar}>
            <div>
                <Link to="/">
                    <img className={s.img} src={imageFlecha} alt="LandingPage" />
                </Link>
            </div>
            <div>
                <Link to="/home">
                    <img className={s.img} src={imageHome} alt="Home" />
                </Link>
            </div>
            <div><Organize /></div>
            <div><SearchName /></div>

            {/* <button onClick={funciond}>hola</button> */}
        </div>
    );

};

export default NavBar;