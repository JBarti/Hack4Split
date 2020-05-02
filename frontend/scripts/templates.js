const slideTemplate = `<div class="carousel-item" data-interval="1000">
                        <img src="{slideSrc}" class="d-block w-100" alt="slides">
                    </div>`;

const nodeCardTemplate = `<div class="col-sm-6 col-lg-4 col-xl-3 mb-3 node-card">
            <div class="card">
                <div class="img-container rounded-top">
                    <img src="{imageSrc}" class="card-img-adjust card-img-top" alt="card">
                </div>
                <div class="card-body">
                    <h5 class="card-title">{cardTitle}</h5>
                    <p class="card-text">{cardTest}</p>
                    <button href="#" class="btn btn-primary node-visit">Go somewhere</button>
                </div>
            </div>
        </div>`;