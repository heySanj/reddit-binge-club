import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import Comment from "./Comment";



describe("Comment Component", () => {
    const comment = {
        id: "dummyID",
        author: "johnDoe",
        body: "A test message",
        score: 243,
    };

    it("renders the author of a comment.", () => {
        
        // Arrange
        render(<Comment key={comment.id} comment={comment} />);

        // Act

        // Assert
        const author = screen.getByTestId("comment-author");
        expect(author.textContent).toBe(comment.author);
    });
    it("renders the score of a comment.", () => {
        // Arrange
        render(<Comment key={comment.id} comment={comment} />);

        // Act

        // Assert
        const score = screen.getByTestId("comment-score");
        expect(score.textContent).toBe("- " + comment.score + " points");
    });
    it("renders the body of a comment.", () => {
        // Arrange
        render(<Comment key={comment.id} comment={comment} />);

        // Act

        // Assert
        const body = screen.getByTestId("comment-body");
        expect(body.textContent).toBe(comment.body);
    });
});
