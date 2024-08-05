
var CustomersPageComponent = (function () {

    //#region componant options and data

    let options = {
        urls: {
            apiBase: "",
            customers: "api/customers",
            customerTypes: "api/customertypes"
        },
        selectors: {
            dataContainer: ""
        }
    }



    // External list of dropdown options
    const titleOptions = ['Mr', 'Mrs', 'Miss', 'Dr', 'Sir'];
    let customerTypes = [];
    let customers = [];

    //#endregion

    //#region serices

    let getAllCustomerTypes = function (enabledOnly, successHandler, errorHandler) {
        $.ajax({
            type: 'GET',
            url: options.urls.apiBase + options.urls.customerTypes + '?enabledOnly=' + enabledOnly,
            async: false,
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
        debugger;
        getAllCustomerTypes(false,
            function (data, textStatus, xhr) {
                if (data.success) {
                    customerTypes = data.result;
                    fetchComponentData();
                }
                else {
                    handleErrors(data);
                }
            },
            function (data, textStatus, xhr) {
                handleErrors(data);
            }
        );
    }

    let fetchComponentData = function () {

        getAllCustomers(false,
            function (data, textStatus, xhr) {
                if (data.success) {
                    customers = data.result;
                    renderComponentData();
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

    let renderComponentData = function () {

        var dataSet = [];

        // Populate dataSet with customer data
        let editAct = '<button class="btn btn-sm btn-warning edit-btn">Edit</button>';
        let saveAct = '<span class="btn btn-sm btn-success save-btn" style="display:none;">Save</span>'
        let delAct = '<button class="btn btn-sm btn-danger del-btn">Delete</button>';
        let actions = editAct + saveAct + " " + delAct;

        $.each(customers, function (key, value) {
            dataSet.push([
                value.typeId,
                value.title,
                value.firstName,
                value.lastName,
                value.email,
                value.mobilePhone,
                value.isDisabled,
                value.isLocked,
                actions
            ]);
        });

        console.log(customers);

        const table =  new DataTable(options.selectors.dataContainer, {
            data: customers,
            columns: [
                {
                    data: 'typeId',
                    title: 'Type',
                    render: function (data, type, row) {
                        return renderCustomerTypesDropdown(data);
                    }
                },
                {
                    data: 'title',
                    title: 'Title',
                    render: function (data, type, row) {
                        return renderTitleDropdown(data);
                    }
                },
                { data: 'firstName', title: 'First Name' },
                { data: 'lastName', title: 'Last Name' },
                { data: 'email', title: 'Email' },
                { data: 'mobilePhone', title: 'Mobile Phone', },
                {
                    data: 'isDisabled',
                    title: 'Disabled',
                    render: function (data, type, row) {
                        return '<input type="checkbox" class="active-checkbox" ' + (data ? 'checked' : '') + '>';
                    }
                },
                {
                    data: 'isLocked',
                    title: 'Locked',
                    render: function (data, type, row) {
                        return '<input type="checkbox" class="active-checkbox" ' + (data ? 'checked' : '') + '>';
                    }

                },
                {
                    data: null,
                    title: 'Actions',
                    defaultContent: actions,
                    orderable: false

                }
            ]
        });

        $(options.selectors.dataContainer + ' tbody').on('click', '.edit-btn', function () {
            let row = $(this).closest('tr');
            makeRowEditable(row);
        });

        $(options.selectors.dataContainer + ' tbody').on('click', '.save-btn', function () {
            let row = $(this).closest('tr');
            saveRowData(row, table);
        });

        //render customertpes as dropdown
        function renderCustomerTypesDropdown(selectedValue) {
            let dropdownHtml = '<select class="type-dropdown">';
            customerTypes.forEach(option => {
                dropdownHtml += `<option value="${option}" ${selectedValue === option.id ? 'selected' : ''}>${option.name}</option>`;
            });
            dropdownHtml += '</select>';
            return dropdownHtml;
        }

        //render titles as dropdown
        function renderTitleDropdown(selectedValue) {
            debugger;
            let dropdownHtml = '<select class="status-dropdown">';
            titleOptions.forEach(option => {
                dropdownHtml += `<option value="${option}" ${selectedValue === option ? 'selected' : ''}>${option}</option>`;
            });
            dropdownHtml += '</select>';
            return dropdownHtml;
        }

        //make a row editable
        function makeRowEditable(row) {
            row.find('td').each(function (index, td) {
                if (index === 0) {
                    let currentValue = $(td).find('select').val();
                    $(td).html(renderCustomerTypesDropdown(currentValue));
                } else if (index === 1) {
                    let currentValue = $(td).find('select').val();
                    $(td).html(renderTitleDropdown(currentValue));
                } else if (index === 6 || index === 7) {
                    let checked = $(td).find('input[type="checkbox"]').is(':checked');
                    $(td).html(`<input type="checkbox" ${checked ? 'checked' : ''}>`);
                } else if (index !== 8) {
                    let currentValue = $(td).text();
                    $(td).html(`<input type="text" class="edit-name" value="${currentValue}">`);
                }
            });
            row.find('.edit-btn').hide();
            row.find('.save-btn').show();
        }

        // save a row's data
        function saveRowData(row, table) {
            let rowData = {};
            row.find('td').each(function (index, td) {
                if (index === 0) {
                    rowData.typeId = $(td).find('select').val();
                    $(td).html(renderCustomerTypesDropdown(rowData.typeId));
                } else if (index === 1) {
                    rowData.title = $(td).find('select').val();
                    $(td).html(renderTitleDropdown(rowData.title));
                } else if (index === 6 ) {
                    rowData.isDisabled = $(td).find('input[type="checkbox"]').is(':checked');
                    $(td).html(`<input type="checkbox" ${rowData.isDisabled ? 'checked' : ''}>`);
                } else if (index === 7) {
                    rowData.isLocked = $(td).find('input[type="checkbox"]').is(':checked');
                    $(td).html(`<input type="checkbox" ${rowData.isLocked ? 'checked' : ''}>`);
                } else if (index !== 8) {
                    rowData.name = $(td).find('input[type="text"]').val();
                    $(td).text(rowData.name);
                }
            });
            table.row(row).data(rowData).invalidate();
            row.find('.save-btn').hide();
            row.find('.edit-btn').show();
        }
    }

    return { init: init }
})();

