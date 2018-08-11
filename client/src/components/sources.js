import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'src/components/card';

export default class Sources extends Component {
    render = () => {
        return <div className={this.props.classes ? `row ${this.props.classes}`
    : `row`}>
            <div className='col-md-6'>
                <Link className="nav-link-custom" to="/download/admin-unit">
                    <Card title='Administrative units'
                        icon='fas fa-user'
                        text='Get geometry for any region, district and town in the Czech Republic' />
                </Link>
            </div>
            <div className='col-md-6'>
                <Link className="nav-link-custom" to="/download/building">
                    <Card title='Buildings'
                        icon='fas fa-building'
                        text='Get geometry for buildings in any town in the Czech Republic' />
                </Link>
            </div>
        </div>
    }
}

