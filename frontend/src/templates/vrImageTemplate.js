import React from 'react';
import { graphql } from 'gatsby';
import 'aframe';
import { Typography } from '@material-ui/core';

function fixName(name) {
    name = name.replace('--', ': ');
    name = name.replace('-', ' ');
    return name
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()));
}

// The 'data' prop will be injected by the GraphQL query below.
export default function Template({ data }) {
    const { allFile } = data;

    // Get the image data.
    const { edges } = allFile;
    const node = edges[0].node;
    const { name, publicURL } = node;

    console.log(`Rendering ${publicURL}`);
    console.log(node);

    return (
        <div className="blog-post-container">
            <div className="blog-post">
                <Typography variant="h1">{fixName(name)}</Typography>
                <Typography variant="h5">
                    Loading Source file: {publicURL}
                </Typography>
                <Typography>Thank you for your patience!</Typography>
                <a-scene>
                    <a-sky src={publicURL} />
                    <a-text
                        font="kelsonsans"
                        value={fixName(name)}
                        width="6"
                        position="-3 1 -3"
                        rotation="0 15 0"
                        text=""
                    />
                </a-scene>
            </div>
        </div>
    );
}

export const pageQuery = graphql`
    query($relativePath: String!) {
        allFile(filter: { relativePath: { eq: $relativePath } }) {
            edges {
                node {
                    name
                    publicURL
                    relativePath
                }
            }
        }
    }
`;
