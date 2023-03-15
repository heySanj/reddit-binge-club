const Comment = ({ comment }) => {
    return (
        <li
            className="my-6 rounded-md bg-base-300 p-4
                    text-left"
            
        >
            <div className="flex items-center">
                <h4 className="font-extrabold text-sm pr-2" data-testid="comment-author">{comment.author}</h4>
                <p className="font-thin italic text-xs text-neutral-500" data-testid="comment-score">- {comment.score} points</p>
            </div>

            <p className="text-lg pt-2 text-neutral-content whitespace-pre-line" data-testid="comment-body">{comment.body}</p>
        </li>
    );
};

export default Comment;
