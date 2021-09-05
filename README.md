[![Netlify Status](https://api.netlify.com/api/v1/badges/59c7250f-f817-44c9-9a82-8d2199ce5d8a/deploy-status)](https://app.netlify.com/sites/vtt-beerholders/deploys)

A Virtual Tabletop for the final assignment of Web Development at CEFET-MG.

**Note:** Currently the `/public/vtt-tmp` has all the html/css base/"design". Those files are accessible in the deployed app, [see an example here](https://vtt-beerholders.netlify.app/vtt-tmp/assets/compendium/compendium.html).

## Getting Started

### Connecting with the Backend

#### Option 1: With backend running locally

Checkout to the [api-vtt](https://github.com/beerholders/api-vtt) and execute the local devloop setup. The app will run with the default url `http://localhost:3001/api`.

Then run the development server:

```bash
npm run dev
```

#### Option 2: With an external backend

Our auto-deployed backend server: `https://api-vtt.herokuapp.com`

Run the development server specifying the backend url:

```bash
BACKEND_URL=https://api-vtt.herokuapp.com npm run dev
```

#### Done!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Folder structure

#### `/pages`

Application pages, note that it follows [Next.js route definition](https://nextjs.org/docs/basic-features/pages).

#### `/components`

General shared components to be used in the pages.

#### `/public`

General assets mounted from the `/` route, e.g.: images.

Currently the `/public/vtt-tmp` has the html/css base to the application. Those will gradually be migrated to React routes.

#### `/styles`

Application styles

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Netlify

This application is automatically deployed to Netlify. You can preview it [here](https://vtt-beerholders.netlify.app/)
