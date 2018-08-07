import React, { Component } from 'react';

import Jumbotron from 'src/components/jumbotron';
import Card from 'src/components/card'

class Home extends Component {
    render() {
        return (
            <div>
                <Jumbotron
                    title="Welcome"
                    text="Get data from ČÚZK INSPIRE services" />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md'>
                            <Card title="Simple JSON"
                                icon='far fa-file'
                                text='Compact data to suit all your needs' />
                        </div>
                        <div className='col-md'>
                            <Card title="Easy to use"
                                icon='fas fa-code'
                                text='Fast and responsive' />
                        </div>
                        <div className='col-md'>
                            <Card title="Copyright free"
                                icon='far fa-copyright'
                                text='Full data rights with no restrictions' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;