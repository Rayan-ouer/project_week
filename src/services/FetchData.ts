import React from "react";

export async function fetchJSON() {
    const response = await fetch('/data/cyberpeace-incidents.json');

    if (!response.ok)
        throw Error("Json couldn't be load");
    const data = await response.json();
    
    return data;
}
