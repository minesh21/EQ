import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import './header.css';
class HeaderComponent extends Component {
    render() {
        return (
            <Menu stackable>
                <Menu.Item>
                    <Icon color="pink" size="large" name="chart pie"/>
                    Geo Visualization Data
                </Menu.Item>
            </Menu>
        )
    }
}

export default HeaderComponent;