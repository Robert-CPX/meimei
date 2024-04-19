'use server'
import FeedbackDocument from '@/database/models/feedback.model';
import { connectToDatabase } from '@/database/mongoose';
import { handleError } from '../utils';
import { CreateFeedbackParams } from './shared';

// CREATE
export const createFeedback = async (params: CreateFeedbackParams) => {
  try {
    await connectToDatabase();
    const { author, detail, rating = 0, type = "unknown" } = params;
    const newFeedback = await FeedbackDocument.create(
      { author, detail, rating, type }
    );
    return newFeedback;
  } catch (error) {
    handleError(error);
  }
};