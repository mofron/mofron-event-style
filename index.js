/**
 * @file mofron-event-style/index.js
 * @brief style change event for mofron
 *        event function is called when the component style is changed
 * @feature the target style keys can be specified by the "targetKeys" parameter
 *          all style keys are a target if "targetKeys" parameters are null
 *          you can select whether to make execute handler when a value is already set when this event is registered to the component
 * @attention for valid this event, style changing must be from the mofron API (ex. component.style()).
 * @author simpart
 */
const mf = require('mofron');
mf.event.Style = class extends mf.Event {
    /**
     * initialize event
     *
     * @param (array/object) array: event handler [function,mixed]
     *                       object:  event option
     * @param (string/array) watching target style keys
     * @pmap handler,targetKeys
     * @type private
     */
    constructor (po, p2) {
        try {
            super();
            this.name("Style");
            this.prmMap(["handler", "targetKeys"]);
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set style listener
     *
     * @type private
     */
    contents (tgt_dom) {
        try {
            let fnc = (p1, p2, p3) => {
                try { p3.execHandler(p2); } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            let keys = this.targetKeys();
            if (0 === keys.length) {
                tgt_dom.styleListener(null, fnc, this);
            } else {
                for (let kidx in keys) {
                    tgt_dom.styleListener(keys[kidx], fnc, this);
                }
            }
            /* init event */
            if (true === this.initEvent()) {
                let dm_st = tgt_dom.style();
                let tkeys = this.targetKeys();
                if (0 === tkeys.length) {
                    for (let dt_idx in dm_st) {
                        if ( ("" !== dm_st[dt_idx]) && (undefined !== dm_st[dt_idx]) ) {
                            this.execHandler(dm_st);
                            break;
                        }
                    }
                } else {
                    for (let tk_idx in tkeys) {
                        if ( ("" !== dm_st[tkeys[tk_idx]]) &&
                             (undefined !== dm_st[tkeys[tk_idx]]) ) {
                            let ev_prm = {};
                            ev_prm[tkeys[tk_idx]] = dm_st[tkeys[tk_idx]];
                            this.execHandler(ev_prm);
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * whether running handler if the value of target keys are already set.
     *
     * @param (boolean) true: if the target key value is already set, the handler is executed.
     *                  false: if the target key value is already set, the handler is not executed.
     * @return (boolean) init handler flag
     * @type parameter
     */
    initEvent (prm) {
        try { return this.member("initEvent", "boolean", prm, false); } catch (e) {
            console.error(e.stack);
            throw e;
        }

    }
    
    /**
     * watching target setter/getter
     *
     * @param (string/array) watching target keys
     * @return (array) watching target keys
     * @type parameter
     */
    targetKeys (prm) {
        try { return this.arrayMember("targetKeys", "string", prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.event.Style;
/* end of file */
