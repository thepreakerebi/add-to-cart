// Variables
const courses = document.querySelector('#courses-list'),
        shoppingCartContent = document.querySelector('#cart-content tbody'),
        clearCartBtn = document.querySelector('#clear-cart');





// Listeners
loadEventListeners();

function loadEventListeners() {
    // when a new course is added
    courses.addEventListener('click', buyCourse);
    
    // when the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    // clear cart btn
    clearCartBtn.addEventListener('click', clearCart);

    // document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}






// Functions
function buyCourse(e) {
    e.preventDefault()
    // use delegation to find course that was added to the shopping cart
    if(e.target.classList.contains('add-to-cart')) {
        // read the course values
        const course = e.target.parentElement.parentElement;

        // read the values
        getCourseInfo(course)
    }
}

// Reads the html information of the selected course
function getCourseInfo(course) {
    // create an object with course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    // insert into the shopping cart
    addIntoCart(courseInfo);
}
// display the selected course in the shopping cart

function addIntoCart(course) {
    // create a <tr>
    const row = document.createElement('tr');

    // build the template
    row.innerHTML = `
        <tr>
            <td>
                <img width="100%" src="${course.image}">
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    
    `;
    // add into the shopping cart
    shoppingCartContent.appendChild(row);

    // add course into local storage
    saveIntoStorage(course);
}

// add the courses into local storage
function saveIntoStorage(course) {
    let courses = getCourseFromStorage();

    // add course into the array
    courses.push(course);

    localStorage.setItem('courses', JSON.stringify(courses));
}

// get the courses from local storage
function getCourseFromStorage() {
    let courses;


    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

// remove course from the dom
function removeCourse(e) {
    let course, courseId;

    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }

    //  
    removeCourseLocalStorage(courseId);
}

// remove course from local storage
function removeCourseLocalStorage(id) {
    let coursesLs = getCourseFromStorage();

    coursesLs.forEach(function(course, index) {
         if(course.id === id) {
             coursesLs.splice(index, 1);
         }
    });

    localStorage.setItem('courses', JSON.stringify(coursesLs));
}

// clears the shopping cart
function clearCart(e) {
    // shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    // clear from local storage
    clearLocalStorage();
}

function clearLocalStorage() {
    localStorage.clear();
}

// loads when document is ready and prints courses into the shopping cart
function getFromLocalStorage() {
    let coursesLs = getCourseFromStorage();

    // loop through the courses and prints 
    coursesLs.forEach(function(course) {
       // create <tr>
       const row = document.createElement('tr');

       row.innerHTML = `
            <tr>
                <td>
                    <img width="100%" src="${course.image}">
                 </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
       
       `;
       shoppingCartContent.appendChild(row);
    });
}
