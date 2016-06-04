// Add numeric props of two objects and return new object with their sums
const sumProps = (o1, o2) => {
    let sum = {};
    for (let prop in o1) {
        if (o1.hasOwnProperty(prop)) {
            sum[prop] = (o1[prop] + o2[prop]).toFixed(2) / 1;
        }
    }
    return sum;
};

// capitalize a word
const cap = (word) => {
    return word[0].toUpperCase() + word.slice(1);
};