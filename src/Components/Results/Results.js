import React, { Component } from 'react';
import ContentCard from '../ContentCard/ContentCard';

class Results extends Component {

    constructor(props) {
        super(props);
        console.log('results in results comp', props);
    }

    render() {
        const { results } = this.props;

        return (
            <div className={'container'}>
                <div className={'row'}>
                    { results.map((result, i) => {
                        return <ContentCard key={i} data={result} index={i}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Results;