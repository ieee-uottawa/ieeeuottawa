import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Button, Hidden, IconButton } from '@material-ui/core';
import {
    CloseIcon,
    Link,
    MaterialMenu,
    MenuIcon,
    NavButton,
    NavDropDown,
    Toggle
} from '../../helpers/components';
import { sun, moon, logo2 as logo } from '../../helpers/theme';
import { translate, getCurrentLanguage } from '../../helpers/translation';
import { routes } from '../../utils/routes';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            anchorEl: null
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleMenuTheme = this.handleMenuTheme.bind(this);
    }

    handleMenuTheme() {
        const { theme, toggleTheme } = this.props;
        toggleTheme(theme === 'light' ? 'dark' : 'light');
    }

    handleMenuClick({ currentTarget }) {
        this.setState({
            isOpen: true,
            anchorEl: currentTarget
        });
    }

    handleMenuClose() {
        this.setState({
            isOpen: false,
            anchorEl: null
        });
    }

    renderLogo() {
        return (
            <Link to="/" href="/" style={{ flexGrow: 1 }}>
                <img
                    src={logo}
                    alt="IEEE uOttawa Logo"
                    style={{
                        maxWidth: '140px',
                        paddingTop: '15px',
                        paddingLeft: '32px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                />
            </Link>
        );
    }

    renderMenuItems() {
        return (
            <div>
                {routes.map(({ title, path: link, items }) => {
                    if (!items) {
                        return (
                            <NavButton
                                key={title}
                                link={link}
                                title={translate(title)}
                                component={Button}
                            />
                        );
                    }
                    return (
                        <NavDropDown
                            key={title}
                            color="inherit"
                            items={items}
                            clickbubbledown="true"
                            component={Button}
                        >
                            {translate(title)}
                        </NavDropDown>
                    );
                })}
            </div>
        );
    }

    renderMobileMenuItems() {
        const { isOpen, anchorEl } = this.state;
        return (
            <div>
                <IconButton onClick={this.handleMenuClick}>
                    {isOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
                {isOpen && (
                    <MaterialMenu
                        anchorEl={anchorEl}
                        items={routes.map(({ title, path: link, items }) => ({
                            title: translate(title),
                            link,
                            items
                        }))}
                        isOpen={isOpen}
                        onClose={this.handleMenuClose}
                    />
                )}
            </div>
        );
    }

    renderThemeIcon(icon) {
        return (
            <img
                src={icon}
                width="16"
                height="16"
                alt="presentation"
                style={{
                    pointerEvents: 'none'
                }}
            />
        );
    }

    renderThemeToggle() {
        const { theme } = this.props;
        return (
            <Toggle
                icons={{
                    checked: this.renderThemeIcon(moon),
                    unchecked: this.renderThemeIcon(sun)
                }}
                checked={theme === 'dark'}
                onClick={this.handleMenuTheme}
            />
        );
    }

    renderLanguageToggle() {
        const { toggleLanguage } = this.props;
        return <Button onClick={toggleLanguage}>{getCurrentLanguage()}</Button>;
    }

    render() {
        return (
            <AppBar
                color="default"
                position="sticky"
                style={{ padding: '0px 0 0' }}
            >
                <Toolbar>
                    {this.renderLogo()}
                    <Hidden smDown>
                        {this.renderMenuItems()}
                        {this.renderThemeToggle()}
                        {this.renderLanguageToggle()}
                    </Hidden>
                    <Hidden mdUp>
                        {this.renderLanguageToggle()}
                        {this.renderThemeToggle()}
                        {this.renderMobileMenuItems()}
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.defaultProps = {
    theme: null
};

Header.propTypes = {
    theme: PropTypes.string,
    toggleTheme: PropTypes.func.isRequired,
    toggleLanguage: PropTypes.func.isRequired
};

export default Header;
