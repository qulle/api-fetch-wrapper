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