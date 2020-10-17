/**
 * @file mofron-event-style/index.js
 * @brief style change event for mofron
 *        this event notifies when the component style of the key that the user specifies is changed
 * ## event function parameter
 *  - component: event target component object
 *  - array: the value of the target style (0:new style value, 1:the previous style value)
 *  - mixed: user specified parameter
 * @feature the target style keys can be specified by the "tgtKeys" parameter
 *          you can select whether to make execute handler when a value is already set when this event is registered to the component
 * @attention for valid this event, style changing must be from the mofron API (ex. component.style()).
 * @license MIT
 */
module.exports = class extends mofron.class.Event {
    /**
     * initialize event
     *
     * @param (mixed) short-form paramter
     *                key-value: event config
     * @short listener,tgtKeys
     * @type private
     */
    constructor (p1,p2) {
        try {
            super();
            this.modname("Style");
            this.shortForm("listener", "tgtKeys");
	    
            /* init config */
	    this.confmng().add("tgtKeys", { type: "string", list: true });
            this.confmng().add("initNotify", { type: "boolean", init: true });
	    
            /* set config */
	    if (0 < arguments.length) {
                this.config(p1,p2);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set style listener
     * 
     * @param (mofron.class.Dom) target dom object
     * @type private
     */
    contents (tgt_dom) {
        try {
            let fnc = (p1, p2, p3) => {
                try {
		    p3.execListener(p2);
		} catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            let keys = this.tgtKeys();
            for (let kidx in keys) {
                tgt_dom.style().listener(keys[kidx], fnc, this);
	    }
            
            /* init event */
            if (true === this.initNotify()) {
                for (let kidx2 in keys) {
                    if (null !== tgt_dom.style(kidx2)) {
		        let set_prm = [{},{}];
			set_prm[0][keys[kidx2]] = tgt_dom.style(keys[kidx2]);
			set_prm[1][keys[kidx2]] = null;
                        this.execListener(set_prm);
		    }
		}
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * whether running lisning if the value of target keys are already set.
     *
     * @param (boolean) true: if the target key value is already set, the handler is executed. (default)
     *                  false: if the target key value is already set, the handler is not executed.
     * @return (boolean) init handler flag
     * @type parameter
     */
    initNotify (prm) {
        try {
	    return this.confmng("initNotify", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }

    }
    
    /**
     * watching target setter/getter
     *
     * @param (mixed) string: listening target key
     *                array: listening target keys
     * @return (array) listening target keys
     * @type parameter
     */
    tgtKeys (prm) {
        try {
	    return this.confmng("tgtKeys", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
