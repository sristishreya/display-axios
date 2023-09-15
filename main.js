function postData() {
    axios
        .post('https://crudcrud.com/api/c4dcfcf59361479ea8b75a5b3ad56457/booking', {
            email: document.getElementById("email").value,
            name: document.getElementById("name").value,
            phn: document.getElementById("phn").value

        })
        .then(res => console.log(res))
        .catch(err => console.error(err));

}


function displayData() {
    axios
        .get('https://crudcrud.com/api/c4dcfcf59361479ea8b75a5b3ad56457/booking')
        .then((res) => {
            const Data = document.getElementById('submittedData');
            Data.innerHTML = ''; 

            res.data.forEach((data) => {
                const dataDiv = document.createElement('div');
                dataDiv.innerHTML = `
                    Email: ${data.email}, Name: ${data.name}, Phone No.: ${data.phn}
                    <button class="delete" data-id="${data._id}">Delete</button>
                    <button class="edit" data-id="${data._id}">Edit</button>
                `;

                Data.appendChild(dataDiv);

                const deleteButton = dataDiv.querySelector(".delete");
                deleteButton.addEventListener("click", () => {
                    axios
                        .delete(`https://crudcrud.com/api/c4dcfcf59361479ea8b75a5b3ad56457/booking/${data._id}`)
                        .then((res) => {
                            Data.removeChild(dataDiv);
                        })
                        .catch((err) => console.error(err));
                });

                const editButton = dataDiv.querySelector(".edit");
                editButton.addEventListener("click", () => {
                    document.getElementById("email").value = data.email;
                    document.getElementById("name").value = data.name;
                    document.getElementById("phn").value = data.phn;

                    Data.removeChild(dataDiv);


                    const submitButton = document.getElementById("btn");
                    submitButton.addEventListener("click", () => {
                        
                        const editedData = {
                            email: document.getElementById("email").value,
                            name: document.getElementById("name").value,
                            phn: document.getElementById("phn").value,
                        };


                        displayData();
                    });
                });

            });
        })
        .catch((err) => console.error(err));
}




document.getElementById("my-form").addEventListener("submit", function (event) {
    event.preventDefault();
    postData();
})

window.addEventListener("DOMContentLoaded", displayData);


