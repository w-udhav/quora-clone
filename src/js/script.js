class Post {
  constructor(title, desc, img) {
    this.title = title;
    this.desc = desc;
    this.img = img;
    this.date = new Date();
  }

  save() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(this);
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  delete() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const index = posts.findIndex((post) => post.title === this.title);
    if (index !== -1) {
      posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }

  displayPost() {
    const postContainer = document.querySelector(".view");
    const postDiv = document.createElement("div");
    postDiv.classList.add("rightLower");
    let imageTag = "";
    if (this.img !== "") {
      imageTag = `<div class="picture">
      <img src="https://kbob.github.io/images/sample-5.jpg" alt="${this.title}" />
    </div>`;
    }
    postDiv.innerHTML = `
      <div class="profiling">
        <div class="leftProfile">
          <div class="photo">
            <img src="../src/assets/images/user.png" alt="Dp" />
          </div>
          <div class="account">
            <div class="name">
              <h4>Anonymous</h4>
              <span class="follow">&bull; Follow</span>
            </div>
            <div class="address">
              <p>India</p>
              <p>&bull; Updated ${this.date}</p>
            </div>
          </div>
        </div>
        <div class="cross">
          <button class="btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="post_content">
        <h3>${this.title}</h3>

        <p>
          ${this.desc}
        </p>
      </div>
      
      ${imageTag}
        
      
      <div class="engagement">
        <div class="engage">
          <div class="leftDiv"></div>
          <div class="rightDiv"></div>
        </div>
        <div class="more"></div>
      </div>
      `;

    // Event listener for delete particular post
    const deleteBtn = postDiv.querySelector(".btn");
    deleteBtn.addEventListener("click", () => {
      if (window.confirm("Are you sure you want to delete this post?")) {
        this.delete();
        postDiv.remove();
      }
    });

    postContainer.prepend(postDiv);
  }

  static getAllPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    return posts;
  }
}

// Displaying all posts

// Declaration
const inputActivation = document.querySelector(".inp");
const inputTitle = document.querySelector("#postTitle");
const inputDesc = document.querySelector("#postDescription");
const inputFile = document.querySelector("#postFile");

// Activating the add post form on click
// Set isFormActive to false initially
let isFormActive = false;

// Ensure the form is hidden by default
const inputForm = document.querySelector(".inputForm");
inputForm.style.display = "none";

// Event listener to toggle form visibility on click
inputActivation.addEventListener("click", formActivation);

function formActivation() {
  if (isFormActive) {
    inputForm.style.display = "none";
    isFormActive = false;
  } else {
    inputForm.style.display = "flex";
    isFormActive = true;
  }

  inputTitle.value = "";
  inputDesc.value = "";
  inputFile.value = "";
}

// Adding a new post (Done Btn)
const addPostBtn2 = document.querySelector("#postBtn");
addPostBtn2.addEventListener("click", () => {
  console.log("Done Btn Clicked");

  const title = document.querySelector("#postTitle").value;
  const desc = document.querySelector("#postDescription").value;
  const file = document.querySelector("#postFile").value;

  console.log(title, desc, file);

  if (title === "" || desc === "") {
    alert("Please fill all the fields");
    return;
  }

  const post = new Post(title, desc, file);
  post.save();
  formActivation();
  displayAllPosts();
});

// Displaying all posts
window.addEventListener("load", () => {
  displayAllPosts();
});

function displayAllPosts() {
  console.log("displayAllPosts function called");

  const posts = Post.getAllPosts();
  posts.forEach((post) => {
    const loadedPost = new Post(post.title, post.desc, post.img);
    loadedPost.displayPost();
  });
}
