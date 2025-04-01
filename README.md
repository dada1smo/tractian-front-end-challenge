# Getting Started

First, install dependencies:

```bash
npm i
```
Then run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Video demo

Video available on Youtube: [https://youtu.be/hn6o-gBLyvI](https://youtu.be/hn6o-gBLyvI)

I also included the video file on the root of this project.

# Improvement points

- Add more tests, both unit tests for base functions and e2e tests to test UI and API response.
- Revisit and possibly refactor filter functions. I think some of them got convoluted in the end.
- Try to virtualize the tree items. I tried some possible solutions but was not satisfied with the end results. Ended up working with something more akin to pagination to make the UI lighter and more responsive.
- Improve theme and UI components.