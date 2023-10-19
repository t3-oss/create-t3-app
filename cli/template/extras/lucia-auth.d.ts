/// <reference types="lucia" />

declare namespace Lucia {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  type Auth = import("~/server/auth").Auth;
  interface DatabaseUserAttributes {
    username: string;
    discord_id: string;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DatabaseSessionAttributes {}
}
