import imageButton from '../../images/tiempo-coccion-marisco.png'

import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';

const LandingPage = () => {

    return (
        <div className={s.LandingPage}>
            <div>
                <div className={s.text}>We invite you to discover<br></br> the best recipes...</div>
                <div className={s.images}>
                    <div >
                        <Link to="/home">
                            <img className={s.img} src={imageButton} alt=" Entrar" />
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );

};

export default LandingPage;