import React, { Component } from 'react';

import './index.css';
let textSize;
let subSize;
export default class Header extends Component {
    render() {
        const headerContent = document.getElementById('root');
        if (headerContent) {
            const heightContent = headerContent.getBoundingClientRect().width;
            textSize = heightContent * 0.15 * 0.15;
            subSize = heightContent * 0.15 * 0.08;
        }
        // console.log(document.getElementsByClassName('header-content'));
        return (
            <div className="header">
                <div className="header-content">
                    <span
                        className="header-main-text"
                        style={{ fontSize: textSize ? textSize + 'px' : '30px' }}
                    >
                        TASK MANAGEMENT
                    </span>
                    <span className="header-sub-text" style={{ fontSize: subSize ? subSize + 'px' : '10px' }}>
                        for me and you
                    </span>
                </div>
            </div>
        );
    }
}
