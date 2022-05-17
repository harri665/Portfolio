#  PORTFOLIO !!! 

## adding a new page
1. Create new foulder under Projects named to the refrence name
2. Add refrence and show case page html page to json 
    - [Projects.json](./Projects.json)
3. Create Showcase File
    - name it *refrencename*Case.html
    - copy from [ShowCaseBase.html](ShowCases/ShowCaseBase.html)
    - add *refrencename*Case.html to [viteconfig.js](./vite.config.js)
      - Copy 
        ```javascript 
        refrence: resolve(__dirname,'ShowCases/ShowCase.html'),
        //Where Refrence is the refrence and ShowCase.html is the showcase file 
        ```

4. Create index entry 
    - copy  and replace RefName wih the refname and Example nmae with the name
    - [index.html](index.html)
    -  ```html
        <li class = "project">
            <div class="container">
                <button class = "PreviewButton" id="RefName">
                    <img src="Projects/Temp/WisTest1.png" alt="RefName" class="image">						
                    <div class="overlay">
                    <div class="text">ExampleName</div>
                    </div>
                </button>
            </div>
        </li> 
        ```
        ``
            <link type="text/css" rel="stylesheet" href="./style.css">
            <li class = "project">
                <div class="container">
                    <button class = "PreviewButton" id="RefName">
                        <img src="Projects/Temp/WisTest1.png" alt="RefName" class="image">						
                        <div class="overlay">
                        <div class="text">ExampleName</div>
                        </div>
                    </button>
                </div>
            </li> 
        `
## Build. dev. and DIST ! 
1. ```npm run dev ```
   1. runs the dev server on localhost:3000

2. ``` npm run build ``` 
   1. Before Running build remember to un comment the google anylitcs code in [index.html](index.html)
   2. Builds vite and sends it to dist Folder 
   3. copy [Models](./Models/) to dist Folder
3. ```Surge ```
   1.  Run only after build 
   2.  double check `npm run build` instructions 
   3.  For project its C:\Users\Harri\OneDrive\Projects\Portfolio\vite-project\ <mark>dist</mark>
   4.  domain is 
       1.  harrison-martin.surge.sh

