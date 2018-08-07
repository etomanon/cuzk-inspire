import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import './pageFade.css';

export default class PageFade extends Component {
    render = () => {
        return <CSSTransition
            {...this.props}
            classNames="fadeTranslate"
            timeout={400}
            mountOnEnter={true}
            unmountOnExit={true}
        />
    }
}