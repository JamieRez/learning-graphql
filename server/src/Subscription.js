function newCommentSubscribe (parent, args, context, info) {
  return context.db.subscription.comment(
    { where: { mutation_in: ['CREATED'] } },
    info,
  )
}

const newComment = {
  subscribe: newCommentSubscribe
}

module.exports = {
  newComment,
}
