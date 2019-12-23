/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { init } from '@sentry/browser';
import { initialize } from 'react-ga';

import withRoot from '../withRoot';
import { Header, Footer } from '../helpers/components';
import { logo1 as logo } from '../helpers/theme';
import cart from '../redux/reducers/cart_reducers';
import { isDevEnvironment, isServerSideRendering } from '../util';

import './index.scss';
import favicon from '../../static/images/ieee_logo_circle.png';

const store = createStore(cart);

if (!isDevEnvironment) {
    init({
        dsn: process.env.GATSBY_SENTRY_DSN,
        environment: process.env.NODE_ENV
    });
}

if (!isServerSideRendering()) {
    // console.log(
    // 'Initialized GA',
    // isDevEnvironment ? `: ${process.env.GATSBY_ANALYTICS_ID}` : ''
    // );
    initialize({
        trackingId: process.env.GATSBY_ANALYTICS_ID,
        gaOptions: {
            head: true,
            exclude: [],
            sampleRate: 100,
            siteSpeedSampleRate: 50,
            storeGac: false
        }
    });
}

const Layout = ({
    children,
    theme = 'light',
    toggleTheme,
    language = 'EN'
}) => (
    <Provider store={store}>
        <div
            style={{
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Helmet
                title="IEEE uOttawa Student Branch"
                link={[
                    {
                        rel: 'shortcut icon',
                        type: 'image/png',
                        href: `${favicon}`
                    }
                ]}
            >
                <meta
                    property="og:image"
                    content={`https://ieeeuottawa.ca${logo}`}
                />
                <meta
                    property="og:title"
                    content="IEEE uOttawa Student Branch"
                />
                <meta
                    property="og:description"
                    content="The IEEE uOttawa Student Branch is the official student branch for the University of Ottawa and the official Sub-Association for ELG/CEG/SEG under the ESS. The University of Ottawa’s IEEE Student Branch was established to provide professional services to improve each student’s experience on campus. This includes accommodating students with access to up-to-date equipment, internet access, textbooks and a quiet work environment."
                />
                <meta property="og:url" content="https://ieeeuottawa.ca/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@ieeeuottawa" />
            </Helmet>
            <Header
                theme={theme}
                toggleTheme={toggleTheme}
                language={language}
            />
            <div
                style={{
                    margin: '1em auto 0',
                    paddingTop: '0',
                    flex: '1 0 auto',
                    width: '100%',
                    minHeight: 'calc(100vh - 386px)'
                }}
            >
                {children}
            </div>
            <Footer />
        </div>
    </Provider>
);

Layout.defaultProps = {
    children: null,
    language: 'EN',
    theme: 'light'
};

Layout.propTypes = {
    children: PropTypes.any,
    language: PropTypes.string,
    theme: PropTypes.string,
    toggleTheme: PropTypes.func.isRequired
};

export default withRoot(Layout);
