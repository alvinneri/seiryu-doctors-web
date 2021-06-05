const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.uploadCsv = functions.firestore
  .document("upload_history/{historyId}")
  .onCreate(async (snapshot, context) => {
    let data = snapshot.data();
    data.items.forEach(async (item) => {
      const snapshot = await db
        .collection("records")
        .where("license_no", "==", item.license_no)
        .where("doctor_first_name", "==", item.doctor_first_name)
        .where("doctor_last_name", "==", item.doctor_last_name)
        .where("patient_first_name", "==", item.patient_first_name)
        .where("patient_last_name", "==", item.patient_last_name)
        .where("date_of_purchased", "==", item.date_of_purchased)
        .where("amount", "==", item.amount)
        .get();

      console.log(snapshot, "snapshot");
      console.log(snapshot.empty, "snapshot is empty");
      if (snapshot.empty) {
        db.collection("records").add({
          license_no: item.license_no,
          doctor_first_name: item.doctor_first_name,
          doctor_last_name: item.doctor_last_name,
          patient_first_name: item.patient_first_name,
          patient_last_name: item.patient_last_name,
          date_of_purchased: item.date_of_purchased,
          items_purchased: item.items_purchased,
          amount: item.amount,
        });
      }
    });
    console.log(data.items, "done");
    return { items: data.items };
  });
