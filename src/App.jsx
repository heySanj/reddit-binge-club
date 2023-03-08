import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { getDiscussion } from "./data/getRedditDiscussion";

function App() {
    const [count, setCount] = useState(0);

    const [comments, setComments] = useState([]);

    useEffect(() => {
      setComments(getDiscussion("Dune"))
    }, []);

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <h1>Dune Discussion</h1>
            <ul>
                {comments && comments.map((comment) => (
                    <li>
                        <h2>{comment.body}</h2>
                        <h4>{comment.author}    /  {comment.score}</h4>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
