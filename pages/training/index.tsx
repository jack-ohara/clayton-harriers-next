import SimpleNavCard from "../../components/card/SimpleNavCard";
import Layout from "../../components/layout";
import PageHeader from "../../components/PageHeader";
import { MenuItem, Page } from "../../types/wordpress";
import { getMenuData, getPage } from "../../utils/wordpress";
import styles from "./Training.module.css";
import pagesIds from "../../utils/wp-page-ids.json"

type Props = {
    seniorTrainingPage: Page;
    juniorTrainingPage: Page;
    menuData: MenuItem[];
}

export default function TrainingPage({ seniorTrainingPage, juniorTrainingPage, menuData }: Props) {
    return (
        <Layout title="Training" menuData={menuData}>
            <PageHeader>Training</PageHeader>

            <div className={styles.cardContainer}>
                <SimpleNavCard
                    slug={seniorTrainingPage.slug}
                    featuredImage={seniorTrainingPage.featuredImage ?? undefined}
                    title="Senior Training"
                />
                
                <SimpleNavCard
                    slug={juniorTrainingPage.slug}
                    featuredImage={juniorTrainingPage.featuredImage ?? undefined}
                    title="Junior Training"
                />
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const menuDataPromise = getMenuData();
    const seniorTrainingPagePromise = getPage(pagesIds.senior_training_page);
    const juniorTrainingPagePromise = getPage(pagesIds.junior_training_page);

    const [menuData, seniorTrainingPage, juniorTrainingPage] = await Promise.all([
        menuDataPromise,
        seniorTrainingPagePromise,
        juniorTrainingPagePromise
    ]);

    return {
        props: {
            menuData,
            seniorTrainingPage,
            juniorTrainingPage
        }
    }
}