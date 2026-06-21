import lexer from "./lexer";
import { TOKEN_TYPES, KEYWORDS } from "./tokenTypes";
import { colors } from "./colors";

const addStyle = (token: string, color: string, isBold: boolean = false, isItalic: boolean = false) => {
    return `<span style='color:${color}; ${isBold ? "font-weight: bold;" : ""}${isItalic ? "font-style: italic;" : ""}'>${token}</span>`
};

export default function highlightText(text: string) {
    if (text) {
        const tokens: any = lexer(text);
        const highlightedTokens = [];
        if (Array.isArray(tokens) && tokens.length > 0) {
            for (const token of tokens) {
                const is_keyword = (value: string) => KEYWORDS[value] ? true : false;
                if (token.type === TOKEN_TYPES.WHITESPACE) {
                    highlightedTokens.push(token.value);
                }
                else if (is_keyword(token.value)) {
                    highlightedTokens.push(addStyle(token.value, colors.keyword));
                }
                else if (token.type === TOKEN_TYPES.IDENTIFIER) {
                    highlightedTokens.push(addStyle(token.value, colors.identifier));
                }
                else if (token.type === TOKEN_TYPES.STRING) {
                    highlightedTokens.push(addStyle(token.value, colors.string));

                }
                else if (token.type === TOKEN_TYPES.QUOTE) {
                    highlightedTokens.push(addStyle(token.value, colors.quote));

                }
                else if (token.type === TOKEN_TYPES.NUMBER) {
                    highlightedTokens.push(addStyle(token.value, colors.number));
                }
                else if (token.type === TOKEN_TYPES.VAR) {
                    highlightedTokens.push(addStyle(token.value, colors.variable));
                }
                else if (token.type === TOKEN_TYPES.CALLABLE) {
                    highlightedTokens.push(addStyle(token.value, colors.callable));
                }
                else if (token.type === TOKEN_TYPES.COMMENT) {
                    highlightedTokens.push(addStyle(token.value, colors.comment));
                }
                else if (token.type === TOKEN_TYPES.LENGTH) {
                    highlightedTokens.push(addStyle(token.value, colors.callable));
                }
                else if (token.type === TOKEN_TYPES.PRINT || token.type === TOKEN_TYPES.PRINTLN) {
                    highlightedTokens.push(addStyle(token.value, colors.print));
                }
                else {
                    if (token.type === TOKEN_TYPES.EOF) {
                        continue;
                    } else {
                        highlightedTokens.push(addStyle(token.value, "#ccc"));
                    }
                }
            }
            return highlightedTokens.join("");
        }
    }
}