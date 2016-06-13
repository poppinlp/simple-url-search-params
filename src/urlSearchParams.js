/**
 * @preserve
 * @name simple-url-search-params
 * @version 0.1.1
 * @license MIT
 */
window.URLSearchParams = window.URLSearchParams || (str => {
    const encode = str => encodeURIComponent(str).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16));

    /*
    [
        {
            key:
            val:
        }
    ]
    */
    var data = [];

    /*
    {
        key: [
            index in data
        ]
    }
    */
    var keys = {};

    // create a new object
    var o = Object.create(null);

    // check exist
    o.has = key => !!keys[key];

    // append key-value pair
    o.append = (key, val) => {
        if (!keys[key]) keys[key] = [];

        keys[key].push(data.push({
            key: key,
            val: val
        }) - 1);
    };

    // delete all values by key
    o.delete = key => {
        if (!keys[key]) return;

        data = data.filter(o => o.key !== key);
        delete keys[key];
    };

    // get first value by key
    o.get = key => keys[key] ? data[keys[key][0]].val : null;

    // get all values by key
    o.getAll = key => keys[key] ? keys[key].map(index => data[index].val) : [];

    // set a value to key and other value for the same key
    o.set = (key, val) => {
        if (!keys[key]) {
            o.append(key, val);
            return;
        }

        if (keys[key].length === 1) {
            data[keys[key][0]].val = val;
            return;
        }

        var originData = data,
            isFirst = true;

        data = [];
        keys = {};

        originData.forEach(o => {
            if (o.key !== key) {
                o.append(o.key, o.val);
                return;
            }

            if (isFirst) {
                o.append(o.key, val);
                isFirst = false;
            }
        });
    };

    // print all data to string
    o.toString = () => data.map(o => `${o.key}=${encode(o.val)}`).join('&');

    str.split('&').forEach(v => o.append.apply(o, v.split('=')));

    return o;
});
