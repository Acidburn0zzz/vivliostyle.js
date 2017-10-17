module.exports = [
    {
        category: "General",
        files: [
            {file: "print_media/", title: "Print media"},
            {file: "running_header_adaptive.html", title: "Running header emulation with Adaptive Layout"},
            {file: "case_sensitivity/html.html", title: "HTML case sensitivity"},
            {file: "attr_selectors.html", title: "Attribute selectors"},
            {file: "ruby-broken-pagination.html", title: "Ruby broken pagination"},
            {file: "css-parse-error/gradient-background-image.html", title: "Gradient background-image"},
            {file: "rem_in_page_margin.html", title: "rem in page margin"},
            {file: "web_font_in_page_margin.html", title: "Web font in page margin"},
            {file: "crop-marks.html", title: "Printer marks"},
            {file: "empty_page.html", title: "Empty page"},
            {file: ["multiple_html/first.html", "multiple_html/second.html"], title: "Multiple HTML files"},
            {file: "absolute_positioning.html", title: "Absolute positioning"},
            {file: "relative_positioning_pagination.html", title: "Relative positioning pagination"},
            {file: "relative_positioning_columns.html", title: "Relative positioning columns"},
            {file: "flex_and_large_img.html", title: "Flex box pagination"},
            {file: "unbreakable_box.html", title: "Unbreakable box at the end of a flow"},
            {file: "selector_bug.html", title: "Selector bug"},
            {file: "outline.html", title: "Outline"},
            {file: "font-feature-settings.html", title: "Font feature settings"},
            {file: "background-gradient.html", title: "Background gradient"},
            {file: "incorrect_layout_with_empty_partition.html", title: "Incorrect layout with empty partition"},
            {file: "nth_selectors.html", title: "nth selectors"},
            {file: "empty_selector.html", title: "empty selector"},
            {file: "ui_state_selectors.html", title: "UI state selectors"},
            {file: "not-pseudo-selector.html", title: ":not pseudo selector"},
            {file: "math-sample.html", title: "MathJax"},
            {file: "background-shorthand.html", title: "Background shorthand"},
            {file: "prefixed_properties.html", title: "Prefixed properties"},
            {file: "filter_property.html", title: "Filter property"},
            {file: "float-bug-test.html", title: "Float bug test"},
            {file: "left-float-bug.html", title: "Float bug test: Left float"},
            {file: "white-space_clear.html", title: "Combination of white-space and clear"},
            {file: "clear-bug-test.html", title: "Float clear bug"},
            {file: "float-text-offset-bug.html", title: "Float text offset bug"},
            {file: "content-attr.html", title: "Content attr()"},
            {file: "relative_floats.html", title: "Floats with position: relative"},
            {file: "target-counter.html", title: "target-counter"},
            {file: "exclusion_with_printer_marks.html", title: "Exclusion with printer marks"},
            {file: "box-decoration-break.html", title: "box-decoration-break"},
            {file: "image-resolution.html", title: "image-resolution"},
            {file: "target_blank_link.html", title: "target=_blank links"},
            {file: "rem_in_relpos.html", title: "rem in position: relative element"},
            {file: "svg_properties.html", title: "SVG properties"},
            {file: "font_property.html", title: "Font property"},
            {file: "justification.html", title: "Justification"},
            {file: "justification_vertical.html", title: "Justification (vertical writing-mode)"},
            {file: "compositing.html", title: "Compositing and Blending"},
            {file: "content-url-element.html", title: "Content URL"},
            {file: "content-in-page-margin-box.html", title: "Content in page margin box"},
            {file: "flowchunk_overflow_bug.html", title: "Flowchunk overflow bug"},
            {file: "pages_counter.html", title: "pages counter"},
            {file: "float-in-relative-bug.html", title: "Float in position:relative bug"}
        ]
    },
    {
        category: "Page breaks",
        files: [
            {file: "page_breaks/break-inside_values.html", title: "break-inside values"},
            {file: "page_breaks/break_values.html", title: "break values"},
            {file: "page_breaks/truncate_margin_at_breaks.html", title: "Truncate margin at breaks"},
            {file: "page_breaks/combine_breaks.html", title: "Combine forced break values"},
            {file: "page_breaks/break_left_right.html", title: "break-before/after: left/right"},
            {file: "page_breaks/page_break_between_flow_elements.html", title: "Page break between flow elements"},
            {file: "page_breaks/break_on_pseudo_of_flow_elements.html", title: "Break on pseudoelements of flow elements"},
            {file: "page_breaks/page_break_bug_with_exclusions.html", title: "Page break bug with exclusions (on Firefox)"},
            {file: "page_breaks/page_break_bug_in_vertical_text.html", title: "Page break bug in vertical text (on Firefox)"},
            {file: "page_breaks/class_C_break_point.html", title: "Class C break point"}
        ]
    },
    {
        category: "Column",
        files: [
            {file: "column/column-fill_balance.html", title: "column-fill: balance"},
            {file: "column/column-fill_balance-all.html", title: "column-fill: balance-all"}
        ]
    },
    {
        category: "Table",
        files: [
            {file: "table/table_at_flow_root.html", title: "Table at flow root"},
            {file: "table/table_col_width.html", title: "Table column width"},
            {file: "table/table_col_width_vertical.html", title: "Table column width (vertical writing-mode)"},
            {file: "table/table_rowspan.html", title: "Table rowspan"},
            {file: "table/table_rowspan_vertical.html", title: "Table rowspan (vertical writing-mode)"},
            {file: "table/table_colspan.html", title: "Table colspan"},
            {file: "table/table_colspan_vertical.html", title: "Table colspan (vertical writing-mode)"},
            {file: "table/table_vertical_align.html", title: "Table vertical-align"},
            {file: "table/table_vertical_align_vertical.html", title: "Table vertical-align (vertical writing-mode)"},
            {file: "table/table_repeating_header_footer.html", title: "Table repeating header/footer"},
            {file: "table/table_repeating_header_footer_vertical.html", title: "Table repeating header/footer (vertical writing-mode)"},
            {file: "table/fragment_non-overflowing_table.html", title: "Fragment a non-overflowing table"}
        ]
    },
    {
        category: "Page floats",
        files: [
            {file: "page_floats/page_page_floats.html", title: "'Page' page floats"},
            {file: "page_floats/page_page_floats_vertical.html", title: "'Page' page floats (vertical writing-mode)"},
            {file: "page_floats/region_page_floats.html", title: "'Region' page floats"},
            {file: "page_floats/region_page_floats_vertical.html", title: "'Region' page floats (vertical writing-mode)"},
            {file: "page_floats/column_page_floats.html", title: "'Column' page floats"},
            {file: "page_floats/column_page_floats_vertical.html", title: "'Column' page floats (vertical writing-mode)"},
            {file: "page_floats/region_page_floats_with_exclusions.html", title: "'Region' page floats with exclusions"},
            {file: "page_floats/region_page_floats_with_exclusions_vertical.html", title: "'Region' page floats with exclusions (vertical writing-mode)"},
            {file: "page_floats/column_page_floats_with_exclusions.html", title: "'Column' page floats with exclusions"},
            {file: "page_floats/column_page_floats_with_exclusions_vertical.html", title: "'Column' page floats with exclusions (vertical writing-mode)"},
            {file: "page_floats/multiple_kind_of_page_floats.html", title: "Multiple kind of page floats"},
            {file: "page_floats/multiple_kind_of_page_floats_vertical.html", title: "Multiple kind of page floats (vertical writing-mode)"},
            {file: "page_floats/column_region_page_floats.html", title: "'Column' and 'region' page floats in single column"},
            {file: "page_floats/inline_page_floats.html", title: "Inline page floats"},
            {file: "page_floats/inline_page_floats_vertical.html", title: "Inline page floats (vertical writing-mode)"},
            {file: "page_floats/forced_break_and_page_floats.html", title: "Forced break and page floats"},
            {file: "page_floats/defer_page_page_floats_by_anchor.html", title: "Defer page page floats by anchor"},
            {file: "page_floats/defer_region_page_floats_by_anchor.html", title: "Defer region page floats by anchor"},
            {file: "page_floats/defer_column_page_floats_by_anchor.html", title: "Defer column page floats by anchor"},
            {file: "page_floats/fragmented_page_floats.html", title: "Fragmented page floats"},
            {file: "page_floats/multiple_deferred_page_floats.html", title: "Multiple deferred page floats"},
            {file: "page_floats/test_pagefloatlayoutcontext_previous_sibling.html", title: "Test PageFloatLayoutContext previous sibling"},
            {file: "page_floats/floats_deferred_by_larger_floats.html", title: "Floats deferred by larger floats"},
            {file: "page_floats/deferred_floats.html", title: "Deferred page floats"},
            {file: "page_floats/column-span_on_page_floats.html", title: "column-span on page floats"},
            {file: "page_floats/float_snap-block.html", title: "float: snap-block"},
            {file: "page_floats/clear_page_floats.html", title: "Clear page floats"},
            {file: "page_floats/clear_page_floats_vertical.html", title: "Clear page floats (vertical writing-mode)"},
            {file: "page_floats/clear_on_page_floats.html", title: "clear on page floats"},
            {file: "page_floats/text_around_fragmented_page_floats.html", title: "Forbid text around fragmented page floats"},
            {file: "page_floats/page_floats_and_break_avoid.html", title: "Page floats and break-*: avoid"},
            {file: "page_floats/float-min-wrap-block.html", title: "float-min-wrap-block"},
            {file: "page_floats/float-min-wrap-block_vertical.html", title: "float-min-wrap-block (vertical writing-mode)"}
        ]
    },
    {
        category: "Footnotes",
        files: [
            {file: "footnotes/footnotes_widows_bug.html", title: "Footnotes widows bug"},
            {file: "footnotes/footnotes_and_page_floats.html", title: "Footnotes and page floats"},
            {file: "footnotes/footnote_with_pseudoelement.html", title: "Footnote with pseudoelement"},
            {file: "footnotes/footnote-policy.html", title: "footnote-policy"}
        ]
    },
    {
        category: "Repeating Elements",
        files: [
            {file: "repeating_elements/repeating_element.html", title: "repeating elements across fragment"},
            {file: "repeating_elements/repeating_element_vertical.html", title: "repeating elements across fragment (vertical writing-mode)"},
            {file: "repeating_elements/nesting.html", title: "nesting repeating elements"},
            {file: "repeating_elements/nesting_vertical.html", title: "nesting repeating elements (vertical writing-mode)"},
            {file: "repeating_elements/nesting_table.html", title: "nesting table"},
            {file: "repeating_elements/nesting_table_vertical.html", title: "nesting table (vertical writing-mode)"},
            {file: "repeating_elements/repeat-on-break_auto.html", title: "repeat-on-break: auto"},
            {file: "repeating_elements/flexbox.html", title: "flexbox"},
            {file: "repeating_elements/priority_of_dropping.html", title: "priority of dropping"},
            {file: "repeating_elements/repeating_page_floats.html", title: "Page floats with repeating elements"},
            {file: "repeating_elements/repeating_page_floats_vertical.html", title: "Page floats with repeating elements (vertical writing-mode)"}
        ]
    },
    {
        category: "nth-fragment selectors",
        files: [
            {file: "nth-fragment/nth-fragment_selectors.html", title: "nth-fragment selectors"},
            {file: "nth-fragment/nth-fragment_selectors_with_region_rule.html", title: "nth-fragment selectors with region rule"},
            {file: "nth-fragment/nesting_nth-fragment_selectors.html", title: "nesting nth-fragment selectors"},
            {file: "nth-fragment/nesting_nth-fragment_selectors2.html", title: "nesting nth-fragment selectors (2)"},
            {file: "nth-fragment/matching_multiple_elements_in_hierarchy.html", title: "matching multiple elements in the hierarchy"},
            {file: "nth-fragment/sibling_selector.html", title: "use nth-fragment with sibling selectors"},
            {file: "nth-fragment/table.html", title: "table"},
            {file: "nth-fragment/float.html", title: "page floats"}
        ]
    },
    {
        category: "after-if-continues pseudo elements",
        files: [
            {file: "after_if_continues/after-if-continues.html", title: "create and insert an after-if-continues psuedo element"},
            {file: "after_if_continues/after-if-continues_vertical.html", title: "create and insert an after-if-continues psuedo element (vertical writing-mode)"},
            {file: "after_if_continues/after-if-continues_page_float.html", title: "after-if-continues on page_float"}
        ]
    }
];