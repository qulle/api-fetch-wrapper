# API fetch wrapper
### Creating an abstract layer to wrap all API related code inside a dedicated class hierarchy.

## Demo
I have put together a small [demo](https://qulle.github.io/api-fetch-wrapper/) page to show the code in action.

## Get started
The dev-environment uses npm so you need to have [Node.js](https://nodejs.org/en/) installed. \
After cloning the repo run the following command to install the needed dependencies.
```
$ npm install
```

After installing the dependencies, all that's left is to run the dev-server.\
The project uses [Parcel](https://parceljs.org/) as server and bundler.
Run the following command to start the server.
```
$ npm start
```

Use the following command to make a proper build for distribution.
```
$ npm run build
```

Use the following command to remove dist directory. Uses `rm -rf dist/` 
```
$ npm run clean
```

## Axios
This repo uses vanilla JavaScript and the built in `Fetch` object. There are plenty of http libraries to use instead of Fetch, for example [Axios](https://axios-http.com/).

## About the code
The following sample code shows how to use the API wrapper. A more indepth explanations follows below.
```javascript
const jsonPlaceholderAPI = new JsonPlaceholderAPI();

jsonPlaceholderAPI.getTodos().then(result => {
    console.table(result);
}).catch(error => {
    console.log(error);
});
```

The code works around the `fetch` object. The fetch object have been wrapped in a class called `Fetcher`. \
This class acts as the base class and helps with error handling and makes it possible to set a request timeout.
```javascript
class Fetcher {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async doFetch(resource, options = {}) {
        const {timeout = 8000} = options;

        const constroller = new AbortController();
        const timeoutId = setTimeout(() => constroller.abort(), timeout);

        const response = await fetch(this.baseUrl + resource, {
            ...options,
            signal: constroller.signal
        });

        clearTimeout(timeoutId);

        return response;
    }

    async get(endpoint, filterJsonKeys = []) {
        const response = await this.doFetch(endpoint);

        if(!response.ok) {
            throw new Error(`Fetch error ${response.status}`);
        }

        let jsonResult = await response.json();

        // Filter out sub part of json response if not the entire object is wanted.
        // If no keys are given, the response is returned as the endpoint has responded.
        filterJsonKeys.forEach(key => jsonResult = jsonResult[key]);

        return jsonResult;
    }
}

export default Fetcher;
```

Sub classes can then extend the Fetcher class.
```javascript
import Fetcher from './Fetcher';

class JsonPlaceholderAPI extends Fetcher {
    constructor() {
        super('https://jsonplaceholder.typicode.com');
    }

    async getPosts() {
        return await this.get('/posts');
    }

    async getPostById(id) {
        return await this.get(`/posts/${id}`);
    }

    async getCommentsForPostWithId(id) {
        return await this.get(`/posts/${id}/comments`);
    }

    async getComments() {
        return await this.get('/comments');
    }

    async getAlbums() {
        return await this.get('/albums');
    }

    async getPhotos() {
        return await this.get('/photos');
    }

    async getTodos() {
        return await this.get('/todos');
    }

    async getUsers() {
        return await this.get('/users');
    }

    // This example is just for demonstration on how to send multiple requests.
    // If you have access to the API-backend you should make a route that returns this behaviour in a single request.
    // But if you don't have backend access to the API, this is a good option.
    async getPostsWithUsers() {
        const [allPosts, allUsers] = await Promise.all([
            this.getPosts(),
            this.getUsers()
        ]);

        // Add data from the users request to the posts request
        allPosts.forEach(post => {
            const user = allUsers.find(x => x.id === post.userId);
            if(user) {
                post.userObj = {
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            }
        });

        return allPosts;
    }
}

export default JsonPlaceholderAPI;
```

A final word about the line `filterJsonKeys.forEach(key => jsonResult = jsonResult[key]);` \
Some API:s return more data then what you might be interested in. Say for example that the API respond with the following json object.
```
{
    guid: '56940da0-e4e8-4285-8e15-9c9d0cc9d096',
    ResultObject: {
        Data: ['A', 'B', 'C']
    }
}
```

By adding a filter in the optional array to the get method, the result can be filtered.
```javascript
return await this.get('/endpoint', ['ResultObject', 'Data']);
```

The response back to the calling function will then look like this.
```
['A', 'B', 'C']
```

## Author
[Qulle](https://github.com/qulle/)