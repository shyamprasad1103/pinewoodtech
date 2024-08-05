
var CustomerTypesPageComponent = (function () {

    //#region componant options and data

    let options = {
        urls: {
            apiBase: "",
            customers: "api/customertypes"
        },
        selectors: {
            dataContainer: ""
        }
    }

    let customerTypes = [];

    //#endregion

    //#region serices

    let getAllCustomerTypes = function (enabledOnly, successHandler, errorHandler) {
        $.ajax({
            type: 'GET',
            url: options.urls.apiBase + options.urls.customers + '?enabledOnly=' + enabledOnly,
            traditional: true,
            async: true,
            cache: false,
            success: function (data, textStatus, xhr) {
                if (typeof successHandler === 'function') {
                    successHandler(data, textStatus, xhr);
                }
            },
            error: function (data, status, xhr) {
                if (typeof errorHandler === 'function') {
                    errorHandler(data, status, xhr);
                }
            }
        });
    };

    //#endregion

    var init = function (apiBaseUrl, dataContainerId) {
        options.urls.apiBase = apiBaseUrl;
        options.selectors.dataContainer = dataContainerId;
        fetchData();
    }

    let fetchData = function () {

        getAllCustomerTypes(true,
            function (data, textStatus, xhr) {
                if (data.success) {
                    customerTypes = data.result;
                    renderData();
                }
                else {
                    handleErrors(data);
                }
            },
            function (data, textStatus, xhr) {
                handleErrors(data);
            }
        );
    };

    let renderData = function () {
        $(options.selectors.dataContainer).text(JSON.stringify(customerTypes));
    }

    //NEED TO ADD TEMPLATES FOR GRID TO DISPLAY, CREATE, MODIFY AND DELETE

    return { init: init }
})();

