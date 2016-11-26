'use strict';

function normalizedJSON(target, scheme) {
    if (typeof target !== 'object' || target === null) {
        return JSON.stringify(target);
    }
    
    if (Array.isArray(target)) {
        let result = [];
        target.forEach((value) => {
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
                result.push(JSON.stringify(prop) + ':' + normalizedJSON(target[prop]))
            }
        });
        
        return '{' + result.join(',') + '}';
    }
    else if (typeof scheme === 'object') {
        let result = [];
        Object.getOwnPropertyNames(scheme).forEach((prop) => {
            if (target.hasOwnProperty(prop)) {
                result.push(JSON.stringify(prop) + ':' + normalizedJSON(target[prop], scheme[prop]))
            }
        });
        
        return '{' + result.join(',') + '}';
    }
    else {
        let result = [];
        Object.getOwnPropertyNames(target).sort().forEach((prop) => {
            result.push(JSON.stringify(prop) + ':' + JSON.stringify(target[prop]))
        });
        
        return '{' + result.join(',') + '}';
    }
}

module.exports = normalizedJSON;