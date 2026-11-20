import { Link, Meta, Script, Title } from "@solidjs/meta";
import { SITE_URL } from "../../lib/api/config";
import { OG_DESCRIPTION, OG_IMAGE, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OG_TITLE, SITE_NAME, SITE_TITLE } from "../../lib/seo";

export function PageMeta(props: {
  title: string;
  description: string;
  path: string;
  type?: string;
  schema?: Record<string, unknown>;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  prevPath?: string;
  nextPath?: string;
}) {
  const canonical = () => `${SITE_URL}${props.path.startsWith("/") ? props.path : `/${props.path}`}`;
  const ogDescription = () => props.ogDescription || props.description || OG_DESCRIPTION;

  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="title" content={props.title || SITE_TITLE} />
      <Meta name="description" content={props.description} />
      <Meta name="robots" content={props.noindex ? "noindex, nofollow" : "index, follow"} />
      <Meta property="og:type" content={props.type ?? "website"} />
      <Meta property="og:site_name" content={SITE_NAME} />
      <Meta property="og:locale" content="en_US" />
      <Meta property="og:url" content={canonical()} />
      <Meta property="og:title" content={props.ogTitle || props.title || OG_TITLE} />
      <Meta property="og:description" content={ogDescription()} />
      <Meta property="og:image" content={OG_IMAGE} />
      <Meta property="og:image:alt" content="IPTV Player streaming interface" />
      <Meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <Meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:url" content={canonical()} />
      <Meta name="twitter:title" content={props.ogTitle || props.title || OG_TITLE} />
      <Meta name="twitter:description" content={ogDescription()} />
      <Meta name="twitter:image" content={OG_IMAGE} />
      <Link rel="canonical" href={canonical()} />
      {props.prevPath && <Link rel="prev" href={`${SITE_URL}${props.prevPath}`} />}
      {props.nextPath && <Link rel="next" href={`${SITE_URL}${props.nextPath}`} />}
      {props.schema && <Script type="application/ld+json">{JSON.stringify(props.schema)}</Script>}
    </>
  );
}
