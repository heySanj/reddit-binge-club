import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

window.global = window

import Snoowrap from "snoowrap";

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: "reddit-bot-example-node",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS,
});

export const getPost = async (searchQuery) => {
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
    const submission = await r.getSubmission(postID);

    let comments = []

    submission.comments.forEach(async(comment) => {
        // console.log(
        //     "==========================================================\n"
        // );
        // console.log(comment.body);
        // console.log("\n-" + (comment.author.name || "Anon"));

        let commentObj = {
            message: comment.body || "No response",
            author: comment.author.name || "Anon",
            score: comment.score || 1,
            date: comment.created || "unknown",
            replies: []
        }


        comment.replies.forEach(async(reply) => {
            // console.log("\t\t--------------------\n");
            // console.log("\t\t" + reply.body);
            // console.log("\n\t\t-" + (reply.author.name || "Anon"));
            const replyObj = {
                message: reply.body || "No response",
                author: reply.author.name || "Anon",
                score: reply.score || 1,
                date: reply.created || "unknown"
            }

            await comment.replies.push(replyObj)
        });

        // console.log(commentObj)

        await comments.push(commentObj)

    });

    
};

const comments = getPost("Dune")

console.log(comments)


// fs.appendFile("data.txt", JSON.stringify(x), function (err) {
//     if (err) {
//         // append failed
//         console.log(err);
//     } else {
//         // done
//         return;
//     }
// });
// return;