export const date_format = (fDate: Date) => {
    return new Date(fDate).toLocaleDateString('en-us', { year: '2-digit', month: '2-digit', day: 'numeric'} )
}

export const time_format = (fTime: Date) => {
    return new Date(fTime).toLocaleTimeString('en-US')
}