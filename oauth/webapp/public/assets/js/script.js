$(document).ready(function () {

    var _URL = {
        templates: '/templates',
        api: '/api',
    }

    var SimpleURL = function (url, search) {
        this.url = url;
        this.search = search;

        this.toString = function () {
            if (!this.search || this.search.length === 0) {
                return this.url
            }
            if (Array.isArray(this.search)) {
                return this.url + getQueryString(this.search)
            }
            if (typeof this.search === 'object') {
                var _params = [];
                var search = this.search;
                Object.keys(this.search).forEach(function (key) {
                    _params.push(key + '=' + search[key])
                })
                return this.url + getQueryString(_params)
            }
            return this.url + this.search;
        }

        function getQueryString(params) {
            return '?' + params.join("&")
        }
    }

    var UserAgentStorage = function (storage) {
        this.storage = storage;

        this.get = function (key) {
            return this.storage.getItem(key)
        };

        this.set = function (key, value) {
            this.storage.setItem(key, value)
        };

        this.remove = function (key) {
            this.storage.removeItem(key)
        }
    };

    var Storage = (function () {

        var storage = new UserAgentStorage(sessionStorage);

        var KEYS = {
            accessTokenAndUsername: "access-token-and-username"
        };

        function removeAccessToken() {
            storage.remove(KEYS.accessTokenAndUsername)
        }

        function getAccessTokenAndUsername() {
            var tokenAndUsername = storage.get(KEYS.accessTokenAndUsername)
            if (existsAccessTokenAndUsername(tokenAndUsername)) {
                tokenAndUsername = JSON.parse(tokenAndUsername);
                if (isValidAccessTokenAndUsername(tokenAndUsername)) {
                    return tokenAndUsername
                }
                removeAccessToken()
            }
        }

        function saveAccessTokenAndUsername(tokenAndUsername) {
            var exp = new Date(Date.now());
            var expiresInMilliseconds = tokenAndUsername.token.expires_in;
            exp.setMilliseconds(exp.getMilliseconds() + expiresInMilliseconds)
            tokenAndUsername.exp = exp.getTime();
            storage.set(KEYS.accessTokenAndUsername, JSON.stringify(tokenAndUsername))
        }

        function existsAccessTokenAndUsername(tokenAndUsername) {
            return tokenAndUsername !== null && tokenAndUsername !== undefined
        }

        function isValidAccessTokenAndUsername(tokenAndUsername) {
            if (!tokenAndUsername.exp || !tokenAndUsername.username || !tokenAndUsername.token) {
                return false
            }
            return Date.now() < tokenAndUsername.exp;
        }

        return {
            getAccessTokenAndUsername,
            saveAccessTokenAndUsername,
            removeAccessToken,
        }

    })();

    var General = (function () {

        var $_EL = {
            container: function () {
                return $('#container')
            },
        }

        function getClassNameIfElementHasClasses($element, classNames, classes) {
            if (!classes) {
                classes = []
            }
            classNames.split(' ').forEach(function (className) {
                if ($element.hasClass(className)) {
                    classes.push(className)
                }
            })
            return classes;
        }

        function stopSpinAll($form) {
            var $icons = $form.find('[data-enabled]');
            $.each($icons, function (index, icon) {
                var $icon = $(icon);
                stopSpin($icon.parent());
            })
        }

        function startSpinAll($form) {
            var $icons = $form.find('[data-enabled]');
            $.each($icons, function (index, icon) {
                var $icon = $(icon);
                startSpin($icon.parent());
            })
        }

        function stopSpin($control) {
            var $icon = $control.find('i');
            var classes = getClassNameIfElementHasClasses($icon, 'fa fa-fw');
            var enabledIconClassName = $icon.attr('data-enabled');
            if (enabledIconClassName !== undefined) {
                classes.push(enabledIconClassName)
            }
            if (classes.length > 0) {
                $icon.attr('class', classes.join(' '))
            }
            $control.prop("disabled", false);
        }

        function startSpin($control) {
            var $icon = $control.find('i');
            var classes = getClassNameIfElementHasClasses($icon, 'fa fa-fw');
            var disabledIconClassName = 'fa-spinner fa-pulse';
            if (disabledIconClassName !== undefined) {
                classes.push(disabledIconClassName)
            }
            if (classes.length > 0) {
                $icon.attr('class', classes.join(' '))
            }
            $control.prop("disabled", true);
        }

        function emptyContainer() {
            return $_EL.container().empty();
        }

        function loadTemplate($template) {
            emptyContainer().html($template);
            FetchHandler.hideCover();
        }

        function getUsername() {
            var tokenAndUsername = Storage.getAccessTokenAndUsername();
            if (!(!tokenAndUsername)) {
                return tokenAndUsername.username;
            }
        }

        function isValidUsername(username) {
            return username !== undefined && username === getUsername()
        }

        return {
            stopSpinAll,
            startSpinAll,
            stopSpin,
            startSpin,
            loadTemplate,
            emptyContainer,
            getUsername,
            isValidUsername,
        }

    })();

    var FetchUtils = (function () {



        function getJsonFetchHeaders(bearerToken) {
            var headers = {
                'Content-Type': 'application/json',
            };
            if (!bearerToken) {
                return headers
            }
            return addBearerTokenHeader(bearerToken, headers);
        }

        function getUrlEncodedFetchHeaders(bearerToken) {
            var headers = {
                'Conent-Type': 'application/x-www-form-urlencoded',
            }
            if (!bearerToken) {
                return headers
            }
            return addBearerTokenHeader(bearerToken, headers);
        }


        function addBearerTokenHeader(token, headers) {
            var bearerHeader = {
                'Bearer': token
            }
            if (!headers) {
                return bearerHeader
            }
            headers['Bearer'] = token;
            return headers;
        }

        function getJsonFetchOptions(method, payload) {
            var token = Storage.getAccessTokenAndUsername().token.access_token;
            var headers = getJsonFetchHeaders(token);
            return {
                method: method,
                headers,
                body: JSON.stringify(payload)
            }
        }

        function getFormOptions($form, payload) {
            var method = $form.attr('method');
            if (!method) {
                method = 'GET'
            };
            var options = {
                method,
                headers: getUrlEncodedFetchHeaders()
            }

            if (payload !== undefined) {
                options.body = payload;
            }
            return options;
        }

        function getFormUrl($form, parameters) {
            var url = $form.attr('action');
            if (!url) {
                return window.location.pathname
            }
            if (!parameters) {
                return url
            }
            url = new SimpleURL(url, parameters);
            return url.toString();
        }

        return {
            getJsonFetchHeaders,
            getUrlEncodedFetchHeaders,
            getJsonFetchOptions,
            getFormOptions,
            getFormUrl,
        }

    })();

    var FetchHandler = (function () {

        var $_EL = {
            cover: function () {
                return $('.fetch-cover')
            },
        }

        function parseJson(response) {
            return response.json();
        }

        function parseTemplate(json) {
            var templateBase64 = atob(json.template);
            return decodeURI(templateBase64);
        }

        function hideCover(callback) {
            $_EL.cover().fadeOut('fast', callback);
        }

        function showCover(callback) {
            $_EL.cover().fadeIn('fast', callback);
        }

        function loadPage(template, Page) {
            var $template = $(template);
            Page.load($template);
        }

        return {
            parseJson,
            parseTemplate,
            loadPage,
            showCover,
            hideCover,
        }

    })();

    var Fetch = (function () {

        var UrlApi = function (scope) {
            this.scope = scope;

            this.all = function () {
                return _URL.api + '/' + this.scope
            }

            this.one = function (id) {
                return this.all() + '/' + id
            }

        }

        var URL_API = {
            users: new UrlApi('users')
        }

        var get = {
            users: function (resolve) {
                fetch(URL_API.users.all())
                    .then(FetchHandler.parseJson)
                    .then(resolve)
                    .catch(console.error)
            },
            user: function (resolve, reject) {
                var username = General.getUsername();
                var url = URL_API.users.one(username);
                fetch(url)
                    .then(FetchHandler.parseJson)
                    .then(resolve)
                    .catch(reject);
            }
        };

        var put = {
            user: function (username, email, resolve, reject) {
                var url = URL_API.users.one(username);
                var options = FetchUtils.getJsonFetchOptions("PUT", { user: { name: username, email } });
                fetch(url, options)
                    .then(FetchHandler.parseJson)
                    .then(resolve)
                    .catch(reject)
            }
        }

        function loadPage(name, Page) {
            var _url = _URL.templates + '/' + name
            fetch(_url)
                .then(FetchHandler.parseJson)
                .then(FetchHandler.parseTemplate)
                .then(template => {
                    FetchHandler.loadPage(template, Page);
                })
                .catch(console.error)
        }

        function fetchForm(url, options, callback) {
            fetch(url, options)
                .then(FetchHandler.parseJson)
                .then(callback)
                .catch(console.error)
        }

        return {
            loadPage,
            get,
            put,
            fetchForm,
        }

    })();

    var Login = (function () {

        var $_EL = {
            form: function () {
                return $('#form-login');
            },
            buttonEdit: function () {
                return $_EL.form().find('.button-edit')
            },
            username: function () {
                return $('#username')
            },
            password: function () {
                return $('#password')
            }
        };

        var HANDLE = {
            fillUsernames: function (usernames) {
                var $username = $_EL.username();
                if (usernames !== undefined) {
                    usernames.forEach(function (username) {
                        var $option = $('<option>').val(username).text(username)
                        $username.append($option);
                    });
                    General.stopSpinAll($_EL.form());
                }
            },
            loginResponse: function (username, response) {
                if (response.access_token !== undefined) {
                    Storage.saveAccessTokenAndUsername({
                        username: username,
                        token: response,
                    });
                    App.init();
                }

            },
        };

        var eventListeners = {
            autoFillPassword: function (e) {
                var username = $_EL.username().val();
                $_EL.password().val(username);
            },
            authenticate: function (e) {
                e.preventDefault();
                General.startSpinAll($_EL.form());
                var username = $_EL.username().val();
                var password = $_EL.password().val();
                var parameters = {
                    username, password
                }
                var $form = $_EL.form();
                var url = FetchUtils.getFormUrl($form, parameters);
                var options = FetchUtils.getFormOptions($form);
                Fetch.fetchForm(url, options, HANDLE.loginResponse.bind(null, username));
            },
        };

        function addEventListeners() {
            $_EL.username().on("change", eventListeners.autoFillPassword);
            $_EL.form().on("submit", eventListeners.authenticate);
        }

        function load($template) {
            General.loadTemplate($template);
            Fetch.get.users(HANDLE.fillUsernames);
            addEventListeners();
        }

        return {
            load,
        }

    })();


    var Home = (function () {

        var $_EL = {
            formLogout: function () {
                return $('#form-logout')
            },
            formEditUser: function () {
                return $('#form-edit-user')
            },
            modal: function () {
                return $('#modal-edit-user')
            },
        };

        var HANDLE = {
            resolvedUserInfoResponse: function ($template, user) {
                $template.find(".username.text").text(user.name);
                $template.find(".email.text").text(user.email);
                $template.find(".username.value").val(user.name);
                $template.find(".email.value").val(user.email);
                General.loadTemplate($template);
                addEventListeners();
            },
            rejectedUserInfoResponse: function (err) {
                console.error(err);
                App.init();
            },
            resolvedUserUpdateResponse: function (user) {
                $(".email.text").text(user.email);
                $(".email.value").val(user.email);
                General.stopSpinAll($_EL.formEditUser());
                $_EL.modal().modal('hide');
            },
            rejectedUserUpdateResponse: function (err) {
                console.error(err)
            },
        };

        var eventListeners = {
            updateUser: function (e) {
                e.preventDefault();
                var $form = $(this);
                var username = $form.find('input[type="hidden"][name="username"]').val();
                if (General.isValidUsername(username) && $form[0].checkValidity()) {
                    var email = $form.find('input[name="email"]').val();
                    General.startSpinAll($form);
                    Fetch.put.user(username, email, HANDLE.resolvedUserUpdateResponse, HANDLE.rejectedUserUpdateResponse);
                }
            },
            performLogout: function (e) {
                e.preventDefault();
                Storage.removeAccessToken();
                App.init();
            },
        };

        function addEventListeners() {
            $_EL.formEditUser().on("submit", eventListeners.updateUser);
            $_EL.formLogout().on("submit", eventListeners.performLogout);
        }

        function load($template) {
            var tokenAndUsername = Storage.getAccessTokenAndUsername();
            if (!tokenAndUsername) {
                App.init()
            } else {
                Fetch.get.user(HANDLE.resolvedUserInfoResponse.bind(null, $template), HANDLE.rejectedUserInfoResponse);
            }
        }

        return {
            load
        }

    })();


    var App = (function () {

        function init() {
            General.emptyContainer();
            FetchHandler.showCover();
            var accessToken = Storage.getAccessTokenAndUsername();
            if (accessToken === null || !accessToken) {
                Fetch.loadPage('login', Login);
            } else {
                Fetch.loadPage('index', Home);
            }
        };

        return {
            init,
        }

    })();

    App.init();

})