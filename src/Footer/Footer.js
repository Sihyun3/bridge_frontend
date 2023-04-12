import style from './Footer.module.css';
import { Link } from 'react-router-dom';



    const Footer = () => {
        return (
            <>
                <footer className={style.footer}>
                    <div className={style.contents}>
                        <h3 className={style.title}>
                            Terms of Service{" "}{" "}{" "}Privacy Policy{" "}{" "}{" "}Contact Us
                        
                        </h3>

                        <div className={style.contents}>
                            <h2 className={style.title}>
                                Copyright@2023{" "}{" "}{" "}Bridge, Inc.{" "}{" "}{" "}All Rights reserved. 
                             </h2>
                        </div>
                    </div>
                </footer>
            </>

        )
    }

    export default Footer;