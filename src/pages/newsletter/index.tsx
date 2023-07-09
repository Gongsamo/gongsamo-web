import Link from 'next/link';
import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useNewslettersStore } from '@/stores/newsletters';

import SearchNewsletter from '@/components/Newsletter/SearchNewsletter';
import Categories from '@/components/Category/Categories';
import NewsletterHeader from '@/components/Newsletter/NewsletterHeader';
import NewsletterPagination from '@/components/Newsletter/NewsletterPagination';
import ContentCard from '@/components/ui/cards/ContentCard';
import Typography24 from '@/components/ui/textStyles/Typography24';

const Newsletter = ({ articles, page, totalPages, keyword }: any) => {
  useEffect(() => {
    useNewslettersStore.getState().setNewsletters(articles, page, totalPages, keyword);
  }, [articles]);
  console.log(articles);
  return (
    <>
      <InfoSection>
        <NewsletterHeader />
        <SearchNewsletter />
        <Categories />
      </InfoSection>
      <ContentsSection>
        {articles.length ? (
          <Wrapper>
            {articles.map((article: any) => (
              <Link key={article.id} href={`/newsletter/${article.id}`}>
                {
                  <ContentCard
                    key={article.id}
                    title={article.title}
                    subtitle={article.issue_number}
                    date={new Date(article.issue_date).toLocaleDateString('ko-KR')}
                    thumbnail="/images/intro_04.png"
                    tags={article.tags}
                    contents={article.table_of_content}
                  />
                }
              </Link>
            ))}
          </Wrapper>
        ) : (
          <NotContentsWrapper>
            <Typography24 text="검색된 컨텐츠가 없어요 😅" />
          </NotContentsWrapper>
        )}

        <NewsletterPagination totalPages={totalPages} page={page} keyword={keyword} />
      </ContentsSection>
    </>
  );
};

const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px 15px;
  margin: 0 auto;
  margin-top: 100px;
`;

const NotContentsWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const InfoSection = styled('section')`
  max-width: 700px;
  margin: 0 auto;
`;

const ContentsSection = styled('section')`
  max-width: 1200px;
  margin: 0 auto;
`;

export async function getServerSideProps(context: any) {
  const { keyword = '', page = 1, size = 9 } = context.query;

  const res = await fetch(
    `http://localhost:3000/api/articles?keyword=${keyword}&page=${page}&size=${size}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );

  const { results, totalPages } = await res.json();
  useNewslettersStore.getState().setNewsletters(results, page, totalPages, keyword);

  return {
    props: {
      articles: useNewslettersStore.getState().newsletters,
      totalPages: useNewslettersStore.getState().totalPages,
      page: useNewslettersStore.getState().page,
      keyword,
    },
  };
}

export default Newsletter;
