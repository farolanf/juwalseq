const _ = require('lodash')
const { Comment } = require('../../../sequelize')
const { truncate } = require('../../helpers/db')

describe('Comment', () => {

  beforeEach(() => truncate())

  it('replies', async () => {
    const comment = await Comment.create({ comment: 'hi', rating: 5 })
    const reply = await Comment.create({ comment: 'hello', rating: 5 })
    await comment.addReply(reply)
    const _comment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        { model: Comment, as: 'Replies' }
      ],
    })
    assert.isOk(_comment)
    assert.isArray(_comment.Replies)
    assert.lengthOf(_comment.Replies, 1)
    assert.deepEqual(
      _.pick(_comment.Replies[0], ['id', 'comment', 'rating']),
      _.pick(reply, ['id', 'comment', 'rating']))
  })
})