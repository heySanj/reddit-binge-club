import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import useHttp from "./hooks/use-http";

import CommentList from "./components/CommentList";
import MovieSearch from "./components/MovieSearch";
import SearchResults from "./components/SearchResults";

function App() {
    const [count, setCount] = useState(0);

    const [threadData, setThreadData] = useState({});

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
            <a
                href="/"
                className="my-6 inline-block text-6xl font-black transition-all hover:text-yellow-400"
            >
                Reddit Binge Club
            </a>
            <MovieSearch findDiscussionHandler={findDiscussion} />

            {JSON.stringify(threadData) !== "{}" && (
                <>
                    <SearchResults threads={threadData.allResults} />
                    <div className="pt-12">
                        <h3 className="py-4 text-3xl font-bold text-warning">
                            {threadData.title}
                        </h3>
                        <a
                            className="btn-outline btn-accent btn-xs btn"
                            href={threadData.url}
                        >
                            See Full Thread
                        </a>

                        <CommentList commentsData={threadData.comments} />
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
