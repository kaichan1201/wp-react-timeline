const intersectNums = (A, B) => A.filter(a => B.includes(a)).length;

/** format date to desired format, with some customizations */ 
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

export {intersectNums, getDateFormat};