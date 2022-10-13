import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as imageConversion from 'image-conversion';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7DsWqnpov93rbdt1WWRv9SIyDKZQkc8E",
    authDomain: "elec5619-e69f2.firebaseapp.com",
    projectId: "elec5619-e69f2",
    storageBucket: "elec5619-e69f2.appspot.com",
    messagingSenderId: "442554420798",
    appId: "1:442554420798:web:73c31ba64604344ec8cb6f"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export async function uploadFile(file, fileName) {
    const temp = await imageConversion.compress(file, 0.8);
    const storageRef = ref(storage, fileName);
    return await uploadBytes(storageRef, temp).then(async () => {
        return await getDownloadURL(storageRef).then(url => {
            return url;
        });
    });

}

