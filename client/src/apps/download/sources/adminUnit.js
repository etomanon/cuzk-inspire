import React, { Component } from 'react';
import { connect } from 'react-redux';

import ApiHeader from 'src/components/api/apiHeader';
import ApiForm from 'src/components/api/apiForm';
import ApiTable from 'src/components/api/apiTable';
import ApiRow from 'src/components/api/apiRow';
import ApiModal from 'src/components/api/apiModal';

class AdminUnit extends Component {
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
                    title="Administrative units"
                />

                <ApiForm
                    action="/api/admin-units/get"
                    hintUrl="/api/admin-units/"
                    profile={profile}
                    level={true}
                    label="Write code or name of the administrative unit"
                />
                <ApiTable>
                    <ApiRow
                        url="/api/admin-units/get"
                        description="Get geometry for administrative unit"
                        sendRequest={this.sendRequest}
                        request={`axios.post('/api/admin-units/get', {
                                    adminUnit: 'Brno',
                                    // name ('Brno') or code ('582786')
                                    level: 'Obec',
                                    // Obec = Town 
                                    // Okres = District 
                                    // Kraj = Region
                                    format: 'GML',
                                    // if not specified: 'GeoJSON'
                                    srs: 'EPSG:3857',
                                    // if not specified: 'EPSG:4326'
                                    lowerAdmin: false,
                                    // if not specified: false
                                    apiKey: ${profile.freeToken}
                                })`}
                    />
                </ApiTable>
                <div className="row justify-content-center mb-3">
                    <div className="col-lg-6 mt-3">
                        <form method="post" action="/api/admin-units/cze">
                            <input type="hidden" name="apiKey" value={profile.freeToken} />
                            <button type="submit" className="btn btn-primary">Download all administrative units<br />with geometry
                                        (GML, EPSG:4258, 80 MB)</button>
                        </form>
                    </div>
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

export default connect(mapStateToProps)(AdminUnit);