const Methods = {

  // dateFormat method for formatting dates
  dateFormat (date) {
    const dateArr = date.split('-')
    return `${dateArr[1]}/${dateArr[2]}/${dateArr[0][2]}${dateArr[0][3]}`
  },

  timeFormat (time) {
    const timeArr = time.split(':')
    // if the hours are less than 10 (single digit), use the digit and minutes
    if (timeArr[0] < 10) {
      return timeArr[0][1] + ':' + timeArr[1] + 'AM'
    // if the hours are less than 12, just use the time + AM
    } else if (timeArr[0] < 12) {
      return time + 'AM'
    // else just subtract 12 from the hours and add PM
    } else {
      return timeArr[0] - 12 + ':' + timeArr[1] + 'PM'
    }
  }
}

export default Methods
