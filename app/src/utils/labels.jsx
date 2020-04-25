

let getLabels = () => {


    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    let d = new Date();
    let dayName = days[d.getDay()];

    return {
        day: [days[d.getDay() - 6], days[d.getDay() - 5], days[d.getDay() - 4], days[d.getDay() - 3], days[d.getDay() - 2], days[d.getDay() - 1], days[d.getDay()]],
        week: ["Week 1", "Week 2", "Week 3", "Week 4"],
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        year: [2016, 2017, 2018, 2019, 200]
    }
}
export default getLabels