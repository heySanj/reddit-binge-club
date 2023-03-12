const Comment = ({ comment }) => {
    return (
        <li
            className="my-6 rounded-md bg-slate-700 p-4
                    text-left shadow-lg"
            
        >
            <div className="flex items-center">
                <h4 className="font-extrabold text-sm pr-2">{comment.author}</h4>
                <p className="font-thin italic text-xs text-slate-400">- {comment.score} points</p>
            </div>

            <p className="text-lg pt-2">{comment.body}</p>
        </li>
    );
};

export default Comment;
