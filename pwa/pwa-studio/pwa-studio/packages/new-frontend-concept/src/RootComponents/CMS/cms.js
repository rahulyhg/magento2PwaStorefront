import React, { Component } from 'react';
import CategoryList from 'src/components/CategoryList';
import SkreyHome from 'src/components/SkreyHome';

export default class CMS extends Component {
    render() {
        return <CategoryList title="Shop by category" id={2} />;//<SkreyHome />;
    }
}
