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

<span class="badge badge-secondary" data-toggle="modal" data-target="#deleteModal">
${doc.data().skill} 
<i class="fas fa-times"></i>
</span>

<!-- Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Remove this skill</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      Once deleted, a  skill cannot be recovered from the trash.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="eliminar('${doc.id}')" data-dismiss="modal">Remove</button>
      </div>
    </div>
  </div>
</div>
    
    `
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
  if (confirm("Once deleted, a  skill cannot be recovered from the trash.")) {
    eliminar(id);
  } else {
    console.log('no se eliminó el mensaje!');
  }
}