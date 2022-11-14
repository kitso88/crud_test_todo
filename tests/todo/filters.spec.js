const { test, expect } = require('@playwright/test')
const { ToDo } = require('../po/Todo.page')
const { listItemText } = require('../utils/list_items')

let todo
let page

test.describe.configure({ mode: 'serial' })

test.describe('Filters', () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        todo = new ToDo(page)

        await page.goto('https://todomvc4tasj.herokuapp.com/')

        await todo.addItem(listItemText[0])
        await todo.addItem(listItemText[1])
        await todo.addItem(listItemText[2])
        await todo.addItem(listItemText[3])

        await todo.listItem.locator('input[type=checkbox] >> nth=0').click()
        await todo.listItem.locator('input[type=checkbox] >> nth=2').click()
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('Show all active tasks', async () => {
        await todo.filterActive.click()

        await expect(todo.listItem.locator('nth=0')).toHaveCSS(
            'display',
            'none'
        )
        await expect(todo.listItem.locator('nth=2')).toHaveCSS(
            'display',
            'none'
        )
    })
    test('Show all completed tasks', async () => {
        await todo.filterCompleted.click()

        await expect(todo.listItem.locator('nth=1')).toHaveCSS(
            'display',
            'none'
        )

        await expect(todo.listItem.locator('nth=3')).toHaveCSS(
            'display',
            'none'
        )
    })
    test('Clear Completed', async () => {
        await todo.filterShowAll.click()
        await todo.clearCompleted.click()

        await expect(todo.listItem).toHaveText([
            listItemText[1],
            listItemText[3],
        ])
    })
})
