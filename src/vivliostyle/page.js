/**
 * Copyright 2015 Vivliostyle Inc.
 * @fileoverview @page rule (CSS Paged Media) support
 */
goog.provide("vivliostyle.page");

goog.require("adapt.expr");
goog.require("adapt.css");
goog.require("adapt.cssparse");
goog.require("adapt.csscasc");
goog.require("adapt.cssvalid");
goog.require("adapt.pm");

/**
 * Represent page size.
 *  @typedef {{width: !adapt.css.Numeric, height: !adapt.css.Numeric}}
 */
vivliostyle.page.PageSize;

/**
 * Named page sizes.
 * @const
 * @private
 * @type {Object.<string, !vivliostyle.page.PageSize>}
 */
vivliostyle.page.pageSizes = {
    "a5": {width: new adapt.css.Numeric(148, "mm"), height: new adapt.css.Numeric(210, "mm")},
    "a4": {width: new adapt.css.Numeric(210, "mm"), height: new adapt.css.Numeric(297, "mm")},
    "a3": {width: new adapt.css.Numeric(297, "mm"), height: new adapt.css.Numeric(420, "mm")},
    "b5": {width: new adapt.css.Numeric(176, "mm"), height: new adapt.css.Numeric(250, "mm")},
    "b4": {width: new adapt.css.Numeric(250, "mm"), height: new adapt.css.Numeric(353, "mm")},
    "letter": {width: new adapt.css.Numeric(8.5, "in"), height: new adapt.css.Numeric(11, "in")},
    "legal": {width: new adapt.css.Numeric(8.5, "in"), height: new adapt.css.Numeric(14, "in")},
    "ledger": {width: new adapt.css.Numeric(11, "in"), height: new adapt.css.Numeric(17, "in")}
};

/**
 * @const
 * @type {!vivliostyle.page.PageSize}
 */
vivliostyle.page.fitToViewportSize = {
    width: adapt.css.fullWidth,
    height: adapt.css.fullHeight
};

/**
 * @private
 * @param {!Object.<string, adapt.css.Val>} style
 * @return {!vivliostyle.page.PageSize}
 */
vivliostyle.page.resolvePageSize = function(style) {
    /** @type {adapt.css.Val} */ var size = style["size"];
    if (!size || size.value === adapt.css.ident.auto) {
        // if size is auto, fit to the viewport
        return vivliostyle.page.fitToViewportSize;
    } else {
        /** !type {!adapt.css.Val} */ var value = size.value;
        var val1, val2;
        if (value.isSpaceList()) {
            val1 = value.values[0];
            val2 = value.values[1];
        } else {
            val1 = value;
            val2 = null;
        }
        if (val1.isNumeric()) {
            // <length>{1,2}
            return {
                width: val1,
                height: val2 || val1
            };
        } else {
            // <page-size> || [ portrait | landscape ]
            var s = vivliostyle.page.pageSizes[/** @type {adapt.css.Ident} */ (val1).name.toLowerCase()];
            if (!s) {
                // portrait or landscape is specified alone. fallback to fit to the viewport
                return vivliostyle.page.fitToViewportSize;
            } else if (val2 && val2 === adapt.css.ident.landscape) {
                // swap
                return {
                    width: s.height,
                    height: s.width
                };
            } else {
                return {
                    width: s.width,
                    height: s.height
                };
            }
        }
    }
};

/**
 * Indicates that the page master is generated for @page rules.
 * @const
 */
vivliostyle.page.pageRuleMasterPseudoName = "vivliostyle-page-rule-master";

/**
 * Represent a page master generated for @page rules
 * @param {adapt.expr.LexicalScope} scope
 * @param {adapt.pm.RootPageBox} parent
 * @param {!adapt.csscasc.ElementStyle} style Cascaded style for @page rules
 * @constructor
 * @extends {adapt.pm.PageMaster}
 */
vivliostyle.page.PageRuleMaster = function(scope, parent, style) {
    adapt.pm.PageMaster.call(this, scope, null, vivliostyle.page.pageRuleMasterPseudoName, [],
        parent, null, 0);
    /** @const @private */ this.style = style;
    var partition = new vivliostyle.page.PageRulePartition(this.scope, this, style);
    /** @const @private */ this.bodyPartitionKey = partition.key;
};
goog.inherits(vivliostyle.page.PageRuleMaster, adapt.pm.PageMaster);

/**
 * @return {!vivliostyle.page.PageRuleMasterInstance}
 * @override
 */
vivliostyle.page.PageRuleMaster.prototype.createInstance = function(parentInstance) {
    return new vivliostyle.page.PageRuleMasterInstance(parentInstance, this);
};

/**
 * Represent a partition placed in a PageRuleMaster
 * @param {adapt.expr.LexicalScope} scope
 * @param {vivliostyle.page.PageRuleMaster} parent
 * @param {!adapt.csscasc.ElementStyle} style Cascaded style for @page rules
 * @constructor
 * @extends {adapt.pm.Partition}
 */
vivliostyle.page.PageRulePartition = function(scope, parent, style) {
    adapt.pm.Partition.call(this, scope, null, null, [], parent);
    /** @const */ this.pageSize = vivliostyle.page.resolvePageSize(style);
    this.applySpecified(style);
};
goog.inherits(vivliostyle.page.PageRulePartition, adapt.pm.Partition);

/**
 * @private
 * @const
 */
vivliostyle.page.PageRulePartition.sides = [
    "left", "right", "top", "bottom",
    "before", "after", "start", "end",
    "block-start", "block-end", "inline-start", "inline-end"
];

/**
 * Transfer cascaded style for @page rules to 'specified' style of this PageBox
 * @private
 * @param {!adapt.csscasc.ElementStyle} style
 */
vivliostyle.page.PageRulePartition.prototype.applySpecified = function(style) {
    this.specified["flow-from"] = new adapt.csscasc.CascadeValue(adapt.css.getName("body"), 0);
    this.specified["position"] = new adapt.csscasc.CascadeValue(adapt.css.ident.relative, 0);

    var self = this;
    function copy(name) {
        self.specified[name] = style[name];
    }
    copy("width");
    copy("height");
    copy("block-size");
    copy("inline-size");
    for (var i = 0; i < vivliostyle.page.PageRulePartition.sides.length; i++) {
        var side = vivliostyle.page.PageRulePartition.sides[i];
        copy("margin-" + side);
        copy("padding-" + side);
        copy("border-" + side + "-width");
        copy("border-" + side + "-style");
        copy("border-" + side + "-color");
    }
};

/**
 * @return {!vivliostyle.page.PageRulePartitionInstance}
 * @override
 */
vivliostyle.page.PageRulePartition.prototype.createInstance = function(parentInstance) {
    return new vivliostyle.page.PageRulePartitionInstance(parentInstance, this);
};

/**
 * @param {adapt.pm.PageBoxInstance} parentInstance
 * @param {vivliostyle.page.PageRuleMaster} pageRuleMaster
 * @constructor
 * @extends {adapt.pm.PageMasterInstance}
 */
vivliostyle.page.PageRuleMasterInstance = function(parentInstance, pageRuleMaster) {
    adapt.pm.PageMasterInstance.call(this, parentInstance, pageRuleMaster);
};
goog.inherits(vivliostyle.page.PageRuleMasterInstance, adapt.pm.PageMasterInstance);

/**
 * @override
 */
vivliostyle.page.PageRuleMasterInstance.prototype.initHorizontal = function() {
    var style = this.style;
    style["left"] = adapt.css.numericZero;
    style["margin-left"] = adapt.css.numericZero;
    style["border-left-width"] = adapt.css.numericZero;
    style["padding-left"] = adapt.css.numericZero;
    style["padding-right"] = adapt.css.numericZero;
    style["border-right-width"] = adapt.css.numericZero;
    style["margin-right"] = adapt.css.numericZero;
    style["right"] = adapt.css.numericZero;
};

/**
 * @override
 */
vivliostyle.page.PageRuleMasterInstance.prototype.initVertical = function() {
    var style = this.style;
    style["top"] = adapt.css.numericZero;
    style["margin-top"] = adapt.css.numericZero;
    style["border-top-width"] = adapt.css.numericZero;
    style["padding-top"] = adapt.css.numericZero;
    style["padding-bottom"] = adapt.css.numericZero;
    style["border-bottom-width"] = adapt.css.numericZero;
    style["margin-bottom"] = adapt.css.numericZero;
    style["bottom"] = adapt.css.numericZero;
};

/**
 * Adjust width and height using the actual dimensions calculated by the PageRuleParitionInstance.
 * @param {!adapt.expr.Context} context
 */
vivliostyle.page.PageRuleMasterInstance.prototype.adjustContainingBlock = function(context) {
    var holder = /** {!adapt.pm.InstanceHolder} */ (context);
    var partitionInstance = holder.lookupInstance(this.pageBox.bodyPartitionKey);

    var style = this.style;
    style["width"] = new adapt.css.Expr(partitionInstance.fullWidth);
    style["height"] = new adapt.css.Expr(partitionInstance.fullHeight);
};

/**
 * @param {adapt.pm.PageBoxInstance} parentInstance
 * @param {vivliostyle.page.PageRulePartition} pageRulePartition
 * @constructor
 * @extends {adapt.pm.PartitionInstance}
 */
vivliostyle.page.PageRulePartitionInstance = function(parentInstance, pageRulePartition) {
    adapt.pm.PartitionInstance.call(this, parentInstance, pageRulePartition);
    /** @type {adapt.expr.Val} */ this.fullWidth = null;
    /** @type {adapt.expr.Val} */ this.fullHeight = null;
};
goog.inherits(vivliostyle.page.PageRulePartitionInstance, adapt.pm.PartitionInstance);

/**
 * @override
 */
vivliostyle.page.PageRulePartitionInstance.prototype.initHorizontal = function() {
    this.fullWidth = this.resolvePageBoxDimensions({
        start: "left",
        end: "right",
        extent: "width"
    });
};

/**
 * @override
 */
vivliostyle.page.PageRulePartitionInstance.prototype.initVertical = function() {
    this.fullHeight = this.resolvePageBoxDimensions({
        start: "top",
        end: "bottom",
        extent: "height"
    });
};

/**
 * Calculate page dimensions as specified in CSS Paged Media (http://dev.w3.org/csswg/css-page/#page-model)
 * @private
 * @param {!{start: string, end: string, extent: string}} names
 * @return {!adapt.expr.Val} Full page extent. Since the containing block can be resized in the over-constrained case, this value is not necessarily same to the original page dimension specified in the page at-rules.
 */
vivliostyle.page.PageRulePartitionInstance.prototype.resolvePageBoxDimensions = function(names) {
    var style = this.style;
    var pageSize = this.pageBox.pageSize;
    var scope = this.pageBox.scope;
    var startSide = names.start;
    var endSide = names.end;
    var extentName = names.extent;

    var pageExtent = pageSize[extentName].toExpr(scope, null);
    var extent = adapt.pm.toExprAuto(scope, style[extentName], pageExtent);
    var marginStart = adapt.pm.toExprAuto(scope, style["margin-" + startSide], pageExtent);
    var marginEnd = adapt.pm.toExprAuto(scope, style["margin-" + endSide], pageExtent);
    var paddingStart = adapt.pm.toExprZero(scope, style["padding-" + startSide], pageExtent);
    var paddingEnd = adapt.pm.toExprZero(scope, style["padding-" + endSide], pageExtent);
    var borderStartWidth = adapt.pm.toExprZeroBorder(scope, style["border-" + startSide + "-width"], style["border-" + startSide + "-style"], pageExtent);
    var borderEndWidth = adapt.pm.toExprZeroBorder(scope, style["border-" + endSide + "-width"], style["border-" + endSide + "-style"], pageExtent);
    var remains = adapt.expr.sub(scope, pageExtent,
        adapt.expr.add(scope,
            adapt.expr.add(scope, borderStartWidth, paddingStart),
            adapt.expr.add(scope, borderEndWidth, paddingEnd)
        )
    );

    // The dimensions are calculated as for a non-replaced block element in normal flow
    // (http://www.w3.org/TR/CSS21/visudet.html#blockwidth)
    if (!extent) {
        if (!marginStart) marginStart = scope.zero;
        if (!marginEnd) marginEnd = scope.zero;
        extent = adapt.expr.sub(scope, remains, adapt.expr.add(scope, marginStart, marginEnd));
    } else {
        remains = adapt.expr.sub(scope, remains, extent);
        if (!marginStart && !marginEnd) {
            marginStart = adapt.expr.mul(scope, remains, new adapt.expr.Const(scope, 0.5));
            marginEnd = marginStart;
        } else if (marginStart) {
            marginEnd = adapt.expr.sub(scope, remains, marginStart);
        } else {
            marginStart = adapt.expr.sub(scope, remains, marginEnd);
        }
    }
    // TODO over-constrained case
    // "if the values are over-constrained, instead of ignoring any margins, the containing block is resized to coincide with the margin edges of the page box."
    // (CSS Paged Media http://dev.w3.org/csswg/css-page/#page-model)

    style[startSide] = adapt.css.numericZero;
    style[endSide] = adapt.css.numericZero;
    style["margin-" + startSide] = new adapt.css.Expr(marginStart);
    style["margin-" + endSide] = new adapt.css.Expr(marginEnd);
    style["padding-" + startSide] = new adapt.css.Expr(paddingStart);
    style["padding-" + endSide] = new adapt.css.Expr(paddingEnd);
    style["border-" + startSide + "-width"] = new adapt.css.Expr(borderStartWidth);
    style["border-" + endSide + "-width"] = new adapt.css.Expr(borderEndWidth);
    style[extentName] = new adapt.css.Expr(extent);
    style["max-" + extentName] = new adapt.css.Expr(extent);

    return pageExtent;
};

/**
 * Dynamically generate and manage page masters corresponding to page at-rules.
 * @param {adapt.csscasc.CascadeInstance} cascadeInstance
 * @param {adapt.expr.LexicalScope} pageScope
 * @param {!adapt.pm.RootPageBoxInstance} rootPageBoxInstance
 * @param {!adapt.expr.Context} context
 * @param {adapt.csscasc.ElementStyle} docElementStyle
 * @constructor
 */
vivliostyle.page.PageManager = function(cascadeInstance, pageScope, rootPageBoxInstance, context, docElementStyle) {
    /** @const @private */ this.cascadeInstance = cascadeInstance;
    /** @const @private */ this.pageScope = pageScope;
    /** @const @private */ this.rootPageBoxInstance = rootPageBoxInstance;
    /** @const @private */ this.context = context;
    /** @const @private */ this.docElementStyle = docElementStyle;
    /** @const @private */ this.pageMasterCache = /** @type {Object.<string, vivliostyle.page.PageRuleMasterInstance>} */ ({});
};

/**
 * Return a PageMasterInstance with page rules applied. Return a cached instance if there already exists one with the same styles.
 * @return {adapt.pm.PageMasterInstance}
 */
vivliostyle.page.PageManager.prototype.getPageRulePageMaster = function() {
    /** @const */ var style = /** @type {!adapt.csscasc.ElementStyle} */ ({});
    this.cascadeInstance.pushRule([], "", style);
    /** @const */ var key = this.makeCacheKey(style);
    if (!key)
        return null;
    var applied = this.pageMasterCache[key];
    if (applied) {
        return applied;
    } else {
        applied = this.generatePageRuleMaster(style);
        this.pageMasterCache[key] = applied;
        return applied;
    }
};

/**
 * Generate a cache key from the specified styles and the original page master key.
 * @private
 * @param {!adapt.csscasc.ElementStyle} style
 * @return {string}
 */
vivliostyle.page.PageManager.prototype.makeCacheKey = function(style) {
    /** @const */ var props = /** @type {Array.<string>} */ ([]);
    for (var prop in style) {
        if (Object.prototype.hasOwnProperty.call(style, prop)) {
            var val = style[prop];
            props.push(prop + val.value + val.priority);
        }
    }
    return props.sort().join("^");
};

/**
 * @private
 * @param {!adapt.csscasc.ElementStyle} style
 * @return {!vivliostyle.page.PageRuleMasterInstance}
 */
vivliostyle.page.PageManager.prototype.generatePageRuleMaster = function(style) {
    var pageMaster = new vivliostyle.page.PageRuleMaster(this.pageScope,
        /** @type {adapt.pm.RootPageBox} */ (this.rootPageBoxInstance.pageBox), style);

    var pageMasterInstance = pageMaster.createInstance(this.rootPageBoxInstance);
    // Do the same initialization as in adapt.ops.StyleInstance.prototype.init
    pageMasterInstance.applyCascadeAndInit(this.cascadeInstance, this.docElementStyle);
    pageMasterInstance.adjustContainingBlock(this.context);
    pageMasterInstance.resolveAutoSizing(this.context);
    return pageMasterInstance;
};

/**
 * @param {string} pageType
 * @constructor
 * @extends {adapt.csscasc.ChainedAction}
 */
vivliostyle.page.CheckPageTypeAction = function(pageType) {
    adapt.csscasc.ChainedAction.call(this);
    /** @const */ this.pageType = pageType;
};
goog.inherits(vivliostyle.page.CheckPageTypeAction, adapt.csscasc.ChainedAction);

/**
 * @override
 */
vivliostyle.page.CheckPageTypeAction.prototype.apply = function(cascadeInstance) {
    if (cascadeInstance.currentPageType === this.pageType) {
        this.chained.apply(cascadeInstance);
    }
};

/**
 * @override
 */
vivliostyle.page.CheckPageTypeAction.prototype.getPriority = function() {
    return 0;
};

/**
 * @override
 */
vivliostyle.page.CheckPageTypeAction.prototype.makePrimary = function(cascade) {
    if (this.chained) {
        cascade.insertInTable(cascade.pagetypes, this.pageType, this.chained);
    }
    return true;
};

/**
 * @param {!adapt.expr.LexicalScope} scope
 * @param {!adapt.cssparse.DispatchParserHandler} owner
 * @param {!adapt.csscasc.CascadeParserHandler} parent
 * @param {adapt.cssvalid.ValidatorSet} validatorSet
 * @constructor
 * @extends {adapt.csscasc.CascadeParserHandler}
 * @implements {adapt.cssvalid.PropertyReceiver}
 */
vivliostyle.page.PageParserHandler = function(scope, owner, parent, validatorSet) {
    adapt.csscasc.CascadeParserHandler.call(this, scope, owner, null, parent, null, validatorSet, false);
};
goog.inherits(vivliostyle.page.PageParserHandler, adapt.csscasc.CascadeParserHandler);

/**
 * @override
 */
vivliostyle.page.PageParserHandler.prototype.tagSelector = function(ns, name) {
    if (name) {
        this.chain.push(new vivliostyle.page.CheckPageTypeAction(name));
        this.specificity += 0x10000;
    }
};

/**
 * @override
 */
vivliostyle.page.PageParserHandler.prototype.pseudoclassSelector = function(name, params) {
    // TODO
};

/**
 * @override
 */
vivliostyle.page.PageParserHandler.prototype.insertNonPrimary = function(action) {
    // We represent page rules without selectors by *, though it is illegal in CSS
    this.cascade.insertInTable(this.cascade.pagetypes, "*", action);
};
