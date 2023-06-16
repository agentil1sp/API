const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();
app.use(cors({ origin: true }));

// Initialize Firebase Admin with service account


var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const db = admin.firestore();


app.get('/read/:collection_name/item_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection(req.params.collection_name).doc(req.params.item_id);
            let item = await document.get();
            let response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// read all items from a collection
// params => collection_name

app.get('/read/:collection_name', (req, res) => {
    (async () => {
        try {
            let query = db.collection(req.params.collection_name);
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        item: doc.data()
                    };
                    response.push(selectedItem);
                }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// read a single item from a collection
app.listen(port, () => { console.log(`Server running on port: ${port}`) });