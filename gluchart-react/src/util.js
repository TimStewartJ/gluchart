
// extracts first column data from 2d array from slice1 to slice2
function firstColumn(arr, slice1, slice2) {
    const current_input = []

    const sliced_input = arr.slice(slice1, slice2)

    // get first element in last 6 of submission data (aka the 6 most recent CGM readings)
    sliced_input.forEach(element =>
    {
        current_input.push(element[0])
    });

    return current_input
}

export default firstColumn