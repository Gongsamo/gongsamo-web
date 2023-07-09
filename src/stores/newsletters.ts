import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Newsletter } from '@/models/newsletter';
import { PER_PAGE, PageableResponseImpl } from '@/models/pageable';

type PageableNewsletters = InstanceType<typeof PageableResponseImpl<Newsletter>>;

type NewslettersState = Omit<PageableNewsletters, 'results'> & {
  keyword: string;
  newsletters: Newsletter[];
  setNewsletters: (newsletters: any, page: any, totalPages: any, keyword: any) => void;
  setPageableNewsletters: (query: string, pageableNewsletters: PageableNewsletters) => void;
  setNextPage: (newsletters: Newsletter[]) => void;
};

export const useNewslettersStore = create<NewslettersState>()(
  devtools(
    (set) => ({
      keyword: '',
      page: 1,
      perPage: PER_PAGE,
      totalEntries: 0,
      totalPages: 1,
      newsletters: [],
      setNewsletters: (newsletters, page, totalPages, keyword) =>
        set((state) => ({ ...state, newsletters, page, totalPages, keyword })),
      setPageableNewsletters: (query, pageableNewsletters) =>
        set((state) => ({
          ...state,
          ...pageableNewsletters,
          query,
          newsletters: pageableNewsletters.results,
        })),
      setNextPage: (newsletters) =>
        set((state) => ({
          ...state,
          page: state.page + 1,
          newsletters: state.newsletters.concat(newsletters),
        })),
    }),
    {
      name: 'newsletters-store2',
    },
  ),
);
