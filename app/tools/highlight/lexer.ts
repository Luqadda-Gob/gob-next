import { TOKEN_TYPES, KEYWORDS } from "./tokenTypes";

export default function lexer(src: string) {
    if (typeof src === "string") {
        const characters = src.split("");
        const tokens: string[] = [];
        const addToken = (type: string, value: string) => {
            const type_value: any = type === TOKEN_TYPES.EOF ? { type } : { type, value };
            tokens.push(type_value);
        }
        const concat_characters = (chars: any, index: number, accepted_chars: any) => {
            let str = "";
            while (index < chars.length) {
                if (accepted_chars.test(chars[index]) === false) break;
                str += chars[index];
                index++;
            }
            return str;
        }
        let word = "";
        let is_quote_string = false;

        for (let i = 0; i < characters.length; i++) {
            switch (characters[i]) {
                case " ":
                    addToken(TOKEN_TYPES.WHITESPACE, characters[i]);
                    continue;
                case "\n":
                    addToken(TOKEN_TYPES.WHITESPACE, characters[i]);
                    continue;
                case "\t":
                    addToken(TOKEN_TYPES.WHITESPACE, characters[i]);
                    continue;
                case "\r":
                    addToken(TOKEN_TYPES.WHITESPACE, characters[i]);
                    continue;
                case "(":
                    addToken(TOKEN_TYPES.LEFT_PAREN, characters[i]);
                    continue;
                case ")":
                    addToken(TOKEN_TYPES.RIGHT_PAREN, characters[i]);
                    continue;
                case "{":
                    addToken(TOKEN_TYPES.LEFT_BRACE, characters[i]);
                    continue;
                case "}":
                    addToken(TOKEN_TYPES.RIGHT_BRACE, characters[i]);
                    continue;
                case "[":
                    addToken(TOKEN_TYPES.LEFT_SQUARE, characters[i]);
                    continue;
                case "]":
                    addToken(TOKEN_TYPES.RIGHT_SQUARE, characters[i]);
                    continue;
                case ",":
                    addToken(TOKEN_TYPES.COMMA, characters[i]);
                    continue;
                case ";":
                    addToken(TOKEN_TYPES.SEMICOLON, characters[i]);
                    continue;
                case ".":
                    addToken(TOKEN_TYPES.DOT, characters[i]);
                    continue;
                case "+":
                    if (characters[i + 1] === "=") {
                        addToken(TOKEN_TYPES.COMPOUND_PLUS, "+=")
                        i++;
                    } else {
                        addToken(TOKEN_TYPES.PLUS, "+");
                    }
                    continue;
                case "-":
                    if (characters[i + 1] === "=") {
                        addToken(TOKEN_TYPES.COMPOUND_MINUS, "-=")
                        i++;
                    } else {
                        addToken(TOKEN_TYPES.MINUS, "-");
                    }
                    continue;
                case "*":
                    if (characters[i + 1] === "=") {
                        addToken(TOKEN_TYPES.COMPOUND_STAR, "*=")
                        i++;
                    } else {
                        addToken(TOKEN_TYPES.STAR, "*");
                    }
                    continue;
                case "/":
                    if (characters[i + 1] === "=") {
                        addToken(TOKEN_TYPES.COMPOUND_SLASH, "/=")
                        i++;
                    }
                    else if (!is_quote_string && characters[i + 1] === "/") {
                        word = concat_characters(characters, i, /[^\n]/);
                        addToken(TOKEN_TYPES.COMMENT, word);
                        i += word.length - 1;
                    }
                    else {
                        addToken(TOKEN_TYPES.SLASH, "/");
                    }
                    continue;
                case "%":
                    if (characters[i + 1] === "=") {
                        addToken(TOKEN_TYPES.COMPOUND_PERCENT, "%=")
                        i++;
                    } else {
                        addToken(TOKEN_TYPES.PERCENT, "%");
                    }
                    continue;
                case "!":
                    if (characters[i + 1] === "=") {
                        addToken(TOKEN_TYPES.BANG_EQUAL, "!=")
                        i++;
                    } else {
                        addToken(TOKEN_TYPES.BANG, "!");
                    }
                    continue;
                case "=":
                    if (characters[i + 1] === "=") {
                        addToken(TOKEN_TYPES.EQUAL_EQUAL, "==")
                        i++;
                    } else {
                        addToken(TOKEN_TYPES.EQUAL, "=");
                    }
                    continue;
                case ">":
                    if (characters[i + 1] === "=") {
                        addToken(TOKEN_TYPES.GREATER_EQUAL, ">=")
                        i++;
                    } else {
                        addToken(TOKEN_TYPES.GREATER, ">");
                    }
                    continue;
                case "<":
                    if (characters[i + 1] === "=") {
                        addToken(TOKEN_TYPES.LESS_EQUAL, "<=")
                        i++;
                    } else {
                        addToken(TOKEN_TYPES.LESS, "<");
                    }
                    continue;
                case '"':
                    addToken(TOKEN_TYPES.QUOTE, characters[i]);
                    word = concat_characters(characters, i + 1, /[^"]/);
                    addToken(TOKEN_TYPES.STRING, word);
                    i += word.length + 1;
                    if (characters[i] === '"') {
                        addToken(TOKEN_TYPES.QUOTE, characters[i]);

                    }
                    continue;

                case "'":
                    addToken(TOKEN_TYPES.QUOTE, characters[i]);
                    word = concat_characters(characters, i + 1, /[^']/);
                    addToken(TOKEN_TYPES.STRING, word);
                    i += word.length + 1;
                    if (characters[i] === "'") {
                        addToken(TOKEN_TYPES.QUOTE, characters[i]);

                    }
                    continue;
                default:
                    if (/[0-9]/.test(characters[i])) {
                        word = concat_characters(characters, i, /[0-9.]/);
                        addToken(TOKEN_TYPES.NUMBER, word);
                        i += word.length - 1;
                        continue;
                    }
                    else if (/[a-zA-Z_$]/.test(characters[i])) {
                        word = concat_characters(characters, i, /[a-zA-Z0-9_$]/);
                        i += word.length - 1;
                        const type = KEYWORDS[word] ?? TOKEN_TYPES.IDENTIFIER;
                        if (word === "door") {
                            addToken(TOKEN_TYPES.VAR, word);
                        }
                        else if (word === "dherer") {
                            addToken(TOKEN_TYPES.LENGTH, word);
                        }
                        else if (word === "daabac" || word === "daabacLn") {
                            const t = word === "daabac" ? TOKEN_TYPES.PRINT : TOKEN_TYPES.PRINTLN;
                            addToken(t, word);
                        }
                        else if (type === TOKEN_TYPES.IDENTIFIER && characters[i + 1] === "(") {
                            addToken(TOKEN_TYPES.CALLABLE, word);
                        } else {
                            addToken(type, word);
                        }
                        continue;
                    }
                    else {
                        word = concat_characters(characters, i, /[\s\S]/);
                        addToken(TOKEN_TYPES.OTHER, word);
                        i += word.length - 1;
                        continue;
                    }

            }
            word = "";
        }
        addToken(TOKEN_TYPES.EOF, "");
        return tokens;
    }
}
