function enablePwdChange(e) {
   $("#user-password").attr("disabled", false);
   $(".pwd-change-submit").fadeIn(300);
   e.preventDefault();
}

$(function() {
   cardSearchSetup();
   $(".pwd-change").on("click", enablePwdChange)
});