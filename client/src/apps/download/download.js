import React, { Component } from 'react';

import Sources from 'src/components/sources';
import ApiHeader from 'src/components/api/apiHeader';

class Download extends Component {
    render() {
        return (
            <div className="container">
                <ApiHeader title="Choose data source" />
                <Sources />
            </div>
        )
    }
}

export default Download;