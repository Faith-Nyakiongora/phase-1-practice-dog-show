document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogs => renderDogTable(dogs))
    .catch(error => console.log(error));
});

// Render the dog list in the table
function renderDogTable(dogs) {
  const tableBody = document.getElementById('dog-table-body');
  tableBody.innerHTML = '';

  dogs.forEach(dog => {
    const row = createDogTableRow(dog);
    tableBody.appendChild(row);
  });
}

// Create a table row for a dog
function createDogTableRow(dog) {
  const row = document.createElement('tr');

  const nameCell = document.createElement('td');
  nameCell.textContent = dog.name;
  row.appendChild(nameCell);

  const breedCell = document.createElement('td');
  breedCell.textContent = dog.breed;
  row.appendChild(breedCell);

  const sexCell = document.createElement('td');
  sexCell.textContent = dog.sex;
  row.appendChild(sexCell);

  const editCell = document.createElement('td');
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => populateEditForm(dog));
  editCell.appendChild(editButton);
  row.appendChild(editCell);

  return row;
}

// Populate the edit form with dog's information
function populateEditForm(dog) {
  const form = document.getElementById('edit-dog-form');
  form.dataset.dogId = dog.id;
  form.elements.name.value = dog.name;
  form.elements.breed.value = dog.breed;
  form.elements.sex.value = dog.sex;
}

// Handle form submission for updating a dog
document.getElementById('edit-dog-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;
  const dogId = form.dataset.dogId;
  const name = form.elements.name.value;
  const breed = form.elements.breed.value;
  const sex = form.elements.sex.value;

  const requestBody = {
    name: name,
    breed: breed,
    sex: sex
  };

  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(updatedDog => {
      // Clear the form
      form.reset();
      form.dataset.dogId = '';

      // Fetch and render the updated dog list
      fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => renderDogTable(dogs))
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});