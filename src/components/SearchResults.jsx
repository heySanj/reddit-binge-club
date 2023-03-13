const SearchResults = ({ threads, commentLoader }) => {
    
    return (
        <div className="my-6">
            <h1 className="font-extrabold text-left text-xl">Search Results</h1>
            <ul>
                {threads &&
                    threads.map((thread) => (
                        <a className="block text-left my-3"
                         key={thread.id}
                         onClick={() => {commentLoader(thread)}}
                         value={thread.url}
                         href="#"
                         >{thread.title}</a>
                    ))}
            </ul>
        </div>
    );
};

export default SearchResults;
