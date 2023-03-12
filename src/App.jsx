import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import useHttp from "./hooks/use-http";

import CommentList from "./components/CommentList";

function App() {
    const [count, setCount] = useState(0);

    const [comments, setComments] = useState([]);

    const { isLoading, error, getDiscussion } = useHttp();

    // Fetch comments on load
    useEffect(() => {
        const loadedComments = getDiscussion("Dune", setComments);
    }, [getDiscussion]);

    return (
        <div
            className="container mx-auto p-12 text-center
                      font-mono text-white"
        >
            <h1 className="text-5xl font-black">Dune Discussion</h1>
            <CommentList commentsData={comments}/>
        </div>
    );
}

export default App;
