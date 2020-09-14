import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Kv from "../components/kv"
import BlogItem from "../components/blogItem"
import { Container, Row, Col } from 'react-bootstrap'

const IndexPage = () => {
  // contentfulからデータを取得
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: {
        fields: createdDate,
        order: ASC
      }) {
        edges {
          node {
            title
            slug
            createdDate(formatString: "YYYY/MM/DD")
            thumbnail {
              fluid {
                src
              }
            }
          }
        } 
      }
    }  
  `)
  return (
    <Layout>
      <Kv />
      <Container>
        <Row>
          {
            data.allContentfulBlogPost.edges.map((edge, index) => (
              <Col sm={4} key={index}>
                <BlogItem
                  title={edge.node.title}
                  date={edge.node.createDate}
                  src={edge.node.thumbnail.fluid.src}
                  link={`blog/${edge.node.slug}`} />
              </Col>
            ))
          }
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
