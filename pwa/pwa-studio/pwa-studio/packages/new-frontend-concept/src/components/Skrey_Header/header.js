import React, { Suspense } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { Menu as MenuIcon } from 'react-feather';

import Skrey_MenuIcon from 'src/components/Skrey_MenuIcon';
import Icon from 'src/components/Icon';
import Logo from 'src/components/Skrey_Logo';
import { Link, resourceUrl, Route } from 'src/drivers';

import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import OnlineIndicator from 'src/components/OnlineIndicator';

import { mergeClasses } from 'src/classify';
import defaultClasses from './header.css';

const SearchBar = React.lazy(() => import('src/components/Skrey_SearchBar'));

const Header = props => {
    const { hasBeenOffline, isOnline, searchOpen } = props;

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = searchOpen ? classes.open : classes.closed;
    const suspenseFallback = (
        <div className={classes.searchFallback}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );

    return (
        <header className={rootClass}>
            <div className={classes.toolbar}>
                <div className={classes.primaryActions}>
                    <NavTrigger>
                        <Skrey_MenuIcon />
                    </NavTrigger>
                    <Link to={resourceUrl('/')}>
                        <Logo classes={{ logo: classes.logo }} />
                    </Link>
                </div>
                <OnlineIndicator
                    hasBeenOffline={hasBeenOffline}
                    isOnline={isOnline}
                />
                <div className={classes.secondaryActions}>
                    <CartTrigger />
                </div>
            </div>
            <Suspense fallback={true ? suspenseFallback : null}>
                <Route
                    render={({ history, location }) => (
                        <SearchBar
                            isOpen={true}
                            history={history}
                            location={location}
                        />
                    )}
                />
            </Suspense>
        </header>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string
    }),
    searchOpen: bool,
    toggleSearch: func.isRequired
};

export default Header;
