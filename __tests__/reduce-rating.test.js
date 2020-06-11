const reduceRating = require('../reduce-rating')
const match = require('../matches/tta2/My Victry - 20200610.json')

describe('reduceRating', () => {
  it('reduces rating as expected', () => {
    expect.hasAssertions()
    expect(
      reduceRating(
        {
          aaron: { mu: 17.408, sigma: 5.389 },
          ken: { mu: 33.779, sigma: 4.906 },
          adam: { mu: 14.812, sigma: 5.994 },
          jenn: { mu: 28.674, sigma: 8.132 },
        },
        match
      )
    ).toStrictEqual({
      aaron: { mu: 19.06665739605397, sigma: 5.37353333679219 },
      ken: { mu: 33.8897269980001, sigma: 4.863219619462103 },
      adam: { mu: 15.898952504431042, sigma: 5.910736425389025 },
      jenn: { mu: 22.592226614031976, sigma: 7.701672339692088 },
    })
  })
})
