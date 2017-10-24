(function () {
    var url = "http://bing.com/maps/default.aspx?cp=",
        button = document.querySelector("button"),
        output = document.querySelector("#output"),
        info = document.createElement("span"),
        link = document.createElement("a");

        info.classList.add("list-group-item");
        link.classList.add("badge", "badge-light");

    if(!navigator.geolocation) {
        info.classList.add("list-group-item-danger");
        info.textContent = "Brak wsparcia geolokalizacji";
    } else {
        info.classList.add("list-group-item-success");
        info.textContent = "Wykryto wsparcie geolokalizacji";
    }

    output.appendChild(info);

    function geoSuccess(pos){
        url += pos.coords.latitude + "~" + pos.coords.longitude;
        link.setAttribute("href", url);
        link.textContent = 'Otwórz mapę "Bing" z Twoja lokalizacja';

        output.appendChild(link);

    }

    function geoError(err) {
        var eMess = null;

        switch (err.code){
            case err.PERMISSION_DENIED :
                eMess = "Brak pozwolenia na znalezienie lokalizacji";
                break;
            case err.POSITION_UNAVALIBLE :
                eMess = "Brak dostępu do sieci";
                break;
            case err.TIMEOUT :
                eMess = "Przekroczono czas oczekiwania";
            break;
        }
        info.classList.add("list-group-item-danger");
        info.textContent = eMess;
    }

    button.onclick = function(){
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    };

})();