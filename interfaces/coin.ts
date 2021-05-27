export interface Coin {
  id: string;
  title?: string;
  rank?: string;
  postTime: string;
  authorUrl: string;
  authorName?: string;
  score?: string;
  comments?: string;
  subreddit: string,
  upvote_ratio: string,
  total_awards_received: number,
  user_reports: number[],
  thumbnail: string,
  content_categories: string,
  created: string,
  stickied: string,
  commentsNum: number
}
