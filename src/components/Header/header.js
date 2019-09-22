import React from 'react';
import './index.scss';


function HeaderComponent(){
    return (
        <nav class="navbar" role="navigation" aria-label="main navigation">
              <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                <div className="header-logo">
                        </div>
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu">
            <div class="navbar-start">
            <a class="navbar-item">Sign in</a>
            </div>
            <div class="navbar-end">
                <a class="navbar-item">List a property</a>
                <a class="navbar-item">Advertise with us</a>
            </div>
        </div>
        </nav>
       

    )
}

export default HeaderComponent;