// Gallery Js
var form = document.getElementById("dateForm");
var input = document.getElementById("dateInput");

var apod_image = document.getElementById("apodImage");

var grid_Item5 = document.getElementById("gridItem5");

var apod_desc = document.getElementById("apodDescPhoto");


if (apod_image !== null) {
    if (apod_image.complete) {
        apod_desc.style.left = (740 - apod_image.width) / 2 + 50 + "px";
        apod_desc.style.right = (740 - apod_image.width) / 2 + 50 + "px";
        grid_Item5.style.marginBottom = "125px";
        apod_desc.classList.remove("hidden");
    }
    else
    {
        apod_desc.classList.add("hidden");
        apod_image.addEventListener("load", function () {
            apod_desc.style.left = (740 - apod_image.width) / 2 + 50 + "px";
            apod_desc.style.right = (740 - apod_image.width) / 2 + 50 + "px";
            grid_Item5.style.marginBottom = "125px";
            apod_desc.classList.remove("hidden");
        })
    }
   
}
else {
    /*var apod_desc = document.getElementById("apodDescPhoto")*/

    if (grid_Item5 !== null) {
        grid_Item5.style.marginBottom = "300px";
    }

   /* apod_desc.classList.remove("hidden");*/
}

if (input !== null) {
    input.addEventListener("change", function () {
        form.submit();
    })
}

// End of Gallery Js

// NavBar Js
$(function () {
    var str = '#len'; //increment by 1 up to 1-nelemnts
    $(document).ready(function () {
        var i, stop;
        i = 1;
        stop = 4; //num elements
        setInterval(function() {
                if (i > stop) {
                    return;
                }
                $('#len' + (i++)).toggleClass('bounce');
            },
            500);
    });
});
// End of Navbar JS