// http://localhost:9000/api/register

// const form = document.querySelector("#userinfo");

// async function sendData() {
//     // Associate the FormData object with the form element
//     //   const formData = new FormData(form);
//     const name = document.getElementById('Name').value;
//     const email = document.getElementById('Email').value;

//     try {
//         const response = await fetch("http://localhost:9000/api/register", {
//             method: "POST",
//             // Set the FormData instance as the request body
//             body: JSON.stringify({ name, email }),
//         });
//         console.log(await response.json());
//     } catch (e) {
//         console.error(e);
//     }
//     //   console.log(document.querySelector("#name"))
// }

// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     sendData();
// });

function handleSubmit(event) {
    event.preventDefault(); // Prevent the default button click behavior

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    console.log(name);
    console.log(email);

    fetch('http://localhost:9000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'success') {
                console.log(result);
                alert('Registration successful!');
            } else {
                alert('Registration failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}

// Attach the function to the event listener
document.getElementById('submit').addEventListener('click', handleSubmit);

// POST request
// fetch('http://localhost:9000/api/register', {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json',
// },
// body: JSON.stringify({'name': name, 'email': email}),
// })
// .then(response => response.json())
// .then(data => console.log('POST:', data))
// .catch((error) => console.error('Error:', error));

// Modify register.html and register.js to POST the name and email data to this
// endpoint: http://localhost:9000/api/register.
// The endpoint will return {message: 'success'} upon a successful form
// submission.
// In a browser, verify that register.html behaves correctly. You can use any name
// and email value.