const camelCase = (str: string) => {
    return str[0].toUpperCase() + str.slice(1, str.length + 1)
}

export default camelCase;