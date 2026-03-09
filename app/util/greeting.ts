
const greeting = () => {
    const getTime = new Date().getHours()

    if(getTime < 12) {
        return "Good Morinig"
    } 

    if(getTime < 16) {
        return " Good Afternoon"
    }

     else return "Good evening"
}

export default greeting
