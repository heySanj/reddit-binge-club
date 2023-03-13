import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import useHttp from "./hooks/use-http";

import CommentList from "./components/CommentList";
import MovieSearch from "./components/MovieSearch";

function App() {
    const [count, setCount] = useState(0);

    const [threadData, setThreadData] = useState([]);

    const { isLoading, error, getDiscussion } = useHttp();

    // Fetch comments on load
    // useEffect(() => {
    //     const loadedComments = getDiscussion("Dune", setComments);
    // }, [getDiscussion]);

    const findDiscussion = (searchTerm) => {
        getDiscussion(searchTerm, setThreadData);
    };

    return (
        <div
            className="container mx-auto p-12 text-center
                       text-primary"
        >
            <MovieSearch findDiscussionHandler={findDiscussion} />

            {threadData.title && (
                <div className="pt-12">
                    <h1 className="text-3xl font-black py-4">{threadData.title}</h1>
                    <a
                        className="btn-outline btn-accent btn-xs btn"
                        href={threadData.url}
                    >
                        See Full Thread
                    </a>

                    <CommentList commentsData={threadData.comments} />
                </div>
            )}
        </div>
    );
}

export default App;
