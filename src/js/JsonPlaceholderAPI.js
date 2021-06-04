import Fetcher from './Fetcher';

class JsonPlaceholderAPI extends Fetcher {
    constructor() {
        super('https://jsonplaceholder.typicode.com');
    }

    async get(endpoint, filterJsonKeys = []) {
        const response = await this.doFetch(endpoint);

        if(!response.ok) {
            throw new Error(`JsonPlaceholder fetch error ${response.status}`);
        }

        let jsonResult = await response.json();

        // Filter out sub part of json response if not the entire object is wanted.
        // If no keys are given, the response is returned as the endpoint has responded.
        filterJsonKeys.forEach(key => jsonResult = jsonResult[key]);

        return jsonResult;
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