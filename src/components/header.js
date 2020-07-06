import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import headerStyles from "./header.module.css"


const Header = ({ siteTitle }) => (
  <header className={headerStyles.headerContainer}>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `3.45rem 1.0875rem 1.45rem 1.0875rem`,
      }}
    >
      <div className={headerStyles.navigation}>
        <Link className={headerStyles.link} to={`/`}>Home</Link>
        <Link className={headerStyles.link} to={`/blog`}>Blog</Link>
        <Link className={headerStyles.link} to={`/photos`}>Photos</Link>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
