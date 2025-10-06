import constellationImagesJSON from "../constants/mappings/constellation_images.json" with { type: "json" };
import holidayImagesJSON from "../constants/mappings/holiday_images.json" with { type: "json" };
import summoningDaysImagesJSON from "../constants/mappings/summoningDay_images.json" with { type: "json" };
import constellationsJSON from "../constants/strings/en_constellations.json" with { type: "json" };
import holidaysJSON from "../constants/strings/en_holidays.json" with { type: "json" };
import summoningDaysJSON from "../constants/strings/en_summoningDays.json" with { type: "json" };

function findItemsWithoutImages(data, images, hasDays = true) {
  const result = [];
  for (const month in data) {
    if (hasDays) {
      for (const day in data[month]) {
        if (!images[month] || !images[month][day]) {
          result.push({
            month,
            day,
            name: data[month][day].name,
            description: data[month][day].description
          });
        }
      }
    } else if (!images[month]) {
      result.push({
        month,
        name: data[month].name,
        description: data[month].description
      });
    }
  }
  return result.sort((a, b) => a.month - b.month || a.day - b.day);
}

const holidaysWithoutImages = findItemsWithoutImages(holidaysJSON, holidayImagesJSON);
if (holidaysWithoutImages.length) {
  console.info("Holidays without image mappings:", holidaysWithoutImages);
}

const summoningDaysWithoutImages = findItemsWithoutImages(summoningDaysJSON, summoningDaysImagesJSON);
if (summoningDaysWithoutImages.length) {
  console.info("Summoning days without image mappings:", summoningDaysWithoutImages);
}

const constellationsWithoutImages = findItemsWithoutImages(constellationsJSON, constellationImagesJSON, false);
if (constellationsWithoutImages.length) {
  console.info("Constellations without image mappings:", constellationsWithoutImages);
}
