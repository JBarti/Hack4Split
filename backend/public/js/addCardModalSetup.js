function triggerFileInput() {
    const $newFileInput = $($.parseHTML(fileInputTemplate));
    const $fileInputGroup = $(".file-input-group");
    $fileInputGroup.append($newFileInput);
    let currentIndex = $(this).data("currentIndex");
    $newFileInput
        .attr("data-file-index", currentIndex)
        .attr("name", `image-${currentIndex}`)
        .on("change", fileInputChange)
        .trigger("click");


    $(this).data({"currentIndex": currentIndex + 1});
    $fileInputGroup.find("input[type=file]").filter(function () {
        if ($(this)[0] === $newFileInput[0]) return;
        if (!$(this).val()) $(this).remove();
    });
}


function removeFile(dataFileIndex) {
    return function () {
        $(`div[data-file-index=${dataFileIndex}]`).remove();
        $(`input[data-file-index=${dataFileIndex}]`).remove();
    }
}


function fileInputChange() {
    const $filePreview = $($.parseHTML(filePreviewTemplate));
    const dataFileIndex = $(this).attr("data-file-index");
    const file = $(this)[0].files[0];
    $filePreview
        .attr("data-file-index", dataFileIndex)
        .find(".file-name").text(file.name);
    $filePreview.find(".file-remove").on("click", removeFile(dataFileIndex));
    $(".file-previews").append($filePreview);
}


function submitNewCardForm() {
    const $addCardModal = $("#addCardModal");
    const $fileInputGroup = $addCardModal.find(".file-input-group");
    $fileInputGroup.find("input[type=file]").filter(function () {
        if (!$(this).val()) $(this).remove();
    });
    $addCardModal.find("form").trigger("submit");

}

function addCardModalSetup() {
    const $addCardModal = $("#addCardModal");
    $addCardModal.find(".file-input-trigger")
        .on("click", triggerFileInput)
        .data({"currentIndex": 0});
    $addCardModal.find(".file-input")
        .on("change", fileInputChange);
    $addCardModal.find(".form-post")
        .on("click", submitNewCardForm);
}
