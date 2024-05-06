'use server'

import { InworldClient } from '@inworld/nodejs-sdk';
import { handleError } from '@/lib/utils';

const generateSessionToken = async () => {
  // Environment variables
  const {
    INWORLD_API_KEY,
    INWORLD_SECRET_KEY,
    INWORLD_SCENE,
  } = process.env;

  // Error checking
  try {
    if (!INWORLD_API_KEY) {
      throw new Error("INWORLD_API_KEY env variable is required.");
    }
    if (!INWORLD_SECRET_KEY) {
      throw new Error("INWORLD_SECRET_KEY env variable is required.");
    }
    if (!INWORLD_SCENE) {
      throw new Error("INWORLD_SCENE env variable is required.");
    }
  } catch (error: any) {
    return handleError(error);
  }

  // Inworld client setup
  const client = new InworldClient()
    .setApiKey({
      key: INWORLD_API_KEY,
      secret: INWORLD_SECRET_KEY,
    })
    .setScene(INWORLD_SCENE);

  // Generate session token
  try {
    const token = await client.generateSessionToken();
    return JSON.stringify(token);
  } catch (error: any) {
    console.error("Error generating session token:", error.message);
    return handleError(error);
  }
};

export default generateSessionToken;
