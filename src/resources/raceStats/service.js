import UserInputError from "@/errors/userInputError";
import csvParser from "neat-csv";
import fsPromises from "fs/promises";
import path from "path";
import { time } from "console";

export default class Service {
  async #loadDefaultCsv() {
    // Could also set file contents directly to a variable depending on performance needs
    try {
      return await fsPromises.readFile(path.join(__dirname, "defaultLog.csv"));
    } catch (e) {
      console.error(e);
      throw new Error("Error loading default log file");
    }
  }

  async #loadAndValidateCsv(csvText) {
    if (!csvText) {
      csvText = await this.#loadDefaultCsv();
    }

    try {
      // For now assume format will always be correct
      return await csvParser(csvText, { separator: ";" });
    } catch (err) {
      throw new UserInputError("Invalid CSV");
    }
  }

  async getStats(csvText) {
    const csv = await this.#loadAndValidateCsv(csvText);
    const statsMap = new Map();

    const getDefaultStats = (hero) => {
      const [code, name] = hero.split("–");
      return {
        position: 0,
        code: parseInt(code),
        name,
        bestLap: 0,
        bestLapSpeed: 0,
        laps: 0,
        time: 0,
      };
    };

    for (const lap of csv) {
      const hero = lap["Super-Heroi"];
      const speed = parseFloat(
        lap["Velocidade média da volta"].replace(",", ".")
      );
      const timeText = lap["Tempo Volta"];
      const lapNumber = parseFloat(lap["No Volta"]);

      if (!statsMap.has(hero)) {
        statsMap.set(hero, getDefaultStats(hero));
      }

      // Split text on anything that is not a number at most 3 times
      const [minutes, seconds, ms] = timeText.split(/[^\d]/g, 3);

      const time =
        parseInt(minutes) * 60 * 1000 + parseInt(seconds) * 1000 + parseInt(ms);

      const currentHeroStats = statsMap.get(hero);

      // Assuming the speed unit is distance per miliseconds
      if (currentHeroStats.bestLapSpeed < speed) {
        currentHeroStats.bestLapSpeed = speed;
        currentHeroStats.bestLap = lapNumber;
      }
      currentHeroStats.position += speed * time;
      currentHeroStats.time += time;
      currentHeroStats.laps++;
    }

    const stats = [];

    for (const stat of statsMap.values()) {
      const dateDuration = new Date(stat.time);
      const minutes = `${dateDuration.getMinutes()}`.padStart(2, "0");
      const seconds = `${dateDuration.getSeconds()}`.padStart(2, "0");
      const ms = `${dateDuration.getMilliseconds()}`.padStart(3, "0");
      stat.time = `${minutes}:${seconds}.${ms}`;
      stats.push(stat);
    }

    return stats;
  }
}
