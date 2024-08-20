import { NODES } from "schemas/recipe";
import { cleanText, getHeadingTextContent } from "../parseUtils";
import blankRecipe from "../blankRecipe";
import { findValues } from "utils/recipes/fragment/RecipeFragment";
import $$ from "utils/dom/querySelectorAll";

function genericParser (shadow) {
    // Attempt to parse using headings
    const headings = Array.from(shadow.querySelectorAll('h1, h2, h3'));
        
    const title = (shadow.querySelector('h1') ?? shadow.querySelector('title'))?.textContent;

    const ingredientsHeading = headings.find(heading => getHeadingTextContent(heading) === 'ingredients');
    const methodHeading = headings.find(heading => ['instructions', 'method', 'preparation', 'directions'].includes(getHeadingTextContent(heading)));
    const notesHeading = headings.find(heading => ['notes'].includes(getHeadingTextContent(heading)));

    const getIngredients = (heading) => {
        if (!heading || !heading.nextSibling) return [];

        let listEl;
        let ref = heading;
        while (null != ref.nextSibling) {
            const nextSibling = ref.nextSibling;
            if (nextSibling.querySelector('ul') || nextSibling.tagName === 'UL') {
            listEl = nextSibling.tagName === 'UL' ? nextSibling : nextSibling.querySelector('ul');
            break;
            }
            ref = nextSibling;
        }
        if (!listEl) return [];

        return Array.from(listEl.querySelectorAll('li')).map(li => ({type: NODES.INGREDIENT, text: cleanText(li.textContent)}));
    }
    const getMethod = (heading) => {
        if (!heading || null == heading?.nextSibling) return [];
        
        let method = [];
        let ref = heading;
        while (null != ref.nextSibling) {
            const nextSibling = ref.nextSibling;
            ref = nextSibling;

            if (!ref || ref?.className?.includes('adthrive')) continue;

            if (ref.nodeType === 3) {
                if (!ref.textContent.trim().length) continue;
                method.push({type: NODES.METHOD, text: cleanText(ref.textContent)});
            } else if (ref.tagName === 'UL' || ref.tagName === 'OL' || ref.querySelector('ul') || ref.querySelector('ol')) {
                method = method.concat(Array.from(ref.querySelectorAll('li')).map(li => ({type: NODES.STEP, text: cleanText(li.textContent)})));
                continue;
            } else if (['H2', 'H3', 'H4'].includes(ref.tagName) ) {
                method.push({type: NODES.HEADER, text: cleanText(ref.textContent)})
                continue;
            } else if (['DIV', 'P'].includes(ref.tagName)) {
                method.push({type: NODES.STEP, text: cleanText(ref.textContent)})
                continue;
            }
        }

        return method;
    }
    const getNotes = (heading) => {
        if (!heading || null == heading?.nextSibling) return [];
        
        let notes = [];
        let ref = heading;
        while (null != ref.nextSibling) {
            const nextSibling = ref.nextSibling;
            ref = nextSibling;

            if (!ref || ref?.className?.includes('adthrive')) continue;
            
            if (ref.nodeType === 3) {
                if (!ref.textContent.trim().length) continue;
                notes.push({type: NODES.NOTE, text: cleanText(ref.textContent)});
            } else if (ref.tagName === heading.tagName) {
                ref = null;
                continue;
            } else if (ref.tagName === 'UL' || ref.tagName === 'OL' || ref.querySelector('ul') || ref.querySelector('ol')) {
                notes = notes.concat(Array.from(ref.querySelectorAll('li')).map(li => ({type: NODES.NOTE, text: cleanText(li.textContent)})));
                continue;
            } else if (['DIV', 'P'].includes(ref.tagName)) {
                notes.push({type: NODES.NOTE, text: cleanText(ref.textContent)})
                continue;
            }
        }

        return notes;
    }

    const amountFragment = findValues(shadow.textContent.match(/(serves ?\d+( ?(to|-) ?\d+)?)|(\d+( ?(to|-) ?\d+)? ?servings)/gi)?.[0] ?? '');
    const amount = amountFragment && amountFragment.length > 0
        ? amountFragment[0].quantityText + ' servings'
        : '';

    const tags = $$(shadow, '[rel=tag]')
        .map(el => (el?.textContent ?? '').trim());

    return {
        ...blankRecipe,
        name: title,
        title: title,
        amount,
        tags,
        ingredients: getIngredients(ingredientsHeading),
        method: getMethod(methodHeading),
        notes: getNotes(notesHeading),
    };
}

export {
    genericParser as default
}