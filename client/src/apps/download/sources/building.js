import React, { Component } from 'react';
import { connect } from 'react-redux';

import ApiHeader from 'src/components/api/apiHeader';
import ApiForm from 'src/components/api/apiForm';
import ApiTable from 'src/components/api/apiTable';
import ApiRow from 'src/components/api/apiRow';
import ApiModal from 'src/components/api/apiModal';

class Building extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: 'text', path: 'text'
        };
    }
    sendRequest = (request, path) => {
        this.setState({ request, path })
    }
    render = () => {
        const profile = this.props.user.profile;
        return (
            <div className='container'>

                <ApiHeader
                    title="Buildings"
                />
                <ApiForm
                        action="/api/buildings/get"
                        hintUrl="/api/admin-units/town/"
                        profile={profile}
                        level={false}
                        label="Write code or name of the town"
                        />

                <ApiTable>
                    <ApiRow
                        url="/api/buildings/get"
                        description="Get geometry for buildings in chosen administrative unit"
                        sendRequest={this.sendRequest}
                        request={`axios.post('/api/buildings/get', {
                                    adminUnit: 'Brno',
                                    // town only
                                    // name ('Brno') or code ('582786')
                                    format: 'GML',
                                    // if not specified: 'GeoJSON'
                                    srs: 'EPSG:3857',
                                    // if not specified: 'EPSG:4326'
                                    apiKey: ${profile.freeToken}
                                })`}
                    />
                </ApiTable>
                <div className="row justify-content-center mb-3">
                    <div className="col-lg-6 mt-3">
                        <form method="post" action="/api/admin-units/list">
                            <input type="hidden" name="apiKey" value={profile.freeToken} />
                            <button type="submit" className="btn btn-primary">Download list of administrative units<br />
                                (JSON, names, codes, district, region)</button>
                        </form>
                    </div>
                </div>

                <ApiModal
                    request={this.state.request}
                    path={this.state.path} />


            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Building);