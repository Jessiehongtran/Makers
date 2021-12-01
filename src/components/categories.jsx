import React from 'react';
import Category from './category';
import { API_URL } from '../APIconfig';
import axios from 'axios';

export default class Categories extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            categories: []
        }
        this.getCategories = this.getCategories.bind(this)
    }

    componentDidMount(){
        this.getCategories()
    }

    async getCategories(){
        try {
            const response = await axios.get(`${API_URL}/api/category`)
            this.setState({ categories: response.data })
        } catch (err){
            console.log(err.message)
        }
    }

    render(){

        const { categories } = this.state;

        return (
            <div class="categories-container" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}>
                <div class="categories-wrapper" style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1200px' }}>
                   {categories.map(cate => <Category category={cate} history={this.props.history} />)} 
                </div>
            </div>
        )
    }
}