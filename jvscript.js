// variabila de stocat info din aplicatie
// tip obiect
let state = {
  list: [],
  idxEdit: null,
  // obiect
  dataBaseUrl:
    "https://phonebook-1fef4-default-rtdb.europe-west1.firebasedatabase.app/list/",
};

// functia de adaugare contacte
async function addContact(event) {
  event.preventDefault();
  let nume = document.querySelector('[name="nume"]').value.trim();
  let nrTelefon = document.querySelector('[name="nrTelefon"]').value.trim();
  console.log(nume);
  console.log(nrTelefon);
  if (nume !== "" || nrTelefon !== "") {
    if (state.idxEdit === null) {
      let url = state.dataBaseUrl + ".json"; // variabila *url* = linku-ul bazei de date din firebase + varibila index
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ nume: nume, nrTelefon: nrTelefon }),
      }); // variabila *reponse* = cererea catre baza de date care urmeaza a fi stearsa
    } else {
      let url = state.dataBaseUrl + state.idxEdit + ".json"; // variabila *url* = linku-ul bazei de date din firebase + varibila index
      console.log(url);
      let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ nume: nume, nrTelefon: nrTelefon }),
      });
    }
  }
  document.querySelector('[name="nume"]').value = "";
  document.querySelector('[name="nrTelefon"]').value = "";
  await getData();
  // sortAgenda();
}

// functia de desenare a tabelului
function draw() {
  let table = document.querySelector("#idTable tbody");
  let str = "";
  document.querySelector("#idTable").classList.remove("hideTableHead");
  for (let [i, elem] of Object.entries(state.list)) {
    // for (let idx = 0; idx < state.list.length; idx++) {
    // for (let elem of state.list) {
    // let elem = state.list[idx];
    console.log(elem);
    if (elem === null) {
      continue;
    }
    str += `<tr>
          <td style="width: 30%;" class="fontSize">${elem.nume}</td>
          <td style="width: 30%;" class="fontSize">${elem.nrTelefon}</td>
          <td style="width: 20%;" class="fontSize"> <button onclick="editContact('${i}')" class="buttonContact fontSize">Modifica</button></td>
          <td style="witdh: auto" class="fontSize"> <button onclick="deleteContact('${i}')" class="buttonContact fontSize">Sterge</button></td>
        </tr>`;
    table.innerHTML = str;
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
async function deleteContact(idx) {
  if (
    confirm(`Esti sigur ca vrei sa stergi contactul "${state.list[idx].nume}"?`)
  ) {
    // https://phonebook-1fef4-default-rtdb.europe-west1.firebasedatabase.app/2/.josn -> exemplu de preluare cu variabila index
    let url = state.dataBaseUrl + idx + ".json"; // variabila *url* = linku-ul bazei de date din firebase + varibila index
    let response = await fetch(url, {
      method: "DELETE",
    }); // variabila *reponse* = cererea catre baza de date care urmeaza a fi stearsa
    await getData();
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
  let response = await fetch(url); // variabila *reponse* = cererea catre baza de date
  let listResDb = await response.json(); // variabila *list* = continut bazei de date
  state.list = listResDb;
  draw();
}
