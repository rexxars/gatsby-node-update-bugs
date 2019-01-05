const defaultConfig = {
  deleteAfterMs: false,
  updateBodyAfterMs: false,
  updateTitleAfterMs: false,
}

exports.sourceNodes = (context, config = {}) => {
  const { actions, createNodeId, createContentDigest, reporter } = context
  const { createNode, deleteNode } = actions
  const { deleteAfterMs, updateBodyAfterMs, updateTitleAfterMs } = {
    ...defaultConfig,
    ...config,
  }

  if (!deleteAfterMs && !updateBodyAfterMs && !updateTitleAfterMs) {
    reporter.panic(
      'Must set one of `deleteAfterMs` or `updateTitleAfterMs` to an interval in milliseconds in `gatsby-config.js`'
    )
  }

  const nodes = [1, 2, 3, 4].map(item => {
    const content = {
      title: `Title of post #${item}`,
      body: `Text of blog post ${item}`,
    }

    return {
      id: createNodeId(`post-${item}`),
      parent: null,
      children: [],
      ...content,
      internal: {
        mediaType: 'application/json',
        type: 'MockBlogPost',
        contentDigest: createContentDigest(JSON.stringify(content)),
      },
    }
  })

  nodes.forEach(node => createNode(node))

  if (deleteAfterMs) {
    // Now wait for configured interval, then delete one of the nodes (post-1)
    delay(deleteAfterMs).then(() => {
      const node = nodes[0]
      reporter.info(`Deleting node "post-1" (${node.id})`)
      deleteNode({ node })
    })
  }

  if (updateBodyAfterMs) {
    // Update post-2 without affecting the slug - ergo an existing page will be recreated
    // This one actually works.
    delay(updateBodyAfterMs).then(() => {
      const content = { body: `Updated ${nodes[1].body}` }
      reporter.info(`Updating node "post-2" (${nodes[1].id}})`)
      createNode(getUpdatedNode(nodes[1], content, createContentDigest))
    })
  }

  if (updateTitleAfterMs) {
    // Update post-3 by altering the title and thus creating a new slug.
    // This will cause the old page to linger, while a new one is created
    delay(updateTitleAfterMs).then(() => {
      const content = {
        title: `Updated ${nodes[2].title}`,
        body: `Updated ${nodes[2].body}`,
      }
      reporter.info(`Updating node "post-3" (${nodes[2].id}})`)
      createNode(getUpdatedNode(nodes[2], content, createContentDigest))
    })
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getUpdatedNode(node, content, createContentDigest) {
  return {
    ...node,
    ...content,
    internal: {
      mediaType: 'application/json',
      type: 'MockBlogPost',
      contentDigest: createContentDigest(JSON.stringify(content)),
    },
  }
}
