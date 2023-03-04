export type HtmlElementBuilderOptions = {
    text?: string,
    style?: object, 
    visible?: boolean,
    attributes?: object,
    eventType?: string,
    eventCallback?: (e: HTMLElement) => void
};

export const build = (type: string, options: HtmlElementBuilderOptions = {}): HTMLElement => {
    const {
        text,
        style = {}, 
        visible = true,
        attributes = {},
        eventType,
        eventCallback
    } = options;

    const element = document.createElement(type);
    if (text) element.innerText = text;

    for (const [key, value] of Object.entries(style)) {
        element.style.setProperty(key, value);
    }

    if (!visible) element.style.display = 'none';

    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }

    if (eventType && eventCallback) {
        element.addEventListener(eventType, () => eventCallback(element));
    }

    return element;
};

export const append = (parent: HTMLElement, ...children: HTMLElement[]): HTMLElement => {
    for (const childElement of children) parent.appendChild(childElement);
    return parent;
};

export const toggleVisibility = (elements: HTMLElement[] = [], visibleStyle = 'block'): void => {
    elements.forEach(element => {
        element.style.display = element.style.display === 'none' ? visibleStyle : 'none';
    });
};
