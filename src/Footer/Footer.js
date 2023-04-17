import style from './Footer.module.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { ReactComponent as PhoneIcon } from './FooterIcons/Phone.svg';
import { ReactComponent as MapIcon } from './FooterIcons/Map.svg';
import { ReactComponent as EnvelopeIcon } from './FooterIcons/Envelope.svg';
import { ReactComponent as FacebookIcon } from './FooterIcons/Facebook.svg';
import { ReactComponent as InstagramIcon } from './FooterIcons/Instagram.svg';
import { ReactComponent as TwitterIcon } from './FooterIcons/Twitter.svg';






function FooterItem(props) {
    const [open, setOpen] = useState(false);
    return (
        <li className={style.bottom_item}>
          <a href="#" className={style.icon_button} onClick={() => setOpen(!open)}>
            {props.icon}
          </a>
    
          {open && props.children}
        </li>
      );
    }

    const Footer = () => {
        return (
            <>



                <footer>
                    <div className={style.top_header}>
                        <section>
                            <span><FooterItem icon={<MapIcon />} /></span>
                            <span>서울 종로구 인사동길 12 대일빌딩 7층, 15층</span>
                        </section>

                        <section>
                            <span><FooterItem className icon={<PhoneIcon />} /></span>
                            <span>+82 02 - 123 - 4567 </span>
                        </section>

                        <section>
                            <span><FooterItem icon={<EnvelopeIcon />} /></span>
                            <span>info@websitename.com</span>
                        </section>
                    </div>

                        <span className={style.border_shape}></span>
                            <div className={style.bottom_content}>
                    <section>
                        <a href="#"><FooterItem icon={<FacebookIcon />} /></a>
                        <a href="#"><FooterItem icon={<InstagramIcon />} /></a>
                        <a href="#"><FooterItem icon={<TwitterIcon />} /></a>
                    </section>

                        <section>
                            <a href="#">Legal policy</a>
                            <a href="#">Status policy</a>
                            <a href="#">Privacy policy</a>
                            <a href="#">Terms of service</a>
                        </section>
                    </div>

                        <div className={style.copyright}>
                            Copyright © 2023 Bridge All rights reserved 
                        </div>
                    </footer>




                {/* <footer className={style.footer}>
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
                </footer> */}
            </>

        )
    }

    export default Footer;


