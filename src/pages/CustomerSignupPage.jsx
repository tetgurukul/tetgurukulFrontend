//This page is prompted to customers who will signup...
import React, {useEffect, useState} from "react"
import NavBar from "../components/NavBar"
import {Row, Col, Container, Form, Button} from "react-bootstrap";

//Importing service.
import { postCustomer } from "../services/customerServices";
 export default function  CustomerSignUpPage () {

    //Below hooks are for the customer signup
 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [password, setPassword] = useState ("");

    const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state


//dynamically shows the otp box once user clicks on get otp button
    const [showOtpBox, setShowOtpBox] = useState(false);

//Input otp value.

    const [inputOtp, setInputOtp] = useState("");

//_____________________________________

//Show create password box.
const [showCreatePasswordBox, setShowCreatePasswordBox] = useState(false)

//_____________________________________

//Below sis the dummy otp

const otp = "123456"


    //Below function handles the form submit

    const handleSubmit = async (e) => {
        
        console.log(name)
        e.preventDefault(); // Prevent the default form submission behavior
    
        const customerData = {
          name,
          email,
          phone,
          whatsapp,
          password,
        };
    
        setIsSubmitting(true); // Start the submission process
    
        try {
          // Call the postCustomer function and send the customer data
          const response = await postCustomer(customerData);
          console.log("Customer created:", response);


          //Resetting hooks;

         setName("");
         setEmail("");
         setPhone("");
         setWhatsapp("");
         setPassword("");

          e.target.reset();
          // You can handle the response here, like showing a success message or redirecting
        } catch (error) {
          console.error("Error creating customer:", error.message);
          // Handle error if necessary (e.g., show an error message to the user)
        } finally {
          setIsSubmitting(false); // Stop the loading state after submission
        }
      };

      //__________________________________________________________________

      //Below function sends otp to users phone

      const getOtp = () => {
        setShowOtpBox(true);
      }


      //Verifies the input otp wether correct or not.

      const submitOtp = () => {
        if (inputOtp === otp) {

            setShowCreatePasswordBox(true);
            setShowOtpBox(false)
        } else {
            alert('Incorrect Otp')
            setShowCreatePasswordBox(false)

        }
      }

return (
<>
<Container fluid> 

    <nav>
        <NavBar/>
    </nav>

    <Row>
    <form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>WhatsApp</Form.Label>
        <Form.Control
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          required
        />
      </Form.Group>

<br></br>
      <Row>

        {showOtpBox === false ? (<Button onClick={getOtp}>Get Otp</Button>):(

<Button onClick={submitOtp}>Submit</Button>
        )}
        

      </Row>

    {/* once user clicks the get otp button otp is sent to user and 
    below enter otp box appears */}

    {showOtpBox ? (

<Form.Group>
<Form.Label>Enter Otp</Form.Label>
<Form.Control
  type="text"
  value={inputOtp}
  onChange={(e) => setInputOtp(e.target.value)}
  required
/>
<small>Otp is sent to your phone number.</small>
</Form.Group>
    ):(null) }

{/* showing password box when otp is correct */}

{showCreatePasswordBox ? (

<Form.Group>
<Form.Label>Set Password</Form.Label>
<Form.Control
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
</Form.Group>

):(null)}
     
<br></br>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>

    </Row>



</Container>

<>Hello</>

</>


)


}