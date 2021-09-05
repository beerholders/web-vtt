import Head from "next/head";
import { Breadcrumb, Layout, List, Skeleton, Typography } from "antd";
import { css } from "@emotion/react";
import Colmeia from "../../../components/colmeia";
import {
  faMagic,
  faDragon,
  faHatWizard,
  faUsers,
  faRing,
  faPortrait,
  faSkullCrossbones,
  faKhanda,
  faAward,
  faFeather,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useCompendiumListQuery } from "../../../lib/queries/compendium/useCompendiumListQuery";
import { useCompendiumItemQuery } from "../../../lib/queries/compendium/useCompendiumItemQuery";
import Link from "next/link";
import { useEffect } from "react";
import { CompendiumItem } from "../../../components/CompendiumItem";

const { Title, Paragraph } = Typography;
const { Sider, Content } = Layout;

const COMPENDIUM_ITEMS = [
  {
    id: "1",
    name: "Spells",
    src: faMagic,
    type: "icon",
    url: "/compendium/spells",
  },
  {
    id: "2",
    name: "Monsters",
    src: faDragon,
    type: "icon",
    url: "/compendium/monsters",
  },
  {
    id: "3",
    name: "Classes",
    src: faHatWizard,
    type: "icon",
    url: "/compendium/classes",
  },
  {
    id: "4",
    name: "Races",
    src: faUsers,
    type: "icon",
    url: "/compendium/races",
  },
  {
    id: "5",
    name: "Items",
    src: faRing,
    type: "icon",
    url: "/compendium/magic-items",
  },
  {
    id: "6",
    name: "Backgrounds",
    src: faPortrait,
    type: "icon",
    url: "/compendium/backgrounds",
  },
  {
    id: "7",
    name: "Conditions",
    src: faSkullCrossbones,
    type: "icon",
    url: "/compendium/conditions",
  },
  {
    id: "8",
    name: "Equipments",
    src: faKhanda,
    type: "icon",
    url: "/compendium/equipment",
  },
  {
    id: "9",
    name: "Feats",
    src: faAward,
    type: "icon",
    url: "/compendium/feats",
  },
  {
    id: "10",
    name: "Languages",
    src: faFeather,
    type: "icon",
    url: "/compendium/languages",
  },
];

const compendiumStyle = css`
  display: grid;
  grid-template-columns: auto 400px;
  grid-template-rows: 100vh;
`;

const painelLateralStyle = css`
  padding: 0;
  margin: 0;
  grid-column: 2;
  place-content: center;
  text-align: center;
  background-color: var(--cor-dos-frames);
  height: 100vh;
`;

const listaCompendioStyle = css`
  background-color: var(--cor-dos-frames);
  margin: 1em;
  text-align: justify;
  overflow-y: scroll;
  height: 60vh;
`;

export default function Compendium() {
  const {
    push,
    query: { item, category },
  } = useRouter();
  const { data } = useCompendiumListQuery(category);
  const { isLoading: isLoadingItem, data: itemData } = useCompendiumItemQuery(
    category,
    item
  );

  const firstElementIndex = data?.results?.[0]?.index;
  useEffect(() => {
    if (!item && firstElementIndex) {
      push(`/compendium/${category}/${firstElementIndex}`);
    }
  }, [item, firstElementIndex]);

  const compendiumList = data?.results;
  return (
    <Layout>
      <Head>
        <title>Compêndio</title>
        <link rel="icon" href="/img/beeholder-logo.png" />
      </Head>
      <Content css={{ padding: 40 }}>
        <Breadcrumb css={{ marginBottom: 20 }}>
          <Breadcrumb.Item>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={`/compendium`}>
              <a>Compendium</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={`/compendium/${category}`}>
              <a>{category}</a>
            </Link>
          </Breadcrumb.Item>
          {itemData && <Breadcrumb.Item>{itemData.name}</Breadcrumb.Item>}
        </Breadcrumb>
        {!itemData && isLoadingItem ? (
          <Skeleton paragraph={{ rows: 12 }} active />
        ) : (
          <CompendiumItem category={category} item={itemData} />
        )}
      </Content>
      <Sider css={{ textAlign: "center" }} width={400}>
        <img
          css={{ width: 100 }}
          width={100}
          height={100}
          src="/img/beeholder-logo.png"
          alt="Ícone com a ilustração de um beholder amarelo e preto (cores de abelha)"
        />
        <h1 css={{ fontSize: "2em" }}>Câmara do conhecimento</h1>
        <div id="selecao-compendio">
          <Colmeia objects={COMPENDIUM_ITEMS} scale={20} />
        </div>
        <List
          bordered
          css={listaCompendioStyle}
          dataSource={compendiumList}
          renderItem={(compendiumItem) => (
            <List.Item>
              <Link href={`/compendium/${category}/${compendiumItem.index}`}>
                <a>{compendiumItem.name}</a>
              </Link>
            </List.Item>
          )}
        />
      </Sider>
    </Layout>
  );
}
