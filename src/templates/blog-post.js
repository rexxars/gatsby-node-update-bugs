import React from 'react'
import { Link, graphql } from 'gatsby'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mockBlogPost

    return (
      <div>
        <pre>
          <code>{JSON.stringify(post, null, 2)}</code>
        </pre>
        <ul>
          <li>
            <Link to="/">Back</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByTitle($title: String!) {
    mockBlogPost(title: { eq: $title }) {
      title
      body
    }
  }
`
