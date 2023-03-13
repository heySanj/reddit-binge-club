import { useState } from "react";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import useGetDiscussion from "../hooks/use-get-discussions";
import useGetComments from "../hooks/use-get-comments";
import CommentList from "./CommentList";
import LoadingSpinner from "./UI/LoadingSpinner";
import Alert from "./UI/Alert";

const MovieSearch = () => {
    const [discussions, setDiscussions] = useState([]);
    const [comments, setComments] = useState({});

    const {
        isLoading: resultsLoading,
        error: resultsError,
        getDiscussions,
    } = useGetDiscussion();
    const {
        isLoading: commentsLoading,
        error: commentsError,
        getComments,
    } = useGetComments();

    const findDiscussions = (searchTerm) => {
        setDiscussions([]);
        getDiscussions(searchTerm, setDiscussions);
    };

    const loadComments = (thread) => {
        setComments({})
        getComments(thread, setComments);
    };


    return (
        <>
            <SearchInput findDiscussionHandler={findDiscussions} />
            {discussions.length > 0 && (
                <SearchResults
                    threads={discussions}
                    commentLoader={loadComments}
                />
            )}
            {resultsError && <Alert colour="alert-error" message={resultsError}/>}
            {resultsLoading && <LoadingSpinner />}

            {JSON.stringify(comments) !== "{}" && (
                <>
                    <div className="pt-12">
                        <h3 className="py-4 text-3xl font-bold text-warning">
                            {comments.title}
                        </h3>
                        <a
                            className="btn-outline btn-accent btn-xs btn"
                            href={comments.url}
                        >
                            See Full Thread
                        </a>

                        <CommentList commentsData={comments.comments} />
                    </div>
                </>
            )}
            {commentsError && <Alert colour="alert-error" message={commentsError}/>}
            {commentsLoading && <LoadingSpinner />}
        </>
    );
};

export default MovieSearch;
