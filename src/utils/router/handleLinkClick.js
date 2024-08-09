export default function handleLinkClick (callback) {
    return function (e) {
        e.preventDefault()
        callback()
    }
}