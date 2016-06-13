'use strict';

window.URLSearchParams = URLSearchParams || function (str) {
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

    /*
    o.set = (key, val) => {
        if (!keys[key]) {
            o.append(key, val);
            return;
        }
    };
    */

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
