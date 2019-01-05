module.exports = {
  siteMetadata: {
    title: 'Gatsby Bug Reproduction',
    author: 'Espen',
  },
  plugins: [
    {
      resolve: 'gatsby-source-mock',
      options: {
        deleteAfterMs: 10000,
        updateTitleAfterMs: false,
      },
    },
  ],
}
