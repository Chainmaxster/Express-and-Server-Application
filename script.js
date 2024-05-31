document.addEventListener('DOMContentLoaded', () => {
    const displayData = (endpoint, containerId) => {
        fetch(`/api/${endpoint}?apiKey=12345`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById(containerId);
                container.innerText = JSON.stringify(data, null, 2);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const fetchUsersButton = document.getElementById('fetch-users');
    const fetchPostsButton = document.getElementById('fetch-posts');
    const fetchCommentsButton = document.getElementById('fetch-comments');
    const fetchPost1CommentsButton = document.getElementById('fetch-post1-comments');

    fetchUsersButton.addEventListener('click', () => displayData('users', 'data'));
    fetchPostsButton.addEventListener('click', () => displayData('posts', 'data'));
    fetchCommentsButton.addEventListener('click', () => displayData('comments', 'data'));
    fetchPost1CommentsButton.addEventListener('click', () => displayData('posts/1/comments', 'data'));

    document.getElementById('filter-posts').addEventListener('click', () => {
        const title = document.getElementById('filter-posts-title').value;
        displayData(`posts?title=${encodeURIComponent(title)}`, 'data');
    });

    document.getElementById('filter-comments').addEventListener('click', () => {
        const content = document.getElementById('filter-comments-content').value;
        displayData(`comments?content=${encodeURIComponent(content)}`, 'data');
    });

    document.getElementById('create-user-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('user-name').value;
        fetch('/api/users?apiKey=12345', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
            .then(response => response.json())
            .then(data => {
                console.log('User created:', data);
                displayData('users', 'data');
            })
            .catch(error => console.error('Error creating user:', error));
    });

    document.getElementById('create-post-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        fetch('/api/posts?apiKey=12345', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Post created:', data);
                displayData('posts', 'data');
            })
            .catch(error => console.error('Error creating post:', error));
    });

    document.getElementById('create-comment-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const postId = parseInt(document.getElementById('comment-postId').value, 10);
        const content = document.getElementById('comment-content').value;
        fetch('/api/comments?apiKey=12345', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId, content })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Comment created:', data);
                displayData('comments', 'data');
            })
            .catch(error => console.error('Error creating comment:', error));
    });

    document.getElementById('update-user-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const id = parseInt(document.getElementById('update-user-id').value, 10);
        const name = document.getElementById('update-user-name').value;
        fetch(`/api/users/${id}?apiKey=12345`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
            .then(response => response.json())
            .then(data => {
                console.log('User updated:', data);
                displayData('users', 'data');
            })
            .catch(error => console.error('Error updating user:', error));
    });

    document.getElementById('delete-user-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const id = parseInt(document.getElementById('delete-user-id').value, 10);
        fetch(`/api/users/${id}?apiKey=12345`, {
            method: 'DELETE'
        })
            .then(() => {
                console.log('User deleted');
                displayData('users', 'data');
            })
            .catch(error => console.error('Error deleting user:', error));
    });
});
