/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const GA = require('react-ga');
const { isDevEnvironment } = require('./src/util');

const onRouteUpdate = ({ location }) => {
  if (!isDevEnvironment) {
    let path = (location.pathname + location.search);
    if (path.match(/\/.*(\/).*/g)) {
      const lastSlashPos = path.lastIndexOf('/');
      path = path.substring(0, lastSlashPos) + path.substring(lastSlashPos + 1, path.length);
    }
    GA.pageview(path);
  }
};

module.exports = { onRouteUpdate };
