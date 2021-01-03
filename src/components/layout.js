import React from "react"
import PropTypes from "prop-types" //propsの型をチェックする
import 'bootstrap/dist/css/bootstrap.min.css';

// layout.jsは元々あるファイル

const Layout = ({ children }) => {

  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
