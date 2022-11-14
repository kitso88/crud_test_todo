const { test, expect } = require('@playwright/test')
const { ToDo } = require('../po/Todo.page')
const { listItemText } = require('../utils/list_items')

let todo

test.describe('CRUD', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://todomvc4tasj.herokuapp.com/')
        todo = new ToDo(page)
        await todo.addItem(listItemText[0])
    })

    test('Add a record', async () => {
        await expect(todo.listItem).toHaveText(listItemText[0])
    })

    test('Edit item', async () => {
        await todo.editItem(listItemText[1])
        await expect(todo.listItemText).toHaveText(
            listItemText[0] + listItemText[1]
        )
    })

    test('Remove a record', async () => {
        await page.hover('#todo-list > li', { force: true })
        await page.waitForTimeout(1000)
        await todo.listItem.locator('button').click()
        await expect(todo.listItem).toHaveCount(0)
    })
})
