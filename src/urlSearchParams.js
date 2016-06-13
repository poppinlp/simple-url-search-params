/**
 * @preserve
 * @name simple-url-search-params
 * @version 0.1.1
 * @license MIT
 */
window.URLSearchParams = window.URLSearchParams || (str => {
    /*
    [{
        key:
        val:
    }]
    */
    var data = [];

    /*
    {
        key: [ index in data ]
    }
    */
    var keys = {};

    const encode = str => encodeURIComponent(str).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16));
    const append = (key, val) => {
        if (!keys[key]) keys[key] = [];

        keys[key].push(data.push({
            key: key,
            val: val
        }) - 1);
    };

    str && str.split('&').forEach(v => append.apply(null, v.split('=')));

    return {
        has: key => !!keys[key],
        append: append,
        delete: key => {
            if (!keys[key]) return;

            data = data.filter(o => o.key !== key);
            delete keys[key];
        },
        get: key => keys[key] ? data[keys[key][0]].val : null,
        getAll: key => keys[key] ? keys[key].map(index => data[index].val) : [],
        set: (key, val) => {
            if (!keys[key]) {
                append(key, val);
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
                    append(o.key, o.val);
                    return;
                }

                if (isFirst) {
                    append(o.key, val);
                    isFirst = false;
                }
            });
        },
        toString: () => data.map(o => `${o.key}=${encode(o.val)}`).join('&')
    };
});
