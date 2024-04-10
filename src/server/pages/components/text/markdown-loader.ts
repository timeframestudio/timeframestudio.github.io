import { marked, Token, Tokens } from "marked";
import { WebpageComponent } from "../webpage-component.js";
import { HeadingComponent } from "../heading-component.js";
import { ListTextComponent } from "./list-text-component.js";
import { PlainTextComponent } from "./plain-text-component.js";
import { StyledTextComponent } from "./styled-text-component.js";
import { LinkTextComponent } from "./link-text-component.js";
import { ParagraphComponent } from "./paragraph-component.js";
import { ListItemTextComponent } from "./list-item-text-component.js";
import { MarginComponent } from "../margin-component.js";
import { BlockquoteComponent } from "./blockquote-component.js";

export class MarkdownLoader {
    private first = false;

    constructor(private markdown: string) {
    }

    getComponents(): WebpageComponent[] {
        const lexer = new marked.Lexer();
        const tree = lexer.lex(this.markdown);

        this.first = true;

        const components = this.createComponents(tree);

        return Array.from(components);
    }

    private *createComponents(markdown: Token[]): Iterable<WebpageComponent> {
        for (let token of markdown) {
            if (token.type === 'heading') {
                yield* this.createHeadingComponent(token as Tokens.Heading);
            } else if (token.type === 'paragraph') {
                yield* this.createParagraphComponent(token as Tokens.Paragraph);
            } else if (token.type === 'list') {
                yield* this.createListComponent(token as Tokens.List);
            } else if (token.type === 'link') {
                yield* this.createLinkComponent(token as Tokens.Link);
            } else if (token.type === 'text') {
                yield* this.createTextComponent(token as Tokens.Text);
            } else if (token.type === 'strong') {
                yield* this.createStyledComponent(token as Tokens.Strong);
            } else if (token.type === 'em') {
                yield* this.createStyledComponent(token as Tokens.Em);
            } else if (token.type == 'blockquote') {
                yield* this.createBlockquoteComponent(token as Tokens.Blockquote);
            }
        }
    }

    private *createBlockquoteComponent(blockquote: Tokens.Blockquote): Iterable<WebpageComponent> {
        this.first = true;

        yield new BlockquoteComponent(...this.createComponents(blockquote.tokens));

        this.first = false;
    }

    private *createHeadingComponent(heading: Tokens.Heading): Iterable<WebpageComponent> {
        yield new HeadingComponent(heading.text, heading.depth);

        this.first = true;
    }

    private *createParagraphComponent(paragraph: Tokens.Paragraph): Iterable<WebpageComponent> {
        if (!this.first) yield new MarginComponent(MarginComponent.MarginSize.Thin);
        yield new ParagraphComponent(...this.createComponents(paragraph.tokens));

        this.first = false;
    }

    private *createListComponent(list: Tokens.List): Iterable<ListTextComponent> {
        const items: ListItemTextComponent[] = [];

        for (let item of list.items) {
            items.push(new ListItemTextComponent(...this.createComponents(item.tokens)));
        }

        yield new ListTextComponent(list.ordered ? 'ordered' : 'unordered', ...items);
    }

    private *createLinkComponent(link: Tokens.Link): Iterable<LinkTextComponent> {
        yield new LinkTextComponent([ ...this.createComponents(link.tokens) ], link.href);
    }

    private *createTextComponent(text: Tokens.Text): Iterable<WebpageComponent> {
        if (text.tokens) {
            yield* this.createComponents(text.tokens);
        } else {
            yield new PlainTextComponent(text.raw);
        }
    }

    private *createStyledComponent(styled: Tokens.Strong | Tokens.Em): Iterable<StyledTextComponent> {
        yield new StyledTextComponent(styled.type == 'strong' ? 'bold' : 'italic', ...this.createComponents(styled.tokens));
    }

    static load(markdown: string): WebpageComponent[] {
        const loader = new MarkdownLoader(markdown);
        return loader.getComponents();
    }
}