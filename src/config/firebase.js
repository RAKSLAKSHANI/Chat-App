import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";  // ✅ Import signOut
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCzcOZ4mlk-8kmXFH0OZcnobSho_83tN6A",
  authDomain: "chat-app-d991c.firebaseapp.com",
  projectId: "chat-app-d991c",
  storageBucket: "chat-app-d991c.appspot.com",  // ✅ Fixed storageBucket
  messagingSenderId: "251279750702",
  appId: "1:251279750702:web:62fef5cdbfe83f52e691bf"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),  // ✅ Fixed duplicate key
      email,
      name: "",
      avatar: "",
      bio: "Hey, Here I am using chat app",
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.replace("auth/", "").split("-").join(" "));  // ✅ Fix error message format
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.replace("auth/", "").split("-").join(" "));  // ✅ Fix error message format
  }
};

const logout = async () => {
  try {
    await signOut(auth);  // ✅ Correctly call signOut
    toast.success("Logged out successfully");  // ✅ Show success message
  } catch (error) {
    console.error(error);
    toast.error(error.code.replace("auth/", "").split("-").join(" "));  // ✅ Fix error message format
  }
};

export { signup, login, logout, auth, db };