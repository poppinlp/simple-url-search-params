/**
 * @file simple-url-search-params
 * @version 0.1.1
 * @author PoppinL
 */
window.URLSearchParams = window.URLSearchParams || function (str) {
    var encode = function encode(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    };

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
    o.has = function (key) {
        return !!keys[key];
    };

    // append key-value pair
    o.append = function (key, val) {
        if (!keys[key]) keys[key] = [];

        keys[key].push(data.push({
            key: key,
            val: val
        }) - 1);
    };

    // delete all values by key
    o.delete = function (key) {
        if (!keys[key]) return;

        data = data.filter(function (o) {
            return o.key !== key;
        });
        delete keys[key];
    };

    // get first value by key
    o.get = function (key) {
        return keys[key] ? data[keys[key][0]].val : null;
    };

    // get all values by key
    o.getAll = function (key) {
        return keys[key] ? keys[key].map(function (index) {
            return data[index].val;
        }) : [];
    };

    // set a value to key and other value for the same key
    o.set = function (key, val) {
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

        originData.forEach(function (o) {
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
    o.toString = function () {
        return data.map(function (o) {
            return o.key + '=' + encode(o.val);
        }).join('&');
    };

    str.split('&').forEach(function (v) {
        return o.append.apply(o, v.split('='));
    });

    return o;
};
