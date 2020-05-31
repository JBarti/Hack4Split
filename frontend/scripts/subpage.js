function getMapData() {
    return {
        id: 0,
        title: "Name of the diagram",
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure saepe molestiae libero nostrum suscipit blanditiis qui consequatur eum, impedit voluptatibus id quidem eius iusto exercitationem voluptatem, cumque deleniti tenetur ducimus ut ipsa cupiditate officia repellendus accusantium. Doloremque possimus veritatis consequatur?`,
        images: ["https://picsum.photos/400/300?random=1", "https://picsum.photos/400/300?random=2"],
        nodes: [
            {
                id: 1,
                title: "Name of node 1",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                images: ["https://picsum.photos/400/300?random=3"],
                nodes: [
                    {
                        id: 3,
                        title: "Name of inner node 3",
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                        images: ["https://picsum.photos/400/300?random=4"],
                        nodes: [],
                    }
                ]
            },
            {
                id: 2,
                title: "Name of node 2",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                images: ["https://picsum.photos/400/300?random=5"],
                nodes: [
                    {
                        id: 4,
                        title: "Name of node 4",
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                        images: ["https://picsum.photos/400/300?random=6"],
                        nodes: [],
                    }
                ]
            }
        ]
    }
}

FILE_COUNTER = 0;

function createNodeCard({id, title, text, images, nodes}) {
    let $nodeCard = $($.parseHTML(nodeCardTemplate));
    $nodeCard.find("img").attr("src", images[0]);
    $nodeCard.find(".card-title").text(title);
    $nodeCard.find(".card-text").text(text);
    $nodeCard.data({"self": {id, title, text, images, nodes}});

    $nodeCard.find(".node-visit").on("click", () => {
        displayCard({id, title, text, images, nodes});
    });
    return $nodeCard;
}


function updateSlideshow(imageUrls) {
    $(".carousel-inner").children().remove();
    imageUrls.forEach((url, index) => {
        const slide = $(($.parseHTML(slideTemplate)));
        slide.find("img").attr("src", url);
        if (!index) slide.addClass("active");
        $(".carousel-inner").append(slide);
    })
}


function clearOldNodeCards() {
    const $nodesRow = $(".nodes-container").find(".row");
    $nodesRow.find(".node-card:not(:last-child)").remove();
}


function breadcrumbClick() {
    const $breadcrumbs = $(".breadcrumb");
    const $clickedBreadcrumb = $(this);
    let breadcrumbState = $breadcrumbs.data("state");

    const clickedIndex = breadcrumbState.findIndex((nodeData) =>
        nodeData.id == $clickedBreadcrumb.attr("data-node-id")
    );

    breadcrumbState = breadcrumbState.slice(0, clickedIndex + 1);
    $breadcrumbs.data("state", breadcrumbState);

    displayCard(breadcrumbState.pop());
}


function refreshBreadcrumbs() {
    const $breadcrumbs = $(".breadcrumb");
    $breadcrumbs.children().remove();
    const breadcrumbState = $breadcrumbs.data("state");
    const indexFinal = breadcrumbState.length - 1;


    breadcrumbState.forEach((nodeData, index) => {
        const $breadcrumb = $($.parseHTML(breadcrumbTemplate));

        const $link = $breadcrumb.find("a");
        $link.text(nodeData.title);
        if (index !== indexFinal) {
            $link.attr("href", `#${nodeData.id}`);
            $link.attr("data-node-id", nodeData.id);
            $link.on("click", breadcrumbClick);

        } else $link.removeAttr("href");

        $breadcrumbs.append($breadcrumb);
    });


}


function updateBreadcrumbs(nodeData) {
    const $breadcrumbs = $(".breadcrumb");
    const breadcrumbState = $breadcrumbs.data("state") || [];
    breadcrumbState.push(nodeData);
    $breadcrumbs.data("state", breadcrumbState);

    refreshBreadcrumbs();
}


function displayCard({id, title, text, images, nodes}, shouldUpdateBreadcrumbs = true) {
    const $nodeMain = $(".node-main");
    $nodeMain.find("h2").text(title);
    $nodeMain.find(".main-text").text(text);

    clearOldNodeCards();
    nodes.forEach(nodeData => {
        const $nodeCard = createNodeCard(nodeData);
        $(".nodes-container")
            .find(".row")
            .find(".node-new")
            .before($nodeCard);
    });

    updateSlideshow(images);
    if (shouldUpdateBreadcrumbs) updateBreadcrumbs({id, title, text, images, nodes});
}


function cardEditClick() {
    const $currentCardContent = $(".current-card-content");

    $currentCardContent.hide();

    const currentTitle = $currentCardContent.find("h2").text();
    $("#card-title-edit").val(currentTitle);

    const currentText = $currentCardContent.find("p").text();
    $("#card-text-edit").val(currentText);

    $(this).hide();
    $(".delete-btn").hide();
    $(".carousel").parent().hide();
    $(".change-card-content").show();
}


function cancelEditClick() {
    $(".edit-btn").show();
    $(".delete-btn").show();
    $(".current-card-content").show();
    $(".carousel").parent().show();
    $(".change-card-content").hide();
}


function applyEditClick(e) {
    const $form = $(".change-card-content");
    const url = $form.attr("action");

    $form.find("input[type=file]").filter(function () {
        if (!$(this).val()) $(this).remove();
    });
    $form.trigger("submit");
}


function addFileMedia($fileInput) {
    return function () {
        const $fileUpdate = $($.parseHTML(fileUpdateTemplate));
        const file = $(this)[0].files[0];

        $fileUpdate.attr("data-image-name", file.name);
        $fileUpdate.find(".media-body").text(file.name);

        $(".image-list").append($fileUpdate);
        $fileUpdate.find(".file-delete").on("click", () => {
            $fileUpdate.remove();
            $fileInput.remove();
        });
    }
}

function removeExistingImage() {
    $changeCardForm = $(".change-card-content");
    let removedImages = $changeCardForm.data("removedImages");
    const imageName = $(this).parent().attr("data-image-name");
    if (!removedImages) {
        removedImages = [];
    }
    removedImages.push(imageName);
    $(this).parent().remove();
}


function newImageClicked(e) {
    const $fileInput = $("<input>")
        .attr("type", "file")
        .attr("name", `file-${FILE_COUNTER}`)
        .hide();

    FILE_COUNTER++;

    const $form = $(".change-card-content").append($fileInput);
    $fileInput.trigger("click");
    $fileInput.on("change", addFileMedia($fileInput));
    $form.append($fileInput);

}


function cardEditSetup() {
    $(".edit-btn").on("click", cardEditClick);
    $(".apply-edit-btn").on("click", applyEditClick);
    $(".cancel-edit-btn").on("click", cancelEditClick);
    const $imageList = $(".image-list");
    $(".carousel-item").each(function() {
        const $img = $(this).find("img");
        const $fileTemplate = $($.parseHTML(fileUpdateTemplate));
        const fileName = $img.attr("src").split("/").pop();
        $fileTemplate.find(".media-body").text(fileName);
        $fileTemplate.attr("data-image-name", fileName);
        $fileTemplate.find("img").attr("src", $img.attr("src"));
        $fileTemplate.find("button").on("click", removeExistingImage);
        $imageList.append($fileTemplate);
    });
    $(".new-img-btn").on("click", newImageClicked);
}


$(function () {
    const data = getMapData();
    displayCard(data);
    cardSearchSetup();
    addCardModalSetup();
    cardEditSetup();
});