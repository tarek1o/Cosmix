let timeInterval = 4000;
/*====================================================================================*/
/* Start Landing */

//Nav Bar
let navBar = document.querySelector("header");
function navBarBackground() {
    if(window.scrollY >= 150) {
        navBar.classList.add("background");
    }
    else {
        navBar.classList.remove("background");
    }
}

window.addEventListener("scroll", navBarBackground)
window.addEventListener("load", navBarBackground)

//activation navbar
let sections = Array.from(document.querySelectorAll("section"));
let secctionNames = Array.from(document.querySelectorAll("nav ul li a"));
let offsetSection = 450;

function checkNavBar(section) {
    for(let secctionName of secctionNames) {
        secctionName.classList.remove("active");
        if(secctionName.getAttribute("href") == `#${section.id}`) {
            secctionName.classList.add("active");
            section.classList.add("animate")
        }
    }
}

function checkScroll() {
    for(let section of sections) {
        if(section.id == "services") {
            if(window.scrollY >= service.offsetTop - 500) {
                service.classList.add("animate");
                checkNavBar(section);
            }
            if(window.scrollY >= experience.offsetTop - 600) {
                experience.classList.add("animate");
                spanProgress.forEach(function(span) {
                    span.style.width = span.dataset.progress;
                    span.querySelector(".number").textContent = span.dataset.progress;
                })
            }
        }
        else {
            if(window.scrollY >= section.offsetTop - offsetSection) {
                checkNavBar(section);
            }
        }
    }
}

//Check which section is in offset during scroll
window.addEventListener("scroll", checkScroll)

//Check which section is in offset after reload
window.addEventListener("load", checkScroll)

//Add scroll smooth at clicking
for(let section of sections) {
    for(let secctionName of secctionNames) {
        if(secctionName.getAttribute("href") == `#${section.id}`) {
            secctionName.addEventListener("click", function(e) {
                e.preventDefault();
                section.scrollIntoView({ behavior: "smooth"});
                if(section.id == "services") {
                    if(window.scrollY >= service.offsetTop - 500) {
                        service.classList.add("animate")
                    }
                    if(window.scrollY >= experience.offsetTop - 600) {
                        experience.classList.add("animate")
                    }
                }
                else {
                    section.classList.add("animate");
                }
            })
        }
    }
}

let menu = document.querySelector(".fa-bars");
let close = document.querySelector(".fa-xmark");
let list = document.querySelector("header .list");

menu.addEventListener("click", function() {
    list.classList.add("active");
    menu.classList.add("active");
})

close.addEventListener("click", function() {
    list.classList.remove("active");
    menu.classList.remove("active");
})

//Header
let homeSection = document.querySelector(".home");
let introSection = Array.from(document.querySelectorAll(".intro"));
let bullets = document.querySelector(".bullets");

//To animate the active intro section when the page load at first time
window.addEventListener("load", function() {
    introSection.forEach(function(intro) {
        if(intro.classList.contains("active")) {
            intro.querySelector("span").classList.add("animation-active");
            intro.querySelector("h1").classList.add("animation-active");
            intro.querySelector("p").classList.add("animation-active");
        }
    })
});

//To create number of bullets equal to the number of intro sections
createBullets(introSection, bullets);

let intro = {
    container: homeSection,
    person: introSection, 
    width: 0, 
    initial: -100
}

let spans = Array.from(document.querySelectorAll(".bullets span"));

for(let span of spans) {
    span.addEventListener("click", function() {
        spans.forEach(function(span) {
            span.classList.remove("active");
        })
        this.classList.add("active");
        for(let intro of introSection) {
            intro.classList.remove("active");
            if(intro.id === span.dataset.number) {
                intro.classList.add("active");
                intro.width = introSection.indexOf(intro) * 100;
                homeSection.style.cssText = `transform: translateX(-${intro.width}%)`
                animation();
            }
        }
        checkArrows();
    })
}

let leftArrow = document.querySelector(".fa-chevron-left");
let rightArrow = document.querySelector(".fa-chevron-right");
let i = 0;

//Add Swap effect
introSection.forEach(function(section, i) {
    //Stop drag effect
    section.addEventListener("dragstart", function(e) {
        e.preventDefault();
    })

    //Mouse event
    {
        section.addEventListener("mousedown", start(i, intro));
        section.addEventListener("mousemove", move(intro));
        section.addEventListener("mouseup", end(intro, checkBullets, checkArrows, animation));
        section.addEventListener("mouseleave", end(intro, checkBullets, checkArrows, animation));
    }

    //Touch event
    {
        section.addEventListener("touchstart", start(i));
        section.addEventListener("touchmove", move(intro));
        section.addEventListener("touchend", end(intro, checkBullets, checkArrows, animation));
    }

})

rightArrow.addEventListener("click", right);

leftArrow.addEventListener("click", left);

//To check the Arrows which will be active and not active when the page load
checkArrows();

function right() {
    for(let intros of introSection) {
        i = introSection.indexOf(intros);
        if(intros.classList.contains("active")) {
            if(i < introSection.length - 1) {
                intros.classList.remove("active");
                introSection[i + 1].classList.add("active");
                intro.width = intro.initial * (i + 1);
                homeSection.style.cssText = `transform: translateX(${intro.width}%)`;
                checkArrows();
                checkBullets();
                animation();
                break;
            }
        }
    }
}

function left() {
    for(let intros of introSection) {
        i = introSection.indexOf(intros);
        if(intros.classList.contains("active")) {
            if(i != 0) {
                intros.classList.remove("active");
                introSection[i - 1].classList.add("active");
                intro.width = intro.initial * (i - 1);
                homeSection.style.cssText = `transform: translateX(${intro.width}%)`;
                checkArrows();
                checkBullets();
                animation();
                break;
            }
        }
    }
}

function checkArrows() {
    if(introSection[0].classList.contains("active")) {
        leftArrow.classList.add("off")
        rightArrow.classList.remove("off");
    }
    else if(introSection[introSection.length - 1].classList.contains("active")) {
        rightArrow.classList.add("off");
        leftArrow.classList.remove("off")
    }
    else {
        leftArrow.classList.remove("off")
        rightArrow.classList.remove("off");
    }
}

function checkBullets() {
    for(let intro of introSection) {
        if(intro.classList.contains("active")) {
            spans.forEach(function(span) {
                span.classList.remove("active");
                if(intro.id === span.dataset.number) {
                    span.classList.add("active")
                }
            })
        }
    }
}

function animation() {
    for(let intro of introSection) {
        if(intro.classList.contains("active")) {
            intro.querySelector("span").classList.add("animation");
            intro.querySelector("h1").classList.add("animation");
            intro.querySelector("p").classList.add("animation");
        }
    }
}

function createBullets(numberOfSections, bulletsContainer) {
    for(let i = 0; i < numberOfSections.length; i++) {  
        let span = document.createElement("span");
        span.setAttribute("data-number", numberOfSections[i].id);
        if(numberOfSections[i].classList.contains("active")) {
            span.classList.add("active");
        }
        bulletsContainer.appendChild(span);
    }
}

let count = -(introSection.length - 1);

setInterval(function() {
    if(count < 0) {
        right();
        count++;
    }
    else {
        left();
        count++;
        if(count === introSection.length - 1) {
            count *= -1;
        }
    }
}, timeInterval)

/* End landing */
/*====================================================================================*/

/*====================================================================================*/
/* Start Services */
let spanProgress = Array.from(document.querySelectorAll(".exp > div > span"));
let services = Array.from(document.querySelectorAll(".services .serv"));
let service = document.querySelector(".service");
let experience = document.querySelector(".experiance");
//Add dely time to each one
let delayService = 0;
services.forEach(function(service) {
    service.style.cssText = `animation-delay: ${delayService}ms;`
    delayService += 200;
})
/* End Services */
/*====================================================================================*/

/*====================================================================================*/
/* Start Features */
let navFeatures = Array.from(document.querySelectorAll(".nav-features li"));
let features = Array.from(document.querySelectorAll(".feature .content"));

//Add click event to show wanted feature
navFeatures.forEach(function(list) {
    list.addEventListener("click", function() {
        for(let li of navFeatures) {
            li.classList.remove("active");
        }
        this.classList.add("active");

        for(let feature of features) {
            feature.classList.remove("active");
            if(feature.id === list.dataset.feature) {
                feature.classList.add("active");
            }
        }
    })
})
/* End Features */
/*====================================================================================*/

/*====================================================================================*/
/* Start Portofolio */
let navPortfolio = Array.from(document.querySelectorAll(".nav-portfolio li"));
let items = Array.from(document.querySelectorAll(".my-portfolio > div"));

//Add click event to filter all portofolio and show wanted of them
for(let li of navPortfolio) {
    li.addEventListener("click", function() {
        navPortfolio.forEach(function(i) {
            i.classList.remove("active");
        })
        li.classList.add("active");

        for(let item of items) {
            if(li.id !== "all") {
                item.classList.add("deactive");
                let itemDataset = item.dataset.portfolio.split(" ");
                if(itemDataset.indexOf(li.id) !== -1) {
                    item.classList.remove("deactive");
                }
            }
            else {
                item.classList.remove("deactive");
            }
        }
    })
}
/* End Portofolio */
/*################################################################################*/

/*################################################################################*/
/* Start Pricing */
let packages = Array.from(document.querySelectorAll(".price-package .package"));
//Add dely time to each one
let delyPackage = 0;
for(let package of packages) {
    package.classList.add("animate");
    package.style.cssText = `animation-delay: ${delyPackage}ms`;
    delyPackage += 250;
}
/* End Pricing */
/*################################################################################*/

/*################################################################################*/
// Start Team
let teamMembers = Array.from(document.querySelectorAll(".members .team-member"));
//Add dely time to each one
let delyTeam = 0;
for(let teamMember of teamMembers) {
    teamMember.style.cssText = `animation-delay: ${delyTeam}ms`;
    delyTeam += 200;
}

let teamPerson = Array.from(document.querySelectorAll(".testimonial .person"));
let bulletsTestimonial = document.querySelector(".testimonial .bullets");
let teamContainer = document.querySelector(".persons");
createBullets(teamPerson, bulletsTestimonial);
let bulletsTestimonialSpans = Array.from(document.querySelectorAll(".testimonial .bullets span"));
let gap = (70 / teamContainer.offsetWidth) * 100;

//To recalculate gap value during resize
window.addEventListener("resize", function() {
    gap = (70 / teamContainer.offsetWidth) * 100;
})

let isDragging = false;
// let totWidth = 0;
// let initialtTeam = - 100 - gap;
let startPosition = 0;
let currentDistance = 0;
let currentIndex;
let currentTranslate;

let team = {
    container: teamContainer,
    person: teamPerson, 
    width: 0, 
    initial: - 100 - gap
}


//Add click event to bullets
bulletsTestimonialSpans.forEach(function(span) {
    span.addEventListener("click", function() {
        for(e of bulletsTestimonialSpans) {
            e.classList.remove("active");
        }
        span.classList.add("active")

        teamPerson.forEach(function(person, i) {
            person.classList.remove("active");
            if(person.id === span.dataset.number) {
                person.classList.add("active");
                team.width = i * team.initial;
                teamContainer.style.cssText = `transform: translateX(${team.width}%)`
            }
        })
    }) 
})

//Translate to active person div
window.addEventListener("load", function() {
    teamPerson.forEach(function(person, i) {
        if(person.classList.contains("active")) {
            team.width = i * team.initial;
            teamContainer.style.cssText = `transform: translateX(${team.width}%)`
        }
    })
})

//Add Swap effect
teamPerson.forEach(function(person, i) {
    //Stop drag effect
    person.addEventListener("dragstart", function(e) {
        e.preventDefault();
    })

    //Mouse event
    {
        person.addEventListener("mousedown", start(i, team));
        person.addEventListener("mousemove", move(team));
        person.addEventListener("mouseup", end(team, check));
        person.addEventListener("mouseleave", end(team, check));
    }

    //Touch event
    {
        person.addEventListener("touchstart", start(i, team));
        person.addEventListener("touchmove", move(team));
        person.addEventListener("touchend", end(team, check));
    }
})

function start(i, element) {
    return function() {
        isDragging = true;
        currentIndex = i;
        startPosition = getPostion(event);
        element.container.style.cursor = "grabbing";
    }
}

function move(element) {
    return function() {
        if(isDragging) {
            currentDistance = getPostion(event) - startPosition;
            currentTranslate = element.width + ((currentDistance / element.container.offsetWidth) * 100);
            element.container.style.cssText = `
            cursor: grabbing;
            transition-duration: 0s;
            transform: translateX(${currentTranslate}%)`
        }
    }
}

function end(element, ...methods) {
    return function() {
        if(isDragging) {
            isDragging = false;
            element.container.style.cursor = "grab";
        
            //right direction
            if(currentDistance < -100) {
                this.classList.remove("active");
                if(currentIndex < element.person.length - 1) {
                    element.person[currentIndex + 1].classList.add("active");
                    element.width = (currentIndex + 1) * element.initial;
                    element.container.style.cssText = `transform: translateX(${element.width}%)`
                }
                else {
                    element.container.style.cssText = `transform: translateX(${(element.person.length - 1) * element.initial}%)`
                }
            }
            //left direction
            else if(currentDistance > 100) {
                this.classList.remove("active");
                if(currentIndex > 0) {
                    element.person[currentIndex - 1].classList.add("active");
                    element.width = (currentIndex - 1) * element.initial;
                    element.container.style.cssText = `transform: translateX(${element.width}%)`
                }
                else {
                    element.container.style.cssText = `transform: translateX(0%)`
                }
            }
            //no direction detected
            else {
                element.container.style.cssText = `transform: translateX(${element.initial * currentIndex}%)`
            }
            //Check the bullets to active the wright one
            for(let method of methods) {
                method();
            }
            currentDistance = 0;
            currentTranslate = 0;
            currentIndex = 0;
        }
    }
}

function getPostion(event){
    //To detect the postion when touch events are used
    if(event.type.includes("touch")) {
        return event.touches[0].clientX;
    }
    //To detect the position when mouse events are used
    else {
        return event.pageX;
    }
}

function check() {
    teamPerson.forEach(function(person) {
        if(person.classList.contains("active")) {
            bulletsTestimonialSpans.forEach(function(span) {
                span.classList.remove("active");
                if(span.dataset.number === person.id) {
                    span.classList.add("active");
                }
            })
        }
    })
}

//Team member
let randomPerson;
setInterval(function() {
    randomPerson = Math.floor(Math.random() * team.person.length);  
    
    for(let i = 0; i < team.person.length; i++) {
        if(team.person[i].classList.contains("active")) {
            team.person[i].classList.remove("active");
            team.person[randomPerson].classList.add("active");
            team.width = team.initial * randomPerson;
            team.container.style.cssText = `transform: translateX(${team.width}%)`
            check();
            break;
        }
    }
}, timeInterval)

//Statis
let spanNumber = Array.from(document.querySelectorAll(".statis span"));
let statis = document.querySelector(".statis");
let speed = 200;
let target; 
let counter;
let increment;

function countStatis() {
    spanNumber.forEach(span => {
        let update = () => {
            target = span.dataset.goal; 
            counter = +span.textContent;
            increment = Math.ceil(target / speed); // calculate the increment that are requied to reatch to target at 200ms
            if (counter < target) {
                span.textContent = counter + increment;
                setTimeout(update, 1);
                // window.requestAnimationFrame(update)
            }
            else {
                span.textContent = target;
            } 
        }
        update();
        // window.requestAnimationFrame(update)
    })
}

let action = true; // to excuate the function inside it one time
window.addEventListener("scroll", function() {
    if(window.scrollY >= statis.offsetTop - 500 && action) {
        countStatis();
        action = false;
    }
})

/*End Team*/

/*Start Client*/
let clientsContainer = document.querySelector(".clients");
let clients = Array.from(document.querySelectorAll(".clients li"));
let links = Array.from(document.querySelectorAll(".clients li a"));
let swap = false;
let initialClient =  (clients[0].offsetWidth / clientsContainer.offsetWidth) * 100;
let clientWidth = 0;
let checkclients;

window.addEventListener("resize", function() {
    initialClient =  (clients[0].offsetWidth / clientsContainer.offsetWidth) * 100;
    clientNumber = (clients.length -  (100 / initialClient)) + 1;
})

clients.forEach(function(client, i) {
        //Stop drag effect
        client.addEventListener("dragstart", function(e) {
            e.preventDefault();
        })
    
        //Mouse event
        {
            client.addEventListener("mousedown", startClient(i));
            client.addEventListener("mousemove", moveClient);
            client.addEventListener("mouseup", endClient);
            client.addEventListener("mouseleave", endClient);
        }
    
        //Touch event
        {
            client.addEventListener("touchstart", startClient(i));
            client.addEventListener("touchmove", moveClient);
            client.addEventListener("touchend", endClient);
        }
})

//To stop opening link during swaping
function stopAction() {
    for(let link of links) {
        link.addEventListener("click", function(e) {
            e.preventDefault();
        })
    }
}

function startClient(i) {
    return function() {
        isDragging = true;
        currentIndex = i;
        startPosition = getPostion(event);
        clients[currentIndex].style.cursor = "grabbing";
    }
}

function moveClient() {
    if(isDragging) {
        currentDistance = getPostion(event) - startPosition;
        currentTranslate = clientWidth + ((currentDistance / clientsContainer.offsetWidth) * 100);
        clientsContainer.style.cssText = `
        cursor: grabbing;
        transition: 0s;
        transform: translateX(${currentTranslate}%)`
    }
}

function endClient() {
    if(isDragging) {
        isDragging = false;
        clients[currentIndex].style.cursor = "grab";
        checkclients = Math.round(-currentTranslate / initialClient);

        //right direction
        if(currentDistance < 0) {
            if(checkclients < clientNumber) {
                clientWidth = initialClient * -checkclients;
                clientsContainer.style.cssText = `transform: translateX(${clientWidth}%)`
            }
            else {
                clientWidth = initialClient * -(clientNumber - 1);
                clientsContainer.style.cssText = `transform: translateX(${clientWidth}%)`
            }
        }
        //left direction
        else if(currentDistance > 0) {
            if(checkclients > 0) {
                clientWidth = initialClient * -checkclients;
                clientsContainer.style.cssText = `transform: translateX(${clientWidth}%)`
            }
            else {
                clientWidth = initialClient * 0;
                clientsContainer.style.cssText = `transform: translateX(${clientWidth}%)`
            }
        }
        //no direction detected
        else {
            clientsContainer.style.cssText = `transform: translateX(${clientWidth}%)`
        }
        stopAction();
    }
}

let randomClient = 0;
let clientNumber = (clients.length -  (100 / initialClient)) + 1; 
setInterval(function() {
    clientWidth = randomClient * -initialClient;
    clientsContainer.style.cssText = `transform: translateX(${clientWidth}%)`;

    randomClient++;
    if(randomClient === clientNumber) {
        randomClient = 0;
    }
}, timeInterval)
/*End Client*/


//Footer
let dateNow = new Date()
let year = document.querySelector("footer .year");
year.textContent = dateNow.getFullYear();