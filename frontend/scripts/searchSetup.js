function cardSearchSetup() {
    const $searchBar = $("input[type=search]");
    $searchBar.on("change keyup paste search", function () {
        const value = $(this).val().toLowerCase();
        $(".nodes-container .row .node-card").filter(function () {
            const isAddNewCard = $(this).hasClass("node_new");
            if (isAddNewCard) return;
            if ($(this).find(".card-title").text().toLowerCase().indexOf(value) > -1) {
                $(this).fadeIn(400);
            } else {
                $(this).fadeOut(400);
            }
        })
    })
}


function subjectSearchSetup() {
    const $searchBar = $("input[type=search]");
    $searchBar.on("change keyup paste search", function () {
        console.log("TEST");
        const value = $(this).val().toLowerCase();
        $(".subjects-container .row .subject-card").filter(function () {
            if ($(this).find(".card-title").text().toLowerCase().indexOf(value) > -1) {
                $(this).fadeIn(400);
            } else {
                $(this).fadeOut(400);
            }
        })
    })
}