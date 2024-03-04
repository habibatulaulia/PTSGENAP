import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js ";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const firebaseConfig = {
  
  apiKey: "AIzaSyBbJDnmlNa2wObKWmQ6MLuXQ5KWbp0FDEA",
  authDomain: "insan-cemerlang-8011b.firebaseapp.com",
  projectId: "insan-cemerlang-8011b",
  storageBucket: "insan-cemerlang-8011b.appspot.com",
  messagingSenderId: "642542638808",
  appId: "1:642542638808:web:8dae3c0d85e3be8c5c29ad"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarPembeli() {
  const refDokumen = collection(db, "pembeli");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id, 
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      notlpon: dok.data().notlpon,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahDataPembli(nama, alamat, notlpon) {
  try {
    const dokRef = await addDoc(collection(db, 'pembeli'), {
      nama: nama,
      alamat: alamat,
      notlpon: notlpon
    });
    console.log('Berhasil menambah Pembeli' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah Pembeli' + e);
  }
}