import axios from 'axios'

/** Calculate how many numbers intersect between the two arrays. */
const intersectNums = (A, B) => A.filter(a => B.includes(a)).length;

/** Format date to desired format, with some customizations. */ 
const getDateFormat = (date, connector='/', show_year=true, show_month=true, show_day=true) => {
    let year = '1970'
    let month = '01'
    let day = '01'
    if (date !== null) {
        year = date.slice(0, 4)
        month = date.slice(4, 6)
        day = date.slice(6)
    }

    let showed_items = []
    if (show_year)
        showed_items.push(year)
    if (show_month)
        showed_items.push(month)
    if (show_day)
        showed_items.push(day)

    return showed_items.join(connector)
}

/** Fetch data from all pages of the url */
const axiosGetAllPages = (url, per_page=50, page_idx=1, data=[]) => {
    return axios.get(url + `?per_page=${per_page}&page=${page_idx}`).then(msg => {
        data.push(...msg.data)
        if (page_idx === parseInt(msg.headers['x-wp-totalpages'])) // reached the last page
            return data
        return axiosGetAllPages(url, per_page, page_idx+1, data)
    })
}

export {intersectNums,
        getDateFormat,
        axiosGetAllPages};