import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import Snoowrap from "snoowrap";

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: "reddit-bot-example-node",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS,
});

// const client = new Snoostorm(r);

// // Configure options for stream: subreddit & results per query
// const streamOpts = {
//     subreddit: 'movies',
//     results: 25
// };

// Search for posts in a subreddit
// const results = r
//     .getSubreddit("movies")
//     .search({ query: "Official Discussion AND Dune AND [SPOILERS]", sort: "comments" })
//     .map(post => post.name)
//     .getSubmission()
//     .then(console.log);

const getPost = async (searchQuery) => {
    const subreddit = await r.getSubreddit("movies");
    const posts = await subreddit.search({
        query: `Official Discussion [SPOILERS] thread ${searchQuery}`,
        sort: "relevance",
    });

    console.log(posts[0].title);
    console.log(posts[0].id);
    console.log(posts[0].url);

    // Now lets find the submission
    const postID = posts[0].id;
    const submission = await r.getSubmission(postID)

    const firstComment = await submission.comments[0]

    // console.log(firstComment.body)

    submission.comments.forEach((x) => {
        console.log("==========================================================\n")
        
        console.log(x.body);
        console.log("\n-" + (x.author.name || "Anon"))
    });
};

getPost("Dune");
