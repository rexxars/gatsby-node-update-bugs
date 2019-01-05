const path = require('path')
const getSlug = require('./src/util/getSlug')

exports.createPages = ({ graphql, actions, reporter }) => {
  reporter.info(`Creating mock pages`)

  const { createPage, createPageDependency } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  graphql(`
    query {
      allMockBlogPost {
        edges {
          node {
            id
            title
            body
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMockBlogPost.edges

    posts.forEach(post => {
      const path = `/${getSlug(post.node)}`

      createPage({
        path,
        component: blogPost,
        context: {
          title: post.node.title,
        },
      })

      createPageDependency({ path, nodeId: post.node.id })
    })

    reporter.info(`Created ${posts.length} pages`)
  })
}
