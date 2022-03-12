import { Post } from "../../../types/wordpress";
import DesktopComponent from "../../desktopComponent";
import MobileComponent from "../../mobileComponent";
import PageHeader from "../../PageHeader";
import styles from "./CardScroller.module.css"
import GridScroller from "./gridScroller";
import HorizontalScroller from "./horizontalScroller";

type Props = {
    title: string;
    posts: Post[];
}

export default function CardScroller({ title, posts }: Props) {
    return (
        <div>
            <PageHeader className={styles.header}>{title}</PageHeader>

            <MobileComponent>
                <HorizontalScroller posts={posts} />
            </MobileComponent>
            <DesktopComponent>
                <GridScroller posts={posts} />
            </DesktopComponent>
        </div>
    )
}