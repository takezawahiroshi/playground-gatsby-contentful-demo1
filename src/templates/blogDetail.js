import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import { Container, Button } from 'react-bootstrap'
// bodyのjsonをReactコンポーネントに変換
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

// slagに紐づいた詳細ページデータを取得する
export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: {eq: $slug}) {
      title
      createdDate
      body {
          json
      }
    }
  }
`

function BlogDetail(props) {
  // リッチテキストに画像を追加する場合オプションを渡す
  // nodeTypeを指定することで、nodeTypeごとに処理を加えることができる
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        return (<img
        width="100%"
        src={node.data.target.fields.file['en-US'].url}
        alt={node.data.target.fields.title['en-US']} />)
      }
    }
  }
  return (
    <Layout>
      <Container style={{maxWidth:640}} className="pt-4">
        <h1>{props.data.contentfulBlogPost.title}</h1>
        <p>{props.data.contentfulBlogPost.createDate}</p>
        {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
      </Container>
      <Container className="text-center">
        <Button href="/" variant="outline-info">一覧へ戻る</Button>
      </Container>
    </Layout>
  )
}

export default BlogDetail