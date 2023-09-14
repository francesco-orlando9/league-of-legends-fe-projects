import { ENV } from "../env";

export function getChampionsUrl() {
  const { baseUrl } = ENV;
  const langCode = navigator.language === "it" ? "it_IT" : "en_US";

  return `${baseUrl}/13.17.1/data/${langCode}/champion.json`;
}

export function getChampionUrl(championName: string) {
  const { baseUrl } = ENV;
  const langCode = navigator.language === "it" ? "it_IT" : "en_US";

  return `${baseUrl}/13.17.1/data/${langCode}/champion/${championName}.json`;
}

// Big Image for detail page
export function getChampionSplashImageUrl(championName: string) {
  const { baseUrl } = ENV;

  return `${baseUrl}/img/champion/splash/${championName}_0.jpg`;
}

// Card Image for all champions page
export function getChampionCardImgUrl(championName: string) {
  const { baseUrl } = ENV;

  return `${baseUrl}/img/champion/loading/${championName}_0.jpg`;
}

// Little image for suggestions list
export function getChampionSuggestionImgUrl(championName: string) {
  const { baseUrl } = ENV;

  return `${baseUrl}/13.17.1/img/champion/${championName}.png`;
}
