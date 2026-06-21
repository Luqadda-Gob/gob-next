import { useState, useEffect, useRef, CSSProperties } from "react";
import highlightText from "./highlight";

export default function Editor({ setCode, code }: { setCode: any, code: any }) {
    const escapeHTML = (str: string) => {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
    const [inputValue, setInputValue] = useState(escapeHTML(code));
    const [editorHeight, setEditorHeight] = useState("");
    const textareaContainer = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputRendererRef = useRef<HTMLDivElement>(null);

    const editorRows = Math.min(24, Math.max(7, code.split("\n").length + 1));

    useEffect(() => {
        setInputValue(code);
        if (textareaRef.current) {
            const styles = window.getComputedStyle(textareaRef.current);
            setEditorHeight(styles.height);
        }
    }, [code, editorHeight]);

    useEffect(() => {
        if (textareaRef.current) {
            setInputValue(textareaRef.current.value);
        }
    })
    const highlightedCode = highlightText(inputValue);

    useEffect(() => {
        if (inputRendererRef.current) {
            inputRendererRef.current.innerHTML =  highlightedCode || inputValue;
        }
        if (textareaContainer.current) {
            textareaContainer.current.style.height = editorHeight;
        }
    }, [highlightedCode, inputValue, editorHeight]);

    const textarea_container_styles: CSSProperties = {
        position: "relative",
        width: "100%",
        minHeight: "250px",
        backgroundColor: "#141414",
        padding: "20px"
    }
    const textarea_styles: CSSProperties = {
        backgroundColor: "transparent",
        color: "transparent",
        resize: "none",
        caretColor: "#fff",
        height: "100%"
    }
    const renderer_styles: CSSProperties = {
        // --- //
    }
    const shared_styles: CSSProperties = {
        position: "absolute",
        width: "100%",
        height: "fit-content",
        fontSize: "14px",
        fontFamily: "monospace",
        padding: 0,
        margin: 0,
        whiteSpace: "pre-wrap",
        lineHeight: "1.8",
        overflow: "hidden"
    }
    return (
        <div style={textarea_container_styles} ref={textareaContainer}>
            <div style={{ ...shared_styles, ...renderer_styles }}
                ref={inputRendererRef}
            >
            </div>
            <textarea
                aria-label="Gob code"
                onChange={(event) => {
                    setInputValue(event.target.value);
                    setCode(event.target.value);
                }}
                rows={editorRows}
                spellCheck={false}
                value={code}
                style={{ ...textarea_styles, ...shared_styles }}
                ref={textareaRef}
            />
        </div>
    )
}