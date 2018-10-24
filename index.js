/**
 * @file mofron-event-style/index.js
 * @brief style change event for mofron
 * @author simpart
 */
const mf = require('mofron');
mf.event.Style = class extends mf.Event {
    /**
     * initialize event
     *
     * @param p1 (object) event option
     * @param p1 (array)  event handler
     * @param p2 (string) watching target
     */
    constructor (po, p2) {
        try {
            super();
            this.name('Style');
            this.prmMap(['handler', 'target']);
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set style listener
     *
     * @note private method
     */
    contents (tgt_dom) {
        try {
            if (null === this.target()) {
                console.warn('could not find watching target');
                return;
            }
            let fnc = (p1, p2, p3) => {
                try { p3.execHandler(p1); } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            tgt_dom.styleListener(this.target(), fnc, this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * watching target setter/getter
     *
     * @param p1 (string) watching target
     * @param p1 (undefined) call as getter
     * @return 
     */
    target (prm) {
        try { return this.member('target', 'string', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.event.Style;
/* end of file */
