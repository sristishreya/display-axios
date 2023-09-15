function postData(){
    axios
    .post('https://crudcrud.com/api/813a845e51dd4af29877b2d83eff1829/booking',{
        email:document.getElementById("email").value,
        name:document.getElementById("name").value,
        phn:document.getElementById("phn").value

    })
    .then(res=> console.log(res))
    .catch(err=> console.error(err));

}

// function displayDataFromAPI() {
//     axios
//         .get('https://crudcrud.com/api/813a845e51dd4af29877b2d83eff1829/booking')
//         .then((res) => {
//             const submittedDataDiv = document.getElementById('submittedData');
//             res.data.forEach((data) => {
//                 const dataDiv = document.createElement('div');
//                 dataDiv.innerHTML = `<p>Email: ${data.email}, Name: ${data.name}, Phone No.: ${data.phn}</p>`;
//                 submittedDataDiv.appendChild(dataDiv);
//             });
//         })
//         .catch((err) => console.error(err));
// }

function displayData(){
    axios
    .get('https://crudcrud.com/api/813a845e51dd4af29877b2d83eff1829/booking')
    .then((res)=>{
        const Data=document.getElementById('submittedData');
        res.data.forEach((data)=>{
            const dataDiv=document.createElement('div');
            dataDiv.innerHTML=`Email:${data.email}, Name: ${data.name}, Phone No.: ${data.phn}
            <button class="delete" data-id="${data._id}">Delete</button>`;
            Data.appendChild(dataDiv);

            const deleteButton = dataDiv.querySelector(".delete");
            deleteButton.addEventListener("click", () => {
                axios
                    .delete(`https://crudcrud.com/api/813a845e51dd4af29877b2d83eff1829/booking/${data._id}`)
                    .then((res) => {
                        Data.removeChild(dataDiv);
                    })
                    .catch((err) => console.error(err));
            });
        });
    })
    .catch((err) => console.error(err));
}
        

document.getElementById("my-form").addEventListener("submit", function(event){
    event.preventDefault();
    postData();
})

window.addEventListener("DOMContentLoaded", displayData);