import { ReactElement, ReactNode, createElement } from 'react';

function reader(content: string): ReactNode {
    const parseStringToNodes = (content: string) => new DOMParser().parseFromString(content, 'text/html').body.childNodes;
    const elements: Element[] = Array.from(parseStringToNodes(content)) as Element[];
    const reactNodes = elements.map((element, index) => convertToReactNode(element, index));

    return reactNodes;
}

function convertToReactNode(element: Element, index: number): ReactNode {
    const { localName, attributes, childNodes, textContent } = element;
    const attributeObj: { style: Partial<Attr> } = { style: getAttributes(attributes) };
    const children: ReactNode[] = [];

    if (childNodes.length > 0 && localName) {
        (childNodes as unknown as Element[]).forEach((element, index2) => {
            children.push(convertToReactNode(element, index + index2 * index2));
        });
        const result: ReactElement = createElement(localName, { ...attributeObj, key: index }, children);
        return result;
    }

    return textContent;
}

function getAttributes(attributes: NamedNodeMap): Partial<Attr> {
    let attributeObj: Partial<Attr> = {};
    if (attributes) {
        Array.from(attributes).forEach((attribute) => {
            if (attribute.name === 'style' && attribute.nodeValue) {
                const styles = attribute.nodeValue.split(';');
                styles.forEach((element) => {
                    const [key, value] = element.split(':');
                    if (key) {
                        attributeObj = convertToJSAttr(key, value);
                    }
                });
            }
        });
    }
    return attributeObj;
}

function convertToJSAttr(key: string, value: string): Partial<Attr> {
    let style: Partial<Attr> = {};
    if (key.includes('-')) {
        const [first, second] = key.split('-');
        const convertToJsAttrKey = [first, second.charAt(0).toUpperCase() + second.slice(1)].join('');
        style = { ...style, [convertToJsAttrKey]: value };
    } else style = { ...style, [key]: value };
    return style;
}

export default reader;
