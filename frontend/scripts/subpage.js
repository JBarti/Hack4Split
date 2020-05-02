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

function createNodeCard({title, text, images, nodes}) {
    let $nodeCard = $($.parseHTML(nodeCardTemplate));
    $nodeCard.find("img").attr("src", images[0]);
    $nodeCard.find(".card-title").text(title);
    $nodeCard.find(".card-text").text(text);
    $nodeCard.data({"self": {title, text, images, nodes}});

    $nodeCard.find(".node-visit").on("click", () => {
        displayCard({title, text, images, nodes});
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


function displayCard({title, text, images, nodes}) {
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
}


function enableSearch() {
    const $searchBar = $("input[type=search]");
    $searchBar.on("change keyup paste", function () {
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


$(function () {
    const data = getMapData();
    displayCard(data);
    enableSearch();
});