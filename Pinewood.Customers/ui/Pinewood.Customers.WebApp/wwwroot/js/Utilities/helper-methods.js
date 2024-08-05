
//#region ERROR HANDLING

var handleErrors = function (data) {
    if (data.success)
        return;

    if (data.message) {
        showError(data.message);
    }
    else if (data.errors !== null && data.errors !== undefined && data.errors.length > 0) {
        for (i = 0; i < data.errors.length; i++) {
            showError(data.errors[i]);
        }
    }
}

var showError = function (msg) {
    //NEED TO BE RED TOASTR MESSAGE
    alert(msg);
}

//#endregion ERROR HANDLING
