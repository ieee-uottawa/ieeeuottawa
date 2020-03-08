import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Gallery from 'react-photo-gallery';
import { GridList } from '../../helpers/material-ui';
import { Title } from '../../helpers/components';
import { translate } from '../../helpers/translation';
import { isServerSideRendering } from '../../util';

const archives = src => {
    const blacklist = new Set(['0121.jpg', '0123.jpg']);
    for (let item = 0; item < blacklist.length; item += 1) {
        if (String(src).includes(blacklist[item])) return true;
    }
    return false;
};

const getPhotos = nodes => {
    const arr = [];
    if (isServerSideRendering()) return arr;
    for (const node of nodes) {
        const { image } = node;
        const { childImageSharp } = image;
        const { fixed } = childImageSharp;
        const { src } = fixed;
        const width = 2;
        const height = 2;
        if (!archives(src)) arr.push({ src, width, height });
    }
    return arr;
};

const query = graphql`
    query {
        allGalleryJson {
            nodes {
                image {
                    childImageSharp {
                        fixed(width: 586, height: 586) {
                            ...GatsbyImageSharpFixed_withWebp
                        }
                    }
                }
            }
        }
    }
`;

const IEEEGallery = () => {
    return (
        <StaticQuery
            query={query}
            render={({ allGalleryJson: { nodes } }) => {
                const photos = getPhotos(nodes);
                return (
                    <div className="center-horizontal">
                        <Title variant="h5" gutterBottom className="title">
                            {translate('Gallery')}
                        </Title>
                        <GridList cols={5} style={{ margin: '0 5.0% 0' }}>
                            {photos && <Gallery photos={photos} />};
                        </GridList>
                    </div>
                );
            }}
        />
    );
};

export default IEEEGallery;
