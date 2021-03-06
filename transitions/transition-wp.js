var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Animation } from '../animations/animation';
import { isPresent } from '../util/util';
import { PageTransition } from './page-transition';
var /** @type {?} */ SHOW_BACK_BTN_CSS = 'show-back-button';
var /** @type {?} */ SCALE_SMALL = .95;
var WPTransition = (function (_super) {
    __extends(WPTransition, _super);
    function WPTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    WPTransition.prototype.init = function () {
        _super.prototype.init.call(this);
        var /** @type {?} */ plt = this.plt;
        var /** @type {?} */ enteringView = this.enteringView;
        var /** @type {?} */ leavingView = this.leavingView;
        var /** @type {?} */ opts = this.opts;
        // what direction is the transition going
        var /** @type {?} */ backDirection = (opts.direction === 'back');
        if (enteringView) {
            if (backDirection) {
                this.duration(isPresent(opts.duration) ? opts.duration : 120).easing('cubic-bezier(0.47,0,0.745,0.715)');
                this.enteringPage.beforeClearStyles(['scale']);
            }
            else {
                this.duration(isPresent(opts.duration) ? opts.duration : 280).easing('cubic-bezier(0,0,0.05,1)');
                this.enteringPage
                    .fromTo('scale', SCALE_SMALL, 1, true)
                    .fromTo('opacity', 0.01, 1, true);
            }
            if (enteringView.hasNavbar()) {
                var /** @type {?} */ enteringPageEle = enteringView.pageRef().nativeElement;
                var /** @type {?} */ enteringNavbarEle = enteringPageEle.querySelector('ion-navbar');
                var /** @type {?} */ enteringNavBar = new Animation(plt, enteringNavbarEle);
                this.add(enteringNavBar);
                var /** @type {?} */ enteringBackButton = new Animation(plt, enteringNavbarEle.querySelector('.back-button'));
                this.add(enteringBackButton);
                if (enteringView.enableBack()) {
                    enteringBackButton.beforeAddClass(SHOW_BACK_BTN_CSS);
                }
                else {
                    enteringBackButton.beforeRemoveClass(SHOW_BACK_BTN_CSS);
                }
            }
        }
        // setup leaving view
        if (leavingView && backDirection) {
            // leaving content
            this.duration(opts.duration || 200).easing('cubic-bezier(0.47,0,0.745,0.715)');
            var /** @type {?} */ leavingPage = new Animation(plt, leavingView.pageRef());
            this.add(leavingPage.fromTo('scale', 1, SCALE_SMALL).fromTo('opacity', 0.99, 0));
        }
    };
    return WPTransition;
}(PageTransition));
export { WPTransition };
//# sourceMappingURL=transition-wp.js.map