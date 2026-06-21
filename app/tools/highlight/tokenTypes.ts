const TOKEN_TYPES = {
    // Single-character tokens.
    LEFT_PAREN: "LEFT_PAREN", // `(` 
    RIGHT_PAREN: "RIGHT_PAREN", // `)`
    LEFT_BRACE: "LEFT_BRACE", // `{`
    RIGHT_BRACE: "RIGHT_BRACE", // `}`
    LEFT_SQUARE: "LEFT_SQUARE", // `[
    RIGHT_SQUARE: "RIGHT_SQUARE", // `]`
    COMMA: "COMMA", // `,`
    SEMICOLON: "SEMICOLON", // `;`
    DOT: "DOT", // `.`
    PLUS: "PLUS", // `+`
    MINUS: "MINUS", // `-`
    STAR: "STAR", // `*`
    SLASH: "SLASH", // `/`
    PERCENT: "PERCENT", // `%`
    COMPOUND_PLUS: "COMPOUND_PLUS", // `+=`
    COMPOUND_MINUS: "COMPOUND_MINUS", // `-=`
    COMPOUND_STAR: "COMPOUND_STAR", // `*=`
    COMPOUND_SLASH: "COMPOUND_SLASH", // `/=`
    COMPOUND_PERCENT: "COMPOUND_PERCENT", // `%=`
    BANG: "BANG", // `!`
    BANG_EQUAL: "BANG_EQUAL", // `!=`
    EQUAL: "EQUAL", // `=`
    EQUAL_EQUAL: "EQUAL_EQUAL", // `==`
    GREATER: "GREATER", // `>`
    GREATER_EQUAL: "GREATER_EQUAL", // `>=`
    LESS: "LESS", // `<`
    LESS_EQUAL: "LESS_EQUAL", // `<=`

    // Literals.
    IDENTIFIER: "IDENTIFIER",
    STRING: "STRING", // `""` | `''`
    NUMBER: "NUMBER", // `0-9`

    // Keywords.
    AND: "AND", // `iyo`
    OR: "OR", // `ama`
    EXTENDS: "EXTENDS", // `dhaxal`
    IF: "IF",  // `kol`
    ELSE_IF: "ELSE_IF", // `kolkale`
    ELSE: "ELSE", // `kale`
    TRUE: "TRUE", // `run`
    FALSE: "FALSE", // `been`
    NIL: "NIL", // `ban`
    FUN: "FUN", // `qabte`
    RETURN: "RETURN", // `celi`
    FOR: "FOR", // `wareeg`
    PRINT: "PRINT", // `daabac`
    PRINTLN: "PRINTLN", // `daabacLn`
    CLASS: "CLASS", // `cayn`
    SUPER: "SUPER",
    THIS: "THIS", // `kan`
    VAR: "VAR", // `door` 
    WHILE: "WHILE", // `intay`
    LENGTH: "LENGTH", // `dherer`

    // Comment
    COMMENT: "COMMENT",

    //Quote
    QUOTE: "QUOTE",

    // Whitespaces
    WHITESPACE: "WHITESPACE",

    // Function Call
    CALLABLE: "CALLABLE",

    // Other
    OTHER: "OTHER",

    EOF: "EOF"
} as const;




type TokenType = typeof TOKEN_TYPES[keyof typeof TOKEN_TYPES];
const KEYWORDS: Record<string, TokenType> = {
    "iyo": TOKEN_TYPES.AND,
    "ama": TOKEN_TYPES.OR,
    "dhaxal": TOKEN_TYPES.EXTENDS,
    "kol": TOKEN_TYPES.IF,
    "kolkale": TOKEN_TYPES.ELSE_IF,
    "kale": TOKEN_TYPES.ELSE,
    "run": TOKEN_TYPES.TRUE,
    "been": TOKEN_TYPES.FALSE,
    "ban": TOKEN_TYPES.NIL,
    "qabte": TOKEN_TYPES.FUN,
    "celi": TOKEN_TYPES.RETURN,
    "wareeg": TOKEN_TYPES.FOR,
    // "daabac": TOKEN_TYPES.PRINT,
    // "daabacLn": TOKEN_TYPES.PRINTLN,
    // "dherer": TOKEN_TYPES.LENGTH,
    "cayn": TOKEN_TYPES.CLASS,
    "kan": TOKEN_TYPES.THIS,
    "intay": TOKEN_TYPES.WHILE,
};

export {
    TOKEN_TYPES,
    KEYWORDS
}