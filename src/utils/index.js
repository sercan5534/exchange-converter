export const getItemFromLocalStorage = (key) => {
    try {
        return localStorage.getItem(key);
    }
    catch (e) {
        console.error(e)
        return null;
    }
}
export const removeItemFromLocalStorage = (key) => {
    try {
        return localStorage.removeItem(key);
    }
    catch (e) {
        console.error(e)
        return null;
    }
}

export const setItemToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value);
    }
    catch (e) {
        console.error(e)
    }
}

export function getConversions() {
    let conversions = getItemFromLocalStorage("conversions");
    if (conversions) {
        conversions = JSON.parse(conversions);
    }
    else {
        return [];
    }
    return conversions;

}


export function setConversions(conversions) {
    setItemToLocalStorage("conversions", JSON.stringify(conversions));
}
