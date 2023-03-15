import { useState, useCallback } from "react";

const SUBREDDIT = "movies";
const SORT = "relevance";
const RESULTS = 5;
const SEARCH_TAGS = " official discussion self:true -title:megathread";

const useGetDiscussion = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getDiscussions = useCallback(async (title, applyData) => {
        setIsLoading(true);
        setError(null);

        try {
            // Use reddit search to find the discussion thread
            const searchResponse = await fetch(
                `https://www.reddit.com/r/${SUBREDDIT}/search.json?q=${title}${SEARCH_TAGS}&sort=${SORT}&limit=${RESULTS}&restrict_sr=on`
            );
            const searchResults = await searchResponse.json();
           
            // Create the search results
            const threadList = []

            searchResults.data.children.forEach((thread) => {
                const threadObj = {
                    id: thread.data.id,
                    title: thread.data.title,
                    url: thread.data.url,
                    score: thread.data.score,
                    subreddit: thread.data.subreddit
                }
                threadList.push(threadObj)
            })


            applyData(threadList)

        } catch (error) {
            const text = "Could not retrieve dicussion threads from Reddit!"
            setError(error.message + ": "+ text || text);
        }
        setIsLoading(false);
    }, []);

    // Return variables and functions in an object
    return {
        isLoading,
        error,
        getDiscussions,
    };
};

export default useGetDiscussion;
