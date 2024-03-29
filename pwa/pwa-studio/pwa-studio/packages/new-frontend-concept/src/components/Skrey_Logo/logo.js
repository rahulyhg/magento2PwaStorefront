import React from 'react';
import PropTypes from 'prop-types';
import { mergeClasses } from 'src/classify';
import logo from './logo.svg';

const Logo = props => {
    const classes = mergeClasses({}, props.classes);

    return (
        <img
            className={classes.logo}
            src={logo}
            alt="My_logo"
            title="My logo"
        />
    );
};

Logo.propTypes = {
    classes: PropTypes.shape({
        logo: PropTypes.string
    })
};

export default Logo;
