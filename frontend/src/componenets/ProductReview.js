import React from "react";


export default function ProductReview({ reviews }) {
  return (
    <div className="review-container">
      <h3 className="review-title">Other Reviews</h3>
      <div className="review-list">
        {reviews &&
          reviews.map((review) => (
            <div key={review._id} className="review-item">
              <div
                className="review-rating"
                style={{ width: `${(review.rating / 5) * 100}%` }}
              ></div>
              <p className="review-user">by {review.user.name}</p>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
