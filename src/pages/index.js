import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import Img from "gatsby-image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
      <div>
        <Link to={`/blog`}>Blog</Link>
      </div>
      <div>
        <Link to={`/photos`}>Photos</Link>
      </div>
  </Layout>
)

export default IndexPage
