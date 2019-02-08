
// CUSTOM DROPDOWN

var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select-dropdown":*/
x = document.getElementsByClassName("custom-select-dropdown");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);


// Scroll

$(".contact-link").on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: ($('#contact-us').offset().top)
  }, 1000);
  $('.mobile-menu').addClass('display-0');
});

$(".appointment-link").click(function() {
  $('html, body').animate({
      scrollTop: $("#appointment").offset().top
  }, 1000);
  $('.mobile-menu').addClass('display-0');
});


// Navbar Toggle

$('#nav-toggle').click(function(){
  $('.mobile-menu').removeClass('display-0');
});

$('#close-toggle').click(function(){
  $('.mobile-menu').addClass('display-0');
});


function validateAppointment() {
  bool = false;

  var name = document.forms["appointment-form"]["name"].value;
  if (name == "") {
      $('#name-err').html('<p class="error-msg">The name field is required.</p>');
      bool = true;
  }
  else{
    $('#name-err').html('');
  }

  var email = document.forms["appointment-form"]["email"].value;
  if (email == "") {
    $('#email-err').html('<p class="error-msg">The email field is required.</p>');
    bool = true;
  }
  else if(email != ""){
    var re = /\S+@\S+\.\S+/;
    res = re.test(email);
    if(!res)
    {
      $('#email-err').html('<p class="error-msg">The email must be a valid email address.</p>');
      bool = true;
    }
    else{
      $('#email-err').html('');
    }
  }
  else{
    $('#email-err').html('');
  }

  var contact = document.forms["appointment-form"]["contact"].value;
  if (contact == "") {
    $('#contact-err').html('<p class="error-msg">The contact field is required.</p>');
    bool = true;
  }
  else{
    $('#contact-err').html('');
  }

  if(bool == true)
  {
    return false;
  }
}

function isNumber(evt) {
  var iKeyCode = (evt.which) ? evt.which : evt.keyCode
  if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
      return false;

  return true;
}    