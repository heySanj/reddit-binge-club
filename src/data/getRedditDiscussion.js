// https://www.reddit.com/r/movies/search.json?q=Dune%20Discussion%20Official%20[SPOILERS]&sort=relevance&limit=5

const SUBREDDIT = "movies"
const SORT = "relevance"
const RESULTS = 5
const SEARCH_TAGS = " Discussion Official [SPOILERS]"


// Comment Depth will return a reply chain up to this number
// To get more 'sibling' replies, you need to call the morechildren api
const COMMENT_DEPTH = 2 
const COMMENT_SORT = "top"
const COMMENT_LIMIT = 10

export const getDiscussion = async (title) => {
    
    // Use reddit search to find the discussion thread
    const searchResponse = await fetch(`https://www.reddit.com/r/${SUBREDDIT}/search.json?q=${title}${SEARCH_TAGS}&sort=${SORT}&limit=${RESULTS}`)
    const searchResults = await searchResponse.json()

    // Drill down the data into the first Thread
    const thread = searchResults.data.children[0]
    
    // console.log(thread.data.title)
    // console.log(thread.data.url)

    // Now lets get the comments
    const commentsResponse = await fetch(`${thread.data.url}.json?depth=${COMMENT_DEPTH}&sort=${COMMENT_SORT}&limit=${COMMENT_LIMIT}`)
    const commentsData = await commentsResponse.json()

    const topLevelComments = []

    // Loop through all top level comments
    commentsData[1].data.children.forEach(comment => {
        const commentObj = {
            body: comment.data.body,
            author: comment.data.author,
            score: comment.data.score,
            date: comment.data.created
        }
        topLevelComments.push(commentObj)
    });

    return topLevelComments

}
