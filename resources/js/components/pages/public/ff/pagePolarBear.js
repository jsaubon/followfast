import React, { useState } from "react";
import PagePublicAlbum from "./pagePublicAlbum";

const PagePolarBear = () => {
    const [album, setAlbum] = useState({
        user: {
            name: "EyeOnEyez"
        },
        album_title: "Polar Bear The Remixes",
        album_image: "polar-bear_4.jpg",
        album_id: "4ZnBnz8WJxeYMNvqdsMpbg"
    });
    return (
        <>
            <PagePublicAlbum album={album} />
        </>
    );
};

export default PagePolarBear;
