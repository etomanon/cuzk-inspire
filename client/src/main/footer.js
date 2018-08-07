import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className='container'>
                <div className="row mt-4">
                    <div className="col-lg">
                        <div className="bg-light p-3 text-center">
                        {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Footer;