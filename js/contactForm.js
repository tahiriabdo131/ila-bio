// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPzNvgWN94It4iBM3GH72n3PerDfxR0I4",
    authDomain: "ila-bio-af858.firebaseapp.com",
    databaseURL: "https://ila-bio-af858-default-rtdb.firebaseio.com",
    projectId: "ila-bio-af858",
    storageBucket: "ila-bio-af858.appspot.com",
    messagingSenderId: "7766608820",
    appId: "1:7766608820:web:e9945f37a36a0b887600e1"
};

// Initialize Firebase
const initializeFirebase = () => {
    try {
        return firebase.initializeApp(firebaseConfig);
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }
};

const firebaseApp = initializeFirebase();
const ilaBioDB = firebaseApp.database().ref("ila-bio");

document.getElementById("contact-form").addEventListener("submit", submitForm);

async function submitForm(event) {
    event.preventDefault();

    const name = getElementVal("name");
    const phone = getElementVal("phone");
    const city = getElementVal("city");
    const address = getElementVal("address");

    if (validateForm(name, phone, city, address)) {
        try {
            await saveData(name, phone, city, address);
            document.getElementById("contact-form").reset();
            toastr.success("لقد توصلنا بطلبياتك سنتواصل معاك في أقرب وقت");
        } catch (error) {
            console.error("Error saving data:", error);
            toastr.error("نعتذر، المرجو المحاولة لاحقا");
        }
    } else {
        toastr.warning("المرجو التحقق من معلوماتك");
    }
}

const saveData = async (name, phone, city, address) => {
    const newContactForm = ilaBioDB.push();
    await newContactForm.set({ name, phone, city, address });
};

const getElementVal = (id) => document.getElementById(id).value;

const validateForm = (name, phone, city, address) => {
    if (!name || !phone || !city || !address) {
        return false;
    }
    // Add more validation logic if necessary
    return true;
};

toastr.options = { "positionClass": "toast-top-center", "closeButton": true };
