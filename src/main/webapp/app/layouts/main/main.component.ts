import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRouteSnapshot, NavigationEnd} from '@angular/router';
import {JhiLanguageHelper} from 'app/core';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
    constructor(private jhiLanguageHelper: JhiLanguageHelper, private router: Router) {
    }

    private loadContentFirst() {
        const DataKey = 'lte.layout';

        const Default = {
            slimscroll: true,
            resetHeight: true
        };

        const Selector = {
            wrapper: '.wrapper',
            contentWrapper: '.content-wrapper',
            layoutBoxed: '.layout-boxed',
            mainFooter: '.main-footer',
            mainHeader: '.main-header',
            sidebar: '.sidebar',
            controlSidebar: '.control-sidebar',
            fixed: '.fixed',
            sidebarMenu: '.sidebar-menu',
            logo: '.main-header .logo'
        };

        const ClassName = {
            fixed: 'fixed',
            holdTransition: 'hold-transition'
        };

        const Layout = function(options) {
            this.options = options;
            this.bindedResize = false;
            this.activate();
        };

        Layout.prototype.activate = function() {
            this.fix();
            this.fixSidebar();

            $('body').removeClass(ClassName.holdTransition);

            if (!this.bindedResize) {
                $(window).resize(function() {
                    this.fix();
                    this.fixSidebar();

                    $(Selector.logo + ', ' + Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                        this.fix();
                        this.fixSidebar();
                    }.bind(this));
                }.bind(this));

                this.bindedResize = true;
            }

            $(Selector.sidebarMenu).on('expanded.tree', function() {
                this.fix();
                this.fixSidebar();
            }.bind(this));

            $(Selector.sidebarMenu).on('collapsed.tree', function() {
                this.fix();
                this.fixSidebar();
            }.bind(this));
        };

        Layout.prototype.fix = function() {
            $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden');

            const footerHeight = 55;
            const headerHeight = 55;
            const neg = headerHeight + footerHeight;
            const windowHeight = $(window).height();
            const sidebarHeight = $(Selector.sidebar).height() || 0;

            if ($('body').hasClass(ClassName.fixed)) {
                $(Selector.contentWrapper).css('min-height', windowHeight - footerHeight - headerHeight);
            } else {
                let postSetHeight;

                if (windowHeight >= sidebarHeight) {
                    $(Selector.contentWrapper).css('min-height', windowHeight - neg);
                    postSetHeight = windowHeight - neg;
                } else {
                    $(Selector.contentWrapper).css('min-height', sidebarHeight);
                    postSetHeight = sidebarHeight;
                }

                const $controlSidebar = $(Selector.controlSidebar);
                if (typeof $controlSidebar !== 'undefined') {
                    if ($controlSidebar.height() > postSetHeight) {
                        $(Selector.contentWrapper).css('min-height', $controlSidebar.height());
                    }
                }
            }
        };

        Layout.prototype.fixSidebar = function() {
            // Make sure the body tag has the .fixed class
            if (!$('body').hasClass(ClassName.fixed)) {
                if (typeof $.fn.slimScroll !== 'undefined') {
                    $(Selector.sidebar).slimScroll({destroy: true}).height('auto');
                }
                return;
            }

            // Enable slimscroll for fixed layout
            if (this.options.slimscroll) {
                if (typeof $.fn.slimScroll !== 'undefined') {
                    $(Selector.sidebar).slimScroll({
                        height: ($(window).height() - $(Selector.mainHeader).height()) + 'px'
                    });
                }
            }
        };

        function Plugin(option) {
            return this.each(function() {
                const $this = $(this);
                let data = $this.data(DataKey);

                if (!data) {
                    const options = $.extend({}, Default, $this.data(), typeof option === 'object' && option);
                    $this.data(DataKey, (data = new Layout(options)));
                }

                if (typeof option === 'string') {
                    if (typeof data[option] === 'undefined') {
                        throw new Error('No method named ' + option);
                    }
                    data[option]();
                }
            });
        }

        const old = $.fn.layout;

        $.fn.layout = Plugin;
        $.fn.layout.Constuctor = Layout;

        $.fn.layout.noConflict = function() {
            $.fn.layout = old;
            return this;
        };

        $(window).on('load', function() {
            Plugin.call($('body'));
        });
    }

    private loadContentSecond() {
        'use strict';

        const DataKey = 'lte.pushmenu';

        const Default = {
            collapseScreenSize: 767,
            expandOnHover: false,
            expandTransitionDelay: 200
        };

        const Selector = {
            collapsed: '.sidebar-collapse',
            open: '.sidebar-open',
            mainSidebar: '.main-sidebar',
            contentWrapper: '.content-wrapper',
            searchInput: '.sidebar-form .form-control',
            button: '[data-toggle="push-menu"]',
            mini: '.sidebar-mini',
            expanded: '.sidebar-expanded-on-hover',
            layoutFixed: '.fixed'
        };

        const ClassName = {
            collapsed: 'sidebar-collapse',
            open: 'sidebar-open',
            mini: 'sidebar-mini',
            expanded: 'sidebar-expanded-on-hover',
            expandFeature: 'sidebar-mini-expand-feature',
            layoutFixed: 'fixed'
        };

        const Event = {
            expanded: 'expanded.pushMenu',
            collapsed: 'collapsed.pushMenu'
        };

        const PushMenu = function(options) {
            this.options = options;
            this.init();
        };

        PushMenu.prototype.init = function() {
            if (this.options.expandOnHover
                || ($('body').is(Selector.mini + Selector.layoutFixed))) {
                this.expandOnHover();
                $('body').addClass(ClassName.expandFeature);
            }

            $(Selector.contentWrapper).click(function() {
                // Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= this.options.collapseScreenSize && $('body').hasClass(ClassName.open)) {
                    this.close();
                }
            }.bind(this));

            $(Selector.searchInput).click(function(e) {
                e.stopPropagation();
            });
        };

        PushMenu.prototype.toggle = function() {
            const windowWidth = $(window).width();
            const isOpen = !$('body').hasClass(ClassName.collapsed);

            if (windowWidth <= this.options.collapseScreenSize) {
                isOpen = $('body').hasClass(ClassName.open);
            }

            if (!isOpen) {
                this.open();
            } else {
                this.close();
            }
        };

        PushMenu.prototype.open = function() {
            const windowWidth = $(window).width();

            if (windowWidth > this.options.collapseScreenSize) {
                $('body').removeClass(ClassName.collapsed)
                    .trigger($.Event(Event.expanded));
            } else {
                $('body').addClass(ClassName.open)
                    .trigger($.Event(Event.expanded));
            }
        };

        PushMenu.prototype.close = function() {
            const windowWidth = $(window).width();
            if (windowWidth > this.options.collapseScreenSize) {
                $('body').addClass(ClassName.collapsed)
                    .trigger($.Event(Event.collapsed));
            } else {
                $('body').removeClass(ClassName.open + ' ' + ClassName.collapsed)
                    .trigger($.Event(Event.collapsed));
            }
        };

        PushMenu.prototype.expandOnHover = function() {
            $(Selector.mainSidebar).hover(function() {
                if ($('body').is(Selector.mini + Selector.collapsed)
                    && $(window).width() > this.options.collapseScreenSize) {
                    this.expand();
                }
            }.bind(this), function() {
                if ($('body').is(Selector.expanded)) {
                    this.collapse();
                }
            }.bind(this));
        };

        PushMenu.prototype.expand = function() {
            setTimeout(function() {
                $('body').removeClass(ClassName.collapsed)
                    .addClass(ClassName.expanded);
            }, this.options.expandTransitionDelay);
        };

        PushMenu.prototype.collapse = () => {
            setTimeout(() => {
                $('body').removeClass(ClassName.expanded)
                    .addClass(ClassName.collapsed);
            }, this.options.expandTransitionDelay);
        };

        function Plugin(option) {
            return this.each(function() {
                const $this = $(this);
                const data = $this.data(DataKey);

                if (!data) {
                    const options = $.extend({}, Default, $this.data(), typeof option === 'object' && option);
                    $this.data(DataKey, (data = new PushMenu(options)));
                }

                if (option === 'toggle') {
                    data.toggle();
                }
            });
        }

        const old = $.fn.pushMenu;

        $.fn.pushMenu = Plugin;
        $.fn.pushMenu.Constructor = PushMenu;
        $.fn.pushMenu.noConflict = function() {
            $.fn.pushMenu = old;
            return this;
        };

        $(document).on('click', Selector.button, function(e) {
            e.preventDefault();
            Plugin.call($(this), 'toggle');
        });
        $(window).on('load', function() {
            Plugin.call($(Selector.button));
        });
    }

    private loadContentThird() {
        const DataKey = 'lte.tree';

        const Default = {
            animationSpeed: 500,
            accordion: true,
            followLink: false,
            trigger: '.treeview a'
        };

        const Selector = {
            tree: '.tree',
            treeview: '.treeview',
            treeviewMenu: '.treeview-menu',
            open: '.menu-open, .active',
            li: 'li',
            data: '[data-widget="tree"]',
            active: '.active'
        };

        const ClassName = {
            open: 'menu-open',
            tree: 'tree'
        };

        const Event = {
            collapsed: 'collapsed.tree',
            expanded: 'expanded.tree'
        };

        const Tree = function(element, options) {
            this.element = element;
            this.options = options;

            $(this.element).addClass(ClassName.tree);

            $(Selector.treeview + Selector.active, this.element).addClass(ClassName.open);

            this._setUpListeners();
        };

        Tree.prototype.toggle = function(link, event) {
            const treeviewMenu = link.next(Selector.treeviewMenu);
            const parentLi = link.parent();
            const isOpen = parentLi.hasClass(ClassName.open);

            if (!parentLi.is(Selector.treeview)) {
                return;
            }

            if (!this.options.followLink || link.attr('href') === '#') {
                event.preventDefault();
            }

            if (isOpen) {
                this.collapse(treeviewMenu, parentLi);
            } else {
                this.expand(treeviewMenu, parentLi);
            }
        };

        Tree.prototype.expand = function(tree, parent) {
            const expandedEvent = $.Event(Event.expanded);

            if (this.options.accordion) {
                const openMenuLi = parent.siblings(Selector.open);
                const openTree = openMenuLi.children(Selector.treeviewMenu);
                this.collapse(openTree, openMenuLi);
            }

            parent.addClass(ClassName.open);
            tree.slideDown(this.options.animationSpeed, function() {
                $(this.element).trigger(expandedEvent);
            }.bind(this));
        };

        Tree.prototype.collapse = function(tree, parentLi) {
            const collapsedEvent = $.Event(Event.collapsed);
            parentLi.removeClass(ClassName.open);
            tree.slideUp(this.options.animationSpeed, function() {
                $(this.element).trigger(collapsedEvent);
            }.bind(this));
        };

        Tree.prototype._setUpListeners = function() {
            const that = this;
            $(this.element).on('click', this.options.trigger, function(event) {
                that.toggle($(this), event);
            });
        };

        function Plugin(option) {
            return this.each(function() {
                const $this = $(this);
                const data = $this.data(DataKey);

                if (!data) {
                    const options = $.extend({}, Default, $this.data(), typeof option === 'object' && option);
                    $this.data(DataKey, new Tree($this, options));
                }
            });
        }

        const old = $.fn.tree;

        $.fn.tree = Plugin;
        $.fn.tree.Constructor = Tree;

        $.fn.tree.noConflict = function() {
            $.fn.tree = old;
            return this;
        };

        $(window).on('load', function() {
            $(Selector.data).each(function() {
                Plugin.call($(this));
            });
        });
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'lawerApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
        this.loadContentFirst();
        this.loadContentSecond();
        this.loadContentThird();
    }
}
