import React from 'react';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import { graphql, StaticQuery } from 'gatsby';

import { ExecCard } from '../components/cards';

const Execs = () => (
  <StaticQuery
    query={
      graphql`
        query {
          allExecsJson {
            edges {
              node {
                name
                position
                image {
                  childImageSharp {
                    fixed(width: 166, height: 166) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
            }
          }
        }
      `
    }
    render={({ allExecsJson: { edges } }) => (
      <div>
        <Typography variant="h5" gutterBottom className="center-horizontal">About Us</Typography>
        <p className="p-margins">
          The IEEE uOttawa Student Branch is the official student branch for the University of Ottawa and the official
          Sub-Association for ELG/CEG/SEG
          under the ESS.
        </p>
        <p className="p-margins">
          The University of Ottawa’s IEEE Student Branch was established to provide professional services to improve each student’s
          experience on campus.
          This includes accommodating students with access to up-to-date equipment, internet access, textbooks and a quiet work environment.
        </p>
        <p className="p-margins">*Disclaimer: The opinions and content carried by this page are those of its owners or operators, not of IEEE.</p>

        <Typography variant="h6" gutterBottom className="center-horizontal">Our Execs</Typography>
        <GridList cols={5} style={{ margin: '0 7.5% 0' }}>
          {edges.map(({ node: { name, position, image } }) => <ExecCard name={name} position={position} image={image} />)}
        </GridList>
      </div>
    )}
  />
);

export default Execs;
