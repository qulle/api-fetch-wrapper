import JsonPlaceholderAPI from './JsonPlaceholderAPI';

const jsonPlaceholderAPI = new JsonPlaceholderAPI();

[
    {name: 'posts',                   method: jsonPlaceholderAPI.getPosts.bind(jsonPlaceholderAPI)},
    {name: 'post-by-id',              method: jsonPlaceholderAPI.getPostById.bind(jsonPlaceholderAPI, 3)},
    {name: 'comments',                method: jsonPlaceholderAPI.getComments.bind(jsonPlaceholderAPI)},
    {name: 'comments-for-post-by-id', method: jsonPlaceholderAPI.getCommentsForPostWithId.bind(jsonPlaceholderAPI, 3)},
    {name: 'albums',                  method: jsonPlaceholderAPI.getAlbums.bind(jsonPlaceholderAPI)},
    {name: 'photos',                  method: jsonPlaceholderAPI.getPhotos.bind(jsonPlaceholderAPI)},
    {name: 'todos',                   method: jsonPlaceholderAPI.getTodos.bind(jsonPlaceholderAPI)},
    {name: 'users',                   method: jsonPlaceholderAPI.getUsers.bind(jsonPlaceholderAPI)},
    {name: 'posts-with-users',        method: jsonPlaceholderAPI.getPostsWithUsers.bind(jsonPlaceholderAPI)},
].forEach(item => {
    const button = document.querySelector(`#fetch-${item.name}`);
    const output = document.querySelector(`#fetch-${item.name}-output`);

    button.addEventListener('click', (event) => {
        output.innerText = 'Fetching data...';

        item.method().then(result => {
            const jsonStr = JSON.stringify(result, null, 4);
            output.innerHTML = jsonStr;
        }).catch(error => {
            output.innerHTML = error;
        });
    });
});

document.querySelectorAll('.btn-collapse').forEach(button => {
    button.addEventListener('click', function(event) {
        const codeElement = this.nextElementSibling.firstElementChild;
        if(codeElement.style.display === 'none') {
            codeElement.style.display = 'block';
        }else {
            codeElement.style.display = 'none';
        }
    });
});