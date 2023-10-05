document.addEventListener("DOMContentLoaded",() => {
    fetch("http://localhost:3000/foods")
    .then(response => response.json())
    .then(foods => {
        foods.forEach(food => {
            let foodDiv = document.createElement("div")
            foodDiv.classList.add("food")
            let title = document.createElement("h2")
            title.textContent = food.name
            foodDiv.appendChild(title)
            let updateForm = document.createElement("form")
            updateForm.innerHTML = `
            <input type="text" placeholder="update food" id="updateBtn"/>
            <input type="submit" value="Update Food"/>
            `
            foodDiv.appendChild(updateForm)
            let deleteBtn = document.createElement("button")
            deleteBtn.textContent = "Delete Food"
            foodDiv.appendChild(deleteBtn)
            let foodsDiv = document.getElementById("foods")
            foodsDiv.appendChild(foodDiv)
            updateForm.classList.add("updateFood")
            updateForm.addEventListener("submit",(e)=> {
             e.preventDefault()
             let updateVal = e.target.updateBtn.value
             let updateObj = {
                name: updateVal
             }
             fetch(`http://localhost:3000/foods/${food.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateObj)
             })
             .then(res => res.json())
             .then(food => {
                alert(`Food ${food.name} updated`)
             })
            })
            deleteBtn.addEventListener("click",() => {
                fetch(`http://localhost:3000/foods/${food.id}`,{
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(food => {
                    alert("Food Deleted Succefullfully")
                })
            })
        })
    })
    .catch((err) => console.log(err))
    let form = document.querySelector("#add-food")
    form.addEventListener("submit",(e) => {
        e.preventDefault()
        let inputVal = e.target.foodinput.value;
        let food = {
            name: inputVal
        }
        if(inputVal.length < 2){
            alert("Invalid food name")
            return
        }
        fetch("http://localhost:3000/foods",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(food)
        })
        .then(res => res.json())
        .then(food => console.log(food))

    })
})