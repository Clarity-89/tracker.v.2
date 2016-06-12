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

/* API fields formatters */
const formatName = (item) => {
    if (item.item_name) return item.item_name.split(' - ')[0];
};

const formatField = (field) => {
    if (field) {
        let parts = field.replace(/nf_|total_|item_/g, '').split('_');
        return (cap(parts[0]) + ' ' + parts.slice(1).join(' ')).trim();
    }
};

const filterFields = (fields) => {
    if (fields.length && Array.isArray(fields)) {
        let filterOut = ['usda_fields', 'old_api_id', 'brand_id', 'nf_ingredient_statement', 'nf_refuse_pct',
            'updated_at', 'item_name', 'item_id', 'leg_loc_id'];

        return fields.filter(field => filterOut.indexOf(field) < 0)
    } else {
        return [];
    }
};