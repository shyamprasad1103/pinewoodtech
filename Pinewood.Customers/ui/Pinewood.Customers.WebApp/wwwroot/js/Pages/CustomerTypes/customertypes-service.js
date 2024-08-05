
var CustomerTypeService = (function () {

    //#region main

    var get = function (enabledOnly) {
        $.ajax({
            type: 'GET',
            url: options.urls.usersBase + "/" + userKey + "/manage",
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

    var getResourceTypes = function (successHandler, errorHandler) {
        $.ajax({
            type: 'GET',
            url: options.urls.usersBase + "/newuser/manage/resourcetypes",
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

    var getProviders = function (successHandler, errorHandler) {
        $.ajax({
            type: 'GET',
            url: options.urls.usersBase + "/newuser/manage/providers",
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

    var getPermissionLevels = function (permissionKey, successHandler, errorHandler) {

        if ((typeof permissionKey) !== "string" || permissionKey === "") {
            console.error("The permissionKey cannot be invalid");
            return;
        }

        var url = ["/hub/api/v01/admin/permissions/", permissionKey, "/levels"].join('');

        $.ajax({
            url: url,
            type: 'GET',
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

    //#region user

    var getUser = function (userKey, successHandler, errorHandler) {
        $.ajax({
            type: 'GET',
            url: options.urls.usersBase + '/' + userKey,
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

    var createUser = function (postModel, successHandler, errorHandler) {
        $.ajax({
            type: 'POST',
            url: options.urls.usersBase,
            data: { postModel: postModel },
            traditional: false,
            async: false,
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

    var updateUser = function (postModel, successHandler, errorHandler) {
        $.ajax({
            type: 'PUT',
            url: options.urls.usersBase + '/' + postModel.UserKey,
            data: { postModel: postModel },
            traditional: false,
            async: false,
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

    //#region logins

    var getLogins = function (successHandler, errorHandler) {
        var url = options.urls.usersBase + '/' + contextData.userInfo.Key + '/logins';
        $.ajax({
            type: 'GET',
            url: url,
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

    var getLogin = function (successHandler, errorHandler) {
        var url = options.urls.usersBase + '/' + contextData.userInfo.Key + '/logins/' + postModel.LoginId;
        $.ajax({
            type: 'GET',
            url: url,
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

    var createLogin = function (postModel, successHandler, errorHandler) {
        var url = options.urls.usersBase + '/' + contextData.userInfo.Key + '/logins';
        $.ajax({
            type: 'POST',
            url: url,
            data: { postModel: postModel },
            traditional: false,
            async: false,
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

    var updateLogin = function (postModel, successHandler, errorHandler) {
        var url = options.urls.usersBase + '/' + contextData.userInfo.Key + '/logins/' + postModel.LoginId;
        $.ajax({
            type: 'PUT',
            url: url,
            data: { postModel: postModel },
            traditional: false,
            async: false,
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

    var deleteLogin = function (postModel, successHandler, errorHandler) {
        var url = options.urls.usersBase + '/' + contextData.userInfo.Key + '/logins/' + postModel.LoginId;
        $.ajax({
            type: 'DELETE',
            url: url,
            data: { postModel: postModel },
            traditional: false,
            async: false,
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

    var resetPassword = function (postModel, successHandler, errorHandler) {
        var url = options.urls.usersBase + '/' + contextData.userInfo.Key + '/logins/' + postModel.LoginId + '/resetpassword';
        $.ajax({
            type: 'POST',
            url: url,
            data: { postModel: postModel },
            traditional: false,
            async: false,
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

    return {
        //main info
        get: get,
        getResourceTypes: getResourceTypes,
        getProviders: getProviders,
        getPermissionLevels: getPermissionLevels,

        //user
        getUser: getUser,
        createUser: createUser,
        updateUser: updateUser,

        //logins
        getLogins: getLogins,
        getLogin: getLogin,
        createLogin: createLogin,
        updateLogin: updateLogin,
        deleteLogin: deleteLogin,
        resetPassword: resetPassword,

        //emails
        sendWelcomeEmail: sendWelcomeEmail,
        sendResetEmail: sendResetEmail,

        //view configs
        getViewConfigs: getViewConfigs,
        saveViewConfig: saveViewConfig,

        //roles
        getUserRoles: getUserRoles,
        updateUserRole: updateUserRole,
        removeUserRole: removeUserRole,

        //programmes
        getProgrammes: getProgrammes,
        updateUserProgramme: updateUserProgramme,
        removeUserProgramme: removeUserProgramme,

        //portfolios
        getPortfolios: getPortfolios,
        updateUserPortfolio: updateUserPortfolio,
        removeUserPortfolio: removeUserPortfolio,

        //ideas
        getIdeas: getIdeas,
        updateUserIdea: updateUserIdea,
        removeUserIdea: removeUserIdea,

        //tags
        getTags: getTags,
        updateUserTag: updateUserTag,
        removeUserTag: removeUserTag,

        //tasks
        queryPermissions: queryPermissions,
        queryIdentityTaskAccess: queryIdentityTaskAccess,
        cmdCreateIdentityTaskAccess: cmdCreateIdentityTaskAccess,
        cmdUpdateIdentityTasksAccess: cmdUpdateIdentityTasksAccess,
        cmdUpdateIdentityTaskAccess: cmdUpdateIdentityTaskAccess,
        cmdDeleteIdentityTaskAccess: cmdDeleteIdentityTaskAccess

    };
})();