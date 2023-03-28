
'use client'
import React from "react";
import auth from 'firebase/auth';
 

// Configure FirebaseUI.
const uiConfig = {
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // GitHub as the only included Auth Provider.
  // You could add and configure more here!
  signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
};

