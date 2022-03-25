import app from "./firebaseApp";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const API_KEY = "AIzaSyAWaAtaKV8BYTY2nDCmVtA5WW0M4yyi4Y0";

const firestore = getFirestore();

export const getPlaces = async (
  {
    // default value
    queryType = "nearbysearch",
    lat = 10.7697759,
    lng = 106.6563129,
    radius = 2000,
    rankby = "prominence",
    type = "hospital",
  },
  setItems,
  setLoading
) => {
  const queryString = `location=${lat},${lng}&radius=${radius}&rankby=${rankby}&type=${type}`;
  const url = `https://maps.googleapis.com/maps/api/place/${queryType}/json?${queryString}&key=${API_KEY}`;
  console.log(url);
  setLoading(true);
  const result = await fetch(url)
    .then((response) => response.json())
    .catch((e) => console.log(e));

  setItems([...result.results]);
  setLoading(false);
};

export const getImage = ({ photo_reference }) => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${1600}&maxHeight=${1600}&photo_reference=${photo_reference}&key=${API_KEY}`;

  return url;
};

export const getInfo = async (place_id, setInfo, setLoading) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=address_component,formatted_address,name,geometry,photo,rating,opening_hours/open_now,international_phone_number,formatted_phone_number&key=AIzaSyAWaAtaKV8BYTY2nDCmVtA5WW0M4yyi4Y0`;

  setLoading(true);
  const result = await fetch(url)
    .then((response) => response.json())
    .catch((e) => console.log(e));

  setInfo({ ...result.result });
  setLoading(false);
};

export const createNewUser = async (userInfos) => {
  try {
    await setDoc(doc(firestore, "users", userInfos.userId), {
      userId: userInfos.userId,
      name: userInfos.name,
      email: userInfos.email,
      avatar: "",
      birthday: "",
      idCardNumber: "",
      address: "",
      phoneNumber: userInfos.phoneNumber ? userInfos.phoneNumber : "",
      role: "basic-user",
      gender: "",
      medicalRecord: {
        temperature: "",
        temperatureMeasureTime: "",
        SPO2: "",
        SPO2MeasureTime: "",
        heartRate: "",
        heartRateMeasureTime: "",
        bloodSugar: "",
        bloodSugarMeasureTime: "",
        bloodPressure: "",
        bloodPressureMeasureTime: "",
        height: "",
        heightMeasureTime: "",
      },
      patients: [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const existsUser = async (userId) => {
  try {
    const userDoc = await getDoc(doc(firestore, "users", userId));
    return userDoc.exists();
  } catch (error) {
    console.log(error);
  }
};

export const getFacilities = async (setItems) => {
  try {
    const facilities = await getDocs(collection(firestore, "facilites"));
    const value = [];
    facilities.forEach((doc) => {
      value.push({ ...doc.data() });
    });
    setItems([...value]);
  } catch (e) {
    console.log(e);
  }
};

export const getCurFacility = async (setItem, id) => {
  try {
    const facilitie = await getDoc(doc(firestore, "facilites", id));
    console.log("facility");
    console.log(facilitie.data());
    const value = facilitie.data();
    // console.log("value");
    // console.log(value);
    setItem({ ...value });
  } catch (e) {
    console.log(e);
  }
};

export const getUserInfo = async (userId) => {
  try {
    const userDoc = await getDoc(doc(firestore, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMedicalRecord = async (userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      if (userDoc.data().medicalRecord) {
        return userDoc.data().medicalRecord;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addMedicalRecord = async (medicalRecord, userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, {
      medicalRecord: {
        ...medicalRecord,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addPatient = async (patientInfo, userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userDoc = userSnap.data();
      userDoc.patients.push({ ...patientInfo, no: userDoc.patients.length });
      await updateDoc(userRef, userDoc);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUserInfo = async (userInfo, userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, userInfo);
  } catch (error) {
    console.log(error);
  }
};
