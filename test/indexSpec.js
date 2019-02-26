const {expect} = require('chai')

const {sortByTokens} = require('../index')

describe('sortByTokens', () => {

  let sortedList

  context('with regular items', () => {
    beforeEach(() => {
      const list = ["B", "C", "A", "D"]
      sortedList = sortByTokens(list)
    })

    it('should sort the items', () => {
      expect(sortedList).to.deep.equal(["A", "B", "C", "D"])
    })
  })

  context('with complicated tokens', () => {
    beforeEach(() => {
      const list = ["3 - C", "1 - A", "B", "3 - C - 1", "3 - C - 2"]
      sortedList = sortByTokens(list)
    })

    it('should sort the complicated items', () => {
      expect(sortedList).to.deep.equal([
        "1 - A",
        "3 - C",
        "3 - C - 1",
        "3 - C - 2",
        "B"
      ])
    })
  })
})
