export const StyleProvider = (props) => {
  return (
    <StyleSheetManager sheet={props.sheetInstance}>
      <ThemeProvider theme={THEME}>{props.children}</ThemeProvider>
    </StyleSheetManager>
  );
};

function SomePage({ ssrStyles }) {
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: ssrStyles,
          }}
        />
      </Head>
      // other stuff
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  const contentUrl = path.join(process.cwd(), `/content/page.mdx`);

  const source = await readFilePromise(contentUrl);

  const { content: markdown, data: frontmatter } = matter(source);

  let rawContent = "";

  const sheet = new ServerStyleSheet();

  rawContent = await renderToString(markdown, {
    components: COMPONENTS,
    provider: {
      component: StyleProvider,
      props: {
        sheetInstance: sheet.instance,
      },
    },
  });

  return {
    props: {
      rawContent,
      frontmatter,
      ssrStyles: sheet.instance.toString(),
    },
  };
}
