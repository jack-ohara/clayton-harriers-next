import SimpleNavCard from "../../components/card/SimpleNavCard"
import Layout from "../../components/layout"
import PageHeader from "../../components/PageHeader"
import { MenuItem, PageDetails } from "../../types/wordpress"
import { getChildPageDetails, getMenuData } from "../../utils/wordpress"
import styles from "./RollOfHonour.module.css"

type Props = {
    menuData: MenuItem[];
    pageDetails: PageDetails[];
}

export default function RollOfHonourPage({ menuData, pageDetails }: Props) {
    return (
        <Layout menuData={menuData} title="Roll Of Honour">
            <PageHeader>Roll Of Honour</PageHeader>

            <p>
                The runners in our club have achieved so many great things over the
                years and this page is here in recognition of those accolades.
            </p>

            <p>
                Below we&apos;ve grouped together some of the achievements. This is an
                ever-growing list and no doubt, we&apos;ve missed some people along the way.
                If you think you should be on any of the lists, please get in touch!
            </p>

            <div className={styles.cardContainer}>
                {pageDetails.map(page => (
                    <SimpleNavCard
                        className={styles.rohNavCard}
                        title={page.title}
                        featuredImage={page.featuredImage ?? undefined}
                        slug={page.slug}
                        key={`roll-of-honour-page-${page.title}`}
                    />
                ))}
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const menuDataPromise = getMenuData()
    const rollOfHonourPagesPromise = getChildPageDetails("roll-of-honour")

    const [menuData, rollOfHonourPages] = await Promise.all([menuDataPromise, rollOfHonourPagesPromise])

    return {
        props: {
            menuData,
            pageDetails: rollOfHonourPages
        }
    }
}