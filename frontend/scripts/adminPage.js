function submitNewUserForm() {
    $("#addUserModal").find("form").trigger("submit");
}


$(function () {
    $("#addUserModal")
        .find(".form-post").on("click", submitNewUserForm)
});