// Fetch users and populate the select box
async function fetchUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();

        const userSelect = document.getElementById('userSelect');
        const userProfile = document.getElementById('userProfile');

        users.forEach((user) => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.username;
            userSelect.appendChild(option);
        });

        userSelect.addEventListener('change', (e) => {
            const selectedUserId = e.target.value;
            fetchUserData(selectedUserId);
        });

        fetchUserData(1);

    } catch (error) {
        console.error('Error fetching users:', error.message);
    }
}

// Fetch user's details and populate the profile
// function fetchUserDetails() {
//   const userId = document.getElementById('users').value;

//   fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//     .then(response => response.json())
//     .then(user => {
//         // Update user's Username in the profile
//         document.getElementById('userName').textContent = `${user.username}`;
//       // Update user's name in the profile
//       document.getElementById('Name').textContent = `${user.name}`;
//       //update email
//       document.getElementById('userEmail').textContent = `${user.email}`;
//       // Update user's location in the profile
//       document.getElementById('userLocation').textContent = ` ${user.address.city}`;
    

//       // Fetch user's posts and populate the posts select box
//       fetchUserPosts();
//     });
// }
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const user = await response.json();

        displayUserProfile(user);

        fetchPosts(userId);

    } catch (error) {
        console.error('Error fetching user data:', error.message);
    }
}
function displayUserProfile(user) {
    const userProfile = document.getElementById('userProfile');
    userProfile.innerHTML = '';

    const profileImg = document.createElement('div');
    profileImg.className = 'profile-img';
    const img = document.createElement('img');
    img.src = "./images/img.png"; 
    img.alt = 'profile';
    profileImg.appendChild(img);

    const userName = document.createElement('h3');
    userName.textContent = user.name;

    const username = document.createElement('p');
    username.textContent = `@${user.username}`;

    const bio = document.createElement('p');
    bio.textContent = user.company.catchPhrase;

    const location = document.createElement('p');
    location.textContent = user.address.city;

    userProfile.appendChild(profileImg);
    userProfile.appendChild(userName);
    userProfile.appendChild(username);
    userProfile.appendChild(bio);
    userProfile.appendChild(location);
}

async function fetchPosts(userId) {
  try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const posts = await response.json();
      displayPosts(posts);

      if (posts.length > 0) {
          fetchComments(posts[0].id);
      }

  } catch (error) {
      console.error('Error fetching posts:', error.message);
  }
}


// Fetch user's posts and populate the posts select box this is the use of Promise
// function fetchUserPosts() {
//   const userId = document.getElementById('users').value;

//   fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
//     .then(response => response.json())
//     .then(posts => {
//       const postsSelect = document.getElementById('posts');
//       postsSelect.innerHTML = ''; // Clear previous posts

//       posts.forEach(post => {
//         const option = document.createElement('option');
//         option.value = post.id;
//         option.text = post.title;
//         postsSelect.appendChild(option);
//       });

//       // Fetch the initial post's comments
//       fetchPostComments();
//     });
// }
async function fetchComments(postId) {
  try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const comments = await response.json();
      displayComments(comments);

  } catch (error) {
      console.error('Error fetching comments:', error.message);
  }
}
// Fetch post's comments and display them
// function fetchPostComments() {
//   const postId = document.getElementById('posts').value;

//   fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
//     .then(response => response.json())
//     .then(comments => {
//       const postComments = document.getElementById('postComments');
//       postComments.innerHTML = ''; // Clear previous comments

//       comments.forEach(comment => {
//         const li = document.createElement('li');
//         li.textContent = comment.body;
//         postComments.appendChild(li);
//       });
//     });
// }
function displayPosts(posts) {
    const postsContent = document.querySelector('.posts-content');

    postsContent.innerHTML = '';

    posts.forEach((post) => {
        const postContainer = document.createElement('div');
        postContainer.className = 'post-description';

        const postTitle = document.createElement('div');
        postTitle.className = 'post-title';

        const userIcon = document.createElement('img');
        userIcon.src = "./images/img.png";
        userIcon.width = 30;
        userIcon.alt = "user Icon";

        const title = document.createElement('h4');
        title.textContent = post.title;

        const certificateIcon = document.createElement('img');
        certificateIcon.src = "./images/certificate-icon.png";
        certificateIcon.width = 30;
        certificateIcon.alt = "Certificate Icon";

        const twitterIcon = document.createElement('img');
        twitterIcon.src = "./images/twitter.png";
        twitterIcon.width = 20;
        twitterIcon.alt = "Twitter Icon";

        postTitle.appendChild(userIcon);
        postTitle.appendChild(title);
        postTitle.appendChild(certificateIcon);
        postTitle.appendChild(twitterIcon);

        const postContent = document.createElement('p');
        postContent.textContent = post.body;

        const contentBottom = document.createElement('div');
        contentBottom.className = 'content-bottom';

        const commentIcon = createIconElement("./images/message-icon.png", 20);
        const retweetIcon = createIconElement("./images/arrow-icon.png", 20);
        const heartIcon = createIconElement("./images/heart.png", 20);

        const commentCount = document.createElement('p');
        commentCount.textContent = '200';

        const retweetCount = document.createElement('p');
        retweetCount.textContent = '200';

        const likeCount = document.createElement('p');
        likeCount.textContent = '200'; 

        contentBottom.appendChild(commentIcon);
        contentBottom.appendChild(commentCount);
        contentBottom.appendChild(retweetIcon);
        contentBottom.appendChild(retweetCount);
        contentBottom.appendChild(heartIcon);
        contentBottom.appendChild(likeCount);

        commentIcon.addEventListener('click', () => {
            fetchComments(post.id);
        });

        postContainer.appendChild(postTitle);
        postContainer.appendChild(postContent);
        postContainer.appendChild(contentBottom);

        postsContent.appendChild(postContainer);
    });
}

function displayComments(comments) {
    let commentsContent = document.querySelector('.comments-content');

    if (!commentsContent) {
        commentsContent = document.createElement('div');
        commentsContent.className = 'comments-content';
        document.querySelector('.content-main').appendChild(commentsContent);
    }

    commentsContent.innerHTML = '';

    comments.forEach((comment) => {
        const commentContainer = document.createElement('div');
        commentContainer.className = 'comment-description';

        const commentUserIcon = document.createElement('img');
        commentUserIcon.src = "./images/img.png";
        
        const commentTitle = document.createElement('div');
        commentTitle.className = 'comment-title';

       
        commentUserIcon.width = 20;
        commentUserIcon.alt = "user Icon";

        const commentAuthor = document.createElement('h4');
        commentAuthor.textContent = comment.name;

        const certificateIcon = document.createElement('img');
        certificateIcon.src = "./images/certificate-icon.png";
        certificateIcon.width = 30;
        certificateIcon.alt = "Certificate Icon";

        const twitterIcon = document.createElement('img');
        twitterIcon.src = "./images/twitter.png";
        twitterIcon.width = 20;
        twitterIcon.alt = "Twitter Icon";

        commentTitle.appendChild(commentUserIcon);
        commentTitle.appendChild(commentAuthor);
        commentTitle.appendChild(certificateIcon);
        commentTitle.appendChild(twitterIcon);

        const commentContent = document.createElement('p');
        commentContent.textContent = comment.body;

        const commentBottom = document.createElement('div');
        commentBottom.className = 'comment-bottom';


        const commentIcon = createIconElement("./images/message-icon.png", 20);
        const retweetIcon = createIconElement("./images/arrow-icon.png", 20);
        const heartIcon = createIconElement("./images/heart.png", 20);


        const commentCount = document.createElement('p');
        commentCount.textContent = '200'; 

        const retweetCount = document.createElement('p');
        retweetCount.textContent = '200'; 

        const likeCount = document.createElement('p');
        likeCount.textContent = '200'; 

        commentBottom.appendChild(commentIcon);
        commentBottom.appendChild(commentCount);
        commentBottom.appendChild(retweetIcon);
        commentBottom.appendChild(retweetCount);
        commentBottom.appendChild(heartIcon);
        commentBottom.appendChild(likeCount);

        commentContainer.appendChild(commentTitle);
        commentContainer.appendChild(commentTitle);
        commentContainer.appendChild(commentContent);
        commentContainer.appendChild(commentBottom);

        commentsContent.appendChild(commentContainer);
    });
}

function createIconElement(src, width) {
    const icon = document.createElement('img');
    icon.src = src;
    icon.width = width;
    return icon;
}

fetchUsers();

;

