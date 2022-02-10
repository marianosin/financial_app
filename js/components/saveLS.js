function saveLS(keyName, element) {
    localStorage.setItem(keyName,JSON.stringify(element))
}

export {saveLS}