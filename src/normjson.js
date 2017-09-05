'use strict';

function normalizedJSON(target, scheme) {
    if (typeof target === 'undefined') {
        return target;
    }

    if (typeof target !== 'object' || target === null) {
        return JSON.stringify(target);
    }

    if (Array.isArray(target)) {
        let result = [];
        target.forEach((value) => {
            if (typeof value === 'undefined') {
                value = null;
            }
            result.push(normalizedJSON(value, scheme));
        });
        return '[' + result.join(',') + ']';
    }

    if (typeof scheme === 'function') {
        return normalizedJSON(target, scheme(target));
    }
    else if (Array.isArray(scheme)) {
        let result = [];
        scheme.forEach((prop) => {
            if (target.hasOwnProperty(prop)) {
                let value = target[prop];
                if (typeof value === 'undefined') {
                    return;
                }
                result.push(JSON.stringify(prop) + ':' + normalizedJSON(value));
            }
        });

        return '{' + result.join(',') + '}';
    }
    else if (typeof scheme === 'object') {
        let result = [];
        Object.getOwnPropertyNames(scheme).forEach((prop) => {
            if (target.hasOwnProperty(prop)) {
                let value = target[prop];
                if (typeof value === 'undefined') {
                    return;
                }

                result.push(JSON.stringify(prop) + ':' + normalizedJSON(value, scheme[prop]));
            }
        });

        return '{' + result.join(',') + '}';
    }
    else {
        let result = [];
        Object.getOwnPropertyNames(target).sort().forEach((prop) => {
            let value = target[prop];
            if (typeof value === 'undefined') {
                return;
            }

            result.push(JSON.stringify(prop) + ':' + normalizedJSON(value));
        });

        return '{' + result.join(',') + '}';
    }
}

module.exports = normalizedJSON;
