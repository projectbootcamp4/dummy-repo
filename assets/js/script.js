/* Login and Register Buttons */

document.getElementById("reg-button").addEventListener('click', function () {
    tab("register", "login", "name")
})

document.getElementById("login-button").addEventListener('click', function () {
    tab("login", "register", "user")
})

function tab (show, hide, focus){
    document.getElementById(show).style.display = "block"
    document.getElementById(focus).focus()
    document.getElementById(hide).style.display = "none"
}

/*  Cookies  /*
*    Create cookies:
*        document.cookie = "user=username"
*/

function setCookie(nameCookie, valueCookie, expireDays) {
    var date = new Date()
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000))
    var expire = "expire=" + date.toUTCString()
    document.cookie = nameCookie + "=" + valueCookie + ";" + expire + ";path=/"
    console.log("%cCookies created!", 'background: #222; color: white')
}

function getCookie(nameCookie) {
    var name = nameCookie + "="
    var cookieDecoded = decodeURIComponent(document.cookie)
    var arrayCookie = cookieDecoded.split(';')
    for (var i = 0; i < arrayCookie.length; i++) {
        var cookie = arrayCookie[i]
        while (cookie.charAt(0) == ' ')
            cookie = cookie.substring(1)
        if (cookie.indexOf(name) == 0){
            console.log("Cookie does exist.", 'background: #222; color: green')
            return cookie.substring(name.length, cookie.length)
        }
    }
    console.log("%cCookie does NOT exists.", 'background: #222; color: red')
    return  null
}

function checkCookie() {
    if (getCookie("userSession"))
        return (1)
    return(0)
}

/* Active session */

window.onload = function () {

    if (checkCookie()){
    tab("login", "register", "user")
    document.getElementById("logout-button").style.display = ""
    document.getElementById("reg-button").style.display = "none"
    document.getElementById("login-button").style.display = "none"
    document.getElementById("again").style.display = ""
    document.getElementById("incorrect").style.display = "none"
    document.getElementById("correct").style.display = "none"
    }
}

/* Submit and Authentication */

function get_submit(){
    e.preventDefault()
}

document.getElementById("sign").addEventListener('click', function () {
    var pass = document.getElementById("passwd").value
    var passC = document.getElementById("passwdConfirm").value
    var name = document.getElementById("name").value
    var surname = document.getElementById("surname").value

    if (pass == passC && pass != "" && pass != "" && name != "" && surname != "")
    {
        setCookie("contact", document.getElementById("contact").value, 1)
        setCookie("pass", pass, 1)
        document.getElementById("incorrectPass").style.display = "none"
        tab("login", "register", "user")
        console.log(document.cookie)
        console.log("Cookies added")
    }
})

document.getElementById("log").addEventListener('click', function () {

    var userSession = document.getElementById("user").value
    var passSession = document.getElementById("pass").value
    console.log(userSession)
    console.log(passSession)
 
    if (userSession == getCookie("contact") && passSession == getCookie("pass")){
        document.getElementById("correct").style.display = ""
        document.getElementById("incorrect").style.display = "none"
        document.getElementById("logout-button").style.display = ""
        document.getElementById("reg-button").style.display = "none"
        document.getElementById("login-button").style.display = "none"
        console.log("user correct")
        setCookie("userSession", userSession, 0.041667)
        setCookie("passSession", passSession, 0.041667)
        console.log("%cSession Created! Cookies lasts for 1h.", 'background: #222; color: green')
    }
    else {
        document.getElementById("incorrect").style.display = "block"
        document.getElementById("correct").style.display = "none"
        document.getElementById("logout-button").style.display = "none"
        document.getElementById("reg-button").style.display = ""
        document.getElementById("login-button").style.display = ""
        console.log("user incorrect")
    }
    console.log(document.cookie)
    console.log("Cookie checked")
})

/* Clearing the cookies */

function delete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log("%cCookies Deleted!.", 'background: #222; color: orange')
}

document.getElementById("logout-button").addEventListener('click', function () {
    delete_cookie("userSession")
    delete_cookie("passSession")
    location.reload()
})



/* Show password */

function showPasswd(field1, field2) {
    var show = document.getElementById(field1)
    var show2 = document.getElementById(field2)

    if (show.type == "password") {
        show.type = "text"
        if (show2)
            show2.type = "text"
    } else {
        show.type = "password"
        if (show2)
            show2.type = "password"
    }
}

/* Validation alerts */

var myInput = document.getElementById("passwd");
var myInput2 = document.getElementById("passwdConfirm");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var match = document.getElementById("match");

myInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
  }

myInput2.onfocus = function() {
document.getElementById("message").style.display = "block";
}

myInput.onkeyup = function (){
    validate()
}

myInput2.onkeyup = function (){
    validate()
}

/* Validate the user inputs */

function validate() {

    var lowerCaseLetters = /[a-z]/g;
    if(myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
  }

    var upperCaseLetters = /[A-Z]/g;
    if(myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    var numbers = /[0-9]/g;
    if(myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    if(myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }

    if (myInput.value == myInput2.value && (myInput.value != "" && myInput2.value != "" )){
        match.classList.remove("invalid");
        match.classList.add("valid");
    } else {
        match.classList.remove("valid");
        match.classList.add("invalid");
    }

    if (letter.classList.value == "valid" &&
    capital.classList.value == "valid" &&
    number.classList.value == "valid" &&
    length.classList.value == "valid" &&
    match.classList.value == "valid")
        document.getElementById("message").style.display = "none";
  }