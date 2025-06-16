import mongoose, { Schema, model, models, Types } from "mongoose";

export interface IReview {
  rating: number;
  comment?: string;
  studentId: mongoose.Types.ObjectId;
  studentName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourse {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  instructorId: Types.ObjectId;
  reviews: IReview[];
  averageRating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourseDocument extends ICourse, Document {
  alculateAverageRating(): number;
  addReview(review: IReview): Promise<ICourseDocument>;
}

const reviewSchema = new Schema<IReview>(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const courseSchema = new Schema<ICourseDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: String, required: true },
    instructorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

courseSchema.methods.calculateAverageRating = function () {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
  } else {
    const sum = this.reviews.reduce(
      (acc: number, review: IReview) => acc + review.rating,
      0
    );
    this.averageRating = sum / this.reviews.length;
  }
  return this.averageRating;
};

courseSchema.methods.addReview = async function (review: IReview) {
  this.reviews.push(review);
  this.calculateAverageRating();
  await this.save();
  return this;
};

const Course = models?.Course || model<ICourseDocument>("Course", courseSchema);

export default Course;
