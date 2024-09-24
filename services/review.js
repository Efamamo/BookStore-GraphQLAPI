import reviewModel from '../models/review.js';
import userModel from '../models/user.js';
export async function getUserReviews(parent) {
  const reviews = await reviewModel.find({ user_id: parent._id });
  return reviews;
}

export async function getBookReviews(parent) {
  const reviews = await reviewModel.find({ book_id: parent._id });
  return reviews;
}

export async function addReview(_, args) {
  const newReview = new reviewModel({
    user_id: args.user_id,
    book_id: args.book_id,
    rating: args.rating,
    comment: args.comment,
  });

  await newReview.save();
  return newReview;
}

export async function updateReview(_, args) {
  const review = await reviewModel.findById(args.id);

  if (args.user_id) {
    review.user_id = args.user_id;
  }
  if (args.book_id) {
    review.book_id = args.book_id;
  }

  if (args.comment) {
    review.comment = args.comment;
  }

  if (args.rating) {
    review.rating = args.rating;
  }

  await review.save();
  const updatedReview = await reviewModel.findById(args.id);
  return updatedReview;
}

export async function deleteReview(_, args) {
  await reviewModel.findByIdAndDelete(args.id);
}
