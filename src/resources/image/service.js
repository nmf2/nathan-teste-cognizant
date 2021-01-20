import UserInputError from '@/errors/userInputError'

export default class Service {
  _image;
  _valueToCount;
  /**
   * Create the service initializing the image
   * @param {number[][]} image
   */
  constructor (image) {
    if (!image) {
      throw new Error('Missing image argument')
    }
    this._image = image
    this._valueToCount = this.#buildImageMap(image)
  }

  /**
   * Build a map that has how many times each value in the matrix happens. Since
   * the size of the matrix is MxN, this operation will take O(MN) time.
   * @param {number[][]} image
   * @returns {Map<number, number>}
   */
  #buildImageMap (image) {
    /** @type {Map<number, number>} */
    const valueToCount = new Map()
    for (const line of image) {
      for (const cell of line) {
        const cellCount = valueToCount.get(cell)
        valueToCount.set(cell, cellCount + 1 || 1)
      }
    }
    return valueToCount
  }

  /**
   * Returns the count of how many times one value appears in the image
   * @param {number} value
   * @returns {number}
   */
  getCount (value) {
    if (isNaN(value)) {
      throw new UserInputError('Given value is not a number')
    }
    return this._valueToCount.get(value) || 0
  }

  /**
   * Returns an object containing how many times each value in the given values
   * array appears in the image.
   * @param {number[]} values
   * @returns {Object<string, number>}
   */
  getBulkCount (values) {
    if (!values) {
      throw new UserInputError(`Values is not an array, values = ${values}`)
    }

    const result = {}
    for (const value of values) {
      result[value] = this.getCount(value)
    }

    return result
  }
}
