const fallbackAppUrl = "http://localhost:3000";

function appUrl(): URL {
  try {
    return new URL(process.env.NEXT_PUBLIC_APP_URL ?? fallbackAppUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_APP_URL must be a valid URL.");
  }
}

export const env = {
  appUrl: appUrl(),
};
