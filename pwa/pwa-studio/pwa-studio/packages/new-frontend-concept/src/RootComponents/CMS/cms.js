import React, { Component } from 'react';
import CategoryList from 'src/components/CategoryList';
import Skrey_Home from 'src/components/Skrey_Home';

export default class CMS extends Component {
    render() {
        return <CategoryList title="Shop by category" id={2} />;//<Skrey_Home />;
    }
}
