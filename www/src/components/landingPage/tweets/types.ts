export interface Tweet {
  id: string;
  handle: string;
  verified: boolean;
  author: string;
  avatar: string;
  date: Date;
  text: string;
  likes: number;
  retweets: number;
  replies: number;
  quotes: number;
}

// used for preview etc when not given an API key
export const dummyTweet: Tweet = {
  id: "1544909672137867264",
  handle: "ajcwebdev",
  author: "Anthony (ajcwebdev.x)",
  verified: false,
  avatar:
    "https://pbs.twimg.com/profile_images/1549247631867711488/hK_Qr-Dx_normal.png",
  date: new Date("2022-07-07T05:02:23.000Z"),
  text: "Now that Blitz.js has pivoted and Bison has stagnated, create-t3-app will be the only framework to give Redwood a run for its money in the quest to build a legitimate fullstack React framework.",
  likes: 18,
  retweets: 3,
  replies: 9,
  quotes: 1,
};
