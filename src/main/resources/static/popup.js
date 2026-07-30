function showPopup(type,title,message){

    const overlay =
    document.getElementById("popupOverlay");

    const icon =
    document.getElementById("popupIcon");

    document.getElementById("popupTitle")
    .innerText = title;

    document.getElementById("popupMessage")
    .innerText = message;

    if(type=="success"){

        icon.innerHTML="✔";

        icon.style.background="#7AC943";

    }

    else if(type=="error"){

        icon.innerHTML="✖";

        icon.style.background="#E53935";

    }

    else if(type=="warning"){

        icon.innerHTML="!";

        icon.style.background="#F4B400";

    }

    else{

        icon.innerHTML="ℹ";

        icon.style.background="#11B5D8";

    }

    overlay.style.display="flex";

}

function closePopup(){

    document
    .getElementById("popupOverlay")
    .style.display="none";

}