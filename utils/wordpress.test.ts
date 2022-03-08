import { getMenuData } from "./wordpress";
import fetchMock from "jest-fetch-mock";
import { MenuItem } from "../types/wordpress";
import wordpressResponses from "../types/wordpress-responses";

fetchMock.enableMocks();

describe('When fetching menu data', () => {
    process.env.WP_BASE_URL = "Not needed";

    const testCases: ({ input: wordpressResponses.MenuItem[], expected: MenuItem[] })[] = [
        {
            input: [
                { ID: 16956, menu_order: 1, menu_item_parent: "0", title: "Home", url: "/" }
            ],
            expected: [
                { id: 16956, label: "Home", menuOrder: 1, parentId: undefined, url: "/", childItems: [] }
            ]
        },
        {
            input: [
                { ID: 16956, menu_order: 1, menu_item_parent: "0", title: "Home", url: "/" },
                { ID: 16957, menu_order: 2, menu_item_parent: "16956", title: "Child1", url: "/child-1" },
                { ID: 16958, menu_order: 3, menu_item_parent: "16956", title: "Child2", url: "/child-2" },
                { ID: 16960, menu_order: 5, menu_item_parent: "16959", title: "Child3", url: "/child-3" },
                { ID: 16959, menu_order: 4, menu_item_parent: "0", title: "Away", url: "/away" },
                { ID: 16961, menu_order: 6, menu_item_parent: "16960", title: "Child4", url: "/child-4" },
            ],
            expected: [
                {
                    id: 16956, label: "Home", menuOrder: 1, parentId: undefined, url: "/", childItems: [
                        { id: 16957, label: "Child1", menuOrder: 2, parentId: 16956, url: "/child-1", childItems: [] },
                        { id: 16958, label: "Child2", menuOrder: 3, parentId: 16956, url: "/child-2", childItems: [] }
                    ]
                },
                {
                    id: 16959, label: "Away", menuOrder: 4, url: "/away", childItems: [
                        {
                            id: 16960, label: "Child3", menuOrder: 5, parentId: 16959, url: "/child-3", childItems: [
                                { id: 16961, label: "Child4", menuOrder: 6, parentId: 16960, url: "/child-4", childItems: [] }
                            ]
                        }
                    ]
                }
            ]
        },
    ];

    it.each(testCases)('should map the fields as expected', async ({ input, expected }) => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(input),
            }),
        ) as jest.Mock;

        const result = await getMenuData();

        expect(result).toEqual(expected);
    })

    const sortOrderTestCases: ({ input: wordpressResponses.MenuItem[], expected: MenuItem[] })[] = [
        {
            input: [
                { ID: 16957, menu_order: 2, menu_item_parent: "0", title: "Away", url: "/away" },
                { ID: 16956, menu_order: 1, menu_item_parent: "0", title: "Home", url: "/" },
            ],
            expected: [
                { id: 16956, label: "Home", menuOrder: 1, parentId: undefined, url: "/", childItems: [] },
                { id: 16957, label: "Away", menuOrder: 2, parentId: undefined, url: "/away", childItems: [] },
            ]
        },
        {
            input: [
                { ID: 16956, menu_order: 1, menu_item_parent: "0", title: "Home", url: "/" },
                { ID: 16958, menu_order: 3, menu_item_parent: "16956", title: "Child2", url: "/child-2" },
                { ID: 16957, menu_order: 2, menu_item_parent: "16956", title: "Child1", url: "/child-1" },
                { ID: 16960, menu_order: 5, menu_item_parent: "16958", title: "Child4", url: "/child-4" },
                { ID: 16959, menu_order: 4, menu_item_parent: "16958", title: "Child3", url: "/child-3" },
            ],
            expected: [
                {
                    id: 16956, label: "Home", menuOrder: 1, parentId: undefined, url: "/", childItems: [
                        { id: 16957, label: "Child1", menuOrder: 2, parentId: 16956, url: "/child-1", childItems: [] },
                        {
                            id: 16958, label: "Child2", menuOrder: 3, parentId: 16956, url: "/child-2", childItems: [
                                { id: 16959, label: "Child3", menuOrder: 4, parentId: 16958, url: "/child-3", childItems: [] },
                                { id: 16960, label: "Child4", menuOrder: 5, parentId: 16958, url: "/child-4", childItems: [] }
                            ]
                        }
                    ]
                },
            ]
        },
    ];

    it.each(sortOrderTestCases)('should order the results as expected', async ({ input, expected }) => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(input),
            }),
        ) as jest.Mock;

        const result = await getMenuData();

        console.log(JSON.stringify(result, null, 2));

        expect(result).toEqual(expected);
    })
})