const timeConverter = (number) => {
    const hours = Math.floor(number / 60);
    const minutes = number % 60;

    return `${ hours}h ${ minutes }min`;
}

export default timeConverter;