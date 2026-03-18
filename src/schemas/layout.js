const generalDefaultProps = {
    Title: "",
    Description: "",
}
export const heroProps = {
    ...generalDefaultProps,
    Config: {
        Size: "Large",
        Alignment: "Center",
    }
}

export const cardProps = {
    ...generalDefaultProps,
    Config: {
        Searchable: "",
        Categories: ["Tag1", "Tag2"],
        Placeholder: ""
    }
}

export const statisticProps = {
    ...generalDefaultProps,
    Config: {
        Variant: "Bar",
        Alignment: "Left",
        Height: 400,
        Keys: [],
        Metrics: [],
        Colors: [],
        Stacked: false
    }
}

export const timelineProps = {
    ...generalDefaultProps,
    Config: {
        Direction: "Vertical",
        Alignment: "Left",
    }
}

export const profileProps = {
    ...generalDefaultProps,
    Config: {
        Scroll: {
            Direction: "Horizontal",
            Parallax: true,
            ShowDots: true,
        }
    }
}

export const scrollerProps = {
    ...generalDefaultProps,
    Config: {
        Direction: "Horizontal",
        Parallax: false,
        ShowDots: true,
        FreeMode: true,
        SpaceBetween: 16,
        SlidesPerView: "auto",
        UseNative: false,
    }
}

export const comparisonProps = {
    ...generalDefaultProps,
    Config: {
        FromIndex: [] || [1],
        ToIndex: [] || [1],
    }
}

export const tableProps = {
    ...generalDefaultProps,
    Config: {
        Columns: [],
        Sortable: true,
        Striped: true,
    }
}

export const accordionProps = {
    ...generalDefaultProps,
    Config: {
        DefaultExpanded: 0,
        Alignment: "Left",
    }
}