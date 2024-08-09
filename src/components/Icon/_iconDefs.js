const iconDefs = {
  "search--16": [
    "M6.5 1a5.5 5.5 0 0 1 4.532 8.617l3.675 3.676-1.414 1.414-3.676-3.675A5.5 5.5 0 1 1 6.5 1zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z",
  ],
  "menu--24": ["m14.4 17v2h-14.4v-2zm9.6-6v2h-24v-2zm0-6v2h-24v-2z"],
  "scale--24": [
    "m20 14v6h3l-4 4-4-4h3v-6zm-6-6c0 2.7921062-1.6347134 5.2024047-3.9992639 6.3260191l-.0007361 1.6739809h-6l.00026701-1.6735043c-2.29687713-1.0910079-3.90533609-3.3960128-3.99620799-6.08584595l-.00405902-.24064975zm5-8 4 4h-3v6h-2v-6h-3z",
  ],
  "chevron--down--16": [
    "m11.8994984 5.84.7071067.70710678-4.6066051 4.60660512-4.60660515-4.60660512.70710678-.70710678 3.89949837 3.89907927z",
  ],
  "chevron--down--20": [
    "m10 14.7071068 6.7071068-6.7071068-1.4142136-1.41421356-5.2928932 5.29210676-5.29289322-5.29210676-1.41421356 1.41421356z",
  ],
  "translate--24": [
    "m20 16c2.209139 0 4 1.790861 4 4s-1.790861 4-4 4-4-1.790861-4-4 1.790861-4 4-4zm-16-5 3 3h-2v3c0 1.3873938.50721985 1.9524217 1.82367447 1.9970987l.17632553.0029013h5v2h-5c-2.47494279 0-3.91124538-1.3613043-3.99602135-3.7710266l-.00397865-.2289734v-3h-2zm19-1-3 3-3-3zm-6-7c2.4749428 0 3.9112454 1.36130433 3.9960214 3.77102655l.0039786.22897345v3h-2v-3c0-1.38739378-.5072198-1.9524217-1.8236745-1.99709869l-.1763255-.00290131h-5v-2zm-9-3v8h-8v-8z",
  ],
  "scale-down--24": ["m16 13v-2h-8v2z"],
  "scale-up--24": [
    "m13 16v-2.998853l3-.0001704v-2.0009766h-3v-3h-2v3h-3v2.0009766l3 .0001704v2.998853z",
  ],
  "logout--24": [
    "m7.9999083 3.93556522-.00023704 2.31935338c-1.81329875 1.2649708-2.99967126 3.36648003-2.99967126 5.7450814 0 3.8659932 3.13400675 7 7 7 3.8659932 0 7-3.1340068 7-7 0-2.37816365-1.1859359-4.47933712-2.9986702-5.74438295l-.0002368-2.31955412c2.9628447 1.4729113 4.998907 4.53065027 4.998907 8.06393707 0 4.9705627-4.0294373 9-9 9-4.97056275 0-9-4.0294373-9-9 0-3.53368482 2.03652103-6.59171468 4.9999083-8.06443478zm5.0000917-2.93556522v11h-2v-11z",
  ],
  "tick--15": [
    "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
  ],
  "tick--16": ["m12 4 1 1-7 7.5-3.5-3 1-1 2.5 2z"],
  "close--16": [
    "m12.2928932 2.29289322 1.4142136 1.41421356-4.29321358 4.29278644 4.29321358 4.29299998-1.4142136 1.4142136-4.29299998-4.29321358-4.29278644 4.29321358-1.41421356-1.4142136 4.293-4.29299998-4.293-4.29278644 1.41421356-1.41421356 4.29278644 4.293z",
  ],
  "import--20": [
    "m10.1679277 1c.4734117 0 .9294436.16784171 1.2886117.47045695l.1299923.11973364 3.8317672 3.85567039c.3310097.3330746.5329323.77053493.5737174 1.23466309l.0076785.17514632-.0003945 2.89332961h-1.5v-1.999l-3.4993003.00018311c-.9181734 0-1.67119234-.70711028-1.7441988-1.6064728l-.0058012-.1435272-.00069971-3.50118311h-4.75430029v14.999h10.004l-.0006997-3.249h1.501l.0003945 3.7493521c0 .5128358-.3860402.9355071-.8833789.9932722l-.1166211.0067278h-11.00439451c-.51283584 0-.93550716-.3860402-.99327227-.8833789l-.00672773-.1166211v-15.9983521c0-.51283584.38604019-.93550716.88337888-.99327227l.11662112-.00672773zm1.8027493 7.96866283 1.0606602 1.06066017-1.2203372 1.2203398 7.1879624.0003372v1.5l-7.1879624-.0003372 1.2203372 1.2210142-1.0606602 1.0606602-2.50100709-2.5010071c-.26626656-.2662666-.29047261-.6829303-.07261815-.9765418l.07261815-.0841184zm-1.2213767-6.09366283.0006997 3.12518311c0 .11834673.0822334.21748682.1926773.24339732l.0573227.00660268 3.1033003-.00018311z",
  ],
  "share--24": [
    "m18 16.08c-.76 0-1.44.3-1.96.77l-7.13-4.15c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7l-7.05 4.11c-.54-.5-1.25-.81-2.04-.81-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z",
  ],
  "undo--20": [
    "m10.4166667 6.66666667c-2.20833337 0-4.20833337.825-5.75000003 2.16666666l-3-3v7.49999997h7.5l-3.01666667-3.0166666c1.15833333-.9666667 2.63333333-1.5666667 4.2666667-1.5666667 2.95 0 5.4583333 1.925 6.3333333 4.5833333l1.975-.65c-1.1583333-3.49166663-4.4333333-6.01666663-8.3083333-6.01666663z",
  ],
  "redo--20": [
    "m15.3333333 8.83333333c-1.5416666-1.34166666-3.5416666-2.16666666-5.74999997-2.16666666-3.875 0-7.15 2.525-8.3 6.01666663l1.96666667.65c.875-2.6583333 3.375-4.5833333 6.33333333-4.5833333 1.62499997 0 3.10833337.6 4.26666667 1.5666667l-3.0166667 3.0166666h7.5v-7.49999997z",
  ],
  "arrow-down--20": [
    "m9.99902344 13.9995117 3.99999996-5.99999998h-7.99999996z",
  ],
  "chevron-down--24": ["m19 8 1 1.5-8 6.5-8-6.5 1-1.5 7 5.5z"],
  "arrow-down--24": ["m5 10 7 7 7-7z"],
  "new--20": [
    "m10 2c4.418278 0 8 3.581722 8 8s-3.581722 8-8 8-8-3.581722-8-8 3.581722-8 8-8zm0 2c-3.3137085 0-6 2.6862915-6 6s2.6862915 6 6 6 6-2.6862915 6-6-2.6862915-6-6-6zm1 2v3h3v2h-3v3h-2v-3h-3v-2h3v-3z",
  ],
  "settings--24": [
    "m12 7c-2.76142375 0-5 2.23857625-5 5 0 2.7614237 2.23857625 5 5 5 2.7614237 0 5-2.2385763 5-5 0-2.76142375-2.2385763-5-5-5zm0 2c1.6568542 0 3 1.3431458 3 3s-1.3431458 3-3 3-3-1.3431458-3-3 1.3431458-3 3-3zm-8 3-1.66025404-3.26794919 2-3.46410162 3.66025404-.26794919 2-3h4l2 3 3.660254.26794919 2 3.46410162-1.660254 3.26794919 1.660254 3.2679492-2 3.4641016-3.660254.2679492-2 3h-4l-2-3-.00125404-.001-3.659-.2669492-2-3.4641016 1.66025404-3.2679492 1.86674596-3.268z",
  ],
  "options--32": [
    "M8 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm8 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm8 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  ],
  "copy--24": [
    "m16 1h-12c-1.1 0-2 .9-2 2v14h2v-14h12zm3 4h-11c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-11v-14h11z",
  ],
  "rename--24": [
    "m21 16v4h-10l4-4zm-8.94-8.81 3.75 3.75-9.06 9.06h-3.75v-3.75zm0 2.83-7.06 7.06v.92h.92l7.06-7.06zm3.6-6.02c.26 0 .51.09.71.29l2.34 2.34c.39.39.39 1.02 0 1.41l-1.83 1.83-3.75-3.75 1.83-1.83c.19-.19.45-.29.7-.29z",
  ],
  "delete--24": [
    "m18 7v11c0 1.6568542-1.3431458 3-3 3h-6c-1.65685425 0-3-1.3431458-3-3v-11zm-3-4 1 1h4v2h-16v-2h4l1-1z",
  ],
  "toggleheader--24": [
    "M10.4588192,20 L10.4588192,19.5630996 C9.56927429,19.4922509 8.99067651,19.3308733 8.72302583,19.0789668 C8.45537515,18.8270603 8.32154982,18.2602706 8.32154982,17.3785978 L8.32154982,17.3785978 L8.32154982,12.395572 L15.6543911,12.395572 L15.6543911,17.095203 C15.6543911,18.1421894 15.538278,18.7916359 15.3060517,19.0435424 C15.0738253,19.295449 14.4814514,19.4686347 13.5289299,19.5630996 L13.5289299,19.5630996 L13.5289299,20 L20.2477491,20 L20.2477491,19.5630996 C19.3582042,19.4843788 18.7815744,19.3210332 18.5178598,19.0730627 C18.2541451,18.8250923 18.1222878,18.2602706 18.1222878,17.3785978 L18.1222878,17.3785978 L18.1222878,6.62140221 C18.1222878,5.75547355 18.2541451,5.19261993 18.5178598,4.93284133 C18.7815744,4.67306273 19.3582042,4.51168512 20.2477491,4.44870849 L20.2477491,4.44870849 L20.2477491,4 L13.5289299,4 L13.5289299,4.44870849 C14.4263469,4.51168512 15.0049446,4.67306273 15.2647232,4.93284133 C15.5245018,5.19261993 15.6543911,5.75547355 15.6543911,6.62140221 L15.6543911,6.62140221 L15.6543911,11.3328413 L8.32154982,11.3328413 L8.32154982,6.62140221 C8.32154982,5.75547355 8.45537515,5.19261993 8.72302583,4.93284133 C8.99067651,4.67306273 9.56927429,4.51168512 10.4588192,4.44870849 L10.4588192,4.44870849 L10.4588192,4 L3.74,4 L3.74,4.44870849 C4.6295449,4.51168512 5.20617466,4.67306273 5.4698893,4.93284133 C5.73360394,5.19261993 5.86546125,5.75547355 5.86546125,6.62140221 L5.86546125,6.62140221 L5.86546125,17.095203 C5.86546125,18.1421894 5.74738007,18.7896679 5.51121771,19.0376384 C5.27505535,19.2856089 4.68464945,19.4607626 3.74,19.5630996 L3.74,19.5630996 L3.74,20 L10.4588192,20 Z",
  ],
  "ingredient--24": [
    "M13.0256584,2.84188612 L13.9743416,3.15811388 C13.4946347,4.59723483 13.1922432,6.03472221 13.0667653,7.47131308 C14.049455,7.36576075 14.3879412,7 17,7 C23.7383637,7 18.5,21 15.5,21 C13.5,21 13.5,20.5 12.5,20.5 C11.5,20.5 11.5,21 9.5,21 C6.38941162,21 1.26163634,7 8,7 C9.86053394,7 10.5678744,7.18316258 11.1689735,7.32777016 L11.3564838,7.37189551 C11.5739749,7.42127647 11.7920041,7.46225635 12.0629266,7.48374765 C12.1750914,6.10612234 12.4417693,4.72968487 12.8619079,3.35452684 L13.0256584,2.84188612 Z M12,5.5 C9,5.83333333 7,4.66666667 6,2 C8.66666667,1.66666667 10.6666667,2.83333333 12,5.5 Z",
  ],
  "dragthumb--24": [
    "m2.5 19c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm7 0c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm-7-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm7 0c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm-7-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm7 0c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm-7-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm7 0c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z",
  ],
  "toggleheader--16": [
    "m5 13c0 .5522847-.44771525 1-1 1s-1-.4477153-1-1v-10c0-.55228475.44771525-1 1-1s1 .44771525 1 1v4h6v-4c0-.55228475.4477153-1 1-1s1 .44771525 1 1v10c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-4h-6z",
  ],
  "ingredient--16": [
    "m5 13c0 .5522847-.44771525 1-1 1s-1-.4477153-1-1v-10c0-.55228475.44771525-1 1-1s1 .44771525 1 1v4h6v-4c0-.55228475.4477153-1 1-1s1 .44771525 1 1v10c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-4h-6z",
  ],
  "options--24": [
    "M8 12C8 12.8284 7.32843 13.5 6.5 13.5C5.67157 13.5 5 12.8284 5 12C5 11.1716 5.67157 10.5 6.5 10.5C7.32843 10.5 8 11.1716 8 12ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12ZM17.5 13.5C18.3284 13.5 19 12.8284 19 12C19 11.1716 18.3284 10.5 17.5 10.5C16.6716 10.5 16 11.1716 16 12C16 12.8284 16.6716 13.5 17.5 13.5Z"
  ],
  'search--12': [
    'M7.14268 8.14268C6.40064 8.68194 5.48747 9 4.5 9C2.01472 9 0 6.98528 0 4.5C0 2.01472 2.01472 0 4.5 0C6.98528 0 9 2.01472 9 4.5C9 5.48747 8.68194 6.40064 8.14268 7.14268L9 8H9.5L11.5 10L10 11.5L8 9.5V9L7.14268 8.14268ZM7.5 4.5C7.5 6.15685 6.15685 7.5 4.5 7.5C2.84315 7.5 1.5 6.15685 1.5 4.5C1.5 2.84315 2.84315 1.5 4.5 1.5C6.15685 1.5 7.5 2.84315 7.5 4.5Z'
  ]
};

export default iconDefs;