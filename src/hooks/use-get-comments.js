import { useState, useCallback } from "react";

// Comment Depth will return a reply chain up to this number
// To get more 'sibling' replies, you need to call the morechildren api
const COMMENT_DEPTH = 2;
const COMMENT_SORT = "top";
const COMMENT_LIMIT = 20;

const useGetComments = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getComments = useCallback(async ({title, url}, applyData) => {
        setIsLoading(true);
        setError(null);

        try {
            // Now lets get the comments
            const commentsResponse = await fetch(
                `${url}.json?depth=${COMMENT_DEPTH}&sort=${COMMENT_SORT}&limit=${COMMENT_LIMIT}`
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
            const threadData = {
                title: title,
                url: url,
                comments: topLevelComments
            }
            applyData(threadData)

        } catch (error) {
            const text = "Could not retrieve comments from the provided URL!"
            setError(error.message + ": "+ text || text);
        }
        setIsLoading(false);
    }, []);

    // Return variables and functions in an object
    return {
        isLoading,
        error,
        getComments,
    };
};

export default useGetComments;
