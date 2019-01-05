This repo reproduces a few different issues related to how Gatsby handles updates to pages when nodes are updated/deleted after the initial build (when in development mode).

## Bug 1 - Deleting nodes

Set `deleteAfterMs` to for instance `10000` in `gatsby-config.js` to reproduce.

1. A mock source plugin creates 4 nodes
2. `gatsby-node.js` in the Gatsby project creates pages for the 4 nodes
3. `gatsby-node.js` calls `createPageDependency()` to bind the node and the page together
4. The mock source plugin calls `deleteNode()` on one of the nodes.
5. Nothing is updated. Pages are not rebuilt.

## Bug 2 - Updating nodes

Set `updateTitleAfterMs` to for instance `10000` in `gatsby-config.js` to reproduce.

1. A mock source plugin creates 4 nodes
2. `gatsby-node.js` in the Gatsby project creates pages for the 4 nodes
3. `gatsby-node.js` calls `createPageDependency()` to bind the node and the page together
4. The mock source plugin calls `createNode()` on one of the nodes with an updated title.
5. Since the page URL is built using the title, it is now treated as a new page and is created, but does not work. The old page is not removed, either.

The console reports:

```
Error loading a result for the page query in "/updated-title-of-post-3". Query was not run and no cached result was found.
Page not found /updated-title-of-post-3
```

While the page is presented without any content.
