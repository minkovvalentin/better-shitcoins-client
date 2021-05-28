import { RedditCoin } from '../interfaces/coin';
import { coinDetailsApi } from '../routes/routes';

const fetchCoinDetails = async (): Promise<RedditCoin[]> => {
  const response = await fetch(coinDetailsApi);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  console.log(response)

  return await response.json().then(data => data as RedditCoin[]);
}

export {
  fetchCoinDetails
}