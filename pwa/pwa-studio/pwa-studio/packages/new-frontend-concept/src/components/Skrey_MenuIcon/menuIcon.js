import React, { Component } from 'react';
import classify from 'src/classify';
import PropTypes from 'prop-types';

import HamburguerIcon from './hamburguerIcon';

import defaultClasses from './menuIcon.css';

class MenuIcon extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string
        })
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <HamburguerIcon />
            </div>
        );
    }
}

export default classify(defaultClasses)(MenuIcon);