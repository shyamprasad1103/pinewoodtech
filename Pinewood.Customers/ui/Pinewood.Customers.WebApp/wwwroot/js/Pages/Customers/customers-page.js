
var CustomersPageComponent = (function () {

    //#region componant options and data

    let options = {
        urls: {
            apiBase: "",
            customers: "api/customers"
        },
        selectors: {
            dataContainer: ""
        }
    }

    let customers = [];

    //#endregion

    //#region serices

    let getAllCustomers = function (enabledOnly, successHandler, errorHandler) {
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

        getAllCustomers(true,
            function (data, textStatus, xhr) {
                if (data.success) {
                    customers = data.result;
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
        var dataSet = [];

        // Populate dataSet with customer data
        $.each(customers, function (key, value) {
            dataSet.push([value.title, value.firstName, value.lastName]);
        });

        // Get the data container
        var dataContainer = $(options.selectors.dataContainer);

        // Initialize DataTable with the new data
        (dataContainer).DataTable({
            data: dataSet,
            columns: [
                { title: "Title" },
                { title: "First Name" },
                { title: "Last Name" }
            ]
        });
    }

    //let renderData = function () {
    //    //$(options.selectors.dataContainer).text(JSON.stringify(customers));
    //    var dataSet = [];
    //    $.each(customers, function (key, value) {
    //        dataSet.push([value.title, value.firstName, value.lastName])
    //    });
    //    $(options.selectors.dataContainer).DataTable({
    //        data: dataSet,
    //        columns: [
    //            { title: "Title" },
    //            { title: "First Name" },
    //            { title: "Last Name" }
    //        ]
    //    });
    //}

    //NEED TO ADD TEMPLATES FOR GRID TO DISPLAY, CREATE, MODIFY AND DELETE

    return { init: init }
})();

