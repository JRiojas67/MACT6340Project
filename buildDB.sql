CREATE TABLE projects (
    id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    project_name VARCHAR(150) NOT NULL,
    img_url VARCHAR(250) NOT NULL,
    project_description VARCHAR(2500) NOT NULL,
    quantity INTEGER NOT NULL,
    price_eth DECIMAL(10 ,2) NOT NULL,
    open_date_gmt DATETIME NOT NULL,
    royalty_percentage DECIMAL(5,2) NOT NULL,
    active BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO projects (
    project_name,
    img_url,
    project_description,
    quantity,
    price_eth,
    open_date_gmt,
    royalty_percentage,
    active
) 
VALUES (
    "Project 1",
    "./public/image/satellite.png",
    This is a description for Project 1, It is really good project. It is made by a really good artist.
    1.0,
    2024-02-01 09:00:00,
    7,
    0
),
(
    "Project 2",
    "./public/image/difReact.png",
    This is a description for Project 2, It is really good project. It is made by a really good artist.
    64
    1.5,
    2023-12-15 07:30:00,
    5.0,
    0
),
(
    "Project 3",
    "./public/image/purpleOrangeWidget.png",
    This is a description for Project 3, It is really good project. It is made by a really good artist.
    512,
    2.0,
    2024-03-19 05:00:00,
    2,
    0
);
