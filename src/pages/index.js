import React from 'react'
import { Link, graphql } from 'gatsby'
import getSlug from '../util/getSlug'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = (data.allMockBlogPost.edges || []).map(edge => edge.node)

    return (
      <div>
        <ul>
          {posts.map(post => (
            <li key={post.title}>
              <Link to={`/${getSlug(post)}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMockBlogPost {
      edges {
        node {
          title
          body
        }
      }
    }
  }
`
