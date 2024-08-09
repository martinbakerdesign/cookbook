type Option = {
  label: string;
  value: string;
};

function useSelect() {
  function getOnChangeCallback (dispatch) {
    return (e) => {
      dispatch("change", e?.value);
    };
  };

  function getSelected ($value, items) {
    const labels = getLabelsMap(items);
    return { value: $value, label: labels.get($value) ?? "" };
  };

  return {
    getOnChangeCallback,
    getSelected,
  };
}

function getLabelsMap(items: Option[]) {
  return new Map(items.map((item) => [item.value, item.label]));
}


export {
    type Option,
    //
    useSelect as default,
}