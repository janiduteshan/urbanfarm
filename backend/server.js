// server.js
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin using your service account JSON
const serviceAccount = require(
  path.join(__dirname, "config", "serviceAccountKey.json"),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore instance
const db = admin.firestore();

/**
 * POST /signup
 * Expects JSON body with: { name, email, role, password }
 */
app.post("/signup", async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Create a new user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Prepare additional user data to store in Firestore
    const userData = {
      uid: userRecord.uid,
      name,
      email,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Store user data in Firestore (e.g., under "users" collection)
    await db.collection("users").doc(userRecord.uid).set(userData);

    // Optionally, you could generate a custom token if you want to return it to the client
    // const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.status(201).json({
      message: "User created successfully",
      uid: userRecord.uid,
      // token: customToken, // Uncomment if needed
    });
  } catch (error) {
    console.error("Error creating user:", error);
    // Handle Firebase errors gracefully
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
