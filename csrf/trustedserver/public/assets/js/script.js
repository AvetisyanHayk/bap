$(document).ready(function () {

    var Login = (function () {

        var $_EL = {
            form: function () {
                return $('#form-login');
            },
            username: function () {
                return $('#username')
            },
            password: function () {
                return $('#password')
            }
        };

        var eventListeners = {
            autoFillPassword: function (e) {
                var username = $_EL.username().val();
                $_EL.password().val(username);
            }
        };

        function addEventListeners() {
            $_EL.username().on("change", eventListeners.autoFillPassword);
        }

        function isLoginPage() {
            return $_EL.form().length !== 0
        }

        (function init() {
            if (isLoginPage()) {
                addEventListeners();
            }
        })();

    })();

})