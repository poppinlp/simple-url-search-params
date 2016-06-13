/**
 * @preserve
 * @name simple-url-search-params
 * @version 0.1.1
 * @license MIT
 */
window.URLSearchParams = window.URLSearchParams || function (str) {
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

    var encode = function encode(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    };
    var append = function append(key, val) {
        if (!keys[key]) keys[key] = [];

        keys[key].push(data.push({
            key: key,
            val: val
        }) - 1);
    };

    str && str.split('&').forEach(function (v) {
        return append.apply(null, v.split('='));
    });

    return {
        has: function has(key) {
            return !!keys[key];
        },
        append: append,
        delete: function _delete(key) {
            if (!keys[key]) return;

            data = data.filter(function (o) {
                return o.key !== key;
            });
            delete keys[key];
        },
        get: function get(key) {
            return keys[key] ? data[keys[key][0]].val : null;
        },
        getAll: function getAll(key) {
            return keys[key] ? keys[key].map(function (index) {
                return data[index].val;
            }) : [];
        },
        set: function set(key, val) {
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

            originData.forEach(function (o) {
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
        toString: function toString() {
            return data.map(function (o) {
                return o.key + '=' + encode(o.val);
            }).join('&');
        }
    };
};
