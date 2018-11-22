import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import { graphql, StaticQuery } from 'gatsby';
import dayjs from 'dayjs';

import { ProductCard } from '../components/cards';

import '../components/product-card.scss';

class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = { itemCount: 0 };
  }

  render() {
    const { itemCount } = this.state;
    return (
      <StaticQuery
        query={
          graphql`
            query {
              allShopJson {
                edges {
                  node {
                    name
                    price {
                      quantity
                      price
                    }
                    expiry
                    image {
                      childImageSharp {
                        resolutions(width: 382) {
                          ...GatsbyImageSharpResolutions
                        }
                      }
                    }
                    options {
                      size
                      colour
                    }
                  }
                }
              }
            }
          `
        }
        render={({ allShopJson: { edges } }) => (
          <div style={{
            marginLeft: '16px',
            marginRight: '16px',
          }}
          >
            <Typography variant="h5" gutterBottom className="title">Shop</Typography>
            <GridList style={{ justifyContent: 'space-evenly' }}>
              {edges
                .filter(({ node: { expiry } }) => !expiry || (expiry && dayjs(new Date()).isBefore(dayjs(expiry).add(1, 'day'))))
                .map(({ node: { name, price, expiry, image, options } }) => (
                  <GridListTile style={{
                    width: 'inherit',
                    height: 'inherit',
                    padding: 'inherit',
                    flexDirection: 'column',
                    alignSelf: 'center',
                  }}
                  >
                    <ProductCard
                      price={price}
                      name={name}
                      expiry={expiry}
                      imageURL={image}
                      options={options}
                      itemCount={itemCount}
                      onChange={({ target: { value } }) => {
                        if (value) this.setState({ itemCount: Number(value) });
                      }}
                    />
                  </GridListTile>
                ))}
            </GridList>
          </div>
        )}
      />
    );
  }
}

export default Shop;
