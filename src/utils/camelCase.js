const camelCase = (str) => {
    return str[0].toUpperCase() + str.slice(1, str.length + 1)
}

export default camelCase;