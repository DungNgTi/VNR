import PropTypes from "prop-types";

export default DataPropTypes = {
    Image: PropTypes.arrayOf(PropTypes.string),
    Video: PropTypes.shape({
        Src: PropTypes.string,
        Type: PropTypes.oneOf(['youtube', 'file']),
        Poster: PropTypes.string,
    }),
    Title: PropTypes.string,
    Description: PropTypes.string,
    Content: PropTypes.string,
    Tags: PropTypes.arrayOf(PropTypes.string),
    Author: PropTypes.arrayOf(PropTypes.shape({
        Name: PropTypes.string,
        Image: PropTypes.string,
    })),
    Scale: PropTypes.number,
    Alignment: PropTypes.string,
    Date: PropTypes.string,
    Link: PropTypes.shape({
        Href: PropTypes.string,
        Title: PropTypes.string,
        Target: PropTypes.string,
    }),
};