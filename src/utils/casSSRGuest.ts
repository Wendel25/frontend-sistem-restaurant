import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'

export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        if (cookies['@token']) {
            return {
                redirect: {
                    destination: '/requests',
                    permanent: false,
                }
            }
        }

        return await fn(ctx);
    }
}