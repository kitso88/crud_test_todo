const { test, expect } = require('@playwright/test')
const { ToDo } = require('../po/Todo.page')
const { listItemText } = require('../utils/list_items')

let todo
let page

test.describe.configure({ mode: 'serial' })

test.describe('Selection and counter', () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        todo = new ToDo(page)

        await page.goto('https://todomvc4tasj.herokuapp.com/')

        await todo.addItem(listItemText[0])
        await todo.addItem(listItemText[1])
        await todo.addItem(listItemText[2])
        await todo.addItem(listItemText[3])
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('Mark all items completed ', async ({ page }, testinfo) => {
        await todo.toggleAll.click()
        await page.screenshot({
            path: `./screenshots/${testinfo.title}/screenshot.png`,
            fullPage: true,
        })
        await expect(todo.listItem).toHaveClass([
            'completed',
            'completed',
            'completed',
            'completed',
        ])
    })

    test('Mark all items uncompleted ', async () => {
        await todo.toggleAll.click()
        await expect(todo.listItem).toHaveClass([
            'active',
            'active',
            'active',
            'active',
        ])
    })

    test('Count all uncompleted', async () => {
        await expect(todo.itemCount).toHaveText('4')
    })

    test('Count all completed', async () => {
        await todo.toggleAll.click()
        await expect(todo.itemCount).toHaveText('0')
    })
})
