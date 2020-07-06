import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import Img from "gatsby-image"
import SEO from "../components/seo"
import photosStyles from "./photos.module.css"

const IndexPage = ({ data }) => {
  const column1 = [];
  const column2 = [];
  data.allInstaNode.edges.map(({ node }, index) => {
    const photo = (
      <div className={photosStyles.photoContainer}>
        <Img fluid={node.localFile.childImageSharp.fluid} />
        <div className={photosStyles.photoOverlay}>
          <div className={photosStyles.caption}>
            {node.caption}
          </div>
        </div>
      </div>
    );
    if (index % 2) column1.push(photo);
    else column2.push(photo);
  })
  return (
    <Layout>
      <SEO title="Photos" />
        <h1>
          <a href="https://www.instagram.com/naranoeur/">
            Photos
          </a>
        </h1>
        <div className={photosStyles.photosContainer}>
          <div className={photosStyles.column}>
            {column1}
          </div>
          <div className={photosStyles.column}>
            {column2}
          </div>
        </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allInstaNode(sort: { fields: [likes], order: DESC}) {
      edges {
        node {
          timestamp
          caption
          localFile {
            childImageSharp {
              fluid(maxWidth: 700, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
