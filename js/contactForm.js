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

    const isValidateForm = validateForm(name, phone, city);

    if (isValidateForm) {
        try {
            await saveData(name, phone, city, address);
            document.getElementById("contact-form").reset();
            toastr.success("لقد توصلنا بطلبياتك سنتواصل معاك في أقرب وقت");
        } catch (error) {
            console.error("Error saving data:", error);
            toastr.error("نعتذر، المرجو المحاولة لاحقا");
        }
    }
}

const saveData = async (name, phone, city, address) => {
    const newContactForm = ilaBioDB.push();
    await newContactForm.set({ name, phone, city, address });
};

const getElementVal = (id) => document.getElementById(id).value.trim();

const validateForm = (name, phone, city) => {
    if (!name || !/^[A-Za-z\s]{3,}$/.test(name)) {
        toastr.warning("يرجى إدخال اسم صحيح يحتوي على أحرف ومسافات فقط، وطوله لا يقل عن 3 أحرف");
        return false;
    }

    if (!phone || !/^\d{10,15}$/.test(phone)) {
        toastr.warning("يرجى إدخال رقم هاتف مغربي صحيح (يبدأ بـ 0 ويليه 9 أرقام");
        return false;
    }

    if (!city || !/^[A-Za-z\s]+$/.test(city)) {
        toastr.warning("يرجى إدخال اسم مدينة صحيح يحتوي على أحرف ومسافات فقط");
        return false;
    }

    return true;
};

toastr.options = { "positionClass": "toast-top-center", "closeButton": true };
