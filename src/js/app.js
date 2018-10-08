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
          
          
          <button type="button" class="btn btn-primary">
          ${doc.data().skill}  <i class="fas fa-times" onclick="myFunction(event, '${doc.id}')"></i>
</button>`
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
  if (confirm("estas seguro??")) {
    eliminar(id);
  } else {
    console.log('no eliminó el mensaje!');
  }
}