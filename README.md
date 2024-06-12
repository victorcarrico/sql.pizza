# SQL.PIZZA
Simple SQL beautifier.

## Overview
This is a Next.js project using monaco editor as the main dependency.
There are some improvements to be done with regards to project and components structure, as well as some TODOs around the code to improve readability.

The idea is heavily inspired on https://json.pizza, the code is not. :(

## Getting Started

* Run the dev server
```
npm run dev
```

* Go to http://localhost:3000

* The root is the `layout.tsx` and the main component `Pizza`, this is where the Monaco editor is loaded and everything happens. There's also another component called `ThemeButton`. Maybe this could live in the same Pizza component, it just made the state management more complex.

* Push to the `main` branch and it will be deployed to AWS Amplify. I could be using Vercel, but all my stuff is on AWS so I'm not.

* Go to https://sql.pizza

# What else?

* Feel free to open any issues or open PRs.
