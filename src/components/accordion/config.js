export const defaultConfig = {
  DefaultExpanded: 0,
  Alignment: 'Left',
};

export const dataSchema = {
  Image: [],
  Video: {
    Src: '',
    Type: 'youtube | file',
    Poster: '',
  },
  Title: '',
  Description: '',
  Content: '',
  Tags: [''],
  Author: [
    {
      Name: '',
      Image: '',
    },
  ],
  Scale: 0.5,
  Alignment: 'Left',
  Date: '',
  Link: {
    Href: '',
    Title: '',
    Target: '_blank',
  },
};
