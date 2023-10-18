import {
  RefineThemes,
  ThemedLayoutV2,
  notificationProvider,
} from "@refinedev/chakra-ui";
import { Refine } from "@refinedev/core";
import { home } from "react-icons-kit/feather/home";
import { mail } from "react-icons-kit/feather/mail";
import { logOut } from "react-icons-kit/feather/logOut";
import { phone } from "react-icons-kit/feather/phone";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";
import { Ifeloluwa } from "@components/title";

import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "@components/header";
import dataProvider, { GraphQLClient } from "@refinedev/hasura";
import { appWithTranslation, useTranslation } from "next-i18next";
import Icon from "react-icons-kit";

const API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";

const client = new GraphQLClient(API_URL, {
  headers: {
    "x-hasura-role": "public",
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2 Header={() => <Header sticky />} Title={Ifeloluwa}>
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <>
      <RefineKbarProvider>
        {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
        <ChakraProvider theme={RefineThemes.Green}>
          <DevtoolsProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(client)}
              notificationProvider={notificationProvider}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  options: { label: "Home" },
                  icon: <Icon icon={home} size={20} />,
                },
                {
                  name: "mail",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  options: { label: "Mail" },
                  icon: <Icon icon={mail} size={20} />,
                },
                {
                  name: "order",
                  list: "/order",
                  options: { label: "Order" },
                  icon: <Icon icon={phone} size={20} />,
                },
                {
                  name: "log-out",
                  list: "/log_out",
                  options: { label: "Log Out" },
                  icon: <Icon icon={logOut} size={20} />,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "kVny8a-owLVI8-NOf11N",
              }}
            >
              {renderComponent()}

              <RefineKbar />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ChakraProvider>
      </RefineKbarProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
