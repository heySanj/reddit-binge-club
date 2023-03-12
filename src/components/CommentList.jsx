import Comment from "./Comment";

const CommentList = ({ commentsData }) => {
    return (
        <div>
            <ul>
                {commentsData &&
                    commentsData.map((comment) => (
                        <Comment comment={comment} />
                    ))}
            </ul>
        </div>
    );
};

export default CommentList;
