export const getDate = (date: Date): string => {
    const strDate = new Date(date)
    return `${strDate.getDate()}/${strDate.getMonth()}/${strDate.getFullYear()}`
}
