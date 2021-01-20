import chai from 'chai'
import Service from './service'
import fs from 'fs'

describe('Race Stats Service', () => {
  const service = new Service()
  it('should return correct stats', async () => {
    const csv = fs.readFileSync('./src/resources/raceStats/defaultLog.csv')
    const result = await service.getStats(csv)

    chai
      .expect(result, JSON.stringify(result))
      .to.be.deep.equals({
        herosStas: [
          {
            code: 38,
            name: 'Superman',
            position: 11131183.783,
            bestLap: 3,
            bestLapSpeed: 44.334,
            totalLaps: 4,
            totalTimeMs: 251578,
            totalTimeText: '04:11.578',
            overallAverageSpeed: 44.24545780235156
          },
          {
            code: 2,
            name: 'Mercúrio',
            position: 11131150.788,
            bestLap: 4,
            bestLapSpeed: 44.118,
            totalLaps: 4,
            totalTimeMs: 255153,
            totalTimeText: '04:15.153',
            overallAverageSpeed: 43.6253964797592
          },
          {
            code: 33,
            name: 'Flash',
            position: 11131147.536,
            bestLap: 3,
            bestLapSpeed: 43.675,
            totalLaps: 4,
            totalTimeMs: 256080,
            totalTimeText: '04:16.080',
            overallAverageSpeed: 43.46746148078726
          },
          {
            code: 23,
            name: 'Sonic',
            position: 11131196.862,
            bestLap: 4,
            bestLapSpeed: 43.335,
            totalLaps: 4,
            totalTimeMs: 257722,
            totalTimeText: '04:17.722',
            overallAverageSpeed: 43.190712713699256
          },
          {
            code: 15,
            name: 'PAPALÉGUA',
            position: 8348445.277999999,
            bestLap: 2,
            bestLapSpeed: 41.528,
            totalLaps: 3,
            totalTimeMs: 225517,
            totalTimeText: '03:45.517',
            overallAverageSpeed: 37.01913947950708
          },
          {
            code: 15,
            name: 'PAPALÉGU',
            position: 2782786.8159999996,
            bestLap: 3,
            bestLapSpeed: 40.504,
            totalLaps: 1,
            totalTimeMs: 68704,
            totalTimeText: '01:08.704',
            overallAverageSpeed: 40.504
          },
          {
            code: 11,
            name: 'GATOAJATO',
            position: 8348400.476,
            bestLap: 3,
            bestLapSpeed: 35.633,
            totalLaps: 3,
            totalTimeMs: 387276,
            totalTimeText: '06:27.276',
            overallAverageSpeed: 21.556720468089942
          }
        ],
        bestOverallLapSpeed: 44.334
      })
  })
})
