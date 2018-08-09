import React from 'react';


class Error404 extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="bg-danger text-white p-4 mt-4">
                            Error 404 - not found.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Error404;