
var CustomerTypesPageComponent = (function () {

    //#region componant options and data

    let _options = {
        urls: {
            apiBase: "",
            customerTypes: "api/customertypes"
        },
        dom: {
            ids: {
                componentContainer: 'customertypes-component-container',
                customerTypesListContainer: 'customertypes-list-container',
                customerTypeNameTxt: 'customertype-name-txt',
                customerTypeDescTxt: 'customertype-desc-txt',
                customerTypeActiveChk: 'customertype-active-chk',
                createBtn: 'create-btn',
                editBtn: 'edit-btn',
                deleteBtn: 'delete-btn',
                popupSaveBtn: 'popup-save-btn'

            },
            attr: {
                itemRow: 'item-row'
            },
            classes: {
                nameSpn: 'name-spn',
                descSpn: 'desc-spn',
                activeSpn: 'desc-spn',
                nameBox: 'name-txt',
                descBox: 'desc-txt',
                activeChk: 'active-chk',
                customerTypeDescTxt: 'customertype-desc-txt',
                editMode: 'edit-mode'
            }
        },
        templates: {
            componentTemplate: 'component-template',
            tableTemplate: 'table-template',
            rowTemplate: 'row-template',
            popupTemplate: 'popup-model-template'
        }
    };

    let _data = {
        customerTypes: [],
        selecteditem: null
    };

    let templates = {
        componentTemplate: null,
        tableTemplate: null,
        rowTemplate: null,
        popupTemplate: null
    };

    //#endregion componant options and data

    //#region fetch and render content
    let init = function (apiBaseUrl) {

        _options.urls.apiBase = apiBaseUrl;

        templates.componentTemplate = Handlebars.compile(document.getElementById(_options.templates.componentTemplate).innerHTML);
        templates.tableTemplate = Handlebars.compile(document.getElementById(_options.templates.tableTemplate).innerHTML);
        templates.rowTemplate = Handlebars.compile(document.getElementById(_options.templates.rowTemplate).innerHTML);
        templates.popupTemplate = Handlebars.compile(document.getElementById(_options.templates.popupTemplate).innerHTML);

        let componentContainer = $('#' + _options.dom.ids.componentContainer);
        componentContainer.empty();
        componentContainer.append(templates.componentTemplate({ options: _options }));

        $('#' + _options.dom.ids.createBtn).click(onCreateBtnClick);
        $('#' + _options.dom.ids.editBtn).click(onEditBtnClick);
        $('#' + _options.dom.ids.deleteBtn).click(onDeleteBtnClick);

        $.ajax({
            type: 'GET',
            url: _options.urls.apiBase + _options.urls.customerTypes + '?enabledOnly=false',
            contentType: 'application/json',
            success: function (data, status, xhr) {
                _data.customerTypes = data.result;
                renderList();
            },
            error: function (data, status, xhr) {
                _data.customerTypes = [];
                renderList();
            }
        });

    };

    let renderList = function () {
        let componentContainer = $('#' + _options.dom.ids.componentContainer);
        let result = templates.tableTemplate({ options: _options, customerTypes: _data.customerTypes });
        componentContainer.append(result);
        console.log(_data.customerTypes);
        $('#' + _options.dom.ids.customerTypesListContainer).on('click', 'tr', onRowSelection);

        let listContainer = $('#' + _options.dom.ids.customerTypesListContainer);
        $.each(_data.customerTypes, function (idx, item) {
            renderListItem(item, listContainer)
        });

    }

    let renderListItem = function (item, listContainer) {
        debugger;
        if (listContainer == null || listContainer == undefined)
            listContainer = $('#' + _options.dom.ids.customerTypesListContainer);

        $(listContainer).append(templates.rowTemplate({ options: _options, customerType: item }));

        let row = $(listContainer).find("tr").last();
    };

    //#endregion fetch and render content

    //#region event handlers

    let onRowSelection = function () {
        let row = $(this).closest('tr');
        row.addClass('highlight').siblings().removeClass('highlight');
        let id = parseInt(row.attr(_options.dom.attr.itemRow));
        _data.selecteditem = getItemFromList(id);
        if (_data.selecteditem !== null && _data.selecteditem !== undefined) {
            $('.' + _options.dom.classes.editMode).removeClass('disabled');
        }
        else {
            $('.' + _options.dom.classes.editMode).addClass('disabled');
        }
    };

    let onCreateBtnClick = function () {
        let tempModel = {
            options: _options,
            header: "Create Customer Type",
            name: '',
            description: '',
            active: true,
            saveBtnTxt: 'Create'
        };

        $('#model-container').html(templates.popupTemplate(tempModel))
        $('#popupModal').modal('show');
        $('#' + _options.dom.ids.popupSaveBtn).click(createItem);
    };

    let onEditBtnClick = function () {
        if (_data.selecteditem === null || _data.selecteditem === undefined) {
            return;
        };

        let tempModel = {
            options: _options,
            header: "Update Customer Type",
            name: _data.selecteditem.name,
            description: _data.selecteditem.description,
            active: !_data.selecteditem.isDisabled,
            saveBtnTxt: 'Update'
        };

        $('#model-container').html(templates.popupTemplate(tempModel))
        $('#popupModal').modal('show');
        $('#' + _options.dom.ids.popupSaveBtn).click(updateItem);
    };

    let onDeleteBtnClick = function () {
        if (_data.selecteditem === null || _data.selecteditem === undefined) {
            return;
        };

        let row = $(this).closest('tr');
        deleteItem(_data.selecteditem.id
            , function () {
                deleteItemSuccess(_data.selecteditem.id);
            });
    };

    //#endregion event handlers

    //#region event handlers
    let createItem = function () {
        let name = $('#' + _options.dom.ids.customerTypeNameTxt).val();
        let desc = $('#' + _options.dom.ids.customerTypeDescTxt).val();
        let active = $('#' + _options.dom.ids.customerTypeActiveChk).is(':checked');

        let postModel = {
            Id: 0,
            Name: name,
            Description: desc,
            IsDisabled: !active,
            OrderIndex: _data.customerTypes.length + 1
        };

        $.ajax({
            type: 'POST',
            url: _options.urls.apiBase + _options.urls.customerTypes,
            data: { model: postModel },
            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status, xhr) {
                createItemSuccess(data.result);
            },
            error: function (data, status, xhr) {
                alert('error on post')
                closeModal();
            }
        });
    };

    let updateItem = function () {
        debugger;
        let name = $('#' + _options.dom.ids.customerTypeNameTxt).val();
        let description = $('#' + _options.dom.ids.customerTypeDescTxt).val();
        let active = $('#' + _options.dom.ids.customerTypeActiveChk).is(':checked');

        let postModel = {
            Id: _data.selecteditem.id,
            Name: name,
            Description: description,
            IsDisabled: !active,
            OrderIndex: _data.selecteditem.orderIndex
        };

        $.ajax({
            type: 'PUT',
            url: _options.urls.apiBase + _options.urls.customerTypes + '/' + _data.selecteditem.id,
            data: { model: postModel },
            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status, xhr) {
                updateItemSuccess(data.result);
            },
            error: function (data, status, xhr) {
                closeModal();
            }
        });
    };

    let deleteItem = function (id, onSuccess) {
        $.ajax({
            type: 'DELETE',
            url: _options.urls.apiBase + _options.urls.customerTypes + '/' + id,
            success: onSuccess,
            error: function (data, status, xhr) {
                alert('delete error')
            }
        });
    };

    //#endregion event handlers

    //#region helpers
    let getItemFromList = function (id) {
        let result = null;
        $.each(_data.customerTypes, function (idx, item) {
            if (item.id === id) {
                result = item;
                return false;
            }
        });

        return result;
    };

    let createItemSuccess = function (createdItem) {

        _data.customerTypes.push(createdItem);
        renderListItem(createdItem);
        closeModal();
        showMessage();
    };

    let updateItemSuccess = function (updatedItem) {

        _data.selecteditem = updatedItem;

        $.each(_data.customerTypes, function (idx, item) {
            if (item.id === updatedItem.id) {
                _data.customerTypes[idx] = updatedItem;
                return false;
            }
        });
        debugger;
        let activeText = updatedItem.isDisabled ? 'No' : 'Yes';
        let row = $('[' + _options.dom.attr.itemRow + '="' + updatedItem.id + '"]');
        row.find("." + _options.dom.classes.nameSpn).html(updatedItem.name);
        row.find("." + _options.dom.classes.descSpn).html(updatedItem.description);
        row.find("." + _options.dom.classes.activeSpn).html(activeText);

        closeModal();
        showMessage();

    };

    let deleteItemSuccess = function (id) {

        _data.selecteditem = null;
        $.each(_data.customerTypes, function (idx, item) {
            if (item.id === id) {
                return false;
            }
        });

        $('[' + _options.dom.attr.itemRow + '="' + id + '"]').remove();

        showMessage();
    };

    //#endregion helpers

    return { init: init }
})();

