import React from 'react';
import Helmet from 'react-helmet';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { init } from '@sentry/browser';

import withRoot from '../withRoot';
import Header from '../components/header';
import Footer from '../components/footer';
import cart from '../redux/reducers/cart_reducers';

import './index.scss';

const store = createStore(cart);

const Layout = ({ children }) => {
  init({
    dsn: process.env.GATSBY_SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });

  return (
    <Provider store={store}>
      <div style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <Helmet
          title="IEEE uOttawa Student Branch – Powering your student experience!"
          meta={[
            {
              name: 'description',
              content: 'Sample',
            },
            {
              name: 'keywords',
              content: 'sample, something',
            },
          ]}
        />
        <Header />
        <div
          style={{
            margin: '1em auto 0',
            paddingTop: '0',
            flex: '1 0 auto',
            width: '100%',
          }}
        >
          {children}
        </div>
        <Footer />
      </div>
    </Provider>
  );
};

export default withRoot(Layout);
