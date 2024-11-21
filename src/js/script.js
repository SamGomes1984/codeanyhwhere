// Initialize Firebase
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

document.getElementById('loginButton').addEventListener('click', () => {
  const provider = new firebase.auth.GithubAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log('Logged in as:', result.user.displayName);
    // After successful login, show create project button
    document.getElementById('createProjectButton').style.display = 'block';
  }).catch((error) => {
    console.error(error.message);
  });
});

document.getElementById('createProjectButton').addEventListener('click', () => {
  // Create a new folder/project in Firebase (this is a placeholder action)
  const userId = auth.currentUser.uid;
  const projectRef = firestore.collection('projects').doc(userId).collection('userProjects').doc();
  projectRef.set({
    name: `New Project ${Date.now()}`,
    createdAt: new Date()
  }).then(() => {
    alert('Project created!');
    loadProjects();
  });
});

// Load projects from Firebase
function loadProjects() {
  const userId = auth.currentUser.uid;
  firestore.collection('projects').doc(userId).collection('userProjects').get().then((querySnapshot) => {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const projectDiv = document.createElement('div');
      projectDiv.innerText = doc.data().name;
      projectList.appendChild(projectDiv);
    });
  });
}
