export type RegulationAttributes = {
    documentType: string;
    lastModifiedDate: string;
    highlightedContent: string;
    frDocNum: any;
    withdrawn: boolean;
    agencyId: string;
    commentEndDate: any;
    title: string;
    postedDate: string;
    docketId: string;
    subtype: string;
    commentStartDate: string;
    openForComment: boolean;
    objectId: string;
}

export type RegulationLinks = {
    self: string;
}

export type Regulation = {
    id: string;
    type: string;
    attributes: RegulationAttributes;
    links: RegulationLinks;
}