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
  apiKey: "AIzaSyD9uJSx87wLWMehUFmpdboN9sBM9s_tN1M",
  authDomain: "insan-cemerlang-41b6b.firebaseapp.com",
  projectId: "insan-cemerlang-41b6b",
  storageBucket: "insan-cemerlang-41b6b.appspot.com",
  messagingSenderId: "1057804782651",
  appId: "1:1057804782651:web:bf911a5c4bff4f7bef201e"
  
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

export async function tambahDaftarPembeli(nama, alamat, notlpon) {
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