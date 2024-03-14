import React from "react";
import {
  Page,
  PageContent,
  PageHeader,
} from "grommet";

interface TextualLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export function TextualLayout({ title, children }: TextualLayoutProps) {
  return (
      <Page kind="narrow">
        {title && <PageHeader
          title={title}
        />}

        <PageContent>{children}</PageContent>
      </Page>
  );
}
