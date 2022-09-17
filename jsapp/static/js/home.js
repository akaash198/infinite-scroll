// unsplash api

const imageContainer= document.getElementById('image-container');
const loader=document.getElementById('loader');

let photosArray=[];
let imagesLoaded=0;
let totalImages=0;
let ready=false;

const count = 10;
const apiKey = 'wXN4FdOQDOSbSQUkmrTH-UO8Kd-lgkum2lnnCkghQ7w';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready=true;
        loader.hidden=true;
    }
}

// helper functions
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// create element photos
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    // run function for each photo
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
       
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,

        });

        //event listeners
        img.addEventListener('load', imageLoaded);

        //pht
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


// get photos unsplash api

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray=await response.json();
        displayPhotos();

    } catch (e) {
        // catch error here
    }
}


// check to see if scroll
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready=false;
        getPhotos();
    }
});

// onload callback

getPhotos();