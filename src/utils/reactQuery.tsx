import { QueryClient } from "@tanstack/react-query";
import { getChampionsUrl } from "./urlUtils";

export const queryClient = new QueryClient();

export async function fetchChampions({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<{ champions: any[] }> {
  const response = await fetch(getChampionsUrl());
  if (!response.ok) {
    const error: any = new Error(
      "An error occured while fetching champions info."
    );
    error.code = response.status;
    // throw error;
  }

  const fetchedChampions = await response.json();
  const championsArray: any[] = [];
  Object.keys(fetchedChampions.data).forEach((key) =>
    championsArray.push(fetchedChampions.data[key])
  );
  return { champions: championsArray };
}
