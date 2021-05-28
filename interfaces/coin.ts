export interface RedditCoin {
  id: string;
  title: string;
  rank: string;
  postTime: string;
  authorUrl: string;
  authorName: string;
  score: string;
  comments: string;
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

export interface InternalCoin {
  id: string;
  title: string;
  likes?: string;
  descripton?: string;
  icon?: string; 
  network: string;
}

export type CoinParam = "total_awards_received" | "id" | "title" | "rank" | "postTime" | "authorUrl" | "authorName"| "score" |
"comments" | "subreddit" | "upvote_ratio" | "thumbnail" | "content_categories" | "created" | "stickied" | "commentsNum" 