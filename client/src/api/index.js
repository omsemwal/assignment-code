  //import { useNavigate } from "react-router-dom";

  
 export async function loginUser(credentials) {
   // const Navigate = useNavigate()
    try {

       const response = await fetch("http://localhost:9902/login", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(credentials),
       });
   
       if (!response.ok) {
         throw new Error("Invalid credentials");
       }
   
       const data = await response.json();
       console.log("Success:", data);
       // Store the token in local storage or in a cookie
       localStorage.setItem("token", data.token);
       return "authentication"
       // Redirect the user to a protected page
       // Navigate("/")
     } catch (error) {
       console.error("Error:", error);
       // Show an error message to the user
       alert("Invalid credentials");
     }
   }




   export async function signupUser(user) {
    try {
        const response = await fetch("http://localhost:9902/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Signup failed");
        }

        const data = await response.json();
        console.log("Success:", data);
        return { success: true }; // Return success indicator
    } catch (error) {
        console.error("Error:", error);
        return { success: false }; // Return failure indicator
    }
}


  //   export async function signupUser(user) {
  //       //const Navigate = useNavigate()
  //   try {
  //     const response = await fetch("http://localhost:9902/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Signup failed");
  //     }
  
  //     const data = await response.json();
  //     console.log("Success:", data);
  //     // Show a success message to the user
  //     alert("Signup successful");
  //     // Redirect the user to the login page
  //     //Navigate("/")
  //   } catch (error) {
  //     console.error("Error:", error);
  //     // Show an error message to the user
  //     alert("Signup failed");
  //   }
  // }
   


  
  export async function payment(user) {
    //const Navigate = useNavigate()
try {
  const response = await fetch("http://localhost:9902/CreatePayment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  const data = await response.json();
  console.log("Success:", data);
  // Show a success message to the user
  alert("payment successful");
  // Redirect the user to the login page
  //Navigate("/")
} catch (error) {
  console.error("Error:", error);
  // Show an error message to the user
  alert("payment failed");
}
}


  
   
export async function getPayment(email) {
  try {
    const response = await fetch(`http://localhost:9902/${email}`, {
      method: 'GET', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error("Failed to retrieve payment details");
    }

    const data = await response.json();
    console.log("Payment Details:", data); // Log the entire response data
    return data; // Return the entire response data
    // Process payment details as needed
  } catch (error) {
    console.error("Error:", error);
    // Throw the error again to handle it outside this function
    throw error;
  }
}
