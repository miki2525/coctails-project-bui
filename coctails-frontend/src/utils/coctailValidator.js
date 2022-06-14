export const ingredientsNotEmpty = (data) => {
    return Object.keys(data).filter((prop) => prop.includes("nameIngr"))
        .some((nameIngr) => data[nameIngr] !== "");
}