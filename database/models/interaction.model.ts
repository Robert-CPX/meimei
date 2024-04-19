import { Schema, model, models, Document } from 'mongoose'

export type Interaction = {
  user: Schema.Types.ObjectId;
  action: string;
  question: string;
  time: string;
  mode: string;
  createdAt: Date;
} | Document

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  question: { type: String },
  time: { type: String },
  mode: { type: String },
  createdAt: { type: Date, default: Date.now },
})

const InteractionDocument = models.Interaction || model('Interaction', InteractionSchema)

export default InteractionDocument
