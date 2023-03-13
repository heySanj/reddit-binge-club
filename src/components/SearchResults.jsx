const SearchResults = ({ threads }) => {
    return (
        <div className="my-6">
            <h1 className="font-extrabold text-left text-xl">Search Results</h1>
            <ul>
                {threads &&
                    threads.map((thread) => (
                        <a class="block text-left my-3"
                         id={thread.id} href={thread.url}>{thread.title}</a>
                    ))}
            </ul>
        </div>
    );
};

export default SearchResults;
