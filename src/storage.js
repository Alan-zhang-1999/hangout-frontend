import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as imageConversion from "image-conversion";

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

export async function uploadFile(self, file, fileName) {
    const temp = await imageConversion.compress(file, 0.8);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, temp);
    return await new Promise((resolve, reject) => {
        uploadTask.on('state_changed',  (snapshot) => {
            self.percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed();
            // console.log('Upload is ' + self.percentage + '% done');
        }, (error) => {
            self.uploadStatus = "exception";
            reject(error);
        }, async () => {
            self.uploadStatus = "success";
            resolve(await getDownloadURL(uploadTask.snapshot.ref));
        });
    });

}