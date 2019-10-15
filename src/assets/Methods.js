const Methods = {

  // dateFormat method for formatting dates
  dateFormat (date) {
    const dateArr = date.split('-')
    return `${dateArr[1]}/${dateArr[2]}/${dateArr[0][2]}${dateArr[0][3]}`
  },

  timeFormat (time) {
    const timeArr = time.split(':')
    // if the time is 00 hours, return 12
    if (timeArr[0] === '00') {
      return '12:' + timeArr[1] + 'AM'
    // if the hours are less than 10 (single digit), use the single digit + minutes
    } else if (timeArr[0] < 10) {
      return timeArr[0][1] + ':' + timeArr[1] + 'AM'
    // if the hours are less than 12, use the time + AM
    } else if (timeArr[0] < 12) {
      return time + 'AM'
    // else subtract 12 from the hours, or return 12, and add PM
    } else {
      return (timeArr[0] - 12 || 12) + ':' + timeArr[1] + 'PM'
    }
  }
}

export default Methods
