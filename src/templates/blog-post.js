import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import blogPostStyles from "./blog-post.module.css"


export default ({ data }) => {
  const post = data.allWordpressPost.edges[0].node
  return (
    <Layout>
      <div className={blogPostStyles.postContainer}>
        <div className={blogPostStyles.featureImage}>
          <Img fluid={post.featureImage.childImageSharp.fluid} />
        </div>
        <h1 className={blogPostStyles.title}>{post.fields.title}</h1>
        <div className={blogPostStyles.date}>
          {`Posted on ${post.fields.date}`}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    allWordpressPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          content
          fields {
            title
            date
          }
          featureImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
