import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const contenedor = document.getElementById("productos");

async function cargarProductos() {
  const querySnapshot = await getDocs(collection(db, "productos"));

  querySnapshot.forEach((doc) => {
    const p = doc.data();

    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Marca: ${p.marca}</p>
      <p>Precio: $${p.precio}</p>
      <img src="${p.imagen}" width="200">
      <hr>
    `;
    contenedor.appendChild(div);
  });
}

cargarProductos();
