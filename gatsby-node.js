const path = require('path');

//ページの生成
module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    //ブログ詳細ページ用のテンプレートの取得
    const blogTemplate = path.resolve('./src/templates/blogDetail.js')
    //slugの取得
    const res = await graphql(`
        query {
            allContentfulBlogPost {
                edges {
                    node {
                        slug
                    } 
                }
            }
        }    
    `)
    //各ページの生成
    res.data.allContentfulBlogPost.edges.forEach((edge) => {
        createPage({
            component: blogTemplate,
            path: `/blog/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    })
}