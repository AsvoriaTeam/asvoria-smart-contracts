

#### . Build the project and test. Go to the root project directory and type the commands :

To install dependencies :

```
yarn install
```

To test the app locally in the development mode (localhost:3000) :

```
yarn start
```

To build the production package (generated in build folder of the project) :

```
yarn build
```

#### . Customize the website UI :

#####  `App.css` : update 5 main CSS variables with your custom colors :

```
:root {
  --main-background-color: #343A50;
  --card-background-color: #804980;
  --countdown-background-color: #433765;
  --main-text-color:#F7F6F4;
  --title-text-color:#3CBA8B;
}
```

Next to that, make sure to update background image by overwriting your own background PNG file in src/img folder.

#####  `public` folder :

- Update existing demo cool cats images (cool-cats.gif, logo.png) with your owns images in project `public` folder. Make sure to name them identically.
- Add your custom website title in `index.html` : `<title>Mint Page</title>`

#####  `Home.tsx` :

Scroll down down to line 380 (`return <main> [...]`) and start to update all titles/menu/text/images/text... as wished in the whole React HTML block.




##  Available Commands Recap :

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


