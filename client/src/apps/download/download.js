import React, { Component } from 'react';

import Sources from 'src/components/sources';

class Download extends Component {
    render() {
        return (
            <div className='container'>
                <div className="row m-4">
                    <div className="col-lg">
                        <div className="h3">Choose data source</div>
                        <hr />
                    </div>
                </div>
                <Sources />
            </div>
        )
    }
}

export default Download;