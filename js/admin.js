import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Elementos
const loginDiv = document.getElementById("login");
const panelDiv = document.getElementById("panel");
const errorP = document.getElementById("loginError");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const btnAgregar = document.getElementById("btnAgregar");

const lista = document.getElementById("listaProductos");

// LOGIN
btnLogin.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );
  } catch (err) {
    errorP.textContent = "Credenciales incorrectas";
  }
});

// LOGOUT
btnLogout.addEventListener("click", async () => {
  await signOut(auth);
});

// Detectar sesión
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginDiv.style.display = "none";
    panelDiv.style.display = "block";
    cargarProductos();
  } else {
    loginDiv.style.display = "block";
    panelDiv.style.display = "none";
  }
});

// AGREGAR PRODUCTO
btnAgregar.addEventListener("click", async () => {
  await addDoc(collection(db, "productos"), {
    nombre: document.getElementById("nombre").value,
    marca: document.getElementById("marca").value,
    precio: Number(document.getElementById("precio").value),
    imagen: document.getElementById("imagen").value
  });

  cargarProductos();
});

// LISTAR + ELIMINAR
async function cargarProductos() {
  lista.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "productos"));

  querySnapshot.forEach((docu) => {
    const p = docu.data();

    const div = document.createElement("div");
    div.innerHTML = `
      <b>${p.nombre}</b> - $${p.precio}
      <button data-id="${docu.id}">Eliminar</button>
    `;

    div.querySelector("button").addEventListener("click", async () => {
      await deleteDoc(doc(db, "productos", docu.id));
      cargarProductos();
    });

    lista.appendChild(div);
  });
}
