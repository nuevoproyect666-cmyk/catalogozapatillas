// Importar Firebase desde CDN (modo módulo)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBSHZzduDrWT-CFmoYOit6euHhpTIeuWwQ",
  authDomain: "catalogo-zapatillas-88d20.firebaseapp.com",
  projectId: "catalogo-zapatillas-88d20",
  storageBucket: "catalogo-zapatillas-88d20.firebasestorage.app",
  messagingSenderId: "362371368674",
  appId: "1:362371368674:web:c3810ede87f8cdb28c40bb"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios para usarlos en otros archivos
export const db = getFirestore(app);
export const auth = getAuth(app);
