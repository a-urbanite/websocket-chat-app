// import moment = require("moment/moment")
import moment from 'moment'

export const formatMessage = (userName, text) => {
  return {
    userName,
    text,
    time: moment().format('h:mm a')
  }
}

