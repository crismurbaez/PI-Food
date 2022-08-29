import imageButton from '../../images/tiempo-coccion-marisco.png'
import imageHand from '../../images/handClick.gif'

import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';

const LandingPage = () => {

    return (
        <div className={s.LandingPage}>
            <div>
                <div className={s.text}>Te invitamos a descubrir<br></br>las mejores recetas...</div>
                <div className={s.images}>
                    <div >
                        <Link to="/home">
                            <img className={s.img} src={imageButton} alt=" Entrar" />
                        </Link>
                        <div><img className={s.hand} src={imageHand} alt="" /></div>
                    </div>
                </div>

            </div>

        </div>
    );

};

export default LandingPage;