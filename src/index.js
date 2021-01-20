///////////////////RAMEN RATER REVIEW
///////////Save variables
const ramenMenu = document.querySelector('div#ramen-menu');
const ramenDetail = document.querySelector('div#ramen-detail');
const ramenImg = document.querySelector('img.detail-image');
const h2 = document.querySelector('h2.name');
const h3 = document.querySelector('h3.restaurant');
const form = document.querySelector('form#ramen-rating');
const rating = form.querySelector('input[name="rating"]');
const comment = form.querySelector('textarea[name="comment"]');

//////////////////////////Render ramen 
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(arrOfRamen => {
        arrOfRamen.forEach(ramen => renderRamen(ramen))
    })

    function renderRamen(ramen){
    const img = document.createElement('img');
    img.className = 'ramen-pic';
    img.src = ramen.image;
    img.dataset.id = ramen.id;
    ramenMenu.append(img);
////////////////////////////////click to render
    img.addEventListener('click', function(e){      
        fetch(`http://localhost:3000/ramens/${ramen.id}`)
        .then(res => res.json())
        .then(data => {
            rating.value = data.rating;
            comment.textContent = data.comment;
        })
        ramenImg.src = ramen.image;
        ramenImg.alt = ramen.name;
        h2.textContent = ramen.name;
        h3.textContent = ramen.restaurant;
        form.dataset.id = ramen.id;
        
    })
}

/////////////////////////// FORM

    form.addEventListener('submit', function(e){
        e.preventDefault();
        let newRating = e.target.rating.value;
        let newComment = e.target.comment.value;
        let newRamen = {
            id: e.target.dataset.id,
            rating: newRating,
            comment: newComment
        }
        updateDB(newRamen);
        e.target.reset();
    })


function updateDB(newRamen){
    fetch(`http://localhost:3000/ramens/${newRamen.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRamen),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        rating.value = newRamen.rating;
        comment.textContent = newRamen.comment;
    })
}