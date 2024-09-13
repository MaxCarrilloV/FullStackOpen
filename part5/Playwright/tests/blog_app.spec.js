const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, creteBlog } = require('./helper')
describe('Test blog app',() => {
    beforeEach(async ({ page, request })=>{
        await request.post('/api/testing/reset')
        await request.post('/api/users',{
            data: {
                username:'root',
                name:'Matti Luukkainen',
                password:'root'
            }
        })
        await request.post('/api/users',{
            data: {
                username:'admin',
                name:'admin',
                password:'admin'
            }
        })
        await page.goto('')
    })
    test('Login form is show', async ({page})=>{
        await expect(page.getByText('Log in to application')).toBeVisible()
    })
    describe('Test Login Form',() =>{
        test('user can login with correct credential',async ({page}) => {
            await loginWith(page, 'root', 'root')
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })
        test('user can not login with correct credential',async({page}) => {
            await loginWith(page,'root','wrong')
            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('Wrong credentials')
        })
    })

    describe('When logged in',() => {
        beforeEach(async ({page}) =>{
            await loginWith(page, 'root', 'root')
        })

        test('A new blog can be created', async ({page}) =>{
            await creteBlog(page,'react blog test','fullstack','https://fullstackopen.com/')
            const blogDiv = await page.locator('.blog')
            await expect(blogDiv).toContainText('react blog test fullstack')
        })
        describe('and a blogs exist',()=>{
            beforeEach(async ({page}) =>{
                await creteBlog(page,'react blog test','fullstack','https://fullstackopen.com/')
                await creteBlog(page,'node blog test','open full','https://vercel.com/')
                await creteBlog(page,'full blog test','fullstack open','https://fullstackopen.com/es/part5')
            })
            test('A blog can edit',async ({page}) => {
                const blogElement = await page.getByText('node blog test open full')
                await blogElement.getByRole('button',{name:'View'}).click()
                const detail = await page.getByText('https://vercel.com/').locator('..')
                const like = await detail.getByText('Likes').first()
                const likesBefore = parseInt((await like.innerText()).at(-5))
                await like.locator('..').getByRole('button',{name:'Like'}).click()
                const likesAfter = parseInt((await like.innerText()).at(-5))
                await expect(likesAfter).toBe(likesBefore + 1)
            })

            test('sort list blog by property likes',async ({page}) => {
                const first = await page.getByText('full blog test fullstack open')
                const second = await page.getByText('node blog test open full')
                
                await first.getByRole('button',{name:'View'}).click()
                await second.getByRole('button',{name:'View'}).click()

                await second.getByRole('button',{name:'Like'}).click()
                await page.waitForTimeout(500)
                await second.getByRole('button',{name:'Like'}).click()
                await page.waitForTimeout(500)
                await first.getByRole('button',{name:'Like'}).click()

                await expect(page.locator('.blog').first()).toContainText('node blog test open full')
                await expect(page.locator('.blog').last()).toContainText('react blog test fullstack')
            })

            test('A blog can remove', async ({page}) => {
                page.on('dialog', async dialog =>{
                    await expect(dialog.message()).toContain('Remove blog node blog test by open full')
                    await dialog.accept()
                })

                const blogElement = await page.getByText('node blog test open full')
                await blogElement.getByRole('button',{name:'View'}).click()
                await blogElement.getByRole('button',{name:'Remove'}).click()
                await expect(blogElement).not.toBeVisible()
            })
            describe('test show button remove',() => {
                beforeEach(async ({page}) => {
                    await page.getByRole('button', {name:'Logout'}).click()
                    await loginWith(page, 'admin', 'admin')
                })
                test('Only the correct user can see the delete button',async({page}) => {
                    await page.getByRole('button',{name:'View'}).first().click()
                    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
                })
            })

        })
    })  
})