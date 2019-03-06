$(document).ready(function() {
    for (let i = 0; i < 31; i++) {
        $('#'+i).click(function() {
            //window.document.location = "/day";
            window.document.location = "/day?date=" + this.getAttribute("value") + "&day=" + i;
        });
    }
});
