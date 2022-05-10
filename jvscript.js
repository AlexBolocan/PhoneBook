// variabila de stocat info din aplicatie
// tip obiect
let state = {
  list:[],
  idxEdit:null,
  // obiect
 dataBaseUrl:
 "https://phonebook-1fef4-default-rtdb.europe-west1.firebasedatabase.app/",
};

// functia de adaugare contacte
function addContact(event) {
  event.preventDefault();
  let nume = document.querySelector('[name="nume"]').value.trim();
  let nrTelefon = document.querySelector('[name="nrTelefon"]').value.trim();
  console.log(nume);
  //console.log(nrTelefon);
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
  document.querySelector('[name="nume"]').value = "";
  document.querySelector('[name="nrTelefon"]').value = "";
  draw();
  sortAgenda();
}

// functia de desenare a tabelului
function draw() {
  let table = document.querySelector("#idTable tbody");
  //console.log(table);
  let str = "";
  if (state.list.length > 0) {
    document.querySelector("#idTable").classList.remove("hideTableHead");
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
    document.querySelector("#idTable").classList.add("hideTableHead");
    return;
  }
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
function sortAgenda() {
  state.list.sort(function (a, b) {
    let numeA = a.nume;
    let numeB = b.nume;
    numeA = numeA.toLowerCase();
    numeB = numeB.toLowerCase();
    if (numeA > numeB) {
      return 1;
    } else if (numeA < numeB) {
      return -1;
    } else return 0;
  });
  draw();
}
//functie pentru preluare din baza de data
async function getData() {
  let url = state.dataBaseUrl + ".json"; // variabila *url* = linku-ul bazei de date din firebase
  console.log(url)
  let response = await fetch(url); // variabila *reponse* = cererea catre baza de date
  let listResDb = await response.json(); // variabila *list* = continut bazei de date
  console.log(listResDb); //
  state = listResDb;
  draw();
}
