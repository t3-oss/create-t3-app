export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

export const isClient = typeof document !== "undefined";
export const isServer = !isClient;

if (typeof process.env.NEXT_PUBLIC_SITE_URL !== "string") {
  throw new Error(
    `Please set the NEXT_PUBLIC_SITE_URL environment variable to your site's URL.
    
1. Create .env file at the root of your project.
2. Add NEXT_PUBLIC_SITE_URL=http://localhost:3000
3. For other environments (like production), make sure you set the correct URL.
    `
  );
}

export const siteURL = new URL(process.env.NEXT_PUBLIC_SITE_URL);
export const siteOrigin = siteURL.origin;

// we like putting this in the JavaScript console,
// as our signature.
// you can delete it if not needed.
export const basementLog = `

   ██╗
   ██║
   ██████╗
   ██╔══██╗  ██╗
   ██████╔╝  ██╝
   ╚═════╝   
                                                                                
   From the basement. https://basement.studio
`;

// TODO
export const defaultMeta = {
  title: "Create BSMNT App",
  description: "Create BSMNT App",
  ogImage: `${siteOrigin}/og.png`,
  twitter: {
    handle: "@basementstudio",
    site: "@basementstudio",
  },
};

// TODO: add variable (NEXT_PUBLIC_GA_TRACKING_ID) to env if necessary
export const gaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
