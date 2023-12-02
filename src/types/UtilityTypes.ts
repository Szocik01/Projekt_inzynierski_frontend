import { SerializedStyles } from "@emotion/react";

export type ListingCardProps = {
    customStyles?: SerializedStyles;
    imageUrl?: string;
    title?: string;
    subtitle?: string;
    content?: string;
    cardRedirectionLink?: string;
  };