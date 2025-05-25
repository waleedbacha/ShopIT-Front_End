import React from "react";
import {Helmet} from "react-helmet";

// Changing the tittle //

const metaData = ({title}) => {
return (
    <Helmet>
        <title>{  `${title} - ShopIT` }</title>
    </Helmet>
)
}

export default metaData