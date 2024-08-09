export default function getIsFirstChild (el) {
    return null != el && el === el.parentElement.firstChild
}