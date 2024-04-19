'use server'

import InteractionDocument from '@/database/models/interaction.model';
import { connectToDatabase } from '@/database/mongoose';
import { handleError } from '../utils';
import { HaveConversationParams, SetTimerParams, SetModeParams } from './shared';

// User have a conversation with Meimei
export const haveConversation = async (params: HaveConversationParams) => {
  try {
    connectToDatabase()
    const { content, userId } = params
    if (userId) {
      await InteractionDocument.create({
        user: userId,
        question: content,
        action: 'conversation'
      })
    }
  } catch (error) {
    handleError(error)
  }
}

// User set a timer once
export const setTimer = async (params: SetTimerParams) => {
  try {
    connectToDatabase()
    const { time, userId } = params
    if (userId) {
      await InteractionDocument.create({
        user: userId,
        time: time,
        action: 'set_time'
      })
    }
  } catch (error) {
    handleError(error)
  }
}

// User set a mode once
export const setMode = async (params: SetModeParams) => {
  try {
    connectToDatabase()
    const { mode, userId } = params
    if (userId) {
      await InteractionDocument.create({
        user: userId,
        mode: mode,
        action: 'set_mode'
      })
    }
  } catch (error) {
    handleError(error)
  }
}