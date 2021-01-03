const dotenv = require("dotenv")

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config()
}

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////
    // プラグインの追加 ここから
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`, //gatsby-starter-defaultでは既に設定されている
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    //追記 post以下でmarkdownを使う為
    {
      resolve: `gatsby-source-filesystem`, // resolveにはプラグイン名を指定する
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    //////////////////////////////////////////////////////////////////////////////////////////
    // 追加(1): gatsby-transformer-remark
    // https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/?=remark
    // Parses Markdown files using Remark.
    // Markdownファイルをパースし、HTMLデータとして利用可能にする
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    //////////////////////////////////////////////////////////////////////////////////////////
    // 追加(2): gatsby-remark-images
    // https://www.gatsbyjs.com/plugins/gatsby-remark-images/?=remark
    // Processes images in markdown so they can be used in the production build.
    // markdownで画像を使えるようにする
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
        ],
      },
    },
    //////////////////////////////////////////////////////////////////////////////////////////
    // 追加(3): gatsby-remark-relative-images
    // https://www.gatsbyjs.com/plugins/gatsby-remark-relative-images/?=remark%20re
    // Add static assets before markdown files
    // markdown / html / frontmatter内の画像srcを、ノードの親ディレクトリを基準にするように変換します。
    // これは、gatsby-remark-imagesがノードフォルダー外の画像と一致するのに役立ちます。
    // これはNetlifyCMSで使用するために構築されたものであり、相対パスがサポートされるまでの一時的な解決策と見なす必要があります。
    // それが他のユースケースで機能する場合は素晴らしいです
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
        ],
      },
    },
    // gatsby-source-contentfulを追加
    // https://www.gatsbyjs.com/plugins/gatsby-source-contentful/?=Gatsby%20soure%20contes
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  // プラグインの追加 ここまで
  ],
}
