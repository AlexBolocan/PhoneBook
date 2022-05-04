// variabila de stocat info din aplicatie
// tip obiect
let state = {
  // obiect
  list: [], // array
  idxEdit: null,
};

// functia de adaugare contacte
function addContact(event) {
  event.preventDefault();
  let nume = document.querySelector('[name="nume"]').value.trim();
  let nrTelefon = document.querySelector('[name="nrTelefon"]').value.trim();
  console.log(nume);
  console.log(nrTelefon);
  if (state.idxEdit === null) {
    state.list.push({
      nume: nume,
      nrTelefon: nrTelefon,
    });
  } else {
    state.list[state.idxEdit] = {
      nume: nume,
      nrTelefon: nrTelefon,
    };
  }
  draw();
}

// functia de desenare a tabelului
function draw() {
  let table = document.querySelector("#idTable tbody");
  console.log(table);
  let str = "";
  if (state.list.length > 0) {
    document.querySelector("#idTable").classList.remove("showTableHead");
    for (let idx = 0; idx < state.list.length; idx++) {
      // for (let elem of state.list) {
      let elem = state.list[idx];
      str += `<tr>
          <td style="width: 30%;" class="fontSize">${elem.nume}</td>
          <td style="width: 30%;" class="fontSize">${elem.nrTelefon}</td>
          <td style="width: 20%;" class="fontSize"> <button onclick="editContact(${idx})" class="buttonContact fontSize">Modifica</button></td>
          <td style="witdh: auto" class="fontSize"> <button onclick="deleteContact(${idx})" class="buttonContact fontSize">Sterge</button></td>
        </tr>`;
      table.innerHTML = str;
    }
  } else {
    document.querySelector("#idTable").classList.add("showTableHead");
    return}
}
// functia de editare
function editContact(idx) {
  let elem = state.list[idx];
  document.querySelector('[name="nume"]').value = elem.nume;
  document.querySelector('[name="nrTelefon"]').value = elem.nrTelefon;
  state.idxEdit = idx;
}

// functia de stergere cu confirmare intotdeauna
function deleteContact(idx) {
  if (
    confirm(`Esti sigur ca vrei sa stergi contactul "${state.list[idx].nume}"?`)
  ) {
    state.list.splice(idx, 1);
    draw();
  }
}
