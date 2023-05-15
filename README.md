# Introduction

This project is made as a recruitment task given by HexOcean company for a Frontend Developer position.

# Technologies

Project is created with:

- React
- Vite
- TailwindCSS
- TypeScript
- Axios
- React Hook Form

## Why React Hook Form?

When setting up the project I had to think what form library to use. I had 2 choices:

- [Formik](https://formik.org/)
- [React Hook Form](https://react-hook-form.com/)

I was familiar with both of the libraries before making this project. After doing some research I decided to go with React Hook Form. It's a newer library, which is faster and has a smaller bundle size. It also is better maintained and personally for me it seems easier to use.

## Why TailwindCSS?

I am very familiar with TailwindCSS. I absolutely love the workflow that it allows. The predefined styles like colors and shadows as well as shortened styling names make it an easy choice. It is also very easy to customize and extend. It also uses PurgeCSS which deletes unused CSS styling when building the project, which makes the bundle size smaller.

## Why Vite?

Create-React-App is quite bloated. I will not be using things like testing or SASS support as this project is not big enough to make it worth it and I am using TailwindCSS. This already makes it so there are unused dependencied. Vite is a much faster alternative to CRA.

# Set Up

To run this project, first clone the repository locally:

    git clone https://github.com/BartoszBrodowski/dish-form

After the repo is cloned, install the dependencies using npm:

    npm install

Or yarn:

    yarn install

# Running the project

This project uses [Vite](https://vitejs.dev/) to run. You can run it locally using:

    yarn dev

### Additional information

Node version: **18.15.0**

Time spent on the project: **0h**
