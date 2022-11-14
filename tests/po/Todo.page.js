export class ToDo {
    constructor(page) {
        this.page = page
        this.nameField = page.locator('#new-todo')
        this.toggleAll = page.locator('#toggle-all')
        this.list = page.locator('#todo-list')
        this.listItem = page.locator('#todo-list > li')
        this.listItemText = page.locator('#todo-list > li >> label')
        this.itemCount = page.locator('#todo-count > strong')
        this.filterShowAll = page.locator('#filters >> [href="#/"]')
        this.filterActive = page.locator('#filters >> [href="#/active"]')
        this.filterCompleted = page.locator('#filters >> [href="#/completed"]')
        this.clearCompleted = page.locator('#clear-completed')
    }
    async addItem(itemName) {
        await this.nameField.type(itemName)
        await this.page.waitForTimeout(1000)
        await this.page.keyboard.press('Enter')
    }
    async editItem(text) {
        await this.page.waitForTimeout(1000)
        await this.listItemText.dblclick()
        await this.listItemText.type(text)
        await this.page.waitForTimeout(1000)
        await this.page.keyboard.press('Enter')
    }
}
