const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const cheerio = require('cheerio');
const URI = require("urijs");
const moment = require('moment');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allWordpressPost(sort: { fields: [date] }) {
        edges {
          node {
            title
            excerpt
            content
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.allWordpressPost.edges.forEach(({ node }) => {
      createPage({
        path: `blog/${node.slug}`,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // This is the $slug variable
          // passed to blog-post.js
          slug: node.slug,
        },
      })
    })
  })
}


exports.onCreateNode = async ({ node, actions, store, cache }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.

  if (node.internal.type == "wordpress__POST") {

    // turn feature image into Sharp Image

    const fileNode = await createRemoteFileNode({
      url: node.jetpack_featured_media_url,
      store,
      cache,
      createNode,
      createNodeId: id => `wp-feature-${id}`,
    })

    console.log(node.jetpack_featured_media_url);
    console.log(fileNode.id);



    if (fileNode) {
      node.featureImage___NODE = fileNode.id
    }

    // In excerpt, reroute internal links from wordpress to my website
    const $ = cheerio.load(node.excerpt);
    $('a.more-link').attr('href', `/blog/${node.slug}`);

    createNodeField({
      node,
      name: `excerpt`,
      value: $.html()
    })

    // Fix title
    const title = node.title.replace("&nbsp;", " ");
    createNodeField({
      node,
      name: `title`,
      value: title
    })

    // Format date
    const date = moment(node.date).format("MMMM DD, YYYY")
    createNodeField({
      node,
      name: `date`,
      value: date
    })
  }

}


// async function onCreateNode({
//   node,
//   actions,
//   loadNodeContent,
//   createNodeId,
//   createContentDigest,
// }) {
//   function transformObject(obj, id, type) {
//     const yamlNode = {
//       ...obj,
//       id,
//       children: [],
//       parent: node.id,
//       internal: {
//         contentDigest: createContentDigest(obj),
//         type,
//       },
//     }
//     createNode(yamlNode)
//     createParentChildLink({ parent: node, child: yamlNode })
//   }
//   const { createNode, createParentChildLink } = actions
//   if (node.internal.mediaType !== `text/yaml`) {
//     return
//   }
//   const content = await loadNodeContent(node)
//   const parsedContent = jsYaml.load(content)
//   parsedContent.forEach((obj, i) => {
//     transformObject(
//       obj,
//       obj.id ? obj.id : createNodeId(`${node.id} [${i}] >>> YAML`),
//       _.upperFirst(_.camelCase(`${node.name} Yaml`))
//     )
//   })
// }
// exports.onCreateNode = onCreateNode
