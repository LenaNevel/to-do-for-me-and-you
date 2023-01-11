import React, { Component } from 'react';

import './index.css';
export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-content">
                    <span className="header-main-text">TASK MANAGEMENT</span>
                    <span className="header-sub-text">for me and you</span>
                </div>
            </div>
        );
    }
}
