// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

// add comment

function guardar() {
  let skill = document.getElementById('skill').value;

  db.collection("skillAdd").add({
    skill: skill,
  })
    .then(function (docRef) {
      document.getElementById('skill').value = '';
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

// show comment in wall
let skillWall = document.getElementById('skillWall');

db.collection("skillAdd").onSnapshot((querySnapshot) => {
  skillWall.innerHTML = '';
  querySnapshot.forEach((doc) => {
    skillWall.innerHTML += `
          
    <span  id="skillsDelete" class="badge badge-secondary">${doc.data().skill} <i class="fas fa-times" onclick="myFunction(event, '${doc.id}')"></i></span>`
  });
});

// delete
function eliminar(id) {
  db.collection("skillAdd").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

function myFunction(event, id) {
  if (confirm("Are you sure?")) {
    eliminar(id);
  } else {
    console.log('no se eliminó el mensaje!');
  }
}