import { useState, useCallback } from "react";

const SUBREDDIT = "movies";
const SORT = "relevance";
const RESULTS = 5;
const SEARCH_TAGS = " Discussion Official [SPOILERS]";

// Comment Depth will return a reply chain up to this number
// To get more 'sibling' replies, you need to call the morechildren api
const COMMENT_DEPTH = 2;
const COMMENT_SORT = "top";
const COMMENT_LIMIT = 10;

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const sendRequest = useCallback(async (requestConfig, applyData) => {
    //     setIsLoading(true);
    //     setError(null);
    //     try {
    //         const response = await fetch(requestConfig.url, {
    //             method: requestConfig.method ? requestConfig.method : 'GET',
    //             headers: requestConfig.headers ? requestConfig.headers : {},
    //             body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    //         });

    //         if (!response.ok) {
    //             throw new Error("Request failed!");
    //         }

    //         const data = await response.json();

    //         applyData(data)

    //     } catch (err) {
    //         setError(err.message || "Something went wrong!");
    //     }
    //     setIsLoading(false);
    // }, []);

    const getDiscussion = useCallback(async (title, applyData) => {
        setIsLoading(true);
        setError(null);

        try {
            // Use reddit search to find the discussion thread
            const searchResponse = await fetch(
                `https://www.reddit.com/r/${SUBREDDIT}/search.json?q=${title}${SEARCH_TAGS}&sort=${SORT}&limit=${RESULTS}`
            );
            const searchResults = await searchResponse.json();

            // Drill down the data into the first Thread
            const thread = searchResults.data.children[0];

            // console.log(thread.data.title)
            // console.log(thread.data.url)

            // Now lets get the comments
            const commentsResponse = await fetch(
                `${thread.data.url}.json?depth=${COMMENT_DEPTH}&sort=${COMMENT_SORT}&limit=${COMMENT_LIMIT}`
            );
            const commentsData = await commentsResponse.json();

            const topLevelComments = [];

            // Loop through all top level comments
            commentsData[1].data.children.forEach((comment) => {
                const commentObj = {
                    id: comment.data.id,
                    body: comment.data.body,
                    author: comment.data.author,
                    score: comment.data.score,
                    date: comment.data.created,
                };
                topLevelComments.push(commentObj);
            });

            // Save the data
            applyData(topLevelComments)

        } catch (error) {
            setError(err.message || "Something went wrong!");
        }
        setIsLoading(false);
    }, []);

    // Return variables and functions in an object
    return {
        isLoading,
        error,
        getDiscussion,
    };
};

export default useHttp;
