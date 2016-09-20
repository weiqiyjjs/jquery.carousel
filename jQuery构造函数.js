/**
 * Created by 卫旗 on 2016/9/20.
 */
function jQuery(selector, context) {
    // The jQuery object is actually just the init constructor 'enhanced'
    return new jQuery.fn.init(selector, context, rootjQuery);
}

//jQuery.fn.init是jQuery的构造函数
jQuery.fn.init = function (selector, context, rootjQuery) {
    var match, elem, ret, doc;

    // Handle $(""), $(null), $(undefined), $(false)
    if (!selector) {
        return this;
    }

    // Handle $(DOMElement)
    if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;
    }

    // Handle HTML strings
    if (typeof selector === "string") {
        if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
            // Assume that strings that start and end with <> are HTML and skip the regex check
            match = [null, selector, null];

        } else {
            match = rquickExpr.exec(selector);
        }

        // Match html or make sure no context is specified for #id
        if (match && (match[1] || !context)) {

            // HANDLE: $(html) -> $(array)
            if (match[1]) {
                context = context instanceof jQuery ? context[0] : context;
                doc = (context && context.nodeType ? context.ownerDocument || context : document);

                // scripts is true for back-compat
                selector = jQuery.parseHTML(match[1], doc, true);
                if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                    this.attr.call(selector, context, true);
                }

                return jQuery.merge(this, selector);

                // HANDLE: $(#id)
            } else {
                elem = document.getElementById(match[2]);

                // Check parentNode to catch when Blackberry 4.6 returns
                // nodes that are no longer in the document #6963
                if (elem && elem.parentNode) {
                    // Handle the case where IE and Opera return items
                    // by name instead of ID
                    if (elem.id !== match[2]) {
                        return rootjQuery.find(selector);
                    }

                    // Otherwise, we inject the element directly into the jQuery object
                    this.length = 1;
                    this[0] = elem;
                }

                this.context = document;
                this.selector = selector;
                return this;
            }

            // HANDLE: $(expr, $(...))
        } else if (!context || context.jquery) {
            return (context || rootjQuery).find(selector);

            // HANDLE: $(expr, context)
            // (which is just equivalent to: $(context).find(expr)
        } else {
            return this.constructor(context).find(selector);
        }

        // HANDLE: $(function)
        // Shortcut for document ready
    } else if (jQuery.isFunction(selector)) {
        return rootjQuery.ready(selector);
    }

    if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
    }

    return jQuery.makeArray(selector, this);
}

//jQuery.makeArray
jQuery.makeArray = function (arr, results) {
    var type, ret = results || [];

    if (arr != null) {
        // The window, strings (and functions) also have 'length'
        // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
        type = jQuery.type(arr);

        if (arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(arr)) {
            core_push.call(ret, arr);
        } else {
            jQuery.merge(ret, arr);
        }
    }

    return ret;
}