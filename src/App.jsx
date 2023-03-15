import "./App.css";


import MovieSearch from "./components/MovieSearch";

function App() {
    return (
        <div
            className="container mx-auto p-12 text-center
                       text-primary"
        >
            <a
                href="/"
                className="my-6 inline-block text-6xl font-black transition-all
                 hover:text-yellow-400"
            >
                Reddit Binge Club
            </a>

            <MovieSearch />
        </div>
    );
}

export default App;
