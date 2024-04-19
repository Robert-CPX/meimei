import { Schema, model, models, Document } from 'mongoose'

export type Feedback = {
  detail: string;
  rating: number;
  type: string;
  createdAt: Date;
  author: Schema.Types.ObjectId;
} | Document;

const FeedbackSchema = new Schema<Feedback>({
  detail: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  type: { type: String, required: true, default: 'unset' },
  createdAt: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const FeedbackModel = models.Feedback || model<Feedback>('Feedback', FeedbackSchema);

export default FeedbackModel;