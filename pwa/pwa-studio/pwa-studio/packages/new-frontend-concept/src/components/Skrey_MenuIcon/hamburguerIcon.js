import React, { Component } from 'react';
import classify from 'src/classify';
import PropTypes from 'prop-types';

import defaultClasses from './hamburguerIcon.css';

class HamburgerButton extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string,
            root_open: PropTypes.string,
            btnLine: PropTypes.string,
            menuText: PropTypes.string
        })
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.btnLine}></div>
                <div className={classes.btnLine}></div>
                <div className={classes.btnLine}></div>
                <div className={classes.menuText}></div>
            </div>
        );
    }
}

export default classify(defaultClasses)(HamburgerButton);