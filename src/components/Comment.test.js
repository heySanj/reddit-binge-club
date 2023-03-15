import { render, screen } from "@testing-library/react";
import Comment from "./Comment";



describe("Comment Component", () => {
    const comment = {
        id: "dummyID",
        author: "johnDoe",
        body: "A test message",
        score: 243,
    };

    test("renders the author of a comment.", () => {
        
        // Arrange
        render(<Comment key={comment.id} comment={comment} />);

        // Act

        // Assert
        const author = screen.getByTestId("comment-author");
        expect(author).toEqual(comment.author);
    });
    test("renders the score of a comment.", () => {
        // Arrange
        render(<Comment key={comment.id} comment={comment} />);

        // Act

        // Assert
        const score = screen.getByTestId("comment-score");
        expect(score).toEqual(comment.score);
    });
    test("renders the body of a comment.", () => {
        // Arrange
        render(<Comment key={comment.id} comment={comment} />);

        // Act

        // Assert
        const body = screen.getByTestId("comment-body");
        expect(body).toEqual(comment.body);
    });
});
