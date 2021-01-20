// write your code here
//See all ramen in the div #ramen-menu
//Display image using img tag inside #ramen-menu
//click on the image to display #ramen-detail
//Update using the #ramen-rating form

let imgDiv = document.querySelector('div#ramen-menu')

let infoDiv = document.querySelector('div#ramen-detail')
let img = document.querySelector('img.detail-image')
let name = document.querySelector('h2.name')
let restaurant = document.querySelector('h3.restaurant')

let form = document.querySelector('form#ramen-rating')
let rating = form.querySelector('input[name="rating"]')
let comment = form.querySelector('textarea[name="comment"]')


fetch('http://localhost:3000/ramens')
    .then(r => r.json())
    .then((ramenList) => {

        ramenList.forEach((ramenObj => {
            renderRamen(ramenObj)
           
        }))

    })

function renderRamen(ramenObj){
    const img = document.createElement('img')
    img.className = 'ramen-pic'
    img.src = ramenObj

  

    ramenImg.addEventListener('click', (event) =>{
        console.log(ramenObj.id)

        fetch(`http://localhost:3000/ramens/${ramenObj.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ramenObj)
        })
            .then(r => r.json())
            .then((ramen) => {
                img.src = ramen.image
                name.textContent = ramen.name
                restaurant.textContent = ramen.restaurant
                

            })

    })

    


    // <!-- Ramen Details -->
    // <div id="ramen-detail">
    //   <img class="detail-image" src=${ramenObj.image} alt=${ramenObj.name} />
    //   <h2 class="name">${ramenObj.name}</h2>
    //   <h3 class="restaurant">${ramenObj.restaurant}</h3>
    // </div>
    
    // <!-- Rating Form -->
    // <form id="ramen-rating" data-id="${ramenObj.id}">
    //   <label for="rating">Rating: </label>
    //   <input type="text" name="rating" id="rating" value="${ramenObj.rating}" />
    //   <label for="comment">Comment:  </label>
    //   <textarea name="comment" id="comment">${ramenObj.comment}</textarea>
    //   <input type="submit" value="Update" />
    // </form>
    

}