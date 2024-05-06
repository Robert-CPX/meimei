export const Config = {
  CONNECTION_HOSTNAME: process.env.CONNECTION_HOSTNAME,
  CONNECTION_SSL: process.env.CONNECTION_SSL === 'true',
  GENERATE_TOKEN_URL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/inworld/generateSessionToken`,
  SCENE_NAME: "workspaces/default-upyjqviok36wsxukslekpq/characters/emi2",
};