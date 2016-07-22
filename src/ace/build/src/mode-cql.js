define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DocCommentHighlightRules = function() {
    this.$rules = {
        "start" : [ {
            token : "comment.doc.tag",
            regex : "@[\\w\\d_]+" // TODO: fix email addresses
        },
        DocCommentHighlightRules.getTagRule(),
        {
            defaultToken : "comment.doc",
            caseInsensitive: true
        }]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
}

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex : "\\/\\*(?=\\*)",
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.DocCommentHighlightRules = DocCommentHighlightRules;

});

define("ace/mode/cql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var CQLHighlightRules = function() {

    var escapeRe = "\\\\(x\\h{2}|[0-2][0-7]{,2}|3[0-6][0-7]|37[0-7]?|[4-7][0-7]?|.)";

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "//$",
                next : "start"
            },
            {
                token : "comment",
                regex : "//",
                next : "singleLineComment"
            },

            DocCommentHighlightRules.getStartRule("doc-start"),

            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            },

            {
                token : "string.single", // character
                regex : "'(?:" + escapeRe + "|.)'"
            },
            {
                token : "string.start",
                regex : '\'',
                stateName: "qstring",
                next: [
                    { token: "string.single", regex: /\\\s*$/, next: "qstring" },
                    { token: "constant.language.escape", regex: escapeRe },
                    { token: "constant.language.escape", regex: /%[^'"\\]/ },
                    { token: "string.end", regex: '\'|$', next: "start" },
                    { defaultToken: "string.single"}
                ]
            },

            {
                token : "string.double", // character
                regex : "'(?:" + escapeRe + "|.)'"
            },
            {
                token : "namedexpression.start",
                regex : '"',
                stateName: "qqstring",
                next: [
                    { token: "string.double", regex: /\\\s*$/, next: "qqstring" },
                    { token: "constant.language.escape", regex: escapeRe },
                    { token: "constant.language.escape", regex: /%[^'"\\]/ },
                    { token: "namedexpression.end", regex: '"|$', next: "start" },
                    { defaultToken: "string.double"}
                ]
            },
            {
                token: "constant.date",
                regex: "@\\b[0-9][0-9][0-9][0-9](\\-[0-1][0-9](\\-[0-3][0-9](T[0-2][0-9](\\:[0-5][0-9](\\:[0-5][0-9](\\.[0-9][0-9]?[0-9]?(Z|((\\+|\\-)[0-2][0-9](\\:[0-5][0-9])?))?)?)?)?)?)?)?\\b"
            },
            {
                token: "constant.time",
                regex: "@\\bT[0-2][0-9](\\:[0-5][0-9](\\:[0-5][0-9](\\.[0-9][0-9]?[0-9]?(Z|((\\+|\\-)[0-2][0-9](\\:[0-5][0-9])?))?)?)?)?\\b"
            },
            {
                token: "constant.numeric",
                regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)\\b"
            },
            {
                token: "constant.language",
                regex: "\\b(true|false|null)\\b"
            },
            {
                token : "paren.lparen",
                regex : "[[({]"
            },
            {
                token : "paren.rparen",
                regex : "[\\])}]"
            },
            {
                token : "text",
                regex : "\\s+"
            },
            {
                token : "keyword.declarations",
                regex : "\\b(library|using|include|version|called|parameter|default|valueset|codesystems?|display|public|private|context +(Patient|Population)|define( +function +([^\\(]+))?)\\b"
            },
            {
                token : "operator.temporal",
                regex : "\\bsame +((year|month|day|hour|minute|second|millisecond) +)?(or +before|or +after|as)\\b"
            },
            {
                token : "operator.temporal",
                regex : "\\b(properly +)?within\\s+(\\d+)\\s+(year|month|day|hour|minute|second|millisecond)s? +of\\b"
            },
            {
                token : "operator.temporal",
                regex : "\\b(starts|ends|occurs|meets|overlaps|(properly +)?(contains|includes|during|included +in)|before|after|(start|end)( +of)?)\\b"
            },
            {
                token : "operator.temporal",
                regex : "\\b(year|month|day|hour|minute|second|millisecond)s?( +or +(less|more))? (before|after)\\b"
            },
            {
                token : "operator.logical",
                regex : "\\b(and|or|xor|not)\\b"
            },
            {
                token : "operator.nullological",
                regex : "\\b(Coalesce|is +null|is +not +null)\\b"
            },
            {
                token : "operator.type",
                regex : "\\b(cast|as|convert|to|is|ToBoolean|ToConcept|ToDateTime|ToDecimal|ToInteger|ToQuantity|ToString|ToTime)\\b"
            },
            {
                token : "operator.comparison",
                regex : "=|<|>|matches"
            },
            {
                token : "operator.comparison",
                regex : "\\b(properly +)?between\\b"
            },
            {
                token : "operator.arithmetic",
                regex : "\\+|\\-|\\*|\\/|\\^"
            },
            {
                token : "operator.arithmetic",
                regex : "\\b(Abs|Ceiling|div|Floor|Log|Ln|maximum|minimum|mod|predecessor +of|Round|successor +of|Truncate)\\b"
            },
            {
                token : "operator.string",
                regex : "\\b(Combine|Length|Lower|PositionOf|Split|Substring|Upper)\\b"
            },
            {
                // removed DateTime from regex for type evaluation
                token : "operator.datetime",
                regex : "\\b(Now|TimeOfDay|Today)\\b"
            },
            {
                token : "operator.datetime",
                regex : "\\b(year|month|day|hour|minute|second|millisecond|timezone|date|time) +from\\b"
            },
            {
                token : "operator.datetime",
                regex : "\\b(years|months|days|hours|minutes|seconds|milliseconds) +between\\b"
            },
            {
                token : "operator.datetime",
                regex : "\\b(duration|difference) +in +(years|months|days|hours|minutes|seconds|milliseconds) +of\\b"
            },
            {
                token : "operator.datetime",
                regex : "\\b(years?|months?|days?|hours?|minutes?|seconds?|milliseconds?)\\b"
            },
            {
                token : "operator.datetime",
                regex : "\\b(Calculate)?Age(In(Years|Months|Days|Hours|Minutes|Seconds))?(At)?\\b"
            },
            {
                token : "operator.interval",
                regex : "\\b(collapse|width +of)\\b"
            },
            {
                token : "operator.list",
                regex : "\\b(all|distinct|exists|expand|First|IndexOf|Last|Length|singleton +from)\\b"
            },
            {
                token : "operator.intervalOrList",
                regex : "\\b(contains|except|in|intersect|union)\\b"
            },
            {
                token : "operator.aggregate",
                regex : "\\b(AllTrue|AnyTrue|Avg|Count|Max|Min|Median|Mode|PopulationStdDev|PopulationVariance|StdDev|Sum|Variance)\\b"
            },
            {
                token : "control",
                regex : "\\b(if|then|else|case|when)\\b"
            },
            {
                token : "control.query",
                regex : "\\b(with|without|where|return|such that|sort( +asc(ending)?|desc(ending)?)?( +by)|asc(ending)|desc(ending))\\b"
            },
            {
                token : "support.type",
                regex : "\\b(Any|Boolean|Code|Concept|DateTime|Decimal|Integer|Interval|List|Quantity|String|Time|Tuple)\\b"
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : ".*?\\*\\/",
                next : "start"
            }, {
                token : "comment", // comment spanning whole line
                regex : ".+"
            }
        ],
        "singleLineComment" : [
            {
                token : "comment",
                regex : /\\$/,
                next : "singleLineComment"
            }, {
                token : "comment",
                regex : /$/,
                next : "start"
            }, {
                defaultToken: "comment"
            }
        ],
        "directive" : [
            {
                token : "constant.other.multiline",
                regex : /\\/
            },
            {
                token : "constant.other.multiline",
                regex : /.*\\/
            },
            {
                token : "constant.other",
                regex : "\\s*<.+?>",
                next : "start"
            },
            {
                token : "constant.other", // single line
                regex : '\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',
                next : "start"
            },
            {
                token : "constant.other", // single line
                regex : "\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",
                next : "start"
            },
            {
                token : "constant.other",
                regex : /[^\\\/]+/,
                next : "start"
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
    this.normalizeRules();
};

oop.inherits(CQLHighlightRules, TextHighlightRules);

exports.CQLHighlightRules = CQLHighlightRules;
});

define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"], function(require, exports, module) {
"use strict";

var Range = require("../range").Range;

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;
});

define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);

        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }

        var fw = this._getFoldWidgetBase(session, foldStyle, row);

        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart

        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);

        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);

        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);

            var range = session.getCommentFoldRange(row, i + match[0].length, 1);

            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }

            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };

    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);

            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }

        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;

        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);

});

define("ace/mode/cql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/cql_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var CQLHighlightRules = require("./cql_highlight_rules").CQLHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var Range = require("../range").Range;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = CQLHighlightRules;

    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();

    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            }
        } else if (state == "doc-start") {
            if (endState == "start") {
                return "";
            }
            var match = line.match(/^\s*(\/?)\*/);
            if (match) {
                if (match[1]) {
                    indent += " ";
                }
                indent += "* ";
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.$id = "ace/mode/cql";
}).call(Mode.prototype);

exports.Mode = Mode;
});
