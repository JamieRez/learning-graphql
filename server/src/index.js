const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Subscription = require('./Subscription')

const resolvers = {
  Query: {
    feed(parent, args, ctx, info) {
      return ctx.db.query.comments({where: {}}, info)
    },
    comment(parent, { id }, ctx, info) {
      return ctx.db.query.comment({ where: { id } }, info)
    },
  },
  Mutation: {
    createComment(parent, args, ctx, info) {
      return ctx.db.mutation.createComment({
        data: {
          text : args.text,
        },
      },
        info,
      )
    },
    deleteComment(parent, { id }, ctx, info) {
      return ctx.db.mutation.deleteComment({where : { id }}, info)
    }
  },
  Subscription
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
      endpoint: 'https://us1.prisma.sh/public-plumeneck-656/newskills/dev', // the endpoint of the Prisma API
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
