import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import Img from "gatsby-image"
import SEO from "../components/seo"
import blogStyles from "./blog.module.css"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Blog" />
      {data.allWordpressPost.edges.map(({ node }) => (
        <div className={blogStyles.blogPost} key={node.slug}>
          <div className={blogStyles.descriptionContainer}>
            <Link to={node.slug}>
              <h2>{node.fields.title}</h2>
              <div className={blogStyles.date}>
                {node.fields.date}
              </div>
            </Link>
          </div>
          <div className={blogStyles.contentContainer}>
            <div className={blogStyles.featureImage}>
              <Link to={node.slug}>
                <Img fluid={node.featureImage.childImageSharp.fluid} />
              </Link>
            </div>
            <div dangerouslySetInnerHTML={{ __html: node.fields.excerpt }} />
          </div>
        </div>
      ))}
  </Layout>
)

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date], order: DESC}) {
      edges {
        node {
          slug
          fields {
            excerpt
            title
            date
          }
          featureImage {
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
