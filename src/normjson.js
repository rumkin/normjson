'use strict';

function normalizedJSON(target, scheme) {
    if (typeof target === 'undefined') {
        return target;
    }

    if (typeof target !== 'object' || target === null) {
        return JSON.stringify(target);
    }

    if (Array.isArray(target)) {
        const result = [];
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
    else {
        return '{' + getProps(target, scheme).join(',') + '}';
    }
}

function getProps(target, scheme) {
    const result = [];

    if (Array.isArray(scheme)) {
        const i = scheme.indexOf(true);

        if (i > -1) {
            const headScheme = scheme.slice(0, i);
            const tailScheme = scheme.slice(i + 1);

            const head = getProps(target, headScheme);
            const tail = getProps(target, tailScheme);

            result.push(...head);

            Object.getOwnPropertyNames(target)
            .sort()
            .forEach((prop) => {
                const value = target[prop];
                if (typeof value === 'undefined') {
                    return;
                }

                if (! headScheme.includes(prop) && ! tailScheme.includes(prop)) {
                    result.push(JSON.stringify(prop) + ':' + normalizedJSON(value));
                }
            });

            result.push(...tail);
        }
        else {
            scheme.forEach((prop) => {
                if (target.hasOwnProperty(prop)) {
                    const value = target[prop];
                    if (typeof value === 'undefined') {
                        return;
                    }
                    result.push(JSON.stringify(prop) + ':' + normalizedJSON(value));
                }
            });
        }
    }
    else if (typeof scheme === 'object') {
        Object.getOwnPropertyNames(scheme)
        .forEach((prop) => {
            if (target.hasOwnProperty(prop)) {
                const value = target[prop];

                if (typeof value === 'undefined') {
                    return;
                }

                result.push(
                    JSON.stringify(prop) + ':' + normalizedJSON(value, scheme[prop])
                );
            }
        });
    }
    else {
        Object.getOwnPropertyNames(target)
        .sort()
        .forEach((prop) => {
            const value = target[prop];
            if (typeof value === 'undefined') {
                return;
            }

            result.push(JSON.stringify(prop) + ':' + normalizedJSON(value));
        });

    }

    return result;
}

module.exports = normalizedJSON;
