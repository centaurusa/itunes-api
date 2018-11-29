import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onInputChange(event) {
        if (event.target.value.trim() === ' ') {
            return;
        }
        this.setState({
            query: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.search(this.state.query);
        this.setState({ query: ''});
    }
    

    render() {
        const { showPrevQueries } = this.props;
        return (
            <header>
                <Link to={'/'} style={{ textDecoration: 'none', color: '#f06c64' }} ><h1>Itunes Search</h1></Link>
                <form onSubmit={this.onSubmit}>
                    <input type={'text'} value={this.state.query} onChange={this.onInputChange} />
                    <button type={'submit'}>Search</button>
                </form>
                <button onClick={showPrevQueries}>Top 10 searching</button>
            </header>
        )
    }
};

export default Header;