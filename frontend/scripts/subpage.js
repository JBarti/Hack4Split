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


$(function () {
    const data = getMapData();
    displayCard(data);
    cardSearchSetup();
    addCardModalSetup();
});