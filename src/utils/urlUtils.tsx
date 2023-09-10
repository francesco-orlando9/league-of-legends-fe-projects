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

export function getChampionSplashImageUrl(championName: string) {
  const { baseUrl } = ENV;

  return `${baseUrl}/img/champion/splash/${championName}_0.jpg`;
}

export function getChampionCardImgUrl(championName: string) {
  const { baseUrl } = ENV;

  return `${baseUrl}/img/champion/loading/${championName}_0.jpg`;
}
