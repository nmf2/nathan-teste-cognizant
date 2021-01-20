import UserInputError from '@/errors/userInputError'
import csvParser from 'neat-csv'
import fsPromises from 'fs/promises'
import path from 'path'

export default class Service {
  #defaultCsv;
  /**
   * Loads the default CSV file
   */
  async #loadDefaultCsv () {
    // Could also set file contents directly to a variable depending on performance needs
    try {
      if (!this.#defaultCsv) {
        this.#defaultCsv = await fsPromises.readFile(
          path.join(__dirname, 'defaultLog.csv')
        )
      }
      return this.#defaultCsv
    } catch (e) {
      console.error(e)
      throw new Error('Error loading default log file')
    }
  }

  /**
   * Parses the given log (parses the default log if no arguments are passed)
   * @param {string} csvText
   */
  async #loadAndValidateCsv (csvText) {
    if (!csvText) {
      csvText = await this.#loadDefaultCsv()
    }

    try {
      // For now assume format will always be correct
      return await csvParser(csvText, { separator: ';' })
    } catch (err) {
      throw new UserInputError('Invalid CSV')
    }
  }

  /**
   * @typedef HeroStats
   * @type {Object}
   * @property {number} code The hero's code
   * @property {string} name The hero's name
   * @property {number} position The hero's final position
   * @property {number} bestLap The number of the best lap
   * @property {number} bestLapSpeed The average speed of the best lap
   * @property {number} totalLaps The total number of laps
   * @property {number} totalTimeMs The total time the hero participated in miliseconds
   * @property {string} totalTimeText The total time the hero participated in text
   * @property {number} overallAverageSpeed The hero's average speed throughout the test
   */
  /**
   * Returns an object representing the statistics for a hero.
   * @param {string} hero The hero's name
   * @return {HeroStats}
   */
  #getDefaultStats (hero) {
    const [code, name] = hero.split('–')
    return {
      code: parseInt(code),
      name,
      position: 0,
      bestLap: 0,
      bestLapSpeed: 0,
      totalLaps: 0,
      totalTimeMs: 0,
      totalTimeText: null,
      overallAverageSpeed: 0
    }
  }

  /**
   * Returns the race stats from the CSV text
   * @param {string} csvText
   */
  async getStats (csvText) {
    const csv = await this.#loadAndValidateCsv(csvText)

    /**
     * @type {Map<string, HeroStats>}
     */
    const statsMap = new Map()

    for (const lap of csv) {
      const hero = lap['Super-Heroi']
      const speed = parseFloat(
        lap['Velocidade média da volta'].replace(',', '.')
      )
      const timeText = lap['Tempo Volta']
      const lapNumber = parseFloat(lap['No Volta'])

      if (!statsMap.has(hero)) {
        statsMap.set(hero, this.#getDefaultStats(hero))
      }

      // Split text on anything that is not a number at most 3 times
      const [minutes, seconds, ms] = timeText.split(/[^\d]/g, 3)

      // Save the total time in millisecods
      const totalTimeMs =
        parseInt(minutes) * 60 * 1000 + parseInt(seconds) * 1000 + parseInt(ms)

      const currentHeroStats = statsMap.get(hero)

      // Assuming the speed unit is distance per miliseconds
      if (currentHeroStats.bestLapSpeed < speed) {
        currentHeroStats.bestLapSpeed = speed
        currentHeroStats.bestLap = lapNumber
      }

      currentHeroStats.position += speed * totalTimeMs
      currentHeroStats.totalTimeMs += totalTimeMs
      currentHeroStats.totalLaps++
    }

    const stats = []

    /**
     * Calculate total time and overallAverageSpeed of a hero.
     */
    for (const stat of statsMap.values()) {
      const totalTimeMs = stat.totalTimeMs
      const dateDuration = new Date(stat.totalTimeMs)
      const minutes = `${dateDuration.getMinutes()}`.padStart(2, '0')
      const seconds = `${dateDuration.getSeconds()}`.padStart(2, '0')
      const ms = `${dateDuration.getMilliseconds()}`.padStart(3, '0')
      stat.totalTimeText = `${minutes}:${seconds}.${ms}`
      stat.overallAverageSpeed = stat.position / totalTimeMs
      stats.push(stat)
    }

    // Sort stats by best bestLapSpeed
    stats.sort((stat1, stat2) => stat2.bestLapSpeed - stat1.bestLapSpeed)

    const result = {
      herosStas: stats,
      bestOverallLapSpeed: stats[0].bestLapSpeed
    }

    return result
  }
}
