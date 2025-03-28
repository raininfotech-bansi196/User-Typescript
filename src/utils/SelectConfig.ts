export const Selectconfigsfilter = {
    control: (base: any, state: any) => ({
        ...base,
        padding: "0 20px 0 30px !important",
        background: "#fff !important",
        border: "none !important",
        boxShadow: "none !important",
        width: "100% !important",
        cursor: "pointer !important",
        borderRadius: "30px !important",
        color: "#6a727b !important",
        lineHeight: "1 !important",
        fontSize: "16px !important",
        maxHeight: "55px",
        minHeight: "55px",
        display: "flex !important",
        alignItems: "center !important",
        borderBottom: state.isSelected ? "1px solid #20509e !important" : state.isFocused ? "1px solid #20509e !important" : "1px solid #ebebeb !important"
    }),
    option: (base: any, state: any) => ({
        ...base,
        background: state.isSelected ? "#f1f1f1 !important" : state.isFocused ? "#deebff !important" : "#fff !important",
        color: "#000 !important",
        padding: "8px 20px !important",
        lineHeight: "25px !important",
        cursor: "pointer !important",
        fontSize: "16px !important",
        border: "none !important",
    }),
    noOptionsMessage: (base: any) => ({
        ...base,
        background: "#fff !important",
        color: "#000 !important",
        border: "none !important",
        borderRadius: "30px !important"
    }),
    menu: (base: any) => ({
        ...base,
        background: "#fff !important",
        fontSize: "16px !important",
        padding: "0px !important",
        borderRadius: "30px !important",
        border: "none !important",

    }),
    menuList: (base: any) => ({
        ...base,
        maxHeight: "300px !important",
        padding: "0px !important",
        borderRadius: "30px !important",
        border: "none !important",
        fontSize: "16px !important",
        background: "#fff !important",
    }),
    input: (base: any) => ({
        ...base,
        color: "#6a727b !important",
    }),
    placeholder: (base: any) => ({
        ...base,
        color: "#6a727b !important",
    }),
    singleValue: (base: any) => ({
        ...base,
        color: "#20509e !important",
        padding: "0 !important",
        fontSize: "16px !important",
        lineHeight: "1.5"
    }),

    dropdownIndicator: (base: any, state: any) => ({
        ...base,
        strokeWidth: "1px !important",
        stroke: "#cccccc !important",
    }),
};
export const SelectconfigsfilterForList = {
    control: (base: any, state: any) => ({
        ...base,
        padding: "0 20px 0 12px !important",
        background: "#fff !important",
        // border: "1px solid #dee2e6 !important",
        boxShadow: "none !important",
        width: "100% !important",
        cursor: "pointer !important",
        borderRadius: "30px !important",
        color: "#6a727b !important",
        lineHeight: "1 !important",
        fontSize: "15px !important",
        maxHeight: "44px",
        minHeight: "44px",
        display: "flex !important",
        alignItems: "center !important",
        border: state.isSelected ? "1px solid #20509e !important" : state.isFocused ? "1px solid #20509e !important" : "1px solid #dee2e6 !important"
    }),
    option: (base: any, state: any) => ({
        ...base,
        background: state.isSelected ? "#f1f1f1 !important" : state.isFocused ? "#deebff !important" : "#fff !important",
        color: "#000 !important",
        padding: "8px 20px !important",
        lineHeight: "25px !important",
        cursor: "pointer !important",
        fontSize: "15px !important",
        border: "none !important",
    }),
    noOptionsMessage: (base: any) => ({
        ...base,
        background: "#fff !important",
        color: "#000 !important",
        border: "none !important",
        borderRadius: "30px !important"
    }),
    menu: (base: any) => ({
        ...base,
        background: "#fff !important",
        fontSize: "15px !important",
        padding: "0px !important",
        borderRadius: "30px !important",
        border: "none !important",

    }),
    menuList: (base: any) => ({
        ...base,
        maxHeight: "300px !important",
        padding: "0px !important",
        borderRadius: "30px !important",
        border: "none !important",
        fontSize: "15px !important",
        background: "#fff !important",
    }),
    input: (base: any) => ({
        ...base,
        color: "#6a727b !important",
    }),
    placeholder: (base: any) => ({
        ...base,
        color: "#6a727b !important",
    }),
    singleValue: (base: any) => ({
        ...base,
        color: "#222 !important",
        padding: "0 !important",
        fontSize: "15px !important",
        lineHeight: "1.5"
    }),

    dropdownIndicator: (base: any, state: any) => ({
        ...base,
        strokeWidth: "1px !important",
        stroke: "#cccccc !important",
    }),
};